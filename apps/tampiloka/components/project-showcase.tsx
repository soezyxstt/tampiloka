"use client";

import { MarketingCTA } from "@/components/marketing-cta";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, Pause, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { PROJECTS, type Project, type WorkKind } from "@/lib/projects";
import { useLocale } from "next-intl";
import { localePath, type Locale } from "@/i18n/routing";
import { showcaseCopy } from "@/lib/showcase-copy";
import Image from "next/image";

const projects = PROJECTS;

type Filter = "all" | WorkKind;
const filters: Filter[] = ["all", "portfolio", "prospect-demo", "concept"];
const featuredIds = ["zyx-academy", "syahril-mc", "ginalist", "pagi-roti", "rona-forma"];

// One owner for all embedded demos. Lazy loading alone does not stop an iframe's
// scripts after it leaves the viewport, so inactive frames must be unmounted.
function usePreviewScheduler(blocked: boolean, filter: Filter) {
  const grid = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const container = grid.current;
    if (!container) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const candidates = new Set<Element>();
    let idleTimer: number | undefined;

    const suspend = () => {
      window.clearTimeout(idleTimer);
      setActiveId(null);
    };
    const schedule = () => {
      suspend();
      setDocumentVisible(!document.hidden);
      if (blocked || document.hidden || motion.matches) return;
      // Do layout reads only once scrolling has settled, never per scroll event.
      idleTimer = window.setTimeout(() => {
        let bestId: string | null = null;
        let bestArea = 0;
        for (const candidate of candidates) {
          const rect = candidate.getBoundingClientRect();
          const height = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
          const width = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
          const area = height * width;
          if (area > bestArea) {
            bestArea = area;
            bestId = candidate.getAttribute("data-preview-id");
          }
        }
        setActiveId(bestId);
      }, 300);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) candidates.add(entry.target);
        else candidates.delete(entry.target);
      }
      schedule();
    });
    container.querySelectorAll("[data-preview-id]").forEach((target) => observer.observe(target));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", schedule);
    schedule();
    return () => {
      window.clearTimeout(idleTimer);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, [blocked, filter]);

  return { grid, activeId: blocked ? null : activeId, documentVisible };
}

function LiveProjectPreview({ project, locale }: { project: Project; locale: Locale }) {
  const [stopIndex, setStopIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const stopCount = project.scrollStops.length;

  useEffect(() => {
    if (stopCount < 2) return;

    const interval = window.setInterval(() => {
      setStopIndex((current) => (current + 1) % stopCount);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [stopCount]);

  return (
    <iframe
      title={showcaseCopy[locale].previewSite(project.name)}
      src={`${project.url}${project.scrollStops[stopIndex]}`}
      className={loaded ? "showcase__live showcase__live--loaded" : "showcase__live"}
      onLoad={() => setLoaded(true)}
      tabIndex={-1}
    />
  );
}

function ProjectPreview({ project, active, locale }: { project: Project; active: boolean; locale: Locale }) {
  return (
    <div className="showcase__site" data-preview-id={project.id} aria-hidden="true">
      <Image
        className="showcase__poster"
        src={`/images/projects/${project.id}.webp`}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {active && <LiveProjectPreview project={project} locale={locale} />}
    </div>
  );
}

export default function ProjectShowcase({ page = false, locale: requestedLocale }: { page?: boolean; locale?: Locale }) {
  const contextLocale = useLocale() as Locale;
  const locale = requestedLocale ?? contextLocale;
  const copy = showcaseCopy[locale];
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState<Filter>("portfolio");
  useEffect(() => {
    if (!page) return;
    const syncFilter = () => {
      const value = new URLSearchParams(window.location.search).get("kind");
      setFilter(filters.find((item) => item === value) ?? "portfolio");
    };
    syncFilter();
    window.addEventListener("popstate", syncFilter);
    return () => window.removeEventListener("popstate", syncFilter);
  }, [page]);

  const selectFilter = (item: Filter) => {
    const url = new URL(window.location.href);
    if (item === "portfolio") url.searchParams.delete("kind");
    else url.searchParams.set("kind", item);
    window.history.pushState(null, "", url);
    setFilter(item);
  };
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { grid, activeId, documentVisible } = usePreviewScheduler(isPaused || activeProject !== null, filter);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStart = useRef<number | null>(null);
  const dragDistance = useRef(0);
  const visibleProjects = page
    ? filters.slice(1).flatMap((kind) => projects.filter((project) => project.kind === kind && (filter === "all" || project.kind === filter)))
    : featuredIds.map((id) => projects.find((project) => project.id === id)!);

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
                    onClick={() => selectFilter(item)}
                  >
                    {copy.kinds[item]}
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

        <div ref={grid} className="showcase__grid" id="showcase-projects" aria-live={page ? "polite" : undefined}>
          {visibleProjects.map((project, index) => (
            <Card
              className={`showcase__project showcase__project--${project.id}`}
              key={project.id}
              data-reveal
              style={{ "--reveal-index": index } as CSSProperties}
            >
              <div className="showcase__preview-shell">
                <span className="showcase__screen" aria-hidden="true">
                  <ProjectPreview project={project} active={activeId === project.id} locale={locale} />
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
                  aria-label={project.kind === "portfolio" ? copy.openSite(project.name) : copy.openDemo(project.name)}
                >
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <div className="showcase__project-meta">
                <h3 className="type-heading-4 showcase__project-name">{project.name}</h3>
                <p className="type-body-sm showcase__project-category">{copy.kindDisclosure[project.kind]} / {copy.categories[project.category]}</p>
                <p className="type-body">{copy.projectDescriptions[project.id]}</p>
              </div>
            </Card>
          ))}
        </div>
        {!page && <div className="showcase__links" data-reveal>
          <MarketingCTA nativeButton={false} render={<a href={localePath(locale, "/produk")} />}>{copy.allWork}</MarketingCTA>
        </div>}
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
                  <p className="type-caption showcase-sheet__category">{copy.kindDisclosure[activeProject.kind]} / {copy.categories[activeProject.category]}</p>
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
                  aria-label={activeProject.kind === "portfolio" ? copy.openSite(activeProject.name) : copy.openDemo(activeProject.name)}
                >
                  <ArrowUpRight aria-hidden="true" />
                </a>
                {documentVisible && (
                  <iframe
                    key={activeProject.id}
                    className="showcase-sheet__frame"
                    title={copy.site(activeProject.name)}
                    src={activeProject.url}
                  />
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
