"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowUpRight, CalendarDays, Check, Copy, Mail, Music2, Pause, X } from "lucide-react";
import type { PreviewAsset, PreviewDesign } from "@/lib/preview-designs";

const weddingTime = new Date("2027-12-12T08:00:00+07:00").getTime();
const calendar = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Temura//Preview//ID\r\nBEGIN:VEVENT\r\nUID:nara-aruna-preview@temura\r\nDTSTAMP:20261005T000000Z\r\nDTSTART:20271212T010000Z\r\nDTEND:20271212T070000Z\r\nSUMMARY:Pernikahan Nara dan Aruna (contoh)\r\nLOCATION:Bandung\\, Jawa Barat\r\nEND:VEVENT\r\nEND:VCALENDAR";

function Art({ asset, className = "", eager = false, sizes = "260px" }: { asset: PreviewAsset; className?: string; eager?: boolean; sizes?: string }) {
  return <picture className="ip-art"><source srcSet={asset.srcSet} sizes={sizes} /><Image unoptimized src={asset.url} width={asset.width} height={asset.height} alt="" aria-hidden="true" className={className} loading={eager ? "eager" : "lazy"} /></picture>;
}

function Names({ heading = false }: { heading?: boolean }) {
  const text = <><span>Nara</span><i>&</i><span>Aruna</span></>;
  return heading ? <h1 className="ip-names">{text}</h1> : <p className="ip-names" aria-hidden="true">{text}</p>;
}

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, weddingTime - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const seconds = remaining === null ? null : Math.floor(remaining / 1000);
  const values = seconds === null ? ["—", "—", "—", "—"] : [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
  return <dl className="ip-countdown" aria-label="Hitung mundur acara">{["Hari", "Jam", "Menit", "Detik"].map((label, index) => <div key={label}><dd>{values[index]}</dd><dt>{label}</dt></div>)}</dl>;
}

const photos = [
  "Pasangan dengan busana adat di kebun teh",
  "Berjalan bersama di kebun teh",
  "Pasangan berpelukan di hutan pinus",
  "Momen pasangan di tepi danau",
  "Potret pasangan dengan latar pegunungan",
  "Menari bersama saat matahari terbenam",
].map((alt, index) => ({
  src: `/images/prewed/prewed-${index + 1}-720.webp`,
  full: `/images/prewed/prewed-${index + 1}.webp`,
  alt,
  width: 720, height: 900,
}));
function Scene({ design, compact = false }: { design: PreviewDesign; compact?: boolean }) {
  return <div className={`ip-scene ${compact ? "ip-scene-compact" : ""}`} aria-hidden="true">
    <div className="ip-scene-halo"><Art asset={design.medallion} /></div>
    <div className="ip-scene-corner ip-scene-left"><Art asset={design.frame} /></div>
    <div className="ip-scene-corner ip-scene-right"><Art asset={design.frame} /></div>
    <div className="ip-scene-vine ip-scene-vine-left"><Art asset={design.flower} /></div>
    <div className="ip-scene-vine ip-scene-vine-right"><Art asset={design.flower} /></div>
  </div>;
}

type Wish = { name: string; attendance: string; guests: number; message: string };

