import Link from "next/link";

export function FormNavigation({ id, active }: { id: string; active: "questions" | "responses" | "settings" }) {
  const base = `/admin/forms/${encodeURIComponent(id)}`;
  return <nav className="form-navigation" aria-label="Navigasi formulir">
    {([{ key: "questions", label: "Pertanyaan", href: `${base}/edit` }, { key: "responses", label: "Jawaban", href: `${base}/responses` }, { key: "settings", label: "Pengaturan", href: `${base}/settings` }] as const).map(item =>
      <Link key={item.key} href={item.href} aria-current={active === item.key ? "page" : undefined}>{item.label}</Link>
    )}
  </nav>;
}
