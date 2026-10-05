import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function InvitationPage({
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}) {
  const { to } = await searchParams;
  const guestParam = to ? `?to=${encodeURIComponent(to)}` : "";
  redirect(`/preview/adat-sunda${guestParam}`);
}
