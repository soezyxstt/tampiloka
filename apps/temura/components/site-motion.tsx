"use client";

import { SiteMotion as SharedSiteMotion } from "@tampiloka/brand-system/motion";
import BrandLoaderSymbol from "./brand-loader-symbol";
import type { ReactNode } from "react";

function LogoLoader() {
  return (
    <div className="site-loader" role="status" aria-label="Memuat Temura">
      <BrandLoaderSymbol />
    </div>
  );
}

export default function SiteMotion({ children }: { children: ReactNode }) {
  return (
    <SharedSiteMotion loader={<LogoLoader />}>
      {children}
    </SharedSiteMotion>
  );
}

export { SiteMotion };
