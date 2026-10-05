"use client";

import "./dunia-balok.css";
import {
  CalendarLink,
  Countdown,
  Decoration,
  EventMap,
  Gift,
  InvitationFrame,
  OpenButton,
  PhotoButton,
  Rsvp,
} from "./preview-kit";

export function DuniaBalokPreview() {
  const cover = (
    <section className="db-cover" aria-label="Undangan pernikahan Nara dan Aruna">
      <div className="db-cover__sky db-scene-far" data-scene aria-hidden="true">
        <span className="db-cover__cloud db-cover__cloud--one" />
        <span className="db-cover__cloud db-cover__cloud--two" />
      </div>
      <div className="db-cover__copy" data-reveal>
        <span className="db-cover__eyebrow">12 · 12 · 2027</span>
        <h1><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
        <p>Bandung, Jawa Barat</p>
        <OpenButton className="db-open">Buka undangan <span aria-hidden="true">↗</span></OpenButton>
      </div>
      <div className="db-cover__ground db-scene-near" data-scene aria-hidden="true">
        <span className="db-cover__step db-cover__step--one" />
        <span className="db-cover__step db-cover__step--two" />
        <span className="db-cover__step db-cover__step--three" />
        <Decoration id="orn-game-minecraft-01" eager className="db-cover__grass" />
        <Decoration id="orn-game-minecraft-03" eager className="db-cover__torch" />
      </div>
    </section>
  );

  return (
    <InvitationFrame templateId="game-minecraft" name="Dunia Balok" className="db-frame" cover={cover}>
      <div className="db-page">
        <section className="db-intro db-section" data-reveal>
          <h2>Nara &amp; Aruna</h2>
          <p>Dengan restu keluarga, kami mengundang Anda merayakan hari pernikahan kami.</p>
        </section>

        <section className="db-couple db-section" id="mempelai" aria-labelledby="db-couple-title">
          <header className="db-section-heading" data-reveal>
            <h2 id="db-couple-title">Mempelai</h2>
          </header>
          <div className="db-path" aria-hidden="true" data-scene>
            <span className="db-path__line" />
            <span className="db-path__marker db-path__marker--one" />
            <span className="db-path__marker db-path__marker--two" />
          </div>
          <article className="db-person db-person--nara" data-reveal>
            <div className="db-person__photo"><PhotoButton index={1} className="db-photo-button" /></div>
            <div className="db-person__copy">
              <span className="db-node">01</span>
              <h3>Nara Pradipta</h3>
              <p>Putra dari<br />Bapak Aditya &amp; Ibu Laras</p>
            </div>
          </article>
          <article className="db-person db-person--aruna" data-reveal>
            <div className="db-person__photo"><PhotoButton index={2} className="db-photo-button" /></div>
            <div className="db-person__copy">
              <span className="db-node">02</span>
              <h3>Aruna Kirana</h3>
              <p>Putri dari<br />Bapak Baskara &amp; Ibu Ratih</p>
            </div>
          </article>
          <Decoration id="orn-game-minecraft-06" className="db-couple__pixel-pair" />
        </section>

        <section className="db-journey db-section" aria-labelledby="db-journey-title">
          <div className="db-journey__landscape db-scene-far" data-scene aria-hidden="true" />
          <header className="db-section-heading db-section-heading--center" data-reveal>
            <h2 id="db-journey-title">Cerita kami</h2>
          </header>
          <ol className="db-milestones">
            <li data-reveal><span>01</span><strong>Bertemu</strong></li>
            <li data-reveal><span>02</span><strong>Mengenal</strong></li>
            <li data-reveal><span>03</span><strong>Memilih bersama</strong></li>
          </ol>
          <Decoration id="orn-game-minecraft-02" className="db-journey__bouquet" />
          <Decoration id="orn-game-minecraft-05" className="db-journey__sentinel" />
        </section>

        <section className="db-events db-section" id="acara" aria-labelledby="db-events-title">
          <header className="db-events__header" data-reveal>
            <h2 id="db-events-title">Acara</h2>
            <p>Minggu, 12 Desember 2027 · Bandung, Jawa Barat</p>
          </header>
          <div className="db-countdown" data-reveal><Countdown /></div>
          <div className="db-waypoints">
            <article className="db-waypoint" data-reveal>
              <span className="db-waypoint__number">01</span>
              <div><h3>Akad</h3><p>08.00–10.00 WIB</p></div>
              <span className="db-waypoint__place">Bandung</span>
            </article>
            <article className="db-waypoint" data-reveal>
              <span className="db-waypoint__number">02</span>
              <div><h3>Resepsi</h3><p>11.00–14.00 WIB</p></div>
              <span className="db-waypoint__place">Bandung</span>
            </article>
          </div>
          <CalendarLink className="db-calendar" />
          <div className="db-map" data-reveal><EventMap className="db-map__frame" /></div>
        </section>

        <section className="db-gallery db-section" id="galeri" aria-labelledby="db-gallery-title">
          <header className="db-gallery__heading" data-reveal>
            <h2 id="db-gallery-title">Galeri</h2>
          </header>
          <div className="db-gallery__world">
            <figure className="db-window db-window--one" data-reveal data-scene>
              <span className="db-window__terrain" aria-hidden="true" />
              <PhotoButton index={1} className="db-photo-button" />
              <figcaption>01</figcaption>
            </figure>
            <figure className="db-window db-window--two" data-reveal data-scene>
              <span className="db-window__terrain" aria-hidden="true" />
              <PhotoButton index={2} className="db-photo-button" />
              <figcaption>02</figcaption>
            </figure>
            <figure className="db-window db-window--three" data-reveal data-scene>
              <span className="db-window__terrain" aria-hidden="true" />
              <PhotoButton index={3} className="db-photo-button" />
              <figcaption>03</figcaption>
            </figure>
            <figure className="db-window db-window--four" data-reveal data-scene>
              <span className="db-window__terrain" aria-hidden="true" />
              <PhotoButton index={4} className="db-photo-button" />
              <figcaption>04</figcaption>
            </figure>
            <figure className="db-window db-window--five" data-reveal data-scene>
              <span className="db-window__terrain" aria-hidden="true" />
              <PhotoButton index={5} className="db-photo-button" />
              <figcaption>05</figcaption>
            </figure>
            <figure className="db-window db-window--six" data-reveal data-scene>
              <span className="db-window__terrain" aria-hidden="true" />
              <PhotoButton index={6} className="db-photo-button" />
              <figcaption>06</figcaption>
            </figure>
          </div>
        </section>

        <section className="db-rsvp db-section" id="ucapan" aria-labelledby="db-rsvp-title">
          <div className="db-rsvp__art" aria-hidden="true" data-scene>
            <Decoration id="orn-game-minecraft-04" className="db-rsvp__chest" />
            <span className="db-rsvp__ground" />
          </div>
          <div className="db-rsvp__copy" data-reveal>
            <h2 id="db-rsvp-title">RSVP &amp; ucapan</h2>
            <Rsvp className="db-rsvp__form" />
          </div>
        </section>

        <section className="db-gift db-section" aria-label="Hadiah">
          <Gift className="db-gift__details" />
        </section>

        <footer className="db-closing">
          <div className="db-closing__horizon" data-scene aria-hidden="true" />
          <p>Dengan doa dan bahagia,</p>
          <strong>Nara <span>&amp;</span> Aruna</strong>
          <span className="db-closing__date">12 · 12 · 2027</span>
        </footer>
      </div>
    </InvitationFrame>
  );
}
