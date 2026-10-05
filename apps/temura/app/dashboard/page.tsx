import type { Metadata } from "next";
import { CustomerDashboard } from "@/components/customer-dashboard/customer-dashboard";
import "../dashboard.css";

export const metadata: Metadata = {
  title: "Dashboard demo",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <CustomerDashboard />;
}
