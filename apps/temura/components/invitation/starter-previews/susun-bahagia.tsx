"use client";

import "./susun-bahagia.css";
import { CalendarLink, Countdown, Decoration, EventMap, Gift, InvitationFrame, OpenButton, Photo, PhotoButton, Rsvp } from "./preview-kit";

export function SusunBahagiaPreview() {
  const cover = (
    <section className="sb-cover" aria-label="Undangan Nara dan Aruna">
      <div className="sb-cover__art"><Decoration id="bg-game-block-blast" eager className="sb-cover__world" /></div>
      <div className="sb-cover__shade" aria-hidden="true" />
      <div className="sb-cover__board">
        <div className="sb-cover__copy" data-reveal>
          <p>Minggu · 12 Desember 2027</p>
          <h1><span>Nara <i aria-hidden="true">&amp;</i></span><span>Aruna</span></h1>
          <OpenButton className="sb-open">Buka undangan <span aria-hidden="true">↗</span></OpenButton>
        </div>
        <div className="sb-cover__portrait"><Photo index={1} className="sb-cover__photo" alt="Nara dan Aruna di kebun teh" /></div>
        <aside className="sb-cover__tiles" aria-hidden="true">
          <div><Decoration id="orn-game-block-blast-01" eager /></div>
          <div><Decoration id="orn-game-block-blast-02" eager /></div>
        </aside>
      </div>
    </section>
  );

  return (
    <InvitationFrame templateId="game-block-blast" name="Susun Bahagia" className="sb-frame" cover={cover}>
      <div className="sb-page">
        <section className="sb-intro" aria-labelledby="sb-intro-title">
          <div className="sb-intro__board" data-reveal>
            <div className="sb-intro__copy">
              <p>Minggu · 12 Desember 2027</p>
              <h1 id="sb-intro-title"><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
              <p>Dengan restu keluarga, kami mengundang Anda.</p>
            </div>
            <aside className="sb-intro__tileband" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i /><i /><i />
              <div><Decoration id="orn-game-block-blast-02" /></div>
            </aside>
          </div>
        </section>
        <section className="sb-couple" id="mempelai" aria-labelledby="sb-couple-title">
          <header className="sb-section-heading" data-reveal><h2 id="sb-couple-title">Mempelai</h2></header>
          <div className="sb-couple__windows">
            <article className="sb-person sb-person--nara" data-reveal>
              <div className="sb-person__frame"><PhotoButton index={2} className="sb-photo-button" /></div>
              <div className="sb-person__copy"><span>Putra</span><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya<br />&amp; Ibu Laras</p></div>
            </article>
            <span className="sb-couple__join" aria-hidden="true"><Decoration id="orn-game-block-blast-03" /></span>
            <article className="sb-person sb-person--aruna" data-reveal>
              <div className="sb-person__frame"><PhotoButton index={3} className="sb-photo-button" /></div>
              <div className="sb-person__copy"><span>Putri</span><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara<br />&amp; Ibu Ratih</p></div>
            </article>
          </div>
        </section>

        <section className="sb-gallery" id="galeri" aria-labelledby="sb-gallery-title">
          <header className="sb-section-heading" data-reveal><h2 id="sb-gallery-title">Galeri</h2></header>
          <div className="sb-bento">
            <figure className="sb-bento__hero" data-reveal><PhotoButton index={1} className="sb-photo-button" /></figure>
            <figure className="sb-bento__tile sb-bento__tile--two" data-reveal><PhotoButton index={2} className="sb-photo-button" /></figure>
            <figure className="sb-bento__tile sb-bento__tile--three" data-reveal><PhotoButton index={3} className="sb-photo-button" /></figure>
            <figure className="sb-bento__wide" data-reveal><PhotoButton index={4} className="sb-photo-button" /></figure>
            <figure className="sb-bento__tile sb-bento__tile--five" data-reveal><PhotoButton index={5} className="sb-photo-button" /></figure>
            <figure className="sb-bento__tile sb-bento__tile--six" data-reveal><PhotoButton index={6} className="sb-photo-button" /></figure>
          </div>
        </section>

        <section className="sb-events" id="acara" aria-labelledby="sb-events-title">
          <header className="sb-section-heading" data-reveal><h2 id="sb-events-title">Acara</h2></header>
          <div className="sb-events__grid" data-reveal>
            <div className="sb-events__date"><span>MINGGU</span><strong>12</strong><b>DESEMBER 2027</b></div>
            <div className="sb-events__schedule">
              <article><span>08.00–10.00 WIB</span><h3>Akad nikah</h3></article>
              <article><span>11.00–14.00 WIB</span><h3>Resepsi</h3></article>
            </div>
            <div className="sb-events__place"><strong>Bandung</strong><span>Jawa Barat</span><Countdown className="sb-countdown" /><CalendarLink className="sb-calendar" /></div>
          </div>
          <div className="sb-map" data-reveal><div className="sb-map__copy"><h3>Lokasi acara</h3><p>Bandung, Jawa Barat</p></div><EventMap className="sb-map__frame" /></div>
        </section>

        <section className="sb-story" aria-labelledby="sb-story-title">
          <div className="sb-story__flower"><Decoration id="orn-game-block-blast-04" /></div>
          <header className="sb-section-heading" data-reveal><h2 id="sb-story-title">Cerita kami</h2></header>
          <ol className="sb-story__list">
            <li data-reveal><time dateTime="2022">2022</time><strong>Bertemu</strong></li>
            <li data-reveal><time dateTime="2025">2025</time><strong>Saling mengenal</strong></li>
            <li data-reveal><time dateTime="2027">2027</time><strong>Memilih bersama</strong></li>
          </ol>
        </section>

        <section className="sb-rsvp" id="ucapan" aria-labelledby="sb-rsvp-title">
          <header className="sb-section-heading" data-reveal><h2 id="sb-rsvp-title">RSVP &amp; ucapan</h2></header>
          <Rsvp className="sb-rsvp__form" />
          <div className="sb-rsvp__star"><Decoration id="orn-game-block-blast-05" /></div>
        </section>
        <section className="sb-gift" aria-label="Hadiah"><Gift className="sb-gift__details" /></section>
        <footer className="sb-closing"><p>Bandung · 12 Desember 2027</p><strong>Nara <i>&amp;</i> Aruna</strong><span className="sb-closing__blocks"><Decoration id="orn-game-block-blast-06" /></span></footer>
      </div>
    </InvitationFrame>
  );
}
