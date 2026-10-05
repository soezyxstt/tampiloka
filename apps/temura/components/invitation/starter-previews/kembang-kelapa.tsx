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
import "./kembang-kelapa.css";

const moments = [
  { year: "2022", text: "Berkenalan lewat teman." },
  { year: "2025", text: "Memilih berjalan bersama." },
  { year: "2027", text: "Memulai keluarga dengan doa orang tua." },
];

function KembangKelapaCover() {
  return (
    <section className="kk-cover" aria-label="Undangan Nara dan Aruna">
      <div className="kk-cover-paper" aria-hidden="true"><Decoration id="bg-adat-betawi" eager /></div>
      <div className="kk-cover-shade" aria-hidden="true" />
      <div className="kk-cover-garland" aria-hidden="true"><Decoration id="orn-adat-betawi-03" eager /></div>
      <div className="kk-cover-tiles" aria-hidden="true"><Decoration id="orn-adat-betawi-04" eager /></div>
      <div className="kk-cover-content">
        <p>Bandung · 12 Desember 2027</p>
        <Photo index={1} className="kk-cover-photo" alt="Nara dan Aruna di kebun teh" />
        <h1>Nara <i>&amp;</i> Aruna</h1>
        <p>Nara Pradipta · Aruna Kirana</p>
        <OpenButton className="kk-open-button" />
      </div>
      <span className="kk-cover-veranda" aria-hidden="true" />
    </section>
  );
}

export function KembangKelapaPreview() {
  return (
    <InvitationFrame templateId="adat-betawi" name="Kembang Kelapa" className="kembang-kelapa" cover={<KembangKelapaCover />}>
      <div className="kk-world">
        <section className="kk-veranda" id="mempelai" aria-labelledby="kk-couple-title">
          <div className="kk-veranda-heading" data-reveal>
            <p>Bandung · Minggu, 12 Desember 2027</p>
            <h2 id="kk-couple-title">Mempelai</h2>
          </div>
          <div className="kk-window-pair">
            <article className="kk-window" data-reveal>
              <div className="kk-window-frame kk-window-frame--left"><PhotoButton index={2} className="kk-window-photo" /></div>
              <div className="kk-window-copy"><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya dan Ibu Laras</p></div>
            </article>
            <span className="kk-window-join" aria-hidden="true">&amp;</span>
            <article className="kk-window" data-reveal>
              <div className="kk-window-frame kk-window-frame--right"><PhotoButton index={3} className="kk-window-photo" /></div>
              <div className="kk-window-copy"><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara dan Ibu Ratih</p></div>
            </article>
          </div>
          <div className="kk-veranda-garland" aria-hidden="true"><Decoration id="orn-adat-betawi-01" /></div>
        </section>

        <section className="kk-neighborhood" id="galeri" aria-labelledby="kk-gallery-title">
          <header data-reveal><h2 id="kk-gallery-title">Galeri</h2></header>
          <div className="kk-neighborhood-wall">
            <PhotoButton index={1} className="kk-wall-photo kk-wall-photo--wide kk-wall-photo--one" />
            <PhotoButton index={2} className="kk-wall-photo kk-wall-photo--two" />
            <PhotoButton index={3} className="kk-wall-photo kk-wall-photo--three" />
            <PhotoButton index={4} className="kk-wall-photo kk-wall-photo--wide kk-wall-photo--four" />
            <PhotoButton index={5} className="kk-wall-photo kk-wall-photo--five" />
            <PhotoButton index={6} className="kk-wall-photo kk-wall-photo--six" />
          </div>
          <div className="kk-neighborhood-trim" aria-hidden="true"><Decoration id="orn-adat-betawi-06" /></div>
        </section>

        <section className="kk-courtyard" id="acara" aria-labelledby="kk-event-title">
          <div className="kk-courtyard-arch" aria-hidden="true"><Decoration id="orn-adat-betawi-02" /></div>
          <header className="kk-courtyard-date" data-reveal>
            <p>Hari pernikahan</p>
            <h2 id="kk-event-title"><span>12</span><i>·</i><span>12</span><i>·</i><span>27</span></h2>
            <Countdown className="kk-countdown" />
            <CalendarLink />
          </header>
          <div className="kk-courtyard-details" data-reveal>
            <ol>
              <li><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time><h3>Akad nikah</h3></li>
              <li><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time><h3>Resepsi</h3></li>
            </ol>
            <div className="kk-location"><div><p>Lokasi acara</p><h3>Bandung</h3><p>Jawa Barat, Indonesia</p></div><EventMap className="kk-map" /></div>
          </div>
        </section>

        <section className="kk-closing" id="ucapan" aria-labelledby="kk-closing-title">
          <div className="kk-closing-flowers" aria-hidden="true"><Decoration id="orn-adat-betawi-05" /></div>
          <div className="kk-closing-story">
            <h2 data-reveal>Cerita kami</h2>
            <ol>
              {moments.map((moment) => (
                <li data-reveal key={moment.year}><time dateTime={moment.year}>{moment.year}</time><p>{moment.text}</p></li>
              ))}
            </ol>
          </div>
          <div className="kk-closing-response" data-reveal>
            <h2 id="kk-closing-title">Kehadiran &amp; ucapan</h2>
            <Rsvp className="kk-rsvp" />
            <Gift className="kk-gift" />
          </div>
        </section>

        <footer className="kk-footer">
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <p>Nara <i>&amp;</i> Aruna</p>
          <span>12 · 12 · 2027</span>
        </footer>
      </div>
    </InvitationFrame>
  );
}
