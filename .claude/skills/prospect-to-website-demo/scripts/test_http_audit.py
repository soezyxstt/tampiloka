"""Exercise the read-only HTTP checker against a synthetic local fixture server."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import threading
import unittest

from audit_http import inspect


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_HEAD(self):
        self.send_response(200 if self.path == "/photo.svg" else 404)
        self.send_header("Content-Type", "image/svg+xml")
        self.end_headers()

    def do_GET(self):
        meta = '' if self.path == '/without-noindex' else '<meta name="robots" content="noindex,nofollow">'
        target = 'missing' if self.path == '/missing-anchor' else 'menu'
        image = '/missing.svg' if self.path == '/missing-image' else '/photo.svg'
        extra_h1 = '<h1>Duplicate</h1>' if self.path == '/duplicate-heading' else ''
        html = f'<html><head>{meta}</head><body><h1>Synthetic cafe</h1>{extra_h1}<a href="#{target}">Menu</a><section id="menu">Fixture</section><img src="{image}" alt="Fixture"/><a href="https://example.com/contact">External contact is not followed</a></body></html>'
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode())


class HttpTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        cls.addClassCleanup(cls.server.server_close)
        cls.addClassCleanup(cls.server.shutdown)
        threading.Thread(target=cls.server.serve_forever, kwargs={"poll_interval": .05}, daemon=True).start()
        cls.url = f'http://127.0.0.1:{cls.server.server_port}'

    def test_served_document_and_image(self):
        self.assertEqual(inspect(self.url)["status"], "http_checks_passed")

    def test_missing_anchor_is_detected(self):
        self.assertEqual(inspect(self.url + '/missing-anchor')["missingFragments"], ["missing"])

    def test_noindex_is_checked(self):
        self.assertFalse(inspect(self.url + '/without-noindex')["checks"]["noindex"])

    def test_duplicate_heading_is_detected(self):
        self.assertFalse(inspect(self.url + '/duplicate-heading')["checks"]["one_h1"])

    def test_broken_asset_fails(self):
        self.assertFalse(inspect(self.url + '/missing-image')["checks"]["served_images"])

    def test_credentials_and_nonlocal_plain_http_rejected(self):
        for url in ['http://user:password@localhost/', 'http://example.com/', 'file:///etc/passwd']:
            with self.assertRaises(ValueError):
                inspect(url)


if __name__ == '__main__':
    unittest.main()
