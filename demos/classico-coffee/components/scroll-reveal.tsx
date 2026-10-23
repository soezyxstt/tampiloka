"use client";

import { useEffect, useRef } from "react";
import { animate, type AnimationPlaybackControls } from "motion/react";

// Explicit groups preserve the storefront grid and avoid revealing both a parent
// and its children. Catalogue state transitions and map controls stay independent.
const targetsSelector = [
  ".cover h1", ".store-door", ".cover-visit",
  ".breakfast-caption", ".breakfast-art > img", ".breakfast-copy",
  ".section-heading", ".space-title", ".space-main", ".space-work", ".space-details",
  ".community-intro > h2", ".community-intro > img", ".community-intro > p",
  ".community-intro > .action", ".community-links > a",
  ".location-heading", ".location-info",
].join(", ");

export function useScrollReveal() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const targets = Array.from(container.querySelectorAll<HTMLElement>(targetsSelector));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map<HTMLElement, AnimationPlaybackControls>();
    let observer: IntersectionObserver | undefined;
    const delays = new Map<HTMLElement, number>();
    const groups = new Map<Element, number>();

    function show(target: HTMLElement) {
      animations.get(target)?.stop();
      animations.delete(target);
      target.dataset.revealState = "revealed";
      target.style.removeProperty("opacity");
      target.style.removeProperty("transform");
      observer?.unobserve(target);
    }

    function register() {
      observer?.disconnect();
      targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        // Preserve the first paint, hash-link destinations and keyboard focus.
        if (preference.matches || target.dataset.revealState === "revealed" ||
            (rect.bottom > 0 && rect.top < window.innerHeight) ||
            target.contains(document.activeElement) || !("IntersectionObserver" in window)) {
          show(target);
          return;
        }
        target.dataset.revealState = "pending";
        observer?.observe(target);
      });
    }

    targets.forEach(target => {
      target.dataset.scrollReveal = "";
      const parent = target.parentElement;
      const index = parent ? groups.get(parent) ?? 0 : 0;
      delays.set(target, (index % 6) * .08);
      if (parent) groups.set(parent, index + 1);
    });

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          if (target.dataset.revealState !== "pending") return;
          observer?.unobserve(target);
          if (preference.matches || target.contains(document.activeElement)) {
            show(target);
            return;
          }
          target.dataset.revealState = "revealed";
          animations.set(target, animate(target, { opacity: [0, 1], y: [32, 0] }, {
            duration: .75, ease: [.19, 1, .22, 1], delay: delays.get(target) ?? 0,
          }));
        });
      }, { threshold: .12 });
    }

    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-scroll-reveal]");
      if (target) show(target);
    };
    const preferenceChanged = () => register();
    container.addEventListener("focusin", focus);
    preference.addEventListener("change", preferenceChanged);
    register();
    return () => {
      observer?.disconnect();
      container.removeEventListener("focusin", focus);
      preference.removeEventListener("change", preferenceChanged);
      targets.forEach(show);
    };
  }, []);

  return root;
}
