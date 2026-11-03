import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/shell";
export default async function FormLayout({ children }: { children: React.ReactNode }) {
  if (!await getAdminSession()) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
