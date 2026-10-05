"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function WelcomeExample() {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button type="button" className="temura-inline-link type-label" onClick={() => dialog.current?.showModal()}>Contoh sambutan ↗</button>
    <dialog ref={dialog} className="temura-welcome-dialog" aria-labelledby="welcome-example-title">
      <h2 id="welcome-example-title" className="type-heading-3">Nara & Aruna</h2>
      <p className="type-body temura-muted">Dengan penuh sukacita, kami mengundang Bapak, Ibu, dan sahabat untuk hadir di hari pernikahan kami.</p>
      <Button variant="outline" size="sm" onClick={() => dialog.current?.close()}>Tutup</Button>
    </dialog>
  </>;
}
