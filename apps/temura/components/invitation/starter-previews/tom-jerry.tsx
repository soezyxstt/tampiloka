"use client";

import "./tom-jerry.css";
import { CalendarLink, Countdown, Decoration, EventMap, Gift, InvitationFrame, OpenButton, Photo, PhotoButton, Rsvp } from "./preview-kit";

export function TomJerryPreview() {
  const cover = (
    <section className="tj-cover" aria-label="Undangan Nara dan Aruna">
      <div className="tj-cover__room"><Decoration id="bg-game-tom-jerry" eager className="tj-cover__wallpaper" /></div>
      <div className="tj-cover__board" data-reveal>
        <div className="tj-cover__portrait"><Photo index={1} className="tj-cover__photo" alt="Nara dan Aruna di kebun teh" /></div>
        <p>Bandung · 12 Desember 2027</p>
        <h1>Nara <i aria-hidden="true">&amp;</i> Aruna</h1>
        <OpenButton className="tj-open">Buka undangan <span aria-hidden="true">↗</span></OpenButton>
      </div>
      <div className="tj-cover__floor" aria-hidden="true"><i /><i /><i /></div>
      <div className="tj-cover__cast"><Decoration id="orn-game-tom-jerry-01" eager /></div>
      <div className="tj-cover__mousehole"><Decoration id="orn-game-tom-jerry-05" eager /></div>
    </section>
  );

  return (
    <InvitationFrame templateId="game-tom-jerry" name="Tom & Jerry" className="tk-tom-jerry" cover={cover}>
      <div className="tj-page">
        <section className="tj-intro" aria-labelledby="tj-intro-title">
          <div className="tj-intro__room"><Decoration id="bg-game-tom-jerry" /></div>
          <div className="tj-intro__copy" data-reveal>
            <p>Bandung · 12 Desember 2027</p>
            <h1 id="tj-intro-title">Nara <i aria-hidden="true">&amp;</i> Aruna</h1>
            <p>Kami mengundang Anda.</p>
          </div>
          <div className="tj-intro__portrait" data-reveal><PhotoButton index={1} className="tj-photo-button" /></div>
          <div className="tj-intro__floor" aria-hidden="true">
            <div className="tj-intro__cast"><Decoration id="orn-game-tom-jerry-01" /></div>
          </div>
        </section>
        <section className="tj-gallery" id="galeri" aria-labelledby="tj-gallery-title">
          <header className="tj-heading" data-reveal><h2 id="tj-gallery-title">Galeri</h2></header>
          <div className="tj-gallery__panels">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <figure className={`tj-panel tj-panel--${index}`} key={index} data-reveal>
                <PhotoButton index={index} className="tj-photo-button" />
              </figure>
            ))}
          </div>
          <div className="tj-gallery__baseboard" aria-hidden="true" />
        </section>

        <section className="tj-couple" id="mempelai" aria-labelledby="tj-couple-title">
          <header className="tj-heading" data-reveal><h2 id="tj-couple-title">Mempelai</h2></header>
          <div className="tj-couple__wall">
            <article className="tj-person tj-person--nara" data-reveal>
              <div className="tj-person__frame"><PhotoButton index={2} className="tj-photo-button" /></div>
              <div className="tj-person__caption"><span>Putra</span><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya<br />&amp; Ibu Laras</p></div>
            </article>
            <div className="tj-couple__divider" aria-hidden="true"><Decoration id="orn-game-tom-jerry-04" /></div>
            <article className="tj-person tj-person--aruna" data-reveal>
              <div className="tj-person__frame"><PhotoButton index={3} className="tj-photo-button" /></div>
              <div className="tj-person__caption"><span>Putri</span><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara<br />&amp; Ibu Ratih</p></div>
            </article>
          </div>
        </section>

        <section className="tj-events" id="acara" aria-labelledby="tj-events-title">
          <header className="tj-heading tj-heading--dark" data-reveal><h2 id="tj-events-title">Acara</h2></header>
          <div className="tj-mantel" aria-hidden="true"><i /><i /><i /></div>
          <div className="tj-programme" data-reveal>
            <div className="tj-programme__date"><span>Minggu</span><strong>12</strong><span>Desember 2027</span></div>
            <div className="tj-programme__schedule"><article><span>08.00–10.00 WIB</span><h3>Akad nikah</h3></article><article><span>11.00–14.00 WIB</span><h3>Resepsi</h3></article></div>
            <div className="tj-programme__place"><strong>Bandung</strong><span>Jawa Barat</span><Countdown className="tj-countdown" /><CalendarLink className="tj-calendar" /></div>
          </div>
          <div className="tj-map" data-reveal><div className="tj-map__copy"><h3>Lokasi acara</h3><p>Bandung, Jawa Barat</p></div><EventMap className="tj-map__frame" /></div>
        </section>

        <section className="tj-story" aria-labelledby="tj-story-title">
          <div className="tj-story__mousehole"><Decoration id="orn-game-tom-jerry-05" /></div>
          <header className="tj-heading tj-heading--dark" data-reveal><h2 id="tj-story-title">Cerita kami</h2></header>
          <ol className="tj-story__timeline">
            <li data-reveal><time dateTime="2022">2022</time><strong>Bertemu</strong></li>
            <li data-reveal><time dateTime="2025">2025</time><strong>Saling mengenal</strong></li>
            <li data-reveal><time dateTime="2027">2027</time><strong>Memilih bersama</strong></li>
          </ol>
        </section>

        <section className="tj-rsvp" id="ucapan" aria-labelledby="tj-rsvp-title">
          <header className="tj-heading" data-reveal><h2 id="tj-rsvp-title">RSVP &amp; ucapan</h2></header>
          <Rsvp className="tj-rsvp__form" />
          <div className="tj-rsvp__cast"><Decoration id="orn-game-tom-jerry-03" /></div>
        </section>
        <section className="tj-gift" aria-label="Hadiah"><Gift className="tj-gift__details" /></section>
        <footer className="tj-closing"><p>Bandung · 12 Desember 2027</p><strong>Nara <i>&amp;</i> Aruna</strong></footer>
      </div>
    </InvitationFrame>
  );
}
