"use client";

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

function LayarCover() {
  return (
    <section className="lt-cover" aria-label="Undangan Nara dan Aruna">
      <Decoration id="bg-retro-layar-tancep" className="lt-cover-background" eager />
      <div className="lt-cover-shade" aria-hidden="true" />
      <div className="lt-cover-credit">
        <Photo index={1} className="lt-cover-photo" alt="Nara dan Aruna di kebun teh" />
        <h1><span>Nara</span><i>&amp;</i><span>Aruna</span></h1>
        <p>12 Desember 2027 <span aria-hidden="true">·</span> Bandung</p>
        <OpenButton className="lt-open">Buka undangan</OpenButton>
      </div>
      <div className="lt-cover-camera" data-scene data-scene-depth="-0.65" aria-hidden="true">
        <Decoration id="orn-retro-04" className="lt-camera-art" />
      </div>
    </section>
  );
}

export function LayarTancepPreview() {
  return (
    <InvitationFrame templateId="retro-layar-tancep" name="Layar Tancep" className="layar-tancep" cover={<LayarCover />}>
      <article className="lt-content">
        <section className="lt-opening" id="mempelai">
          <header className="lt-opening-heading" data-reveal>
            <h1>Nara <span>&amp;</span> Aruna</h1>
            <p>Minggu, 12 Desember 2027 <span aria-hidden="true">·</span> Bandung</p>
          </header>
          <figure className="lt-widescreen" data-reveal>
            <PhotoButton index={6} className="lt-wide-photo" />
          </figure>
          <div className="lt-portrait-pair">
            <figure className="lt-portrait-frame lt-portrait-left" data-reveal>
              <PhotoButton index={2} className="lt-portrait-photo" />
            </figure>
            <figure className="lt-portrait-frame lt-portrait-right" data-reveal>
              <PhotoButton index={4} className="lt-portrait-photo" />
            </figure>
          </div>
          <div className="lt-family-credits" data-reveal>
            <section>
              <h2>Nara Pradipta</h2>
              <p>Putra dari Bapak Aditya dan Ibu Laras</p>
            </section>
            <span aria-hidden="true">&amp;</span>
            <section>
              <h2>Aruna Kirana</h2>
              <p>Putri dari Bapak Baskara dan Ibu Ratih</p>
            </section>
          </div>
          <div className="lt-bloom lt-bloom-one" data-scene data-scene-depth="0.45" aria-hidden="true">
            <Decoration id="orn-shared-romance-01" className="lt-bloom-art" />
          </div>
        </section>

        <section className="lt-program" id="acara">
          <div className="lt-program-heading" data-reveal>
            <div>
              <p className="lt-event-date">Minggu, 12 Desember 2027</p>
              <h2>Acara</h2>
            </div>
            <Countdown className="lt-countdown" />
          </div>
          <ol className="lt-showtimes" data-reveal>
            <li><span>08.00–10.00 WIB</span><h3>Akad</h3></li>
            <li><span>11.00–14.00 WIB</span><h3>Resepsi</h3></li>
          </ol>
          <div className="lt-venue" data-reveal>
            <div className="lt-venue-copy">
              <h3>Bandung</h3>
              <p>Jawa Barat</p>
            </div>
            <EventMap className="lt-map" />
          </div>
          <div className="lt-ticket" data-reveal>
            <Decoration id="orn-retro-03" className="lt-ticket-art" />
            <CalendarLink className="lt-calendar" />
          </div>
          <div className="lt-program-reel" data-scene data-scene-depth="-0.8" aria-hidden="true">
            <Decoration id="orn-retro-04" className="lt-reel-art" />
          </div>
        </section>

        <section className="lt-story" data-reveal>
          <h2>Cerita kami</h2>
          <ol>
            <li><span>01</span><h3>Pertemuan</h3><p>Satu pertemuan membuka cerita baru.</p></li>
            <li><span>02</span><h3>Bersama</h3><p>Hari-hari sederhana menjadi kenangan berharga.</p></li>
            <li><span>03</span><h3>Hari ini</h3><p>Kami melangkah bersama dengan doa keluarga.</p></li>
          </ol>
          <div className="lt-story-flower" data-scene data-scene-depth="0.7" aria-hidden="true">
            <Decoration id="orn-shared-romance-02" className="lt-story-flower-art" />
          </div>
        </section>

        <section className="lt-gallery" id="galeri">
          <header data-reveal><h2>Galeri</h2></header>
          <div className="lt-film-strip">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <figure className={`lt-film-frame lt-film-frame-${index}`} key={index} data-reveal>
                <PhotoButton index={index} className="lt-film-photo" />
              </figure>
            ))}
          </div>
          <div className="lt-gallery-rose" data-scene data-scene-depth="-0.55" aria-hidden="true">
            <Decoration id="orn-shared-romance-05" className="lt-gallery-rose-art" />
          </div>
        </section>

        <section className="lt-response" id="ucapan">
          <div className="lt-response-heading" data-reveal>
            <p>Bandung <span aria-hidden="true">·</span> 12.12.2027</p>
            <h2>Ucapan</h2>
          </div>
          <Rsvp className="lt-rsvp" />
          <Gift className="lt-gift" />
        </section>

        <footer className="lt-closing" data-reveal>
          <div className="lt-closing-flower" data-scene data-scene-depth="0.55" aria-hidden="true">
            <Decoration id="orn-shared-romance-06" className="lt-closing-flower-art" />
          </div>
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <span>Bandung <i aria-hidden="true">·</i> 12 Desember 2027</span>
        </footer>
      </article>
    </InvitationFrame>
  );
}
