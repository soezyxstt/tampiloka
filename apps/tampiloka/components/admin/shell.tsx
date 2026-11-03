"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, Home, LogOut, PanelLeft } from "lucide-react";
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const router = useRouter(); const [open, setOpen] = useState(false); const [collapsed, setCollapsed] = useState(false); const [error, setError] = useState("");
  async function signOut() { try { const r = await fetch("/api/auth/sign-out", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }); if (!r.ok) throw new Error(); router.replace("/admin/login"); router.refresh(); } catch { setError("Gagal keluar. Coba lagi."); } }
  return <div className={`min-h-screen md:grid ${collapsed ? "md:grid-cols-[5rem_1fr]" : "md:grid-cols-[14rem_1fr]"}`}>
    <aside className="border-b md:min-h-screen md:border-r md:border-b-0">
      <div className="flex items-center justify-between p-4">
        <Link href="/admin" className={`type-heading-5 ${collapsed ? "md:hidden" : ""}`}>Tampiloka Admin</Link>
        <Button variant="ghost" className="md:hidden" aria-expanded={open} aria-controls="admin-nav" onClick={() => setOpen(!open)}>Menu</Button>
        <Button variant="ghost" className="hidden md:inline-flex" aria-label={collapsed ? "Perluas navigasi" : "Ringkas navigasi"} aria-expanded={!collapsed} aria-controls="admin-nav" onClick={() => setCollapsed(!collapsed)}><PanelLeft size={18} aria-hidden="true" /></Button>
      </div>
      <nav id="admin-nav" aria-label="Navigasi admin" className={`${open ? "block" : "hidden"} space-y-1 px-4 pb-4 md:block`}>
        {[{ href: "/admin", label: "Ringkasan", Icon: Home, active: pathname === "/admin" }, { href: "/admin/forms", label: "Formulir", Icon: ClipboardList, active: pathname.startsWith("/admin/forms") }].map(({ href, label, Icon, active }) => <Link key={href} href={href} title={label} aria-label={label} aria-current={active ? "page" : undefined} className="flex min-h-11 items-center gap-3 rounded px-3 py-2 hover:bg-muted focus-visible:outline-2 aria-[current=page]:bg-muted"><Icon size={18} aria-hidden="true" /><span className={collapsed ? "md:hidden" : ""}>{label}</span></Link>)}
        <Button variant="outline" onClick={signOut} aria-label="Keluar" title="Keluar"><LogOut size={18} aria-hidden="true" /><span className={collapsed ? "md:hidden" : ""}>Keluar</span></Button>
        {error && <p role="alert">{error}</p>}
      </nav>
    </aside>
    <main id="main-content" className="min-w-0 p-5 md:p-10">{children}</main>
  </div>;
}
