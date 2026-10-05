"use client";

import { Trash2 } from "lucide-react";
import { deleteInvitation } from "@/app/actions/invitation";
import { Button } from "@/components/ui/button";

export function DeleteInvitationButton({ id, title }: { id: string; title: string }) {
  async function handleDelete() {
    const confirmed = window.confirm(
      `Hapus undangan "${title}"? Tindakan ini tidak bisa dibatalkan.`,
    );
    if (!confirmed) return;
    await deleteInvitation(id);
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      onClick={handleDelete}
      className="text-stone-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      title="Hapus"
    >
      <Trash2 size={13} />
    </Button>
  );
}
