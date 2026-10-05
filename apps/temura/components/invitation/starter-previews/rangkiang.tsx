"use client";

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
import "./rangkiang.css";

const moments = [
  { year: "2022", text: "Berkenalan lewat teman." },
  { year: "2025", text: "Memilih berjalan bersama." },
  { year: "2027", text: "Memulai keluarga dengan doa orang tua." },
];

function RangkiangCover() {
  return (
    <section className="rm-cover" aria-label="Undangan Nara dan Aruna">
      <div className="rm-cover-wall" aria-hidden="true"><Decoration id="bg-adat-minang" eager /></div>
      <div className="rm-cover-wash" aria-hidden="true" />
      <div className="rm-cover-roof" aria-hidden="true"><Decoration id="orn-adat-minang-02" eager /></div>
      <div className="rm-cover-copy">
        <p>Bandung · 12 Desember 2027</p>
        <h1>Nara <i>&amp;</i> Aruna</h1>
        <p>Nara Pradipta · Aruna Kirana</p>
        <OpenButton className="rm-open" />
      </div>
      <span className="rm-cover-edge rm-cover-edge--left" aria-hidden="true" />
      <span className="rm-cover-edge rm-cover-edge--right" aria-hidden="true" />
    </section>
  );
}

export function RangkiangPreview() {
  return (
    <InvitationFrame templateId="adat-minang" name="Rangkiang" className="rangkiang" cover={<RangkiangCover />}>
      <div className="rm-world">
        <section className="rm-prologue" id="mempelai" aria-labelledby="rm-title">
          <div className="rm-prologue-roof" aria-hidden="true"><Decoration id="orn-adat-minang-02" /></div>
          <div className="rm-prologue-copy" data-reveal>
            <p>Bandung · 12 Desember 2027</p>
            <h2 id="rm-title">Nara <i>&amp;</i> Aruna</h2>
            <p>Dengan restu keluarga, kami mengundang Anda.</p>
          </div>
          <PhotoButton index={1} className="rm-prologue-photo" />
        </section>

        <section className="rm-programme" id="acara" aria-labelledby="rm-programme-title">
          <header className="rm-programme-date" data-reveal>
            <p>Hari pernikahan</p>
            <h2 id="rm-programme-title"><span>12</span><i>·</i><span>12</span><i>·</i><span>27</span></h2>
            <Countdown className="rm-countdown" />
            <CalendarLink />
          </header>
          <div className="rm-programme-content" data-reveal>
            <ol>
              <li><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time><h3>Akad nikah</h3></li>
              <li><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time><h3>Resepsi</h3></li>
            </ol>
            <div className="rm-map-copy"><p>Lokasi acara</p><h3>Bandung</h3><p>Jawa Barat, Indonesia</p></div>
            <EventMap className="rm-map" />
          </div>
          <div className="rm-programme-rail" aria-hidden="true"><Decoration id="orn-adat-minang-05" /></div>
        </section>

        <section className="rm-diptych-section" aria-labelledby="rm-diptych-title">
          <header data-reveal><h2 id="rm-diptych-title">Mempelai</h2></header>
          <div className="rm-diptych">
            <div className="rm-diptych-songket" aria-hidden="true"><Decoration id="orn-adat-minang-03" /></div>
            <article className="rm-person" data-reveal>
              <PhotoButton index={2} className="rm-person-photo" />
              <div><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya dan Ibu Laras</p></div>
            </article>
            <span className="rm-diptych-seam" aria-hidden="true">&amp;</span>
            <article className="rm-person" data-reveal>
              <PhotoButton index={3} className="rm-person-photo" />
              <div><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara dan Ibu Ratih</p></div>
            </article>
          </div>
        </section>

        <section className="rm-gallery" id="galeri" aria-labelledby="rm-gallery-title">
          <header data-reveal><h2 id="rm-gallery-title">Galeri</h2></header>
          <div className="rm-banner-list">
            <div className="rm-banner-pair rm-banner-pair--first">
              <PhotoButton index={1} className="rm-banner-photo" />
              <PhotoButton index={2} className="rm-banner-photo" />
            </div>
            <div className="rm-banner-pair rm-banner-pair--second">
              <PhotoButton index={3} className="rm-banner-photo" />
              <PhotoButton index={4} className="rm-banner-photo" />
            </div>
            <div className="rm-banner-pair rm-banner-pair--third">
              <PhotoButton index={5} className="rm-banner-photo" />
              <PhotoButton index={6} className="rm-banner-photo" />
            </div>
          </div>
        </section>

        <section className="rm-story" aria-labelledby="rm-story-title">
          <h2 id="rm-story-title" data-reveal>Cerita kami</h2>
          <ol>
            {moments.map((moment) => (
              <li data-reveal key={moment.year}><time dateTime={moment.year}>{moment.year}</time><p>{moment.text}</p></li>
            ))}
          </ol>
        </section>

        <section className="rm-closing" id="ucapan" aria-labelledby="rm-closing-title">
          <div className="rm-closing-roof" aria-hidden="true"><Decoration id="orn-adat-minang-02" /></div>
          <div className="rm-closing-content" data-reveal>
            <h2 id="rm-closing-title">Kehadiran &amp; ucapan</h2>
            <Rsvp className="rm-rsvp" />
            <Gift className="rm-gift" />
          </div>
        </section>
      </div>
    </InvitationFrame>
  );
}
