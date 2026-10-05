"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Music2,
  Pause,
  X,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { getRuntimeAsset } from "./runtime-assets";
import "./preview-kit.css";

type InvitationFrameProps = {
  templateId: string;
  name: string;
  className?: string;
  cover: ReactNode;
  opening?: ReactNode;
  children: ReactNode;
};

type PhotoInfo = {
  index: number;
  thumbnail: string;
  full: string;
  alt: string;
};

const photos: readonly PhotoInfo[] = [
  {
    index: 1,
    thumbnail: "/images/prewed/prewed-1-720.webp",
    full: "/images/prewed/prewed-1.webp",
    alt: "Nara dan Aruna mengenakan busana adat di kebun teh",
  },
  {
    index: 2,
    thumbnail: "/images/prewed/prewed-2-720.webp",
    full: "/images/prewed/prewed-2.webp",
    alt: "Nara dan Aruna berjalan bersama di kebun teh",
  },
  {
    index: 3,
    thumbnail: "/images/prewed/prewed-3-720.webp",
    full: "/images/prewed/prewed-3.webp",
    alt: "Potret Nara dan Aruna di hutan pinus",
  },
  {
    index: 4,
    thumbnail: "/images/prewed/prewed-4-720.webp",
    full: "/images/prewed/prewed-4.webp",
    alt: "Nara dan Aruna di tepi danau",
  },
  {
    index: 5,
    thumbnail: "/images/prewed/prewed-5-720.webp",
    full: "/images/prewed/prewed-5.webp",
    alt: "Potret Nara dan Aruna dengan latar pegunungan",
  },
  {
    index: 6,
    thumbnail: "/images/prewed/prewed-6-720.webp",
    full: "/images/prewed/prewed-6.webp",
    alt: "Nara dan Aruna menari bersama saat matahari terbenam",
  },
];

type InvitationContextValue = {
  templateId: string;
  opened: boolean;
  open: () => void;
  openPhoto: (index: number) => void;
};

const InvitationContext = createContext<InvitationContextValue | null>(null);

function useInvitation(): InvitationContextValue {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error("Invitation preview controls must be inside InvitationFrame.");
  }
  return context;
}

function photoAt(index: number): PhotoInfo {
  if (!Number.isInteger(index) || index < 1 || index > photos.length) {
    throw new RangeError(`Photo index must be between 1 and ${photos.length}.`);
  }
  return photos[index - 1];
}

