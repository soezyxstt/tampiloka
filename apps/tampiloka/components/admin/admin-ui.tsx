"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Tooltip } from "@base-ui/react/tooltip";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";

type ConfirmOptions = { title: string; description?: string; confirmLabel?: string; destructive?: boolean };
type Confirm = (options: ConfirmOptions) => Promise<boolean>;
const ConfirmContext = createContext<Confirm | null>(null);

export function AdminConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolve = useRef<((value: boolean) => void) | null>(null);
  const finish = useCallback((value: boolean) => {
    resolve.current?.(value);
    resolve.current = null;
    setOptions(null);
  }, []);
  const confirm = useCallback<Confirm>((next) => new Promise((done) => {
    resolve.current?.(false);
    resolve.current = done;
    setOptions(next);
  }), []);
  useEffect(() => () => { resolve.current?.(false); resolve.current = null; }, []);

  return <ConfirmContext.Provider value={confirm}>
    <Tooltip.Provider>{children}</Tooltip.Provider>
    <Toaster richColors position="bottom-right" />
    <Dialog.Root open={options !== null} onOpenChange={(open) => { if (!open) finish(false); }}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/40" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 text-[#172b20] shadow-xl outline-none">
          <Dialog.Title className="type-heading-4">{options?.title}</Dialog.Title>
          {options?.description && <Dialog.Description className="mt-3 text-sm leading-relaxed text-[#64736a]">{options.description}</Dialog.Description>}
          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => finish(false)}>Batal</Button>
            <Button type="button" variant={options?.destructive ? "destructive" : "brand"} onClick={() => finish(true)}>{options?.confirmLabel ?? "Lanjutkan"}</Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  </ConfirmContext.Provider>;
}

export function useAdminConfirm() {
  const confirm = useContext(ConfirmContext);
  if (!confirm) throw new Error("useAdminConfirm requires AdminConfirmProvider");
  return confirm;
}

export function AdminIconButton({ label, children, className = "", variant = "ghost", ...props }: ComponentProps<typeof Button> & { label: string }) {
  return <Tooltip.Root>
    <Tooltip.Trigger render={<Button type="button" size="icon" {...props} variant={variant} aria-label={label} className={`min-h-11 min-w-11 p-0 ${className}`} />}>{children}</Tooltip.Trigger>
    <Tooltip.Portal><Tooltip.Positioner sideOffset={6}><Tooltip.Popup className="z-[110] rounded-md bg-[#172b20] px-2 py-1 text-xs text-white shadow-md">{label}</Tooltip.Popup></Tooltip.Positioner></Tooltip.Portal>
  </Tooltip.Root>;
}

export function AdminSkeleton({ variant }: { variant: "list" | "editor" | "responses" | "settings" | "new" }) {
  const bar = "animate-pulse rounded-md bg-[#dfe7e1] motion-reduce:animate-none";
  return <div className={`admin-page space-y-6 ${variant === "editor" ? "max-w-4xl" : ""}`} role="status" aria-label="Memuat halaman">
    <div className={`${bar} h-4 w-36`} />
    <div className="flex items-center justify-between gap-4"><div className={`${bar} h-9 w-52 max-w-[60%]`} /><div className={`${bar} h-11 w-28`} /></div>
    {variant === "list" ? <><div className={`${bar} h-11 max-w-xl`} /><div className="admin-form-list overflow-hidden">{[0, 1, 2, 3].map((i) => <div className="admin-form-row" key={i}><div className="w-full space-y-3"><div className={`${bar} h-5 w-52 max-w-full`} /><div className={`${bar} h-3 w-36`} /></div><div className={`${bar} h-10 w-24 shrink-0`} /></div>)}</div></> :
      variant === "responses" ? <><div className={`${bar} h-12 w-full`} /><div className="admin-surface space-y-5">{[0, 1, 2].map((i) => <div className={`${bar} h-12 w-full`} key={i} />)}</div></> :
      variant === "editor" ? <><div className={`${bar} h-12 w-full`} /><div className="admin-surface space-y-5"><div className={`${bar} h-8 w-2/3`} /><div className={`${bar} h-4 w-full`} /></div>{[0, 1].map((i) => <div className="admin-surface space-y-5" key={i}><div className={`${bar} h-6 w-1/2`} /><div className={`${bar} h-10 w-full`} /><div className={`${bar} h-4 w-1/3`} /></div>)}</> :
      <div className="admin-surface space-y-6">{[0, 1, 2].map((i) => <div className="space-y-3" key={i}><div className={`${bar} h-4 w-40`} /><div className={`${bar} ${variant === "new" && i === 1 ? "h-24" : "h-11"} w-full`} /></div>)}</div>}
  </div>;
}
