"use client";

import { SiteMotion as SharedSiteMotion } from "@tampiloka/brand-system/motion";
import type { ReactNode } from "react";

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
  return (
    <SharedSiteMotion storageKey="tampiloka-page-entry" loader={<LogoLoader />}>
      {children}
    </SharedSiteMotion>
  );
}

export { SiteMotion };
