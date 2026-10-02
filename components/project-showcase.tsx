"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const projects = [
  {
    id: "nayara",
    name: "Nayara",
    category: "Fashion",
    description: "Konsep website untuk label fashion kontemporer.",
  },
  {
    id: "sagara",
    name: "Sagara Coffee",
    category: "Kuliner",
    description: "Konsep website untuk brand kopi dan ruang seduh.",
  },
  {
    id: "arunika",
    name: "Arunika Goods",
    category: "Produk",
    description: "Konsep katalog untuk produk kulit buatan tangan.",
  },
] as const;

type Project = (typeof projects)[number];
type Filter = "Semua" | Project["category"];

function NayaraPreview() {
  return (
    <div className="showcase__site showcase__site--nayara" aria-hidden="true">
      <div className="showcase__site-nav showcase__site-nav--nayara">
        <span className="showcase__wordmark">nayara</span>
        <span>New arrivals</span><span>Collections</span>
        <span className="showcase__nav-end">Bag <b>02</b></span>
      </div>
      <div className="showcase__site-track showcase__site-track--nayara">
        <section className="showcase__scene showcase__scene--fashion showcase__scene--nayara">
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Nayara / 2026</p>
            <p className="showcase__scene-title">Busana<br />harian.</p>
            <span className="showcase__text-link">Lihat koleksi <ArrowUpRight /></span>
          </div>
          <div className="showcase__art showcase__art--nayara"><span>07 / 26</span></div>
          <span className="showcase__scene-note">Bahan linen</span>
        </section>
        <section className="showcase__scene showcase__scene--fashion showcase__scene--nayara-collection">
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Koleksi terbaru</p>
            <p className="showcase__scene-title">Koleksi<br />linen.</p>
            <span className="showcase__text-link">Lihat semua <ArrowUpRight /></span>
          </div>
          <div className="showcase__art showcase__art--nayara-collection"><span>Collection / 02</span></div>
          <span className="showcase__scene-note">Koleksi sehari-hari</span>
        </section>
        <section className="showcase__scene showcase__scene--fashion showcase__scene--nayara-story">
          <div className="showcase__art showcase__art--nayara-process"><span>In the studio</span></div>
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Di balik koleksi</p>
            <p className="showcase__scene-title">Bahan.<br />Potongan.</p>
            <span className="showcase__text-link">Lihat proses <ArrowUpRight /></span>
          </div>
        </section>
        <section className="showcase__scene showcase__scene--fashion showcase__scene--nayara" aria-hidden="true">
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Nayara / 2026</p>
            <p className="showcase__scene-title">Busana<br />harian.</p>
            <span className="showcase__text-link">Lihat koleksi <ArrowUpRight /></span>
          </div>
          <div className="showcase__art showcase__art--nayara"><span>07 / 26</span></div>
          <span className="showcase__scene-note">Bahan linen</span>
        </section>
      </div>
    </div>
  );
}

function SagaraPreview() {
  return (
    <div className="showcase__site showcase__site--sagara" aria-hidden="true">
      <div className="showcase__site-nav showcase__site-nav--sagara">
        <span className="showcase__wordmark">sagara<span> coffee</span></span>
        <span>Our coffee</span><span>Our story</span>
        <span className="showcase__nav-end">Belanja <ArrowUpRight /></span>
      </div>
      <div className="showcase__site-track showcase__site-track--sagara">
        <section className="showcase__scene showcase__scene--coffee showcase__scene--sagara">
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Sagara Coffee</p>
            <p className="showcase__scene-title">Kopi<br />lokal.</p>
            <span className="showcase__text-link">Belanja kopi <ArrowUpRight /></span>
          </div>
          <div className="showcase__art showcase__art--sagara" />
          <span className="showcase__scene-note">Biji kopi pilihan</span>
        </section>
        <section className="showcase__scene showcase__scene--coffee showcase__scene--sagara-menu">
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Pilihan kopi</p>
            <p className="showcase__scene-title">Arabika.<br />Robusta.</p>
            <span className="showcase__text-link">Lihat pilihan <ArrowUpRight /></span>
          </div>
          <div className="showcase__art showcase__art--sagara-selection"><span>Seasonal selection</span></div>
          <span className="showcase__scene-note">Dipanggang segar</span>
        </section>
        <section className="showcase__scene showcase__scene--coffee showcase__scene--sagara-story">
          <div className="showcase__art showcase__art--sagara-roasting"><span>Small batch / 01</span></div>
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Proses kami</p>
            <p className="showcase__scene-title">Proses<br />sangrai.</p>
            <span className="showcase__text-link">Lihat proses <ArrowUpRight /></span>
          </div>
        </section>
        <section className="showcase__scene showcase__scene--coffee showcase__scene--sagara" aria-hidden="true">
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Sagara Coffee</p>
            <p className="showcase__scene-title">Kopi<br />lokal.</p>
            <span className="showcase__text-link">Belanja kopi <ArrowUpRight /></span>
          </div>
          <div className="showcase__art showcase__art--sagara"><span>01 / Origin</span></div>
          <span className="showcase__scene-note">Biji kopi pilihan</span>
        </section>
      </div>
    </div>
  );
}

