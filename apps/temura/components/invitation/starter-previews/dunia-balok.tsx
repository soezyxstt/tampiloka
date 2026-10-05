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
  Photo,
  PhotoButton,
  Rsvp,
} from "./preview-kit";

export function DuniaBalokPreview() {
  const cover = (
    <section className="db-cover" aria-label="Undangan Nara dan Aruna">
      <div className="db-cover__art"><Decoration id="bg-game-minecraft" eager className="db-cover__world" /></div>
      <div className="db-cover__shade" aria-hidden="true" />
      <div className="db-cover__terrain" aria-hidden="true" />
      <div className="db-cover__torch"><Decoration id="orn-game-minecraft-03" eager /></div>
      <div className="db-cover__creeper"><Decoration id="orn-game-minecraft-05" eager /></div>
      <div className="db-cover__copy" data-reveal>
        <div className="db-cover__portrait"><Photo index={1} className="db-cover__photo" alt="Nara dan Aruna di kebun teh" /></div>
        <p>Bandung · 12 Desember 2027</p>
        <h1>Nara <i aria-hidden="true">&amp;</i> Aruna</h1>
        <OpenButton className="db-open">Buka undangan <span aria-hidden="true">↗</span></OpenButton>
      </div>
    </section>
  );

  return (
    <InvitationFrame templateId="game-minecraft" name="Dunia Balok" className="db-frame" cover={cover}>
      <div className="db-page">
        <section className="db-welcome" aria-labelledby="db-welcome-title">
          <div className="db-welcome__world" aria-hidden="true"><i /><i /><i /></div>
          <div className="db-welcome__copy" data-reveal>
            <h2 id="db-welcome-title">Nara &amp; Aruna</h2>
            <p>Dengan restu keluarga, kami mengundang Anda untuk hadir.</p>
          </div>
          <div className="db-welcome__grass"><Decoration id="orn-game-minecraft-01" /></div>
        </section>

        <section className="db-waypoints" id="acara" aria-labelledby="db-waypoints-title">
          <header className="db-section-heading" data-reveal>
            <h2 id="db-waypoints-title">Acara</h2>
          </header>
          <div className="db-waypoint-board" data-reveal>
            <div className="db-waypoint-board__date">
              <span>Minggu</span><strong>12</strong><span>Desember 2027</span>
            </div>
            <div className="db-waypoint-board__schedule">
              <article><span>08.00–10.00 WIB</span><h3>Akad nikah</h3></article>
              <article><span>11.00–14.00 WIB</span><h3>Resepsi</h3></article>
            </div>
            <div className="db-waypoint-board__place">
              <strong>Bandung</strong><span>Jawa Barat</span>
              <Countdown className="db-countdown" />
              <CalendarLink className="db-calendar" />
            </div>
          </div>
          <div className="db-map-site" data-reveal>
            <div className="db-map-site__sign"><span>Lokasi acara</span><strong>Bandung</strong></div>
            <EventMap className="db-map" />
          </div>
        </section>

        <section className="db-couple" id="mempelai" aria-labelledby="db-couple-title">
          <header className="db-section-heading" data-reveal>
            <h2 id="db-couple-title">Mempelai</h2>
          </header>
          <div className="db-couple__platforms">
            <article className="db-person db-person--nara" data-reveal>
              <div className="db-person__block"><PhotoButton index={2} className="db-photo-button" /></div>
              <div className="db-person__copy"><span>Putra</span><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya<br />&amp; Ibu Laras</p></div>
            </article>
            <div className="db-couple__join" aria-hidden="true"><Decoration id="orn-game-minecraft-06" /></div>
            <article className="db-person db-person--aruna" data-reveal>
              <div className="db-person__block"><PhotoButton index={3} className="db-photo-button" /></div>
              <div className="db-person__copy"><span>Putri</span><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara<br />&amp; Ibu Ratih</p></div>
            </article>
          </div>
        </section>

        <section className="db-story" aria-labelledby="db-story-title">
          <header className="db-section-heading" data-reveal>
            <h2 id="db-story-title">Cerita kami</h2>
          </header>
          <ol className="db-story__path">
            <li data-reveal><div className="db-story__photo"><PhotoButton index={4} className="db-photo-button" /></div><p><strong>Bertemu</strong><span>2022</span></p></li>
            <li data-reveal><div className="db-story__photo"><PhotoButton index={5} className="db-photo-button" /></div><p><strong>Saling mengenal</strong><span>2025</span></p></li>
            <li data-reveal><div className="db-story__photo"><PhotoButton index={6} className="db-photo-button" /></div><p><strong>Memilih bersama</strong><span>2027</span></p></li>
          </ol>
        </section>

        <section className="db-gallery" id="galeri" aria-labelledby="db-gallery-title">
          <header className="db-section-heading" data-reveal>
            <h2 id="db-gallery-title">Galeri</h2>
          </header>
          <div className="db-gallery__wall">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <figure className={`db-gallery__tile db-gallery__tile--${index}`} key={index} data-reveal>
                <PhotoButton index={index} className="db-photo-button" />
              </figure>
            ))}
          </div>
        </section>

        <section className="db-rsvp" id="ucapan" aria-labelledby="db-rsvp-title">
          <div className="db-rsvp__chest"><Decoration id="orn-game-minecraft-04" /></div>
          <header className="db-section-heading" data-reveal><h2 id="db-rsvp-title">RSVP &amp; ucapan</h2></header>
          <Rsvp className="db-rsvp__form" />
        </section>
        <section className="db-gift" aria-label="Hadiah"><Gift className="db-gift__details" /></section>
        <footer className="db-closing"><p>Bandung · 12 Desember 2027</p><strong>Nara <i>&amp;</i> Aruna</strong></footer>
      </div>
    </InvitationFrame>
  );
}
