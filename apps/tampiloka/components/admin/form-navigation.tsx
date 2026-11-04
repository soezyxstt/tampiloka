"use client";
import { useEffect, useState } from "react";
import type { FormSchema } from "@/lib/forms/schema";
import { FormSettings } from "./form-settings";
import { Responses } from "./responses";

export type FormTab = "questions" | "responses" | "settings";
const tabs: { key: FormTab; label: string }[] = [{ key: "questions", label: "Pertanyaan" }, { key: "responses", label: "Jawaban" }, { key: "settings", label: "Pengaturan" }];
function currentTab(): FormTab {
  const hash = window.location.hash.slice(1);
  return hash === "responses" || hash === "settings" ? hash : "questions";
}
export function useFormTab(): FormTab {
  const [tab, setTab] = useState<FormTab>("questions");
  useEffect(() => { const update = () => setTab(currentTab()); update(); window.addEventListener("hashchange", update); return () => window.removeEventListener("hashchange", update); }, []);
  return tab;
}
export function FormNavigation({ active }: { id: string; active: FormTab }) {
  return <nav className="form-navigation" aria-label="Navigasi formulir">{tabs.map(item => <a key={item.key} href={`#${item.key}`} aria-current={active === item.key ? "page" : undefined}>{item.label}</a>)}</nav>;
}
export function FormWorkspacePanels({ id, activeTab, draft, edit, slug, setSlug, savedSlug, saveSlug, disabled }: { id: string; activeTab: FormTab; draft: FormSchema; edit: (change: (next: FormSchema) => void) => void; slug: string; setSlug: (value: string) => void; savedSlug: string; saveSlug: () => void | Promise<void>; disabled?: boolean }) {
  const [visitedResponses, setVisitedResponses] = useState(false);
  if (activeTab === "responses" && !visitedResponses) setVisitedResponses(true);
  return <>
    {(activeTab === "responses" || visitedResponses) && <div className="form-editor__body" hidden={activeTab !== "responses"}><Responses id={id} /></div>}
    <div className="form-editor__body" hidden={activeTab !== "settings"}><fieldset disabled={disabled}><FormSettings draft={draft} edit={edit} slug={slug} setSlug={setSlug} savedSlug={savedSlug} saveSlug={saveSlug} /></fieldset></div>
  </>;
}
