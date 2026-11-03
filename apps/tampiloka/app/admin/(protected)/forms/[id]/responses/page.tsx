import { Responses } from "@/components/admin/responses";
export default async function ResponsesPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <Responses id={id} />; }
