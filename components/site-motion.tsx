"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const entryKey = "tampiloka-page-entry";
const revealSelector =
  ".site-header .header-brand, .site-header .header-desktop-nav a, .site-header .header-menu-trigger, main h1, main h2, main h3, main p, main article, main figure, main li, main button, main a, main summary, .studio-footer h2, .studio-footer h3, .studio-footer p, .studio-footer a";

function shouldShowLoader() {
  const token = String(window.performance.timeOrigin);

  try {
    const previousToken = window.sessionStorage.getItem(entryKey);
    window.sessionStorage.setItem(entryKey, token);
    return previousToken !== token;
  } catch {
    return true;
  }
}

function LogoLoader() {
  return (
    <div className="site-loader" role="status" aria-label="Memuat Tampiloka">
      <svg
        className="site-loader__symbol"
        viewBox="0 0 111 105"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tampiloka-loader-gradient" x1="0" y1="52.5" x2="110.25" y2="52.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22C55E" />
            <stop offset="1" stopColor="#15803D" />
          </linearGradient>
        </defs>
        <path
          d="M23.1 0H103.95C108.15 0 110.25 2.1 110.25 6.3V12.6C110.25 26.25 98.7 34.65 80.85 34.65H7.35C2.45 34.65 0 32.2 0 27.3V23.1C0 10.5 10.5 0 23.1 0ZM46.2 44.1H58.8C74.55 44.1 87.15 55.65 87.15 71.4V99.75C87.15 103.25 85.4 105 81.9 105H77.7C59.85 105 46.2 91.35 46.2 74.55V44.1Z"
          pathLength="1"
          fill="url(#tampiloka-loader-gradient)"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function SiteMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [showLoader, setShowLoader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const container = root.current;
    if (!container) return;

    const selector = `[data-reveal], ${revealSelector}`;
    const targets = Array.from(container.querySelectorAll<HTMLElement>(selector));
    const siblingIndexes = new Map<HTMLElement, number>();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("MutationObserver" in window)) {
      targets.forEach((target) => target.dataset.revealed = "true");
      return;
    }

    container.dataset.motionReady = "true";

    const observed = new WeakSet<HTMLElement>();
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                (entry.target as HTMLElement).dataset.revealed = "true";
                observer?.unobserve(entry.target);
              }
            }
          },
          { threshold: 0.12, rootMargin: "0px" },
        )
      : null;

    const register = (target: HTMLElement) => {
      if (
        observed.has(target) ||
        (!target.hasAttribute("data-reveal") &&
          target.closest('[aria-hidden="true"]'))
      ) {
        return;
      }

      observed.add(target);
      target.dataset.reveal = "";
      const group = target.parentElement;
      if (group) {
        const index = siblingIndexes.get(group) ?? 0;
        target.style.setProperty("--reveal-delay", `${(index % 6) * 80}ms`);
        siblingIndexes.set(group, index + 1);
      }

      if (observer) observer.observe(target);
      else target.dataset.revealed = "true";
    };

    const scan = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches(selector)) register(node);
      node.querySelectorAll<HTMLElement>(selector).forEach(register);
    };

    targets.forEach(register);
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "attributes") register(record.target as HTMLElement);
        else record.addedNodes.forEach(scan);
      }
    });
    mutations.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-reveal"],
    });

    return () => {
      observer?.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!showLoader) return;
    const timer = window.setTimeout(() => setShowLoader(false), 1500);
    return () => window.clearTimeout(timer);
  }, [showLoader]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const shouldAnimate = shouldShowLoader();
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (shouldAnimate && !reducedMotion) setShowLoader(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="site-motion" ref={root}>
        {children}
      </div>
      {showLoader && <LogoLoader />}
    </>
  );
}

