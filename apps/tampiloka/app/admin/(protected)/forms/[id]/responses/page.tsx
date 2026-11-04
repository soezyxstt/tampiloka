import { redirect } from "next/navigation";
export default async function ResponsesPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; redirect(`/admin/forms/${encodeURIComponent(id)}/edit#responses`); }
