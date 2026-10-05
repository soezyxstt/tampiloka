"use client";

import "./tom-jerry.css";
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

function TomJerryCover() {
  return (
    <section className="tj-cover" aria-label="Undangan Nara dan Aruna">
      <Decoration id="bg-game-tom-jerry" eager className="tj-cover__room" />
      <span className="tj-cover__veil" aria-hidden="true" />
      <span className="tj-cover__iris tj-cover__iris--outer" aria-hidden="true" />
      <span className="tj-cover__iris tj-cover__iris--inner" aria-hidden="true" />
      <Decoration id="orn-game-tom-jerry-02" eager className="tj-cover__envelope" />
      <Decoration id="orn-game-tom-jerry-01" eager className="tj-cover__duo" />
      <div className="tj-cover__copy" data-reveal>
        <p className="tj-cover__date">12 · 12 · 2027 &nbsp; / &nbsp; Bandung</p>
        <h1 className="tj-cover__names"><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
        <div className="tj-cover__portrait" data-scene data-scene-depth="-0.35">
          <Photo index={1} className="tj-cover__photo" alt="Nara dan Aruna di kebun teh" />
          <span className="tj-cover__portrait-mark" aria-hidden="true">T &amp; J</span>
        </div>
        <OpenButton className="tj-open">Buka undangan <span aria-hidden="true">↗</span></OpenButton>
      </div>
      <span className="tj-cover__floor" aria-hidden="true" />
    </section>
  );
}