function ArunikaPreview() {
  return (
    <div className="showcase__site showcase__site--arunika" aria-hidden="true">
      <div className="showcase__site-nav showcase__site-nav--arunika">
        <span className="showcase__wordmark">ARUNIKA</span>
        <span>Objects</span><span>Made by hand</span>
        <span className="showcase__nav-end">IDR <b>⌄</b></span>
      </div>
      <div className="showcase__site-track showcase__site-track--arunika">
        <section className="showcase__scene showcase__scene--leather showcase__scene--arunika">
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Arunika Goods</p>
            <p className="showcase__scene-title">Produk kulit.<br />Buatan tangan.</p>
            <span className="showcase__text-link">Lihat produk <ArrowUpRight /></span>
          </div>
          <div className="showcase__art showcase__art--arunika"><span>01 / Daily carry</span></div>
          <span className="showcase__scene-note">Handmade leather goods</span>
        </section>
        <section className="showcase__scene showcase__scene--leather showcase__scene--arunika-collection">
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Koleksi terbaru</p>
            <p className="showcase__scene-title">Tas.<br />Dompet.</p>
            <span className="showcase__text-link">Lihat koleksi <ArrowUpRight /></span>
          </div>
          <div className="showcase__art showcase__art--arunika-collection"><span>Objects / 03</span></div>
          <span className="showcase__scene-note">Kulit asli</span>
        </section>
        <section className="showcase__scene showcase__scene--leather showcase__scene--arunika-story">
          <div className="showcase__art showcase__art--arunika-craft"><span>At the workbench</span></div>
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Proses kami</p>
            <p className="showcase__scene-title">Potong.<br />Jahit.</p>
            <span className="showcase__text-link">Lihat proses <ArrowUpRight /></span>
          </div>
        </section>
        <section className="showcase__scene showcase__scene--leather showcase__scene--arunika" aria-hidden="true">
          <div className="showcase__scene-copy">
            <p className="showcase__scene-label">Arunika Goods</p>
            <p className="showcase__scene-title">Produk kulit.<br />Buatan tangan.</p>
            <span className="showcase__text-link">Lihat produk <ArrowUpRight /></span>
          </div>
          <div className="showcase__art showcase__art--arunika"><span>01 / Daily carry</span></div>
          <span className="showcase__scene-note">Handmade leather goods</span>
        </section>
      </div>
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  if (project.id === "nayara") return <NayaraPreview />;
  if (project.id === "sagara") return <SagaraPreview />;
  return <ArunikaPreview />;
}

export default function ProjectShowcase({ page = false }: { page?: boolean }) {
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState<Filter>("Semua");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const filters: Filter[] = ["Semua", "Fashion", "Kuliner", "Produk"];
  const visibleProjects = filter === "Semua"
    ? projects
    : projects.filter((project) => project.category === filter);

  useEffect(() => {
    if (activeProject && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [activeProject]);

  const Heading = page ? "h1" : "h2";

  return (
    <section
      className={`project-showcase${page ? " project-showcase--page" : ""}`}
      id="produk"
      aria-labelledby="showcase-heading"
      data-motion={isPaused ? "paused" : "playing"}
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
              <p className="type-body showcase__intro-copy">Proyek konsep, bukan proyek klien.</p>
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

        {page && (
          <p className="type-body-sm showcase__concept-disclosure">
            Proyek konsep, bukan proyek klien.
          </p>
        )}

        <div className="showcase__grid" id="showcase-projects" aria-live={page ? "polite" : undefined}>
          {visibleProjects.map((project, index) => (
            <Card
              className={`showcase__project showcase__project--${project.id}`}
              key={project.id}
              data-reveal
              style={{ "--reveal-index": index } as CSSProperties}
            >
              <button
                className="showcase__open"
                type="button"
                aria-label={`Buka preview konsep ${project.name}`}
                aria-haspopup="dialog"
                onClick={() => setActiveProject(project)}
              >
                <span className="showcase__screen">
                  <ProjectPreview project={project} />
                </span>
              </button>
              <div className="showcase__project-meta">
                <h3 className="type-heading-4 showcase__project-name">{project.name}</h3>
                <p className="showcase__project-category">{project.category}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <dialog
        className="showcase__dialog"
        ref={dialogRef}
        aria-labelledby="showcase-dialog-title"
        aria-describedby="showcase-dialog-description"
        onClose={() => setActiveProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        {activeProject && (
          <div className="showcase__dialog-panel">
            <div className="showcase__dialog-header">
              <h2 className="type-heading-3" id="showcase-dialog-title">{activeProject.name}</h2>
              <Button className="showcase__dialog-close" variant="outline" type="button" onClick={() => dialogRef.current?.close()}>
                Tutup <span aria-hidden="true">×</span>
              </Button>
            </div>
            <div className="showcase__dialog-screen"><ProjectPreview project={activeProject} /></div>
            <p className="type-body-sm showcase__dialog-description" id="showcase-dialog-description">
              {activeProject.description} Preview ini merupakan konsep visual.
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}
