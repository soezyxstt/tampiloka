"use client";

import "./kampung-ceria.css";
import { CalendarLink, Countdown, Decoration, EventMap, Gift, InvitationFrame, OpenButton, Photo, PhotoButton, Rsvp } from "./preview-kit";

const galleryRows = [
  [1, 2],
  [3, 4],
  [5, 6],
] as const;

export function KampungCeriaPreview() {
  const cover = (
    <section className="kc-cover" aria-label="Undangan Nara dan Aruna">
      <div className="kc-cover__backdrop" aria-hidden="true">
        <Decoration id="bg-game-upin-ipin" eager />
      </div>
      <div className="kc-cover__shade" aria-hidden="true" />
      <div className="kc-cover__house" aria-hidden="true">
        <Decoration id="orn-game-upin-ipin-06" eager />
      </div>
      <div className="kc-cover__veranda" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="kc-cover__content">
        <div className="kc-cover__window">
          <Photo index={1} alt="Nara dan Aruna mengenakan busana adat di kebun teh" />
        </div>
        <div className="kc-cover__board">
          <h1>Nara <i aria-hidden="true">&amp;</i> Aruna</h1>
          <p>Minggu, 12 Desember 2027 · Bandung</p>
          <OpenButton className="kc-open">Buka undangan <span aria-hidden="true">↓</span></OpenButton>
        </div>
      </div>
      <div className="kc-cover__guests" aria-hidden="true">
        <span className="kc-cover__guest kc-cover__guest--left">
          <Decoration id="orn-game-upin-ipin-01" eager />
        </span>
        <span className="kc-cover__guest kc-cover__guest--right">
          <Decoration id="orn-game-upin-ipin-04" eager />
        </span>
      </div>
    </section>
  );

  return (
    <InvitationFrame templateId="game-upin-ipin" name="Kampung Ceria" className="tk-kampung-ceria" cover={cover}>
      <div className="kc-page">
        <section className="kc-welcome" aria-labelledby="kc-welcome-title">
          <div className="kc-welcome__shade" aria-hidden="true" />
          <div className="kc-welcome__layout">
            <div className="kc-welcome__copy" data-reveal>
              <p>Dengan hormat, kami mengundang Anda untuk hadir di hari pernikahan kami.</p>
              <h1 id="kc-welcome-title">Nara <i aria-hidden="true">&amp;</i> Aruna</h1>
              <p>Minggu, 12 Desember 2027 · Bandung</p>
            </div>
            <div className="kc-welcome__photo" data-reveal>
              <div className="kc-window kc-window--hero">
                <PhotoButton index={1} className="kc-photo-button" />
              </div>
            </div>
          </div>
          <div className="kc-welcome__garden" aria-hidden="true">
            <span className="kc-welcome__house"><Decoration id="orn-game-upin-ipin-06" /></span>
            <span className="kc-welcome__duo"><Decoration id="orn-game-upin-ipin-01" /></span>
          </div>
        </section>

        <section className="kc-couple" id="mempelai" aria-labelledby="kc-couple-title">
          <div className="kc-couple__roof" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          <header className="kc-heading" data-reveal>
            <h2 id="kc-couple-title">Mempelai</h2>
          </header>
          <div className="kc-couple__windows">
            <article className="kc-person" data-reveal>
              <div className="kc-window kc-person__window">
                <PhotoButton index={2} className="kc-photo-button" />
              </div>
              <div className="kc-person__copy">
                <h3>Nara Pradipta</h3>
                <p>Putra Bapak Aditya &amp; Ibu Laras</p>
              </div>
            </article>
            <article className="kc-person kc-person--aruna" data-reveal>
              <div className="kc-window kc-person__window">
                <PhotoButton index={3} className="kc-photo-button" />
              </div>
              <div className="kc-person__copy">
                <h3>Aruna Kirana</h3>
                <p>Putri Bapak Baskara &amp; Ibu Ratih</p>
              </div>
            </article>
          </div>
          <div className="kc-couple__house" aria-hidden="true">
            <Decoration id="orn-game-upin-ipin-06" />
          </div>
        </section>

        <section className="kc-events" id="acara" aria-labelledby="kc-events-title">
          <header className="kc-heading" data-reveal>
            <h2 id="kc-events-title">Acara</h2>
          </header>
          <div className="kc-events__layout">
            <div className="kc-programme" data-reveal>
              <div className="kc-programme__date">
                <span>Minggu</span>
                <strong>12</strong>
                <span>Desember 2027</span>
              </div>
              <div className="kc-programme__rows">
                <article>
                  <span>08.00–10.00 WIB</span>
                  <h3>Akad nikah</h3>
                </article>
                <article>
                  <span>11.00–14.00 WIB</span>
                  <h3>Resepsi</h3>
                </article>
              </div>
              <div className="kc-programme__place">
                <h3>Bandung</h3>
                <p>Jawa Barat, Indonesia</p>
                <Countdown className="kc-countdown" />
                <CalendarLink className="kc-calendar" />
              </div>
            </div>
            <div className="kc-events__map" data-reveal>
              <h3>Lokasi acara</h3>
              <EventMap className="kc-map" />
              <div className="kc-bench" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
          <div className="kc-events__yard" aria-hidden="true">
            <span><Decoration id="orn-game-upin-ipin-05" /></span>
          </div>
        </section>

        <section className="kc-story" aria-labelledby="kc-story-title">
          <header className="kc-heading" data-reveal>
            <h2 id="kc-story-title">Cerita kami</h2>
          </header>
          <div className="kc-story__layout">
            <div className="kc-story__notes">
              <ol className="kc-story__timeline">
                <li data-reveal>
                  <time dateTime="2022">2022</time>
                  <span>Bertemu</span>
                </li>
                <li data-reveal>
                  <time dateTime="2025">2025</time>
                  <span>Saling mengenal</span>
                </li>
                <li data-reveal>
                  <time dateTime="2027">2027</time>
                  <span>Menetapkan hari</span>
                </li>
              </ol>
              <figure className="kc-story__postcard" data-reveal>
                <div className="kc-window kc-window--postcard">
                  <PhotoButton index={4} className="kc-photo-button" />
                </div>
              </figure>
            </div>
            <aside className="kc-story__path" aria-hidden="true">
              <Decoration id="bg-game-upin-ipin" />
            </aside>
          </div>
        </section>

        <section className="kc-gallery" id="galeri" aria-labelledby="kc-gallery-title">
          <header className="kc-gallery__heading" data-reveal>
            <h2 id="kc-gallery-title">Galeri</h2>
          </header>
          <div className="kc-gallery__clothesline">
            {galleryRows.map((row, rowIndex) => (
              <div className="kc-gallery__row" key={rowIndex}>
                <span className="kc-gallery__beam" aria-hidden="true" />
                {row.map((index) => (
                  <figure className={"kc-gallery__item kc-gallery__item--" + index} data-reveal key={index}>
                    <span className="kc-gallery__cord" aria-hidden="true" />
                    <div className="kc-window kc-gallery__window">
                      <PhotoButton index={index} className="kc-photo-button" />
                    </div>
                  </figure>
                ))}
              </div>
            ))}
          </div>
          <div className="kc-gallery__companions" aria-hidden="true">
            <span><Decoration id="orn-game-upin-ipin-01" /></span>
            <span><Decoration id="orn-game-upin-ipin-03" /></span>
          </div>
        </section>

        <section className="kc-rsvp" id="ucapan" aria-labelledby="kc-rsvp-title">
          <header className="kc-heading" data-reveal>
            <h2 id="kc-rsvp-title">Konfirmasi kehadiran</h2>
          </header>
          <div className="kc-rsvp__content">
            <Rsvp className="kc-rsvp__form" />
            <Gift className="kc-gift" />
          </div>
        </section>

        <footer className="kc-closing">
          <div className="kc-closing__village" aria-hidden="true">
            <Decoration id="bg-game-upin-ipin" />
          </div>
          <div className="kc-closing__postbox" aria-hidden="true">
            <span />
            <i />
          </div>
          <div className="kc-closing__message" data-reveal>
            <p>Terima kasih atas doa dan kehadiran Anda.</p>
            <strong>Nara <i aria-hidden="true">&amp;</i> Aruna</strong>
            <span>Bandung · 12 Desember 2027</span>
          </div>
          <div className="kc-closing__duo" aria-hidden="true">
            <Decoration id="orn-game-upin-ipin-01" />
          </div>
        </footer>
      </div>
    </InvitationFrame>
  );
}
