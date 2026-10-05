import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/logout-button";
import { LayoutDashboard, ScrollText, MessageCircle, ScanLine } from "lucide-react";

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-stone-700 transition hover:bg-sage-green/15 hover:text-stone-900"
    >
      <Icon size={14} className="shrink-0 text-stone-500" />
      {children}
    </Link>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const label = session?.user?.name ?? session?.user?.username ?? "Admin";

  return (
    <div className="temura-admin flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <aside className="flex shrink-0 flex-col border-b border-border bg-white md:w-56 md:border-b-0 md:border-r">
        <div className="border-b border-muted-gold/35 px-4 py-4">
          <Link href="/" aria-label="Temura beranda"><Image src="/brand/logos/light/temura-horizontal-light.svg" alt="Temura" width={160} height={40} /></Link>
          <p className="mt-1 truncate text-sm font-semibold text-stone-900">{label}</p>
        </div>
        <nav className="flex flex-1 flex-wrap gap-1 p-3 md:flex-col">
          <NavLink href="/admin" icon={LayoutDashboard}>
            Ringkasan
          </NavLink>
          <NavLink href="/admin/invitations" icon={ScrollText}>
            Undangan
          </NavLink>
          <NavLink href="/admin/rsvps" icon={MessageCircle}>
            RSVP Tamu
          </NavLink>
          <NavLink href="/admin/check-in" icon={ScanLine}>
            Check-in Scanner
          </NavLink>
        </nav>
        <div className="border-t border-muted-gold/35 p-3">
          <LogoutButton />
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-6">{children}</main>
    </div>
  );
}
