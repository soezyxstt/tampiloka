"use client";

import "./susun-bahagia.css";
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

export function SusunBahagiaPreview() {
  const cover = (
    <section className="sb-cover" aria-label="Undangan pernikahan Nara dan Aruna">
      <div className="sb-cover__world" data-scene aria-hidden="true" />
      <div className="sb-cover__poster">
        <div className="sb-cover__image" data-reveal>
          <PhotoButton index={5} className="sb-photo-button" />
        </div>
        <div className="sb-cover__type" data-reveal>
          <h1><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
          <p className="sb-cover__place">Minggu<br />12 Desember 2027<br />Bandung, Jawa Barat</p>
          <OpenButton className="sb-open">Buka undangan <span aria-hidden="true">↗</span></OpenButton>
        </div>
        <Decoration id="orn-game-block-blast-01" eager className="sb-cover__gift-block" />
        <Decoration id="orn-game-block-blast-02" eager className="sb-cover__jewel" />
        <span className="sb-cover__rule" aria-hidden="true" />
      </div>
    </section>
  );

  return (
    <InvitationFrame templateId="game-block-blast" name="Susun Bahagia" className="sb-frame" cover={cover}>
      <div className="sb-page">
        <section className="sb-intro" data-reveal>
          <span className="sb-intro__mark" aria-hidden="true">N<span>&amp;</span>A</span>
          <h2>Dengan restu keluarga,<br />kami akan menikah.</h2>
        </section>

        <section className="sb-couple sb-section" id="mempelai" aria-labelledby="sb-couple-title">
          <header className="sb-couple__heading" data-reveal>
            <h2 id="sb-couple-title">Mempelai</h2>
          </header>
          <div className="sb-couple__panels">
            <article className="sb-profile sb-profile--nara" data-reveal>
              <div className="sb-profile__image"><PhotoButton index={2} className="sb-photo-button" /></div>
              <div className="sb-profile__details">
                <span className="sb-profile__number">01</span>
                <h3>Nara Pradipta</h3>
                <p>Putra dari Bapak Aditya<br />&amp; Ibu Laras</p>
              </div>
            </article>
            <div className="sb-couple__join" aria-hidden="true" data-scene>
              <span className="sb-couple__join-square" />
              <Decoration id="orn-game-block-blast-03" className="sb-couple__heart" />
            </div>
            <article className="sb-profile sb-profile--aruna" data-reveal>
              <div className="sb-profile__image"><PhotoButton index={3} className="sb-photo-button" /></div>
              <div className="sb-profile__details">
                <span className="sb-profile__number">02</span>
                <h3>Aruna Kirana</h3>
                <p>Putri dari Bapak Baskara<br />&amp; Ibu Ratih</p>
              </div>
            </article>
          </div>
        </section>

        <section className="sb-events" id="acara" aria-labelledby="sb-events-title">
          <div className="sb-events__topline" data-reveal>
            <h2 className="sb-index" id="sb-events-title">Acara</h2>
            <p>Bandung, Jawa Barat</p>
          </div>
          <div className="sb-poster" data-reveal>
            <div className="sb-poster__date">
              <span className="sb-poster__weekday">MINGGU</span>
              <strong>12</strong>
              <span className="sb-poster__month">DESEMBER <b>2027</b></span>
            </div>
            <div className="sb-poster__events">
              <article>
                <span>08.00 — 10.00 WIB</span>
                <h3>Akad</h3>
                <p>Bandung, Jawa Barat</p>
              </article>
              <article>
                <span>11.00 — 14.00 WIB</span>
                <h3>Resepsi</h3>
                <p>Bandung, Jawa Barat</p>
              </article>
            </div>
            <Decoration id="orn-game-block-blast-05" className="sb-poster__star" />
          </div>
          <div className="sb-events__countdown" data-reveal>
            <Countdown />
            <CalendarLink className="sb-calendar" />
          </div>
          <div className="sb-map" data-reveal><EventMap className="sb-map__frame" /></div>
        </section>

        <section className="sb-story sb-section" aria-labelledby="sb-story-title">
          <header className="sb-story__heading" data-reveal>
            <h2 id="sb-story-title">Cerita kami</h2>
          </header>
          <ol className="sb-story__strips">
            <li data-reveal><span>01</span><strong>Bertemu</strong><i aria-hidden="true">↘</i></li>
            <li data-reveal><span>02</span><strong>Saling mengenal</strong><i aria-hidden="true">↘</i></li>
            <li data-reveal><span>03</span><strong>Memilih bersama</strong><i aria-hidden="true">↘</i></li>
          </ol>
          <Decoration id="orn-game-block-blast-04" className="sb-story__flower" />
        </section>

        <section className="sb-gallery" id="galeri" aria-labelledby="sb-gallery-title">
          <header className="sb-gallery__heading" data-reveal>
            <h2 id="sb-gallery-title">Galeri</h2>
          </header>
          <div className="sb-mosaic">
            <figure className="sb-mosaic__item sb-mosaic__item--one" data-reveal data-scene><PhotoButton index={1} className="sb-photo-button" /><figcaption>01</figcaption></figure>
            <figure className="sb-mosaic__item sb-mosaic__item--two" data-reveal data-scene><PhotoButton index={2} className="sb-photo-button" /><figcaption>02</figcaption></figure>
            <figure className="sb-mosaic__item sb-mosaic__item--three" data-reveal data-scene><PhotoButton index={3} className="sb-photo-button" /><figcaption>03</figcaption></figure>
            <figure className="sb-mosaic__item sb-mosaic__item--four" data-reveal data-scene><PhotoButton index={4} className="sb-photo-button" /><figcaption>04</figcaption></figure>
            <figure className="sb-mosaic__item sb-mosaic__item--five" data-reveal data-scene><PhotoButton index={5} className="sb-photo-button" /><figcaption>05</figcaption></figure>
            <figure className="sb-mosaic__item sb-mosaic__item--six" data-reveal data-scene><PhotoButton index={6} className="sb-photo-button" /><figcaption>06</figcaption></figure>
          </div>
        </section>

        <section className="sb-rsvp" id="ucapan" aria-labelledby="sb-rsvp-title">
          <div className="sb-rsvp__heading" data-reveal>
            <h2 id="sb-rsvp-title">RSVP &amp; ucapan</h2>
          </div>
          <Rsvp className="sb-rsvp__form" />
          <Decoration id="orn-game-block-blast-06" className="sb-rsvp__confetti" />
        </section>

        <section className="sb-gift" aria-label="Hadiah">
          <div className="sb-gift__copy" data-reveal>
            <Gift className="sb-gift__details" />
          </div>
        </section>

        <footer className="sb-closing">
          <div className="sb-closing__field" data-scene aria-hidden="true" />
          <span className="sb-closing__monogram">N <i>&amp;</i> A</span>
          <p>12.12.2027 <span>·</span> Bandung</p>
          <strong>Nara &amp; Aruna</strong>
        </footer>
      </div>
    </InvitationFrame>
  );
}
