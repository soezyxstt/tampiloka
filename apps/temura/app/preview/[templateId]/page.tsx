import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PREVIEW_DESIGNS } from "@/lib/preview-designs";
import { findStarterPreview, STARTER_PREVIEWS } from "@/lib/starter-previews";
import { InvitationPreview } from "@/components/invitation/catalog-previews/invitation-preview";

export function generateStaticParams() {
  return [
    ...PREVIEW_DESIGNS.map(({ id }) => ({ templateId: id })),
    ...STARTER_PREVIEWS.map(({ id }) => ({ templateId: id })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ templateId: string }> }): Promise<Metadata> {
  const { templateId } = await params;
  const design = PREVIEW_DESIGNS.find((item) => item.id === templateId);
  const starter = findStarterPreview(templateId);
  const name = design?.name ?? starter?.name;
  return {
    title: name ? `${name} — Nara & Aruna` : "Desain tidak ditemukan",
    robots: { index: false, follow: false },
    ...(name ? { alternates: { canonical: `/preview/${encodeURIComponent(templateId)}` } } : {}),
  };
}

export default async function PreviewPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;
  const design = PREVIEW_DESIGNS.find((item) => item.id === templateId);
  if (design) return <InvitationPreview key={design.id} design={design} />;

  const starter = findStarterPreview(templateId);
  if (!starter) notFound();
  const { Component } = await starter.load();
  return <Component key={starter.id} />;
}
