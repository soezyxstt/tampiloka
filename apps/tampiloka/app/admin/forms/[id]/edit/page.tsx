import { FormEditor } from "@/components/admin/form-editor";

export default async function EditFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FormEditor id={id} />;
}
