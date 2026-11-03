import { FormSettings } from "@/components/admin/form-settings";
export default async function SettingsPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <FormSettings id={id} />; }
