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
import "./sundown-letters.css";

function SundownCover() {
  return (
    <section className="sl-cover" aria-label="Undangan Nara dan Aruna">
      <Decoration id="bg-retro-sundown-letters" className="sl-cover-background" eager />
      <div className="sl-cover-wash" aria-hidden="true" />
      <div className="sl-envelope-art" data-scene data-scene-depth="0.45" aria-hidden="true">
        <Decoration id="orn-retro-05" className="sl-envelope-image" />
      </div>
      <div className="sl-cover-postcard">
        <Photo index={5} className="sl-cover-photo" alt="Nara dan Aruna di pegunungan Bandung" />
        <h1><span>Nara</span><i>&amp;</i><span>Aruna</span></h1>
        <p>12 Desember 2027 <span aria-hidden="true">·</span> Bandung</p>
      </div>
      <div className="sl-cover-flower" data-scene data-scene-depth="-0.7" aria-hidden="true">
        <Decoration id="orn-retro-06" className="sl-cover-flower-art" />
      </div>
      <OpenButton className="sl-open">Buka undangan</OpenButton>
    </section>
  );
}

export function SundownLettersPreview() {
  return (
    <InvitationFrame templateId="retro-sundown-letters" name="Sundown Letters" className="sundown-letters" cover={<SundownCover />}>
      <article className="sl-content">
        <section className="sl-mempelai" id="mempelai">
          <header className="sl-mempelai-heading" data-reveal>
            <h1>Nara <span>&amp;</span> Aruna</h1>
            <p>Minggu, 12 Desember 2027 <span aria-hidden="true">·</span> Bandung</p>
          </header>
          <article className="sl-postcard sl-postcard-first" data-reveal>
            <PhotoButton index={2} className="sl-postcard-photo" />
            <div className="sl-letter-block">
              <h2>Nara Pradipta</h2>
              <p>Putra dari Bapak Aditya dan Ibu Laras</p>
            </div>
          </article>
          <article className="sl-postcard sl-postcard-reverse" data-reveal>
            <div className="sl-letter-block">
              <h2>Aruna Kirana</h2>
              <p>Putri dari Bapak Baskara dan Ibu Ratih</p>
            </div>
            <PhotoButton index={4} className="sl-postcard-photo" />
          </article>
          <p className="sl-couple-note" data-reveal>Kami mengundang Anda untuk berbagi hari bahagia bersama.</p>
          <div className="sl-pressed-rose" data-scene data-scene-depth="-0.5" aria-hidden="true">
            <Decoration id="orn-shared-romance-04" className="sl-pressed-rose-art" />
          </div>
        </section>

        <section className="sl-itinerary" id="acara">
          <div className="sl-itinerary-heading" data-reveal>
            <div>
              <h2>Acara</h2>
              <time dateTime="2027-12-12">Minggu, 12 Desember 2027</time>
            </div>
            <div className="sl-date-stamp" aria-label="12 Desember 2027">
              <span>12</span><i aria-hidden="true">·</i><span>12</span><small>2027</small>
            </div>
          </div>
          <Countdown className="sl-countdown" />
          <ol className="sl-itinerary-rows" data-reveal>
            <li><span>08.00–10.00 WIB</span><h3>Akad</h3></li>
            <li><span>11.00–14.00 WIB</span><h3>Resepsi</h3></li>
          </ol>
          <div className="sl-address" data-reveal>
            <div><h3>Bandung</h3><p>Jawa Barat</p></div>
            <EventMap className="sl-map" />
          </div>
          <CalendarLink className="sl-calendar" />
          <div className="sl-seal-art" data-scene data-scene-depth="0.7" aria-hidden="true">
            <Decoration id="orn-retro-05" className="sl-seal-image" />
          </div>
        </section>

        <section className="sl-story" data-reveal>
          <div className="sl-story-title"><h2>Cerita kami</h2></div>
          <ol>
            <li><time dateTime="2021">2021</time><h3>Pertemuan</h3><p>Satu pertemuan membuka cerita baru.</p></li>
            <li><time dateTime="2024">2024</time><h3>Bersama</h3><p>Hari-hari sederhana menjadi kenangan berharga.</p></li>
            <li><time dateTime="2027-12-12">12 Des 2027</time><h3>Hari ini</h3><p>Dengan doa keluarga, kami melangkah bersama.</p></li>
          </ol>
          <div className="sl-story-botanical" data-scene data-scene-depth="-0.55" aria-hidden="true">
            <Decoration id="orn-shared-romance-06" className="sl-story-botanical-art" />
          </div>
        </section>

        <section className="sl-gallery" id="galeri">
          <header data-reveal><h2>Galeri</h2></header>
          <div className="sl-postcard-grid">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <figure className={`sl-gallery-postcard sl-gallery-postcard-${index}`} key={index} data-reveal>
                <PhotoButton index={index} className="sl-gallery-photo" />
              </figure>
            ))}
          </div>
          <div className="sl-gallery-paper" data-scene data-scene-depth="0.4" aria-hidden="true">
            <Decoration id="orn-shared-romance-05" className="sl-gallery-paper-art" />
          </div>
        </section>

        <section className="sl-response" id="ucapan">
          <div className="sl-response-heading" data-reveal>
            <p>12.12.2027 <span aria-hidden="true">·</span> Bandung</p>
            <h2>Ucapan</h2>
          </div>
          <Rsvp className="sl-rsvp" />
          <Gift className="sl-gift" />
        </section>

        <footer className="sl-closing" data-reveal>
          <div className="sl-closing-flower" data-scene data-scene-depth="-0.45" aria-hidden="true">
            <Decoration id="orn-retro-06" className="sl-closing-flower-art" />
          </div>
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <time dateTime="2027-12-12">12 Desember 2027 <span aria-hidden="true">·</span> Bandung</time>
        </footer>
      </article>
    </InvitationFrame>
  );
}
