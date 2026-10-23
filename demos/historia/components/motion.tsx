"use client";

import { animate, inView } from "motion/react";
import { useEffect, type ReactNode } from "react";

/** Explicit targets keep catalogue controls, results and the embedded map still. */
export function ScrollReveals() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("#main");
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-reveal]"))
      .filter(target => !target.parentElement?.closest("[data-scroll-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    const stops: (() => void)[] = [];
    const siblings = new Map<Element, number>();

    const show = (target: HTMLElement) => {
      animations.get(target)?.stop();
      animations.delete(target);
      target.style.opacity = "1";
      target.style.transform = "none";
      target.dataset.scrollRevealState = "revealed";
    };
    const showAll = () => targets.forEach(show);
    const onMotionChange = () => { if (reduced.matches) showAll(); };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-scroll-reveal]");
      if (target && root.contains(target)) show(target);
    };

    for (const target of targets) {
      const bounds = target.getBoundingClientRect();
      const group = target.parentElement ?? root;
      const index = siblings.get(group) ?? 0;
      siblings.set(group, index + 1);
      // Progressive enhancement: never hide SSR/no-JS or the first viewport.
      if (reduced.matches || !("IntersectionObserver" in window) ||
        (bounds.top < window.innerHeight && bounds.bottom > 0) || target.contains(document.activeElement)) {
        show(target);
        continue;
      }
      target.dataset.scrollRevealState = "waiting";
      target.style.opacity = "0";
      target.style.transform = "translateY(32px)";
      stops.push(inView(target, () => {
        if (reduced.matches || target.dataset.scrollRevealState !== "waiting") return;
        target.dataset.scrollRevealState = "animating";
        animations.set(target, animate(target, { opacity: [0, 1], y: [32, 0] }, {
          duration: 0.75, delay: (index % 6) * 0.08, ease: [0.19, 1, 0.22, 1],
          onComplete: () => { target.dataset.scrollRevealState = "revealed"; animations.delete(target); },
        }));
      }, { amount: 0.12 }));
    }
    reduced.addEventListener("change", onMotionChange);
    root.addEventListener("focusin", onFocus);
    return () => {
      stops.forEach(stop => stop());
      animations.forEach(animation => animation.stop());
      reduced.removeEventListener("change", onMotionChange);
      root.removeEventListener("focusin", onFocus);
      targets.forEach(target => {
        target.style.removeProperty("opacity");
        target.style.removeProperty("transform");
        delete target.dataset.scrollRevealState;
      });
    };
  }, []);
  return null;
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className} data-scroll-reveal="">{children}</div>;
}