export function InvitationPreview({ design }: { design: PreviewDesign }) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const articleRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const greetingRef = useRef<HTMLDialogElement>(null);
  const galleryRef = useRef<HTMLDialogElement>(null);
  const sundanese = design.theme === "sawala";

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio?.pause();
  }, []);

  useEffect(() => {
    if (!opened) return;
    if (!greetingRef.current?.open) greetingRef.current?.showModal();
    const article = articleRef.current;
    if (!article || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = article.querySelectorAll(".ip-reveal");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }, { threshold: 0.08 });
    article.classList.add("ip-motion-ready");
    nodes.forEach((node) => observer.observe(node));
    const scenes = Array.from(article.querySelectorAll<HTMLElement>(".ip-intro,.ip-couple,.ip-events,.ip-story,.ip-gallery,.ip-closing"));
    let frame = 0;
    const update = () => {
      frame = 0;
      for (const scene of scenes) {
        const rect = scene.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) continue;
        const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight));
        scene.style.setProperty("--drift", `${progress * 140}px`);
        scene.style.setProperty("--counter", `${progress * -90}px`);
        scene.style.setProperty("--turn", `${progress * 16}deg`);
        if (scene.classList.contains("ip-gallery")) {
          const galleryProgress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
          scene.style.setProperty("--gallery-shift", `${-galleryProgress * rect.width * (photos.length - 1) * .82}px`);
        }
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); article.classList.remove("ip-motion-ready"); };
  }, [opened]);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) audio.pause();
    else { try { await audio.play(); setAudioError(""); } catch { setAudioError("Musik belum dapat diputar."); } }
  }

  function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    if (!name) { (form.elements.namedItem("name") as HTMLInputElement).setCustomValidity("Isi nama terlebih dahulu."); form.reportValidity(); return; }
    setWishes((current) => [{ name, attendance, guests: attendance === "Hadir" ? Math.min(4, Math.max(1, Number(data.get("guests")) || 1)) : 0, message: String(data.get("message") ?? "").trim() }, ...current].slice(0, 20));
    setSubmitted(true);
    form.reset();
    setAttendance("Hadir");
  }

  async function copyAccount() {
    try { await navigator.clipboard.writeText("0000000000"); setCopied(true); setCopyError(""); }
    catch { setCopyError("Salin nomor rekening secara manual."); }
  }

  return (
    <div className={`invitation-preview ip-${design.theme} ${opened ? "ip-opened" : "ip-closed"}`}>
      <header className="ip-toolbar"><Link href="/desain"><ArrowLeft size={15} />Desain</Link><span>{design.name} <span className="ip-toolbar-separator">/</span> Preview</span><Link href={`/preview/${sundanese ? "minimalist-eunoia" : "adat-sunda"}`}>{sundanese ? "Eunoia" : "Sawala"}<ArrowUpRight size={14} /></Link></header>
      <main className="ip-shell">
        <aside className="ip-desktop" aria-label="Nara dan Aruna, 12 Desember 2027">
          <Art asset={design.background} className="ip-backdrop" eager sizes="(max-width: 800px) 480px, (max-width: 1000px) calc(100vw - 480px), calc(100vw - 540px)" />
          <div className="ip-desktop-copy"><span className="ip-small">Undangan pernikahan</span><Names /><span className="ip-desktop-date">12 . 12 . 2027</span></div>
          {!sundanese && <Art asset={design.flower} className="ip-desktop-flower" eager />}
          <span className="ip-desktop-note">Nara & Aruna · Bandung</span>
        </aside>
        <div className="ip-paper">
          {!opened ? (
            <section className="ip-cover">
              <Art asset={design.background} className="ip-backdrop" eager sizes="(max-width: 580px) 100vw, (max-width: 800px) 580px, 540px" />
              <Scene design={design} /><div className="ip-cover-content"><span className="ip-small">Undangan pernikahan</span><Names heading /><p className="ip-date">Minggu, 12 Desember 2027</p>
                {!sundanese && <Art asset={design.flower} className="ip-cover-flower" eager />}
                <div className="ip-guest"><span>Kepada</span><p>Tamu undangan</p></div>
                <button className="ip-button" type="button" onClick={() => setOpened(true)}><Mail size={16} />Buka undangan<ArrowUpRight size={16} /></button>
              </div>
            </section>
          ) : (
            <article ref={articleRef} className="ip-content">
              <section className="ip-intro" id="mempelai">
                {sundanese ? <Scene design={design} /> : <Image unoptimized className="ip-editorial-hero" src="/images/prewed/prewed-5.webp" alt="Nara dan Aruna dengan latar pegunungan" width={1122} height={1402} />}
                <div className="ip-opening-curtain ip-curtain-left" aria-hidden="true" /><div className="ip-opening-curtain ip-curtain-right" aria-hidden="true" />
                <div className="ip-intro-copy"><span className="ip-small">12 . 12 . 2027</span>
                  <h1 ref={titleRef} tabIndex={-1} className="ip-intro-title">Nara<br /><em>& Aruna</em></h1>
                  <p>Kami mengundang Anda untuk merayakan awal perjalanan kami.</p>
                  <button type="button" className="ip-text-button" onClick={() => greetingRef.current?.showModal()}>Salam pembuka <ArrowUpRight size={14} /></button>
                </div>
                {sundanese && <figure className="ip-couple-photo"><Image unoptimized src="/images/prewed/prewed-1-720.webp" alt="Nara dan Aruna di kebun teh" width={720} height={900} /><figcaption>12 Desember 2027 · Bandung</figcaption></figure>}
                <a className="ip-scroll-hint" href="#pasangan" aria-label="Lihat mempelai"><ArrowDown size={18} /></a>
              </section>
              <section className="ip-couple ip-section ip-reveal" id="pasangan">
                <Scene design={design} compact /><span className="ip-small">Mempelai</span>
                <div className="ip-person">{!sundanese && <Image unoptimized className="ip-person-photo" src="/images/prewed/prewed-2-720.webp" alt="Nara dan Aruna berjalan di kebun teh" width={720} height={900} />}<h2>Nara Pradipta</h2><p>Putra dari<br />Bapak Aditya & Ibu Laras</p></div>
                <span className="ip-couple-and" aria-hidden="true">&</span>
                <div className="ip-person">{!sundanese && <Image unoptimized className="ip-person-photo" src="/images/prewed/prewed-3-720.webp" alt="Nara dan Aruna di hutan pinus" width={720} height={900} />}<h2>Aruna Kirana</h2><p>Putri dari<br />Bapak Baskara & Ibu Ratih</p></div>
                <Art asset={design.flower} className="ip-couple-art" />
              </section>
              <section className="ip-events ip-section ip-reveal" id="acara"><Scene design={design} compact />
                <h2>12 <i>/</i> 12 <i>/</i> 27</h2><p>Minggu, 12 Desember 2027</p><Countdown />
                <a className="ip-text-button" href={`data:text/calendar;charset=utf-8,${encodeURIComponent(calendar)}`} download="nara-aruna.ics"><CalendarDays size={16} />Tambahkan ke kalender</a>
                <div className="ip-event-list"><div><span>01</span><h3>Akad nikah</h3><p>08.00 – 10.00 WIB</p></div><div><span>02</span><h3>Resepsi</h3><p>11.00 – 14.00 WIB</p></div></div>
                <div className="ip-location"><span className="ip-small">Lokasi acara</span><h3>Bandung</h3><p>Jawa Barat, Indonesia</p><iframe className="ip-map" title="Peta lokasi acara di Bandung" src="https://maps.google.com/maps?q=Bandung%2C%20Jawa%20Barat&z=14&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a className="ip-button ip-button-outline" href="https://www.google.com/maps/search/?api=1&query=Bandung%2C%20Jawa%20Barat" target="_blank" rel="noopener noreferrer">Buka peta<ArrowUpRight size={16} /></a></div>
                <Art asset={design.detail} className="ip-event-art" />
              </section>
              <section className="ip-story ip-section ip-reveal">{!sundanese && <Image unoptimized className="ip-story-photo" src="/images/prewed/prewed-4-720.webp" alt="Nara dan Aruna di tepi danau" width={720} height={900} />}<h2>Cerita kami</h2><ol><li><span>2022</span><p>Berkenalan lewat teman, lalu menemukan banyak hal kecil yang sama.</p></li><li><span>2025</span><p>Memilih berjalan bersama, dalam hari yang ramai maupun sederhana.</p></li><li><span>2027</span><p>Kini, kami siap memulai bab berikutnya.</p></li></ol></section>
              <section className="ip-gallery" id="galeri">{sundanese ? <>
                <div className="ip-gallery-stage"><h2>Galeri</h2>
                  <div className="ip-gallery-track">{photos.map((photo, index) => <button key={photo.src} type="button" className={`ip-gallery-shot ip-shot-${index}`} aria-label={`Buka foto ${index + 1}: ${photo.alt}`} onClick={() => { setSelectedPhoto(index); galleryRef.current?.showModal(); }}><Image unoptimized src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width:600px) 80vw, 430px" quality={85} /><span>0{index + 1}</span></button>)}</div>
                  <Art asset={design.flower} className="ip-gallery-flower" />
                </div>
                </> : <div className="ip-editorial-gallery"><h2>Galeri</h2>{photos.map((photo,index) => <button type="button" key={photo.src} className={`ip-editorial-shot ip-reveal ip-editorial-shot-${index}`} aria-label={`Buka foto ${index + 1}: ${photo.alt}`} onClick={() => { setSelectedPhoto(index); galleryRef.current?.showModal(); }}><Image unoptimized src={photo.src} alt={photo.alt} width={720} height={900} /><span>0{index + 1}</span></button>)}</div>}
              </section>
              <section className="ip-section ip-rsvp ip-reveal" id="ucapan"><h2>Kehadiran & ucapan</h2><form onSubmit={submitRsvp}><label htmlFor="guest-name">Nama</label><input id="guest-name" name="name" required maxLength={60} autoComplete="name" placeholder="Nama Anda" onInput={(e) => e.currentTarget.setCustomValidity("")} /><label htmlFor="attendance">Kehadiran</label><select id="attendance" name="attendance" value={attendance} onChange={(e) => setAttendance(e.target.value)}><option>Hadir</option><option>Belum pasti</option><option>Tidak hadir</option></select><label htmlFor="guests">Jumlah tamu</label><select id="guests" name="guests" disabled={attendance !== "Hadir"}><option value="1">1 orang</option><option value="2">2 orang</option><option value="3">3 orang</option><option value="4">4 orang</option></select><label htmlFor="message">Ucapan</label><textarea id="message" name="message" maxLength={300} rows={3} placeholder="Tuliskan doa atau ucapan" /><button type="submit" className="ip-button">Kirim<ArrowUpRight size={16} /></button><p role="status" className="ip-form-status">{submitted ? "Terima kasih atas konfirmasi Anda." : ""}</p></form>
                <div className="ip-wishes" aria-live="polite">{wishes.length === 0 ? <p className="ip-empty">Belum ada ucapan.</p> : wishes.map((wish, index) => <div key={`${wish.name}-${index}`}><strong>{wish.name}</strong><span>{wish.attendance}{wish.guests > 0 ? ` · ${wish.guests} orang` : ""}</span>{wish.message && <p>{wish.message}</p>}</div>)}</div>
              </section>
              <section className="ip-gift ip-section ip-reveal"><h2>Hadiah</h2><p>Kehadiran dan doa Anda adalah hadiah terbaik bagi kami.</p><details><summary>Lihat pilihan hadiah<ArrowDown size={15} /></summary><div className="ip-gift-content"><p>Contoh rekening · bukan tujuan transfer</p><strong>0000000000</strong><span>Nara & Aruna</span><button className="ip-text-button" type="button" onClick={copyAccount}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Tersalin" : "Salin nomor"}</button>{copyError && <p role="status">{copyError}</p>}<Image src="/images/qris-placeholder.svg" alt="Contoh QRIS, bukan kode pembayaran" width={200} height={200} unoptimized /><span>Contoh tampilan QRIS</span></div></details></section>
              <footer className="ip-closing ip-section ip-reveal"><Art asset={design.divider} className="ip-closing-art" /><p>Terima kasih sudah menjadi<br />bagian dari hari bahagia kami.</p><Names /><span className="ip-small">12 . 12 . 2027</span><Link href="/desain" className="ip-made-by">Temura <ArrowUpRight size={12} /></Link></footer>
            </article>
          )}
          {opened && <nav className="ip-nav" aria-label="Bagian undangan"><a href="#mempelai">Mempelai</a><a href="#acara">Acara</a><a href="#galeri">Galeri</a><a href="#ucapan">Ucapan</a><button type="button" onClick={toggleMusic} aria-label={playing ? "Jeda musik" : "Putar musik"} aria-pressed={playing}>{playing ? <Pause size={18} /> : <Music2 size={18} />}</button>{audioError && <span role="status" className="ip-audio-error">{audioError}</span>}</nav>}
        </div>
      </main>
      <audio ref={audioRef} src="/audio/akad.mp3" preload="none" loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <dialog ref={greetingRef} className="ip-dialog ip-greeting-dialog" onClose={() => titleRef.current?.focus({ preventScroll: true })} aria-labelledby="greeting-title"><button className="ip-dialog-close" aria-label="Tutup salam" onClick={() => greetingRef.current?.close()}><X size={18} /></button><Art asset={design.divider} className="ip-greeting-art" /><p className="ip-greeting-monogram" aria-hidden="true">N & A</p><h2 id="greeting-title">Assalamu’alaikum</h2><p>Dengan restu keluarga, kami mengundang Anda untuk hadir di pernikahan Nara dan Aruna. Semoga hari ini menjadi awal yang baik bagi perjalanan kami.</p><button className="ip-button" onClick={() => greetingRef.current?.close()}>Lanjutkan<ArrowUpRight size={16} /></button></dialog>
      <dialog ref={galleryRef} className="ip-dialog ip-photo-dialog" aria-label="Galeri foto"><button className="ip-dialog-close" aria-label="Tutup galeri" onClick={() => galleryRef.current?.close()}><X size={18} /></button><Image unoptimized src={photos[selectedPhoto].full} alt={photos[selectedPhoto].alt} width={photos[selectedPhoto].width} height={photos[selectedPhoto].height} sizes="90vw" quality={85} /><div className="ip-gallery-controls"><button type="button" onClick={() => setSelectedPhoto((selectedPhoto + photos.length - 1) % photos.length)}>Sebelumnya</button><span>{selectedPhoto + 1} / {photos.length}</span><button type="button" onClick={() => setSelectedPhoto((selectedPhoto + 1) % photos.length)}>Berikutnya</button></div></dialog>
    </div>
  );
}
