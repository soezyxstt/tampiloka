"use client";

import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "../ui/sheet";

export interface ShowcaseItem {
  id: string;
  name: string;
  category: string;
  url: string;
  previewNode?: ReactNode;
}

export interface ShowcaseCardProps {
  item: ShowcaseItem;
  index?: number;
  onOpen?: (item: ShowcaseItem) => void;
  className?: string;
  children?: ReactNode;
}

export function ShowcaseCard({
  item,
  index = 0,
  onOpen,
  className = "",
  children,
}: ShowcaseCardProps) {
  return (
    <Card
      className={`showcase__project site-card ${className}`}
      data-reveal
      style={{ "--reveal-index": index } as CSSProperties}
    >
      <div className="showcase__preview-shell">
        <span className="showcase__screen" aria-hidden="true">
          {children ?? item.previewNode}
        </span>
        {onOpen && (
          <button
            className="showcase__open"
            type="button"
            aria-label={`Buka preview ${item.name}`}
            aria-haspopup="dialog"
            onClick={() => onOpen(item)}
          />
        )}
        <a
          className="showcase__external"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka demo ${item.name} di tab baru`}
        >
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="showcase__project-meta">
        <h3 className="type-heading-4 showcase__project-name">{item.name}</h3>
        <p className="showcase__project-category">{item.category}</p>
      </div>
    </Card>
  );
}

export interface ShowcaseSheetDrawerProps {
  item: ShowcaseItem | null;
  onClose: () => void;
  titlePrefix?: string;
}

export function ShowcaseSheetDrawer({
  item,
  onClose,
  titlePrefix = "Demo",
}: ShowcaseSheetDrawerProps) {
  const [dragOffset, setDragOffset] = useState(0);
  const dragStart = useRef<number | null>(null);
  const dragDistance = useRef(0);

  const startDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    dragStart.current = event.clientY;
    dragDistance.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragStart.current === null) return;
    dragDistance.current = Math.max(0, event.clientY - dragStart.current);
    setDragOffset(dragDistance.current);
  };

  const endDrag = () => {
    if (dragStart.current === null) return;
    const shouldClose = dragDistance.current > 80;
    dragStart.current = null;
    dragDistance.current = 0;
    if (shouldClose) onClose();
    else setDragOffset(0);
  };

  const cancelDrag = () => {
    dragStart.current = null;
    dragDistance.current = 0;
    setDragOffset(0);
  };

  return (
    <Sheet open={item !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        className="showcase-sheet"
        style={{ "--showcase-sheet-drag": `${dragOffset}px` } as CSSProperties}
      >
        {item && (
          <>
            <SheetClose
              className="showcase-sheet__handle"
              aria-label="Tutup preview atau tarik ke bawah untuk menutup"
              onPointerDown={startDrag}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={cancelDrag}
              render={<button type="button" className="showcase-sheet__handle" />}
            >
              <span aria-hidden="true" />
            </SheetClose>
            <header className="showcase-sheet__header">
              <div className="showcase-sheet__heading">
                <SheetTitle className="type-heading-4 showcase-sheet__title">{item.name}</SheetTitle>
                <p className="type-caption showcase-sheet__category">{item.category}</p>
              </div>
              <SheetClose
                aria-label="Tutup preview"
                render={<Button variant="ghost" size="icon" aria-label="Tutup preview" />}
              >
                <X aria-hidden="true" />
              </SheetClose>
            </header>
            <div className="showcase-sheet__viewport">
              <a
                className="showcase-sheet__external"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka demo ${item.name} di tab baru`}
              >
                <ArrowUpRight aria-hidden="true" />
              </a>
              <iframe
                key={item.id}
                className="showcase-sheet__frame"
                title={`${titlePrefix} ${item.name}`}
                src={item.url}
              />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
