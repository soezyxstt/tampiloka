"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, Pause, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { PROJECTS, type Project } from "@/lib/projects";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { showcaseCopy } from "@/lib/showcase-copy";

const projects = PROJECTS;

type Filter = "all" | "food" | "portfolio" | "catalog" | "education" | "organization" | "invitation";
const filters: Filter[] = ["all", "food", "portfolio", "catalog", "education", "organization", "invitation"];
const projectFilter: Record<Project["category"], Exclude<Filter, "all">> = {
  Kuliner: "food",
  Portofolio: "portfolio",
  Katalog: "catalog",
  Edukasi: "education",
  Organisasi: "organization",
  "Undangan digital": "invitation",
};

function ProjectPreview({ project, paused, locale }: { project: Project; paused: boolean; locale: Locale }) {
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
        title={showcaseCopy[locale].previewSite(project.name)}
        src={`${project.url}${project.scrollStops[stopIndex]}`}
        loading="lazy"
        tabIndex={-1}
      />
    </div>
  );
}

export default function ProjectShowcase({ page = false, locale: requestedLocale }: { page?: boolean; locale?: Locale }) {
  const contextLocale = useLocale() as Locale;
  const locale = requestedLocale ?? contextLocale;
  const copy = showcaseCopy[locale];
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStart = useRef<number | null>(null);
  const dragDistance = useRef(0);
  const visibleProjects = filter === "all"
    ? projects
    : projects.filter((project) => projectFilter[project.category] === filter);

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
            {page ? copy.projectHeading : copy.featuredHeading}
          </Heading>
          <div className="showcase__controls">
            {page ? (
              <div className="showcase__filters" role="group" aria-label={copy.filterLabel}>
                {filters.map((item) => (
                  <Button
                    key={item}
                    className="showcase__filter"
                    variant={filter === item ? "secondary" : "ghost"}
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                  >
                    {copy.filters[item]}
                  </Button>
                ))}
              </div>
            ) : null}
            <Button
              className="showcase__motion-toggle"
              variant="ghost"
              type="button"
              aria-label={isPaused ? copy.resumePreview : copy.pausePreview}
              aria-pressed={isPaused}
              onClick={() => setIsPaused((paused) => !paused)}
            >
              {isPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
              {isPaused ? copy.play : copy.pause}
            </Button>
          </div>
        </header>

        <p className="type-body-sm showcase__concept-disclosure">
          {copy.conceptDisclosure}
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
                  <ProjectPreview project={project} paused={isPaused || activeProject !== null} locale={locale} />
                </span>
                <button
                  className="showcase__open"
                  type="button"
                  aria-label={copy.viewPreview(project.name)}
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
                  aria-label={copy.openSite(project.name)}
                >
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <div className="showcase__project-meta">
                <h3 className="type-heading-4 showcase__project-name">{project.name}</h3>
                <p className="showcase__project-category">{copy.categories[project.category]}</p>
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
                aria-label={copy.closeOrDrag}
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
                  <p className="type-caption showcase-sheet__category">{copy.categories[activeProject.category]}</p>
                </div>
                <SheetClose
                  aria-label={copy.closePreview}
                  render={<Button variant="ghost" size="icon" aria-label={copy.closePreview} />}
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
                  aria-label={copy.openSite(activeProject.name)}
                >
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <iframe
                  key={activeProject.id}
                  className="showcase-sheet__frame"
                  title={copy.site(activeProject.name)}
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
