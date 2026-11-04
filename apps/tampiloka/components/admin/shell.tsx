"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminIconButton } from "./admin-ui";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, Home, LogOut, Menu, PanelLeftClose, X } from "lucide-react";
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const router = useRouter(); const [open, setOpen] = useState(false); const [collapsed, setCollapsed] = useState(false); const [error, setError] = useState("");
  async function signOut() { const toastId = toast.loading("Keluar..."); try { const r = await fetch("/api/auth/sign-out", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }); if (!r.ok) throw new Error(); toast.dismiss(toastId); router.replace("/admin/login"); router.refresh(); } catch { setError("Gagal keluar. Coba lagi."); toast.error("Gagal keluar. Coba lagi.", { id: toastId }); } }
  return <div className="admin-shell min-h-screen" data-collapsed={collapsed} data-menu-open={open}>
    <aside className="admin-shell__sidebar">
      <div className="admin-shell__brand-row">
        <Link href="/admin" aria-label="Tampiloka Admin" className="admin-shell__brand">
          <img src="/brand/logos/light/tampiloka-horizontal-light.svg" alt="" className="admin-shell__wordmark" />
          <img src="/brand/logos/light/tampiloka-symbol-light.svg" alt="" className="admin-shell__symbol" />
        </Link>
        <AdminIconButton className="admin-shell__mobile-toggle" label={open ? "Tutup navigasi" : "Buka navigasi"} aria-expanded={open} aria-controls="admin-nav" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</AdminIconButton>
      </div>
      <div className="admin-shell__workspace">
        <span className="admin-shell__label type-caption">Ruang kerja</span>
        <AdminIconButton className="admin-shell__collapse" label={collapsed ? "Perluas navigasi" : "Ringkas navigasi"} aria-expanded={!collapsed} aria-controls="admin-nav" onClick={() => setCollapsed(!collapsed)}><PanelLeftClose size={18} aria-hidden="true" /></AdminIconButton>
      </div>
      <div className="admin-shell__menu" onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>(".admin-shell__mobile-toggle")?.focus(); } }}>
        <div className="admin-shell__menu-inner">
          <nav id="admin-nav" aria-label="Navigasi admin" className="admin-shell__nav">
            {[{ href: "/admin", label: "Ringkasan", Icon: Home, active: pathname === "/admin" }, { href: "/admin/forms", label: "Formulir", Icon: ClipboardList, active: pathname.startsWith("/admin/forms") }].map(({ href, label, Icon, active }) => <Link key={href} href={href} title={label} aria-label={label} aria-current={active ? "page" : undefined} className="admin-shell__link" onClick={() => setOpen(false)}><Icon size={20} aria-hidden="true" /><span className="admin-shell__label">{label}</span></Link>)}
          </nav>
          <div className="admin-shell__account"><Button variant="ghost" className="admin-shell__sign-out" onClick={signOut} aria-label="Keluar" title="Keluar"><LogOut size={20} aria-hidden="true" /><span className="admin-shell__label">Keluar</span></Button>{error && <p role="alert">{error}</p>}</div>
        </div>
      </div>
    </aside>
    <main id="main-content" className="admin-shell__main min-w-0 p-5 md:p-10">{children}</main>
  </div>;
}
