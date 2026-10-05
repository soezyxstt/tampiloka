"use client"

import { Dialog } from "@base-ui/react/dialog"
import { cn } from "cn"
import type { ComponentProps } from "react"

function Sheet(props: ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root {...props} />
}

function SheetTrigger(props: ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger {...props} />
}

function SheetClose(props: ComponentProps<typeof Dialog.Close>) {
  return <Dialog.Close {...props} />
}

function SheetTitle({ className, ...props }: ComponentProps<typeof Dialog.Title>) {
  return <Dialog.Title className={cn("sheet-title", className)} {...props} />
}

function SheetContent({ className, children, ...props }: ComponentProps<typeof Dialog.Popup>) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="sheet-backdrop" />
      <Dialog.Popup data-slot="sheet-content" className={cn("sheet-content", className)} {...props}>
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  )
}

export { Sheet, SheetTrigger, SheetClose, SheetTitle, SheetContent }
