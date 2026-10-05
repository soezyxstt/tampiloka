"use client";

import "./kampung-ceria.css";
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

function KampungCeriaCover() {
  return (
    <section className="kc-cover" aria-label="Undangan Nara dan Aruna">
      <Decoration id="bg-game-upin-ipin" className="kc-cover__village" eager />
      <span className="kc-cover__haze" aria-hidden="true" />
      <Decoration id="orn-game-upin-ipin-06" className="kc-cover__house" eager />
      <Decoration id="orn-game-upin-ipin-01" className="kc-cover__friends" eager />
      <Decoration id="orn-game-upin-ipin-05" className="kc-cover__pennant" eager />
      <article className="kc-letter" data-reveal>
        <span className="kc-letter__rule" aria-hidden="true" />
        <p className="kc-letter__date">Bandung · 12 Desember 2027</p>
        <div className="kc-letter__portrait"><Photo index={1} className="kc-letter__photo" alt="Nara dan Aruna di kebun teh" /></div>
        <h1><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
        <OpenButton className="kc-open">Buka undangan <span aria-hidden="true">↓</span></OpenButton>
      </article>
      <span className="kc-cover__foreground" aria-hidden="true" />
    </section>
  );
}

function KampungCeriaContent() {
  return (
    <div className="kc-page">
      <section className="kc-letter-open" aria-label="Salam pembuka">
        <div className="kc-letter-open__paper" data-reveal>
          <Decoration id="orn-game-upin-ipin-02" className="kc-letter-open__ros" />
          <h2>Kami mengundang Anda.</h2>
          <a className="kc-text-link" href="#mempelai">Lihat mempelai <span aria-hidden="true">↓</span></a>
        </div>
        <div className="kc-letter-open__landscape" data-scene data-scene-depth="0.65" aria-hidden="true">
          <span className="kc-landscape__hill kc-landscape__hill--back" />
          <span className="kc-landscape__hill kc-landscape__hill--front" />
          <span className="kc-landscape__path" />
        </div>
      </section>

      <section className="kc-journey" id="mempelai" aria-labelledby="kc-journey-title">
        <header className="kc-journey__heading" data-reveal>
          <h2 id="kc-journey-title">Mempelai</h2>
        </header>
        <div className="kc-pathway" aria-label="Nara dan Aruna bersama keluarga">
          <span className="kc-pathway__line" aria-hidden="true" />
          <article className="kc-stop kc-stop--nara" data-reveal>
            <div className="kc-stop__photo"><PhotoButton index={2} className="kc-photo-button" /></div>
            <div className="kc-stop__copy"><span>Putra</span><h3>Nara Pradipta</h3><p>Bapak Aditya<br />&amp; Ibu Laras</p></div>
          </article>
          <div className="kc-stop__marker kc-stop__marker--first" aria-hidden="true">01</div>
          <article className="kc-stop kc-stop--aruna" data-reveal>
            <div className="kc-stop__photo"><PhotoButton index={3} className="kc-photo-button" /></div>
            <div className="kc-stop__copy"><span>Putri</span><h3>Aruna Kirana</h3><p>Bapak Baskara<br />&amp; Ibu Ratih</p></div>
          </article>
          <div className="kc-stop__marker kc-stop__marker--second" aria-hidden="true">02</div>
          <Decoration id="orn-game-upin-ipin-04" className="kc-pathway__mei" />
          <Decoration id="orn-game-upin-ipin-02" className="kc-pathway__ros" />
        </div>
      </section>

      <section className="kc-story" aria-labelledby="kc-story-title">
        <Decoration id="orn-game-upin-ipin-03" className="kc-story__gift" />
        <div className="kc-story__heading" data-reveal><h2 id="kc-story-title">Cerita kami</h2></div>
        <ol className="kc-story__stops">
          <li data-reveal><span>01</span><strong>Saling mengenal</strong></li>
          <li data-reveal><span>02</span><strong>Memilih bersama</strong></li>
          <li data-reveal><span>03</span><strong>Mengucap janji</strong></li>
        </ol>
      </section>

      <section className="kc-events" id="acara" aria-labelledby="kc-events-title">
        <div className="kc-courtyard">
          <header className="kc-courtyard__heading" data-reveal>
            <p className="kc-overline">Acara</p>
            <h2 id="kc-events-title">12 · 12 · 27</h2>
            <p>Minggu</p>
            <CalendarLink className="kc-calendar" />
          </header>
          <div className="kc-courtyard__house" data-scene data-scene-depth="-0.45">
            <Decoration id="orn-game-upin-ipin-06" className="kc-house-ornament" />
            <span className="kc-courtyard__ground" aria-hidden="true" />
          </div>
          <div className="kc-schedule" data-reveal>
            <article><span>Akad nikah</span><strong>08.00–10.00 WIB</strong></article>
            <article><span>Resepsi</span><strong>11.00–14.00 WIB</strong></article>
            <Countdown className="kc-countdown" />
          </div>
          <div className="kc-courtyard__map" data-reveal>
            <div className="kc-map-copy"><p className="kc-overline">Lokasi acara</p><h3>Bandung</h3><p>Jawa Barat, Indonesia</p></div>
            <EventMap className="kc-map" />
          </div>
          <Decoration id="orn-game-upin-ipin-05" className="kc-courtyard__pennant" />
        </div>
      </section>

      <section className="kc-gallery" id="galeri" aria-labelledby="kc-gallery-title">
        <header className="kc-gallery__heading" data-reveal><h2 id="kc-gallery-title">Galeri</h2></header>
        <div className="kc-photo-pairs">
          <div className="kc-photo-pair kc-photo-pair--first" data-scene data-scene-depth="0.55">
            <figure className="kc-photo-pair__tall" data-reveal><PhotoButton index={1} className="kc-photo-button" /></figure>
            <figure className="kc-photo-pair__wide" data-reveal><PhotoButton index={2} className="kc-photo-button" /></figure>
          </div>
          <div className="kc-photo-pair kc-photo-pair--second" data-scene data-scene-depth="-0.65">
            <figure className="kc-photo-pair__tall" data-reveal><PhotoButton index={3} className="kc-photo-button" /></figure>
            <figure className="kc-photo-pair__wide" data-reveal><PhotoButton index={4} className="kc-photo-button" /></figure>
          </div>
          <div className="kc-photo-pair kc-photo-pair--third" data-scene data-scene-depth="0.5">
            <figure className="kc-photo-pair__tall" data-reveal><PhotoButton index={5} className="kc-photo-button" /></figure>
            <figure className="kc-photo-pair__wide" data-reveal><PhotoButton index={6} className="kc-photo-button" /></figure>
          </div>
        </div>
      </section>

      <section className="kc-rsvp" id="ucapan" aria-labelledby="kc-rsvp-title">
        <div className="kc-rsvp__heading" data-reveal><h2 id="kc-rsvp-title">Kehadiran &amp; doa</h2></div>
        <Rsvp className="kc-rsvp__form" />
      </section>

      <section className="kc-gift" aria-label="Hadiah">
        <Decoration id="orn-game-upin-ipin-03" className="kc-gift__mail" />
        <Gift className="kc-gift__details" />
      </section>

      <footer className="kc-closing" data-reveal>
        <Decoration id="orn-game-upin-ipin-01" className="kc-closing__friends" />
        <Decoration id="orn-game-upin-ipin-05" className="kc-closing__pennant" />
        <p>Terima kasih atas doa dan kehadiran Anda.</p>
        <strong>Nara <i>&amp;</i> Aruna</strong>
      </footer>
    </div>
  );
}

export function KampungCeriaPreview() {
  return (
    <InvitationFrame templateId="game-upin-ipin" name="Kampung Ceria" className="tk-kampung-ceria" cover={<KampungCeriaCover />}>
      <KampungCeriaContent />
    </InvitationFrame>
  );
}
