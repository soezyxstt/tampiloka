"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, Pause, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { TEMURA_DEMO_URL } from "@/lib/temura-url";

const projects = [
  {
    id: "pagi-roti",
    name: "Pagi & Roti",
    category: "Kuliner",
    description: "Konsep kedai roti dan kopi di Yogyakarta.",
    url: "https://demo-cafe-1.tampiloka.adihnursyam.com/",
    scrollStops: ["", "#cerita", "#nuansa", "#menu", "#suasana", "#lokasi"],
  },
  {
    id: "tepi-sagara",
    name: "Tepi Sagara",
    category: "Kuliner",
    description: "Konsep restoran pesisir di Labuan Bajo.",
    url: "https://demo-fnb-2.tampiloka.adihnursyam.com/",
    scrollStops: ["", "#suasana", "#menu", "#galeri", "#tentang", "#lokasi", "#kabar"],
  },
  {
    id: "sela-rasa",
    name: "Sela Rasa",
    category: "Kuliner",
    description: "Konsep restoran dan ruang berkumpul di Malang.",
    url: "https://demo-fnb-1.tampiloka.adihnursyam.com/",
    scrollStops: ["", "#menu", "#pilihan", "#acara", "#ruang-kumpul", "#tentang", "#lokasi"],
  },
  {
    id: "rona-forma",
    name: "Rona Forma",
    category: "Katalog",
    description: "Konsep katalog sepatu, tas, dan aksesori.",
    url: "https://demo-katalog-1.tampiloka.adihnursyam.com/",
    scrollStops: ["", "#editor-picks", "#everyday-edit", "#10003", "#10001", "#10005", "#top"],
  },
  {
    id: "temura-nara-aruna",
    name: "Nara & Aruna",
    category: "Undangan digital",
    description: "Konsep undangan pernikahan digital dari Temura.",
    url: TEMURA_DEMO_URL,
    scrollStops: [""],
  },
] as const;

type Project = (typeof projects)[number];
type Filter = "Semua" | Project["category"];
const filters: Filter[] = ["Semua", "Kuliner", "Katalog", "Undangan digital"];

function ProjectPreview({ project, paused }: { project: Project; paused: boolean }) {
  const [stopIndex, setStopIndex] = useState(0);
  const stopCount = project.scrollStops.length;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setStopIndex((current) => (current + 1) % stopCount);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [paused, stopCount]);

  return (
    <div className="showcase__site" aria-hidden="true">
      <iframe
        title={`Preview ${project.name}`}
        src={`${project.url}${project.scrollStops[stopIndex]}`}
        loading="lazy"
        tabIndex={-1}
      />
    </div>
  );
}

export default function ProjectShowcase({ page = false }: { page?: boolean }) {
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState<Filter>("Semua");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStart = useRef<number | null>(null);
  const dragDistance = useRef(0);
  const visibleProjects = filter === "Semua"
    ? projects
    : projects.filter((project) => project.category === filter);

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
    if (shouldClose) setActiveProject(null);
    else setDragOffset(0);
  };

  const cancelDrag = () => {
    dragStart.current = null;
    dragDistance.current = 0;
    setDragOffset(0);
  };

  const Heading = page ? "h1" : "h2";

  return (
    <section
      className={`project-showcase${page ? " project-showcase--page" : ""}`}
      id="produk"
      aria-labelledby="showcase-heading"
    >
      <div className="showcase__inner">
        <header className="showcase__header" data-reveal>
          <Heading className={`${page ? "type-display-xl" : "type-display"} showcase__heading`} id="showcase-heading">
            Karya pilihan.
          </Heading>
          <div className="showcase__controls">
            {page ? (
              <div className="showcase__filters" role="group" aria-label="Filter karya">
                {filters.map((item) => (
                  <Button
                    key={item}
                    className="showcase__filter"
                    variant={filter === item ? "secondary" : "ghost"}
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="type-body showcase__intro-copy">Empat situs dan satu undangan digital.</p>
            )}
            <Button
              className="showcase__motion-toggle"
              variant="ghost"
              type="button"
              aria-label={isPaused ? "Lanjutkan animasi preview" : "Jeda animasi preview"}
              aria-pressed={isPaused}
              onClick={() => setIsPaused((paused) => !paused)}
            >
              {isPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
              {isPaused ? "Putar" : "Jeda"}
            </Button>
          </div>
        </header>

        <p className="type-body-sm showcase__concept-disclosure">
          Situsnya dapat dijelajahi langsung; merek dan kontennya adalah konsep, bukan proyek klien.
        </p>

        <div className="showcase__grid" id="showcase-projects" aria-live={page ? "polite" : undefined}>
          {visibleProjects.map((project, index) => (
            <Card
              className={`showcase__project showcase__project--${project.id}`}
              key={project.id}
              data-reveal
              style={{ "--reveal-index": index } as CSSProperties}
            >
              <div className="showcase__preview-shell">
                <span className="showcase__screen" aria-hidden="true">
                  <ProjectPreview project={project} paused={isPaused || activeProject !== null} />
                </span>
                <button
                  className="showcase__open"
                  type="button"
                  aria-label={`Buka preview situs ${project.name}`}
                  aria-haspopup="dialog"
                  onClick={() => {
                    setDragOffset(0);
                    setActiveProject(project);
                  }}
                />
                <a
                  className="showcase__external"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buka situs demo ${project.name} di tab baru`}
                >
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <div className="showcase__project-meta">
                <h3 className="type-heading-4 showcase__project-name">{project.name}</h3>
                <p className="showcase__project-category">{project.category}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Sheet
        open={activeProject !== null}
        onOpenChange={(open: boolean) => {
          if (!open) setActiveProject(null);
        }}
      >
        <SheetContent
          className="showcase-sheet"
          style={{ "--showcase-sheet-drag": `${dragOffset}px` } as CSSProperties}
        >
          {activeProject && (
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
                  <SheetTitle className="type-heading-4 showcase-sheet__title">{activeProject.name}</SheetTitle>
                  <p className="type-caption showcase-sheet__category">{activeProject.category}</p>
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
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buka situs demo ${activeProject.name} di tab baru`}
                >
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <iframe
                  key={activeProject.id}
                  className="showcase-sheet__frame"
                  title={`Situs demo ${activeProject.name}`}
                  src={activeProject.url}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
