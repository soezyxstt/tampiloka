import { notFound } from "next/navigation";
import { FormRenderer } from "@/components/forms/form-renderer";
import { FormError, getPublicForm } from "@/lib/forms/service";

export const dynamic = "force-dynamic";
export default async function PublicFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getPublicForm(slug).catch((error: unknown) => {
    if (error instanceof FormError && error.status === 404) notFound();
    if (error instanceof FormError && error.status === 410) return null;
    throw error;
  });
  if (!result) return <main className="mx-auto max-w-2xl px-6 py-20"><h1 className="type-heading-2">Formulir sudah ditutup</h1><p className="mt-4">Formulir ini tidak lagi menerima jawaban.</p></main>;
  return <FormRenderer schema={result.revision.schema} slug={result.form.slug} revisionId={result.revision.id} />;
}
