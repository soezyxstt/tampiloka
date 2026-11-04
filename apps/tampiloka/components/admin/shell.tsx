"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminIconButton } from "./admin-ui";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, Home, LogOut, PanelLeft } from "lucide-react";
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const router = useRouter(); const [open, setOpen] = useState(false); const [collapsed, setCollapsed] = useState(false); const [error, setError] = useState("");
  async function signOut() { const toastId = toast.loading("Keluar..."); try { const r = await fetch("/api/auth/sign-out", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }); if (!r.ok) throw new Error(); toast.dismiss(toastId); router.replace("/admin/login"); router.refresh(); } catch { setError("Gagal keluar. Coba lagi."); toast.error("Gagal keluar. Coba lagi.", { id: toastId }); } }
  return <div className={`admin-shell min-h-screen md:grid ${collapsed ? "md:grid-cols-[5rem_1fr]" : "md:grid-cols-[15rem_1fr]"}`}>
    <aside className="admin-shell__sidebar border-b md:border-r md:border-b-0">
      <div className="flex items-center justify-between p-4">
        <Link href="/admin" aria-label="Tampiloka Admin" className={collapsed ? "md:hidden" : ""}><img src="/brand/logos/light/tampiloka-horizontal-light.svg" alt="Tampiloka" className="w-36" /></Link>
        <Button variant="ghost" className="md:hidden" aria-expanded={open} aria-controls="admin-nav" onClick={() => setOpen(!open)}>Menu</Button>
        <AdminIconButton variant="ghost" className="hidden md:inline-flex" label={collapsed ? "Perluas navigasi" : "Ringkas navigasi"} aria-expanded={!collapsed} aria-controls="admin-nav" onClick={() => setCollapsed(!collapsed)}><PanelLeft size={18} aria-hidden="true" /></AdminIconButton>
      </div>
      <nav id="admin-nav" aria-label="Navigasi admin" className={`${open ? "block" : "hidden"} space-y-1 px-4 pb-4 md:block`}>
        {[{ href: "/admin", label: "Ringkasan", Icon: Home, active: pathname === "/admin" }, { href: "/admin/forms", label: "Formulir", Icon: ClipboardList, active: pathname.startsWith("/admin/forms") }].map(({ href, label, Icon, active }) => <Link key={href} href={href} title={label} aria-label={label} aria-current={active ? "page" : undefined} className="admin-shell__link flex min-h-11 items-center gap-3 rounded-lg px-3 py-2"><Icon size={18} aria-hidden="true" /><span className={collapsed ? "md:hidden" : ""}>{label}</span></Link>)}
      </nav>
      <div className={`admin-shell__account ${open ? "" : "hidden md:block"}`}><Button variant="ghost" className="admin-shell__sign-out" onClick={signOut} aria-label="Keluar" title="Keluar"><LogOut size={18} aria-hidden="true" /><span className={collapsed ? "md:hidden" : ""}>Keluar</span></Button>{error && <p role="alert">{error}</p>}</div>
    </aside>
    <main id="main-content" className="admin-shell__main min-w-0 p-5 md:p-10">{children}</main>
  </div>;
}
