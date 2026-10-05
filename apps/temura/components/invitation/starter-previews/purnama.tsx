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
import "./purnama.css";
import "./purnama-immersive.css";

function PurnamaCover() {
  return (
    <section className="purnama__cover" aria-label="Undangan Nara dan Aruna">
      <div className="purnama__cover-garden"><Decoration id="bg-adat-bali" eager /></div>
      <div className="purnama__cover-rail" aria-hidden="true">
        <span>12</span><i /><span>12</span><i /><span>2027</span>
      </div>
      <Photo index={1} className="purnama__cover-photo" alt="Nara dan Aruna mengenakan busana adat di kebun teh" />
      <div className="purnama__cover-copy">
        <p>Bandung, Jawa Barat</p>
        <h1>Nara <i>&amp;</i> Aruna</h1>
        <OpenButton className="purnama__open" />
      </div>
      <div className="purnama__cover-candi" aria-hidden="true"><Decoration id="orn-adat-bali-04" eager /></div>
      <div className="purnama__cover-frond" aria-hidden="true"><Decoration id="orn-adat-bali-02" eager /></div>
    </section>
  );
}

export function PurnamaPreview() {
  return (
    <InvitationFrame templateId="purnama" name="Purnama" className="purnama" cover={<PurnamaCover />}>
      <div className="purnama__world">
        <section className="purnama__courtyard" id="mempelai" aria-labelledby="purnama-title">
          <div className="purnama__courtyard-scene" aria-hidden="true"><Decoration id="bg-adat-bali" /></div>
          <div className="purnama__courtyard-candi" aria-hidden="true"><Decoration id="orn-adat-bali-04" /></div>
          <div className="purnama__courtyard-copy" data-reveal>
            <p>Bandung · 12 Desember 2027</p>
            <h2 id="purnama-title">Nara <i>&amp;</i><br />Aruna</h2>
            <p>Dengan restu keluarga, kami mengundang Anda.</p>
          </div>
          <PhotoButton index={1} className="purnama__courtyard-photo" />
          <div className="purnama__courtyard-leaf" aria-hidden="true"><Decoration id="orn-adat-bali-02" /></div>
          <span className="purnama__courtyard-stone" aria-hidden="true" />
        </section>

        <section className="purnama__agenda" id="acara" aria-labelledby="purnama-agenda-title">
          <header className="purnama__agenda-date" data-reveal>
            <p>Minggu</p>
            <h2 id="purnama-agenda-title"><span>12</span><i>·</i><span>12</span><i>·</i><span>27</span></h2>
            <Countdown className="purnama__countdown" />
          </header>
          <div className="purnama__agenda-detail" data-reveal>
            <ol>
              <li><time dateTime="2027-12-12T08:00:00+07:00">08.00 WIB</time><div><h3>Akad nikah</h3><p>Bandung, Jawa Barat</p></div></li>
              <li><time dateTime="2027-12-12T11:00:00+07:00">11.00 WIB</time><div><h3>Resepsi</h3><p>Bandung, Jawa Barat</p></div></li>
            </ol>
            <div className="purnama__agenda-map"><EventMap className="purnama__map" /><CalendarLink /></div>
          </div>
          <div className="purnama__agenda-flower" aria-hidden="true"><Decoration id="orn-adat-bali-01" /></div>
        </section>

        <section className="purnama__niches" aria-label="Mempelai">
          <header data-reveal><h2>Mempelai</h2></header>
          <div className="purnama__niche-grid">
            <article className="purnama__niche purnama__niche--nara" data-reveal>
              <div className="purnama__niche-arch"><PhotoButton index={2} className="purnama__niche-photo" /></div>
              <div><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya dan Ibu Laras</p></div>
            </article>
            <article className="purnama__niche purnama__niche--aruna" data-reveal>
              <div className="purnama__niche-arch"><PhotoButton index={3} className="purnama__niche-photo" /></div>
              <div><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara dan Ibu Ratih</p></div>
            </article>
          </div>
          <div className="purnama__niche-garland" aria-hidden="true"><Decoration id="orn-adat-bali-03" /></div>
        </section>

        <section className="purnama__story" aria-labelledby="purnama-story-title">
          <h2 id="purnama-story-title" data-reveal>Cerita kami</h2>
          <ol>
            <li data-reveal><time dateTime="2022">2022</time><p>Berkenalan lewat teman.</p></li>
            <li data-reveal><time dateTime="2025">2025</time><p>Memilih berjalan bersama.</p></li>
            <li data-reveal><time dateTime="2027">2027</time><p>Memulai keluarga dengan doa orang tua.</p></li>
          </ol>
          <div className="purnama__story-leaf" aria-hidden="true"><Decoration id="orn-adat-bali-05" /></div>
        </section>

        <section className="purnama__gallery" id="galeri" aria-labelledby="purnama-gallery-title">
          <header data-reveal><h2 id="purnama-gallery-title">Galeri</h2></header>
          <div className="purnama__gallery-layout">
            <aside className="purnama__garden-architecture" aria-hidden="true">
              <Decoration id="orn-adat-bali-04" />
              <Decoration id="orn-adat-bali-02" />
            </aside>
            <div className="purnama__garden-path">
              <PhotoButton index={1} className="purnama__garden-photo purnama__garden-photo--one" />
              <PhotoButton index={2} className="purnama__garden-photo purnama__garden-photo--two" />
              <PhotoButton index={3} className="purnama__garden-photo purnama__garden-photo--three" />
              <PhotoButton index={4} className="purnama__garden-photo purnama__garden-photo--four" />
              <PhotoButton index={5} className="purnama__garden-photo purnama__garden-photo--five" />
              <PhotoButton index={6} className="purnama__garden-photo purnama__garden-photo--six" />
            </div>
          </div>
        </section>

        <section className="purnama__closing" id="ucapan" aria-labelledby="purnama-closing-title">
          <div className="purnama__closing-arch" aria-hidden="true"><Decoration id="orn-adat-bali-04" /></div>
          <div className="purnama__closing-copy" data-reveal>
            <h2 id="purnama-closing-title">Kehadiran &amp; ucapan</h2>
            <Rsvp className="purnama__rsvp" />
            <Gift className="purnama__gift" />
          </div>
        </section>
      </div>
    </InvitationFrame>
  );
}