function sceneNumber(value: string | undefined, fallback: number, min: number, max: number): number {
  if (value === undefined || value.trim() === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(min, Math.min(max, parsed)) : fallback;
}

export function InvitationFrame({
  templateId,
  name,
  className = "",
  cover,
  opening,
  children,
}: InvitationFrameProps) {
  const [opened, setOpened] = useState(false);
  const [greetingOpen, setGreetingOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState("");
  const greetingRef = useRef<HTMLDialogElement>(null);
  const galleryRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const open = useCallback(() => {
    setGreetingOpen(true);
    setOpened(true);
  }, []);
  const openPhoto = useCallback((index: number) => {
    photoAt(index);
    setSelectedPhoto(index);
    const dialog = galleryRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const context = useMemo(
    () => ({ templateId, opened, open, openPhoto }),
    [templateId, opened, open, openPhoto],
  );

  useEffect(() => {
    if (!opened) return;
    const dialog = greetingRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    setGreetingOpen(Boolean(dialog?.open));
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const content = contentRef.current;
    if (!content) return;

    const revealNodes = Array.from(content.querySelectorAll<HTMLElement>("[data-reveal]"));
    const scenes = Array.from(content.querySelectorAll<HTMLElement>("[data-scene]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewportScenes = new Set<HTMLElement>();
    let revealObserver: IntersectionObserver | null = null;
    let sceneObserver: IntersectionObserver | null = null;
    let frame = 0;
    let running = false;

    const updateScenes = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;
      for (const scene of viewportScenes) {
        const rect = scene.getBoundingClientRect();
        if (rect.bottom < -160 || rect.top > viewportHeight + 160) {
          viewportScenes.delete(scene);
          continue;
        }

        const centered = Math.max(
          -1,
          Math.min(1, (viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight),
        );
        const depth = sceneNumber(scene.dataset.sceneDepth, 1, -4, 4);
        const travel = sceneNumber(scene.dataset.sceneTravel, 140, 0, 1600);
        const rotation = sceneNumber(scene.dataset.sceneRotation, 7, -180, 180);
        const progress = Math.max(
          0,
          Math.min(1, (viewportHeight - rect.top) / (viewportHeight + Math.max(0, rect.height))),
        );

        scene.style.setProperty("--tk-progress", String(progress));
        scene.style.setProperty("--tk-drift", String(centered * travel * depth) + "px");
        scene.style.setProperty("--tk-counter", String(centered * travel * -0.65 * depth) + "px");
        scene.style.setProperty("--tk-turn", String(centered * rotation * depth) + "deg");
      }
    };

    const scheduleSceneUpdate = () => {
      if (!running || viewportScenes.size === 0 || frame) return;
      frame = window.requestAnimationFrame(updateScenes);
    };

    const reveal = (node: HTMLElement) => {
      node.setAttribute("data-revealed", "true");
      node.classList.add("is-visible");
    };

    const stopMotion = () => {
      if (!running) return;
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", scheduleSceneUpdate);
      window.removeEventListener("resize", scheduleSceneUpdate);
      revealObserver?.disconnect();
      sceneObserver?.disconnect();
      revealObserver = null;
      sceneObserver = null;
      viewportScenes.clear();
      content.classList.remove("tk-motion-ready");
      for (const scene of scenes) {
        scene.style.removeProperty("--tk-progress");
        scene.style.removeProperty("--tk-drift");
        scene.style.removeProperty("--tk-counter");
        scene.style.removeProperty("--tk-turn");
      }
    };

    const startMotion = () => {
      if (running || reducedMotion.matches) return;
      if (typeof IntersectionObserver === "undefined") {
        revealNodes.forEach(reveal);
        return;
      }

      running = true;
      content.classList.add("tk-motion-ready");
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            reveal(entry.target as HTMLElement);
            revealObserver?.unobserve(entry.target);
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
      );
      sceneObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const scene = entry.target as HTMLElement;
            if (entry.isIntersecting) viewportScenes.add(scene);
            else viewportScenes.delete(scene);
          }
          scheduleSceneUpdate();
        },
        { rootMargin: "160px 0px 160px 0px" },
      );
      revealNodes.forEach((node) => revealObserver?.observe(node));
      scenes.forEach((scene) => sceneObserver?.observe(scene));
      window.addEventListener("scroll", scheduleSceneUpdate, { passive: true });
      window.addEventListener("resize", scheduleSceneUpdate, { passive: true });
    };

    const syncMotionPreference = () => {
      if (reducedMotion.matches) stopMotion();
      else startMotion();
    };

    syncMotionPreference();
    reducedMotion.addEventListener("change", syncMotionPreference);
    return () => {
      reducedMotion.removeEventListener("change", syncMotionPreference);
      stopMotion();
    };
  }, [opened]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    [],
  );

  function closeGreeting() {
    greetingRef.current?.close();
    contentRef.current?.focus({ preventScroll: true });
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
      setAudioError("");
    } catch {
      setAudioError("Musik belum dapat diputar.");
    }
  }

  const safeTemplateId = templateId.replace(/[^a-zA-Z0-9_-]/g, "");
  const frameClassName = [
    "tk-frame",
    `tk-template-${safeTemplateId}`,
    opened ? "tk-opened" : "tk-closed",
    className,
  ].filter(Boolean).join(" ");
  const currentPhoto = selectedPhoto === null ? null : photoAt(selectedPhoto);

  return (
    <InvitationContext.Provider value={context}>
      <div
        className={frameClassName}
        data-template-id={templateId}
        data-greeting-open={greetingOpen ? "true" : "false"}
      >
        <header className="tk-toolbar">
          <Link className="tk-toolbar-back" href="/desain" aria-label="Kembali ke desain">
            <ArrowLeft aria-hidden="true" size={16} />
            <span>Desain</span>
          </Link>
          <span className="tk-toolbar-name">{name}</span>
          <span className="tk-toolbar-kind">Preview</span>
        </header>

        {!opened ? (
          <div className="tk-cover">{cover}</div>
        ) : (
          <main ref={contentRef} className="tk-content" tabIndex={-1}>
            {opening && <div className="tk-opening" aria-hidden="true">{opening}</div>}
            {children}
          </main>
        )}

        {opened && (
          <>
            <nav className="tk-controls" aria-label="Bagian undangan">
              <a href="#mempelai">Mempelai</a>
              <a href="#acara">Acara</a>
              <a href="#galeri">Galeri</a>
              <a href="#ucapan">Ucapan</a>
              <button
                className="tk-music-button"
                type="button"
                aria-label={playing ? "Jeda musik" : "Putar musik"}
                aria-pressed={playing}
                onClick={toggleMusic}
              >
                {playing ? <Pause aria-hidden="true" size={19} /> : <Music2 aria-hidden="true" size={19} />}
              </button>
              {audioError && <span className="tk-audio-error" role="status">{audioError}</span>}
            </nav>
            <audio
              ref={audioRef}
              src="/audio/akad.mp3"
              preload="none"
              loop
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setAudioError("Musik belum dapat diputar.")}
            />
          </>
        )}

        <dialog
          ref={greetingRef}
          className="tk-dialog tk-greeting-dialog"
          aria-labelledby="tk-greeting-title"
          onClose={() => {
            setGreetingOpen(false);
            contentRef.current?.focus({ preventScroll: true });
          }}
        >
          <button className="tk-dialog-close" type="button" aria-label="Tutup salam" onClick={closeGreeting}>
            <X aria-hidden="true" size={20} />
          </button>
          <p className="tk-greeting-kicker">Nara &amp; Aruna</p>
          <h2 id="tk-greeting-title">Salam hangat</h2>
          <p>Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir di hari pernikahan kami.</p>
          <button className="tk-greeting-continue" type="button" onClick={closeGreeting}>
            Lanjutkan
          </button>
        </dialog>

        <dialog
          ref={galleryRef}
          className="tk-dialog tk-photo-dialog"
          aria-label="Galeri foto Nara dan Aruna"
          onClick={(event) => {
            if (event.target === event.currentTarget) galleryRef.current?.close();
          }}
        >
          <button
            className="tk-dialog-close"
            type="button"
            aria-label="Tutup galeri"
            onClick={() => galleryRef.current?.close()}
          >
            <X aria-hidden="true" size={20} />
          </button>
          {currentPhoto && (
            <Image
              className="tk-photo-full"
              src={currentPhoto.full}
              alt={currentPhoto.alt}
              width={1122}
              height={1402}
              sizes="(max-width: 720px) 92vw, 720px"
              unoptimized
              priority
            />
          )}
          <div className="tk-photo-dialog-controls">
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={() => setSelectedPhoto((current) => ((current ?? 1) + photos.length - 2) % photos.length + 1)}
            >
              <ArrowLeft aria-hidden="true" size={18} />
              <span>Sebelumnya</span>
            </button>
            <span aria-live="polite">{selectedPhoto ?? 1} / {photos.length}</span>
            <button
              type="button"
              aria-label="Foto berikutnya"
              onClick={() => setSelectedPhoto((current) => ((current ?? 1) % photos.length) + 1)}
            >
              <span>Berikutnya</span>
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </div>
        </dialog>
      </div>
    </InvitationContext.Provider>
  );
}

