#!/usr/bin/env python3
"""Read-only HTTP observations; this is not a browser, visual or interaction audit."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit, unquote
from urllib.request import Request, urlopen


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.images, self.robots = set(), [], [], []
        self.h1 = 0

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "h1":
            self.h1 += 1
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "img" and attrs.get("src"):
            self.images.append(attrs["src"])
        if tag == "meta" and attrs.get("name", "").lower() == "robots":
            self.robots.append(attrs.get("content", ""))


def origin(url):
    parsed = urlsplit(url)
    return parsed.scheme, parsed.netloc


def inspect(url):
    parsed = urlsplit(url)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname or parsed.username or parsed.password:
        raise ValueError("Supply an HTTP(S) page URL without embedded credentials")
    if parsed.scheme == "http" and parsed.hostname not in {"localhost", "127.0.0.1", "::1"}:
        raise ValueError("Plain HTTP is restricted to a local preview")
    with urlopen(Request(url, headers={"User-Agent": "ProspectDemoReadOnlyQA/1"}), timeout=15) as response:
        final_url = response.geturl()
        html = response.read(4 * 1024 * 1024 + 1)
        if len(html) > 4 * 1024 * 1024:
            raise ValueError("HTML exceeds the 4 MiB audit limit; inspect explicitly")
        content_type = response.headers.get("content-type", "")
        status = response.status
    if origin(final_url) != origin(url):
        raise ValueError("Page redirected to another origin; verify the destination explicitly")
    if "text/html" not in content_type:
        raise ValueError("Target did not return HTML")
    page = Page()
    page.feed(html.decode("utf-8"))
    missing = sorted({unquote(link[1:]) for link in page.links if link.startswith("#") and len(link) > 1 and unquote(link[1:]) not in page.ids})
    unsafe = [link for link in page.links if urlsplit(link).scheme.lower() in {"javascript", "data"}]
    # Bound requests to same-origin images present in served HTML, never crawl contact links.
    assets = sorted({urljoin(final_url, path) for path in page.images if origin(urljoin(final_url, path)) == origin(final_url)})[:20]

    def check_asset(asset):
        try:
            with urlopen(Request(asset, method="HEAD"), timeout=10) as response:
                valid = response.status == 200 and response.headers.get("content-type", "").startswith("image/") and origin(response.geturl()) == origin(final_url)
                return {"url": asset, "status": response.status, "pass": valid}
        except (OSError, HTTPError, URLError) as error:
            return {"url": asset, "pass": False, "error": str(error)}

    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(check_asset, assets))
    checks = {"html_200": status == 200, "one_h1": page.h1 == 1, "noindex": any("noindex" in value.lower() for value in page.robots), "fragment_targets": not missing, "safe_link_schemes": not unsafe, "served_images": bool(results) and all(item["pass"] for item in results)}
    return {"status": "http_checks_passed" if all(checks.values()) else "http_issues_found", "url": final_url, "checks": checks, "missingFragments": missing, "unsafeLinks": unsafe, "images": results, "limits": "At most 20 same-origin images in served HTML. No scripts executed, external contact links followed, messages sent, viewport measured, or visual/interaction/accessibility quality established."}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    try:
        report = inspect(args.url)
    except (OSError, ValueError, HTTPError, URLError) as error:
        report = {"status": "http_audit_failed", "error": str(error)}
    payload = json.dumps(report, ensure_ascii=False, indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(payload, encoding="utf-8")
    print(payload, end="")
    return 0 if report["status"] == "http_checks_passed" else 1


if __name__ == "__main__":
    sys.exit(main())
