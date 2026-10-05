"use client"

import {
  Dialog,
  type DialogRootProps,
  type DialogTriggerProps,
  type DialogCloseProps,
  type DialogTitleProps,
  type DialogPopupProps,
} from "@base-ui/react/dialog"
import { cn } from "cn"

function Sheet(props: DialogRootProps) {
  return <Dialog.Root {...props} />
}

function SheetTrigger(props: DialogTriggerProps) {
  return <Dialog.Trigger {...props} />
}

function SheetClose(props: DialogCloseProps) {
  return <Dialog.Close {...props} />
}

function SheetTitle({ className, ...props }: DialogTitleProps) {
  return <Dialog.Title className={cn("sheet-title", className)} {...props} />
}

function SheetContent({ className, children, ...props }: DialogPopupProps) {
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