function TomJerryContent() {
  return (
    <div className="tj-page">
      <section className="tj-welcome" aria-label="Salam pembuka">
        <div className="tj-welcome__copy" data-reveal>
          <h2>Selamat datang.</h2>
          <p>Dengan bahagia, kami mengundang Anda untuk hadir.</p>
          <a className="tj-text-link" href="#mempelai">Lihat mempelai <span aria-hidden="true">↓</span></a>
        </div>
        <div className="tj-welcome__portrait" data-scene data-scene-depth="0.7">
          <Photo index={3} className="tj-welcome__photo" alt="Potret Nara dan Aruna di hutan pinus" />
          <Decoration id="orn-game-tom-jerry-03" className="tj-welcome__bouquet" />
        </div>
        <Decoration id="orn-game-tom-jerry-06" className="tj-welcome__ribbon" />
      </section>

      <section className="tj-couple" id="mempelai" aria-labelledby="tj-couple-title">
        <header className="tj-couple__heading" data-reveal>
          <h2 id="tj-couple-title">Mempelai</h2>
        </header>
        <div className="tj-couple__stage">
          <article className="tj-vignette tj-vignette--nara" data-reveal>
            <PhotoButton index={2} className="tj-vignette__photo" />
            <div className="tj-vignette__caption"><span>Putra</span><h3>Nara Pradipta</h3><p>Bapak Aditya<br />&amp; Ibu Laras</p></div>
          </article>
          <div className="tj-couple__center" data-scene data-scene-depth="-0.65">
            <span className="tj-couple__orbit tj-couple__orbit--one" />
            <span className="tj-couple__orbit tj-couple__orbit--two" />
            <span aria-hidden="true">&amp;</span>
            <Decoration id="orn-game-tom-jerry-01" className="tj-couple__duo" />
          </div>
          <article className="tj-vignette tj-vignette--aruna" data-reveal>
            <PhotoButton index={4} className="tj-vignette__photo" />
            <div className="tj-vignette__caption"><span>Putri</span><h3>Aruna Kirana</h3><p>Bapak Baskara<br />&amp; Ibu Ratih</p></div>
          </article>
          <Decoration id="orn-game-tom-jerry-06" className="tj-couple__ribbon" />
        </div>
      </section>

      <section className="tj-story" aria-labelledby="tj-story-title">
        <div className="tj-story__header" data-reveal>
          <h2 id="tj-story-title">Cerita kami</h2>
        </div>
        <ol className="tj-story__reel">
          <li data-reveal><span>01</span><strong>Saling mengenal</strong></li>
          <li data-reveal><Decoration id="orn-game-tom-jerry-04" /><strong>Menjaga langkah</strong></li>
          <li data-reveal><span>03</span><strong>Mengucap janji</strong></li>
        </ol>
        <Decoration id="orn-game-tom-jerry-05" className="tj-story__mousehole" />
      </section>

      <section className="tj-events" id="acara" aria-labelledby="tj-events-title">
        <div className="tj-events__poster" data-reveal>
          <Decoration id="orn-game-tom-jerry-06" className="tj-events__ribbon" />
          <header className="tj-events__title">
            <p className="tj-overline">Acara</p>
            <h2 id="tj-events-title">12 <i>·</i> 12 <i>·</i> 27</h2>
            <p>Minggu</p>
          </header>
          <div className="tj-timebands">
            <article><span>Akad nikah</span><strong>08.00–10.00</strong><small>WIB</small></article>
            <article><span>Resepsi</span><strong>11.00–14.00</strong><small>WIB</small></article>
          </div>
          <div className="tj-events__footer"><span>Bandung</span><CalendarLink className="tj-calendar" /></div>
          <Countdown className="tj-countdown" />
        </div>
        <div className="tj-location" data-reveal>
          <div className="tj-location__copy"><p className="tj-overline">Lokasi acara</p><h3>Bandung</h3><p>Jawa Barat, Indonesia</p></div>
          <EventMap className="tj-map" />
          <Decoration id="orn-game-tom-jerry-05" className="tj-location__mousehole" />
        </div>
      </section>

      <section className="tj-gallery" id="galeri" aria-labelledby="tj-gallery-title">
        <header className="tj-gallery__heading" data-reveal>
          <h2 id="tj-gallery-title">Galeri</h2>
        </header>
        <div className="tj-gallery__reel">
          <figure className="tj-shot tj-shot--wide" data-reveal data-scene data-scene-depth="0.55">
            <PhotoButton index={1} className="tj-shot__button" />
          </figure>
          <figure className="tj-shot tj-shot--round" data-reveal data-scene data-scene-depth="-0.7">
            <PhotoButton index={2} className="tj-shot__button" />
          </figure>
          <figure className="tj-shot tj-shot--portrait" data-reveal data-scene data-scene-depth="0.6">
            <PhotoButton index={3} className="tj-shot__button" />
          </figure>
          <figure className="tj-shot tj-shot--wide tj-shot--offset" data-reveal data-scene data-scene-depth="-0.55">
            <PhotoButton index={4} className="tj-shot__button" />
          </figure>
          <figure className="tj-shot tj-shot--round tj-shot--offset-round" data-reveal data-scene data-scene-depth="0.7">
            <PhotoButton index={5} className="tj-shot__button" />
          </figure>
          <figure className="tj-shot tj-shot--portrait tj-shot--last" data-reveal data-scene data-scene-depth="-0.6">
            <PhotoButton index={6} className="tj-shot__button" />
          </figure>
        </div>
        <Decoration id="orn-game-tom-jerry-04" className="tj-gallery__heart" />
      </section>

      <section className="tj-rsvp" id="ucapan" aria-labelledby="tj-rsvp-title">
        <div className="tj-rsvp__heading" data-reveal><h2 id="tj-rsvp-title">Kehadiran &amp; doa</h2></div>
        <Rsvp className="tj-rsvp__form" />
      </section>

      <section className="tj-gift" aria-labelledby="tj-gift-title">
        <div data-reveal><h2 id="tj-gift-title">Hadiah</h2><Gift className="tj-gift__details" /></div>
      </section>

      <footer className="tj-closing" data-reveal>
        <Decoration id="orn-game-tom-jerry-02" className="tj-closing__envelope" />
        <p>Terima kasih atas doa dan kehadiran Anda.</p>
        <strong>Nara <i>&amp;</i> Aruna</strong>
      </footer>
    </div>
  );
}

export function TomJerryPreview() {
  return (
    <InvitationFrame templateId="game-tom-jerry" name="Tom & Jerry" className="tk-tom-jerry" cover={<TomJerryCover />}>
      <TomJerryContent />
    </InvitationFrame>
  );
}
