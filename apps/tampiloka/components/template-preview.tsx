"use client";

import { useState } from "react";
import { PanelsTopLeft } from "lucide-react";

export function TemplatePreview({ src }: { src: string }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  return <span className="template-preview">
    <PanelsTopLeft className="template-preview__fallback" size={48} strokeWidth={1} aria-hidden="true" />
    {failedSource !== src && (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" loading="lazy" width={1000} height={750} onError={() => setFailedSource(src)} />
    )}
  </span>;
}