export function OpenButton({
  className = "",
  children = "Buka undangan",
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { open } = useInvitation();
  return (
    <button className={["tk-open-button", className].filter(Boolean).join(" ")} type="button" onClick={open}>
      {children}
    </button>
  );
}

export function Decoration({
  id,
  className = "",
  eager = false,
}: {
  id: string;
  className?: string;
  eager?: boolean;
}) {
  const asset = getRuntimeAsset(id);
  return (
    <picture className="tk-decoration-picture">
      <source
        srcSet={`${asset.thumbnail.url} ${asset.thumbnail.width}w, ${asset.small.url} ${asset.small.width}w, ${asset.full.url} ${asset.full.width}w`}
        sizes="(max-width: 640px) 50vw, 384px"
      />
      <Image
        className={["tk-decoration", className].filter(Boolean).join(" ")}
        src={asset.full.url}
        alt=""
        aria-hidden="true"
        width={asset.full.width}
        height={asset.full.height}
        unoptimized
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </picture>
  );
}

export function Photo({
  index,
  className = "",
  alt,
  full = false,
}: {
  index: number;
  className?: string;
  alt?: string;
  full?: boolean;
}) {
  const photo = photoAt(index);
  return (
    <picture className="tk-photo-picture">
      {!full && (
        <source
          srcSet={`${photo.thumbnail} ${720}w, ${photo.full} 1122w`}
          sizes="(max-width: 600px) 84vw, (max-width: 1100px) 48vw, 560px"
        />
      )}
      <Image
        className={["tk-photo", className].filter(Boolean).join(" ")}
        src={full ? photo.full : photo.thumbnail}
        alt={alt ?? photo.alt}
        width={full ? 1122 : 720}
        height={full ? 1402 : 900}
        sizes={full ? "(max-width: 720px) 92vw, 720px" : "(max-width: 600px) 84vw, (max-width: 1100px) 48vw, 560px"}
        unoptimized
        loading={full ? "eager" : "lazy"}
      />
    </picture>
  );
}

export function PhotoButton({
  index,
  className = "",
}: {
  index: number;
  className?: string;
}) {
  const { openPhoto } = useInvitation();
  const photo = photoAt(index);
  return (
    <button
      className={["tk-photo-button", className].filter(Boolean).join(" ")}
      type="button"
      aria-label={`Buka foto ${index}: ${photo.alt}`}
      onClick={() => openPhoto(index)}
    >
      <Photo index={index} />
    </button>
  );
}

const eventTime = new Date("2027-12-12T08:00:00+07:00").getTime();

export function Countdown({ className = "" }: { className?: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, eventTime - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const seconds = remaining === null ? null : Math.floor(remaining / 1000);
  const units = seconds === null
    ? ["—", "—", "—", "—"]
    : [
        String(Math.floor(seconds / 86400)),
        String(Math.floor(seconds / 3600) % 24).padStart(2, "0"),
        String(Math.floor(seconds / 60) % 60).padStart(2, "0"),
        String(seconds % 60).padStart(2, "0"),
      ];

  return (
    <dl className={["tk-countdown", className].filter(Boolean).join(" ")} aria-label="Hitung mundur akad">
      {["Hari", "Jam", "Menit", "Detik"].map((label, index) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{units[index]}</dd>
        </div>
      ))}
    </dl>
  );
}

export function EventMap({ className = "" }: { className?: string }) {
  const query = encodeURIComponent("Bandung, Jawa Barat, Indonesia");
  return (
    <div className={["tk-event-map", className].filter(Boolean).join(" ")}>
      <iframe
        title="Peta Bandung, Jawa Barat"
        src={`https://maps.google.com/maps?q=${query}&z=12&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer">
        Buka peta
      </a>
    </div>
  );
}

type Wish = {
  name: string;
  attendance: string;
  guests: number;
  message: string;
  createdAt: number;
};

function isWish(value: unknown): value is Wish {
  if (!value || typeof value !== "object") return false;
  const wish = value as Partial<Wish>;
  return typeof wish.name === "string" &&
    typeof wish.attendance === "string" &&
    typeof wish.guests === "number" &&
    typeof wish.message === "string" &&
    typeof wish.createdAt === "number";
}

export function Rsvp({ className = "" }: { className?: string }) {
  const { templateId } = useInvitation();
  const storageKey = `temura:preview-rsvp:${templateId}`;
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [attendance, setAttendance] = useState("Hadir");
  const [loaded, setLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) {
          const parsed: unknown = JSON.parse(stored);
          if (Array.isArray(parsed)) setWishes(parsed.filter(isWish).slice(0, 20));
        }
      } catch {
        // Keep the local preview usable when storage is unavailable or malformed.
      }
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(wishes.slice(0, 20)));
    } catch {
      // Submission remains in component state if browser storage is full/blocked.
    }
  }, [loaded, storageKey, wishes]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    if (!name) return;
    const nextWish: Wish = {
      name,
      attendance,
      guests: attendance === "Hadir" ? Math.min(4, Math.max(1, Number(data.get("guests")) || 1)) : 0,
      message: String(data.get("message") ?? "").trim(),
      createdAt: Date.now(),
    };
    setWishes((current) => [nextWish, ...current].slice(0, 20));
    setSubmitted(true);
    form.reset();
    setAttendance("Hadir");
  }

  return (
    <section className={["tk-rsvp", className].filter(Boolean).join(" ")}>
      <form onSubmit={submit}>
        <label htmlFor={`tk-rsvp-name-${templateId}`}>Nama</label>
        <input id={`tk-rsvp-name-${templateId}`} name="name" required maxLength={60} autoComplete="name" />

        <label htmlFor={`tk-rsvp-attendance-${templateId}`}>Kehadiran</label>
        <select
          id={`tk-rsvp-attendance-${templateId}`}
          name="attendance"
          value={attendance}
          onChange={(event) => setAttendance(event.currentTarget.value)}
        >
          <option>Hadir</option>
          <option>Belum pasti</option>
          <option>Tidak hadir</option>
        </select>

        <label htmlFor={`tk-rsvp-guests-${templateId}`}>Jumlah tamu</label>
        <select id={`tk-rsvp-guests-${templateId}`} name="guests" disabled={attendance !== "Hadir"}>
          {[1, 2, 3, 4].map((count) => <option key={count} value={count}>{count} orang</option>)}
        </select>

        <label htmlFor={`tk-rsvp-message-${templateId}`}>Ucapan</label>
        <textarea id={`tk-rsvp-message-${templateId}`} name="message" maxLength={300} rows={3} />

        <button className="tk-rsvp-submit" type="submit">Kirim</button>
        <p className="tk-rsvp-status" role="status" aria-live="polite">
          {submitted ? "Terima kasih atas konfirmasi Anda." : ""}
        </p>
      </form>

      <div className="tk-wishes" aria-live="polite">
        {wishes.length === 0 ? (
          <p>Belum ada ucapan.</p>
        ) : wishes.map((wish) => (
          <article key={`${wish.createdAt}-${wish.name}`}>
            <strong>{wish.name}</strong>
            <span>{wish.attendance}{wish.guests ? ` · ${wish.guests} orang` : ""}</span>
            {wish.message && <p>{wish.message}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

type GiftBankAccount = {
  bankName?: string | null;
  bankAccountNumber?: string | null;
  bankAccountName?: string | null;
};

export function Gift({
  className = "",
  bankAccounts = [],
  qrisUrl,
}: {
  className?: string;
  bankAccounts?: GiftBankAccount[];
  qrisUrl?: string | null;
}) {
  const accounts = bankAccounts.filter((account) => Boolean(account.bankAccountNumber?.trim()));
  const usableQrisUrl = qrisUrl?.trim() && !qrisUrl.includes("qris-placeholder") ? qrisUrl.trim() : null;

  return (
    <div className={["tk-gift", className].filter(Boolean).join(" ")}>
      <h2 className="tk-gift-title">Informasi hadiah</h2>
      {accounts.length === 0 && !usableQrisUrl ? (
        <p>Kehadiran dan doa Anda sudah sangat berarti. Informasi hadiah dapat diperoleh dari keluarga.</p>
      ) : (
        <div className="tk-gift-methods">
          {accounts.map((account, index) => (
            <div className="tk-gift-account" key={`${account.bankName ?? "bank"}-${account.bankAccountNumber}-${index}`}>
              <h3>Transfer bank</h3>
              <dl>
                {account.bankName && <div><dt>Bank</dt><dd>{account.bankName}</dd></div>}
                <div><dt>Nomor rekening</dt><dd>{account.bankAccountNumber}</dd></div>
                {account.bankAccountName && <div><dt>Atas nama</dt><dd>{account.bankAccountName}</dd></div>}
              </dl>
            </div>
          ))}
          {usableQrisUrl && (
            <div className="tk-gift-qris">
              <h3>QRIS</h3>
              <Image src={usableQrisUrl} alt="QRIS" width={200} height={200} unoptimized />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const escapeIcs = (text: string) => text
  .replace(/\\/g, "\\\\")
  .replace(/\n/g, "\\n")
  .replace(/,/g, "\\,")
  .replace(/;/g, "\\;");

const calendarContents = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Temura//Undangan//ID",
  "CALSCALE:GREGORIAN",
  "BEGIN:VEVENT",
  "UID:nara-aruna-20271212@temura.id",
  `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
  "DTSTART:20271212T010000Z",
  "DTEND:20271212T070000Z",
  `SUMMARY:${escapeIcs("Akad dan resepsi Nara & Aruna")}`,
  `LOCATION:${escapeIcs("Bandung, Jawa Barat")}`,
  `DESCRIPTION:${escapeIcs("Akad 08.00–10.00 WIB, resepsi 11.00–14.00 WIB")}`,
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

export function CalendarLink({ className = "" }: { className?: string }) {
  return (
    <a
      className={["tk-calendar-link", className].filter(Boolean).join(" ")}
      href={`data:text/calendar;charset=utf-8,${encodeURIComponent(calendarContents)}`}
      download="nara-aruna.ics"
    >
      <CalendarDays aria-hidden="true" size={17} />
      <span>Tambahkan ke kalender</span>
    </a>
  );
}
