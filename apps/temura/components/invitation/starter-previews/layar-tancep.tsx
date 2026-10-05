"use client";

import { useState } from "react";
import {
  CalendarLink,
  Countdown,
  Decoration,
  EventMap,
  Gift,
  InvitationFrame,
  OpenButton,
  Photo,
  PhotoButton,
  Rsvp,
} from "./preview-kit";
import "./layar-tancep.css";

const filmPhotos = [1, 2, 3, 4, 5, 6] as const;

function LayarCover() {
  return (
    <section className="lt-cover" aria-labelledby="lt-cover-title">
      <Decoration id="bg-retro-layar-tancep" className="lt-cover-background" eager />
      <div className="lt-cover-shade" aria-hidden="true" />
      <div className="lt-cover-title">
        <p>Undangan pernikahan · Bandung</p>
        <h1 id="lt-cover-title">Nara <i aria-hidden="true">&amp;</i> Aruna</h1>
        <time dateTime="2027-12-12">12 Desember 2027</time>
      </div>
      <OpenButton className="lt-cover-open">Buka undangan</OpenButton>
    </section>
  );
}

function ProjectionGallery() {
  const [activePhoto, setActivePhoto] = useState(1);
  const previous = () => setActivePhoto((current) => current === 1 ? 6 : current - 1);
  const next = () => setActivePhoto((current) => current === 6 ? 1 : current + 1);

  return (
    <section className="lt-gallery" id="galeri" aria-labelledby="lt-gallery-title">
      <header className="lt-section-heading" data-reveal>
        <p>12 Desember 2027 · Bandung</p>
        <h2 id="lt-gallery-title">Galeri</h2>
      </header>
      <div className="lt-projection-layout">
        <div className="lt-projection">
          <div className="lt-projection-rim" aria-hidden="true" />
          <PhotoButton
            key={activePhoto}
            index={activePhoto}
            className="lt-projection-photo"
          />
        </div>
        <div className="lt-projection-choices">
          <div className="lt-projection-controls" aria-label="Kontrol proyeksi">
            <button type="button" onClick={previous} aria-label="Foto sebelumnya">←</button>
            <span aria-live="polite">{activePhoto} / {filmPhotos.length}</span>
            <button type="button" onClick={next} aria-label="Foto berikutnya">→</button>
          </div>
          <div className="lt-thumbnails" aria-label="Pilih foto proyeksi">
            {filmPhotos.map((photo) => (
              <button
                className="lt-thumbnail"
                type="button"
                key={photo}
                aria-label={"Tampilkan foto " + photo}
                aria-pressed={activePhoto === photo}
                onClick={() => setActivePhoto(photo)}
              >
                <Photo index={photo} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LayarTancepPreview() {
  return (
    <InvitationFrame
      templateId="retro-layar-tancep"
      name="Layar Tancep"
      className="lt-frame"
      cover={<LayarCover />}
    >
      <article className="lt-content">
        <section className="lt-intro" id="mempelai" aria-labelledby="lt-intro-title">
          <div className="lt-intro-credit" data-reveal>
            <p>Bandung · Minggu, 12 Desember 2027</p>
            <h1 id="lt-intro-title">Nara <i aria-hidden="true">&amp;</i> Aruna</h1>
          </div>
          <figure className="lt-intro-screen" data-reveal>
            <PhotoButton index={6} className="lt-intro-photo" />
          </figure>
          <p className="lt-intro-note">Kami mengundang Anda untuk hadir.</p>
        </section>

        <ProjectionGallery />

        <section className="lt-couple" aria-labelledby="lt-couple-title">
          <header className="lt-section-heading" data-reveal>
            <p>Mempelai</p>
            <h2 id="lt-couple-title">Nara &amp; Aruna</h2>
          </header>
          <figure className="lt-couple-screen" data-reveal>
            <PhotoButton index={2} className="lt-couple-photo" />
            <figcaption>
              <div><strong>Nara Pradipta</strong><span>Putra Bapak Aditya &amp; Ibu Laras</span></div>
              <i aria-hidden="true">&amp;</i>
              <div><strong>Aruna Kirana</strong><span>Putri Bapak Baskara &amp; Ibu Ratih</span></div>
            </figcaption>
          </figure>
        </section>

        <section className="lt-programme" id="acara" aria-labelledby="lt-programme-title">
          <div className="lt-ticket">
            <div className="lt-ticket-heading">
              <p>Bandung, Jawa Barat</p>
              <h2 id="lt-programme-title">Acara</h2>
              <time dateTime="2027-12-12">12 Desember 2027</time>
            </div>
            <Countdown className="lt-countdown" />
            <ol className="lt-schedule">
              <li><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time><strong>Akad nikah</strong></li>
              <li><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time><strong>Resepsi</strong></li>
            </ol>
            <div className="lt-map">
              <h3>Lokasi</h3>
              <EventMap />
              <CalendarLink />
            </div>
          </div>
        </section>

        <section className="lt-story" aria-labelledby="lt-story-title">
          <header className="lt-section-heading" data-reveal>
            <p>Bandung</p>
            <h2 id="lt-story-title">Cerita kami</h2>
          </header>
          <ol className="lt-credits">
            <li data-reveal><time dateTime="2022">2022</time><p>Kedua keluarga bertemu.</p></li>
            <li data-reveal><time dateTime="2025">2025</time><p>Kami memilih berjalan bersama.</p></li>
            <li data-reveal><time dateTime="2027">2027</time><p>Hari bahagia dimulai.</p></li>
          </ol>
        </section>

        <section className="lt-rsvp" id="ucapan" aria-labelledby="lt-rsvp-title">
          <header className="lt-section-heading" data-reveal>
            <p>12 Desember 2027</p>
            <h2 id="lt-rsvp-title">Kehadiran &amp; doa</h2>
          </header>
          <Rsvp className="lt-rsvp-form" />
        </section>

        <section className="lt-gift" aria-label="Hadiah"><Gift /></section>

        <footer className="lt-ending">
          <div className="lt-ending-frame" data-reveal>
            <p>Terima kasih telah hadir.</p>
            <strong>Nara <i aria-hidden="true">&amp;</i> Aruna</strong>
            <time dateTime="2027-12-12">12 Desember 2027 · Bandung</time>
          </div>
        </footer>
      </article>
    </InvitationFrame>
  );
}
