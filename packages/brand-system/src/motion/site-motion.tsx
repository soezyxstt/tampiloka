"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const revealSelector =
  "[data-reveal], .site-header .header-brand, .site-header .header-desktop-nav a, .site-header .header-menu-trigger, main h1, main h2, main h3, main p, main article, main figure, main li, main button, main a, main summary, .studio-footer h2, .studio-footer h3, .studio-footer p, .studio-footer a";

export interface SiteMotionProps {
  children: ReactNode;
  storageKey?: string;
  loader?: ReactNode;
  loaderDuration?: number;
}

export function SiteMotion({
  children,
  storageKey,
  loader,
  loaderDuration = 1500,
}: SiteMotionProps) {
  const root = useRef<HTMLDivElement>(null);
  const [showLoader, setShowLoader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const container = root.current;
    if (!container) return;

    const selector = revealSelector;
    const targets = Array.from(container.querySelectorAll(selector)).filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
    const siblingIndexes = new Map<HTMLElement, number>();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("MutationObserver" in window)) {
      targets.forEach((target) => (target.dataset.revealed = "true"));
      return;
    }

    container.dataset.motionReady = "true";

    const observed = new WeakSet<HTMLElement>();
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  (entry.target as HTMLElement).dataset.revealed = "true";
                  observer?.unobserve(entry.target);
                }
              }
            },
            { threshold: 0.12, rootMargin: "0px" }
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
      node.querySelectorAll(selector).forEach((el) => {
        if (el instanceof HTMLElement) register(el);
      });
    };

    targets.forEach((target) => register(target));
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
    if (!loader || !storageKey) return;
    const token = String(window.performance.timeOrigin);
    try {
      const prev = window.sessionStorage.getItem(storageKey);
      window.sessionStorage.setItem(storageKey, token);
      const shouldAnimate = prev !== token;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (shouldAnimate && !reduced) {
        setShowLoader(true);
      }
    } catch {
      // ignore
    }
  }, [storageKey, loader]);

  useEffect(() => {
    if (!showLoader) return;
    const timer = window.setTimeout(() => setShowLoader(false), loaderDuration);
    return () => window.clearTimeout(timer);
  }, [showLoader, loaderDuration]);

  return (
    <>
      <div className="site-motion" ref={root}>
        {children}
      </div>
      {showLoader && loader}
    </>
  );
}

export default SiteMotion;
