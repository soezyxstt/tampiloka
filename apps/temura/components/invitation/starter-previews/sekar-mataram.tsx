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
import "./sekar-mataram.css";

const milestones = [
  { year: "2022", text: "Berkenalan lewat teman." },
  { year: "2025", text: "Memilih berjalan bersama." },
  { year: "2027", text: "Memulai keluarga dengan doa orang tua." },
];

function SekarCover() {
  return (
    <section className="sekar__cover" aria-label="Undangan Nara dan Aruna">
      <div className="sekar__cover-print" aria-hidden="true"><Decoration id="bg-adat-jawa" eager /></div>
      <div className="sekar__cover-medallion" aria-hidden="true"><Decoration id="orn-adat-jawa-02" eager /></div>
      <div className="sekar__cover-copy">
        <p>12 · 12 · 2027</p>
        <h1><span>Nara <small>Pradipta</small></span><i>&amp;</i><span>Aruna <small>Kirana</small></span></h1>
        <p>Bandung, Jawa Barat</p>
        <OpenButton className="sekar__open" />
      </div>
      <div className="sekar__cover-batik" aria-hidden="true"><Decoration id="orn-adat-jawa-03" eager /></div>
    </section>
  );
}

export function SekarMataramPreview() {
  return (
    <InvitationFrame templateId="adat-jawa" name="Sekar Mataram" className="sekar-mataram" cover={<SekarCover />}>
      <div className="sekar__world">
        <section className="sekar__genealogy" id="mempelai" aria-labelledby="sekar-genealogy-title">
          <div className="sekar__genealogy-paper" aria-hidden="true"><Decoration id="bg-adat-jawa" /></div>
          <div className="sekar__genealogy-head" data-reveal>
            <div className="sekar__genealogy-seal" aria-hidden="true"><Decoration id="orn-adat-jawa-02" /></div>
            <h2 id="sekar-genealogy-title">Mempelai</h2>
            <p>Nara Pradipta &amp; Aruna Kirana</p>
          </div>
          <div className="sekar__family-pair">
            <article className="sekar__family-person" data-reveal>
              <PhotoButton index={2} className="sekar__family-photo" />
              <div className="sekar__family-name"><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya dan Ibu Laras</p></div>
            </article>
            <div className="sekar__family-join" aria-hidden="true"><span>&amp;</span></div>
            <article className="sekar__family-person" data-reveal>
              <PhotoButton index={3} className="sekar__family-photo" />
              <div className="sekar__family-name"><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara dan Ibu Ratih</p></div>
            </article>
          </div>
          <div className="sekar__genealogy-rule" aria-hidden="true" />
        </section>

        <section className="sekar__salon" id="galeri" aria-labelledby="sekar-salon-title">
          <header data-reveal><h2 id="sekar-salon-title">Galeri</h2></header>
          <div className="sekar__salon-wall">
            <PhotoButton index={1} className="sekar__salon-photo sekar__salon-photo--one" />
            <PhotoButton index={2} className="sekar__salon-photo sekar__salon-photo--two" />
            <PhotoButton index={3} className="sekar__salon-photo sekar__salon-photo--three" />
            <PhotoButton index={4} className="sekar__salon-photo sekar__salon-photo--four" />
            <PhotoButton index={5} className="sekar__salon-photo sekar__salon-photo--five" />
            <PhotoButton index={6} className="sekar__salon-photo sekar__salon-photo--six" />
          </div>
        </section>

        <section className="sekar__ledger" id="acara" aria-labelledby="sekar-ledger-title">
          <header className="sekar__ledger-date" data-reveal>
            <p>Minggu</p>
            <h2 id="sekar-ledger-title"><span>12</span><i>/</i><span>12</span><i>/</i><span>27</span></h2>
            <p>Bandung, Jawa Barat</p>
            <Countdown className="sekar__countdown" />
            <CalendarLink />
          </header>
          <div className="sekar__ledger-details" data-reveal>
            <ol>
              <li><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time><h3>Akad nikah</h3></li>
              <li><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time><h3>Resepsi</h3></li>
            </ol>
            <div className="sekar__ledger-map"><div><h3>Lokasi</h3><p>Bandung, Jawa Barat</p></div><EventMap className="sekar__map" /></div>
          </div>
          <div className="sekar__ledger-carving" aria-hidden="true"><Decoration id="orn-adat-jawa-04" /></div>
        </section>

        <section className="sekar__chronicle" aria-labelledby="sekar-chronicle-title">
          <div className="sekar__chronicle-heading" data-reveal><h2 id="sekar-chronicle-title">Cerita kami</h2></div>
          <ol>
            {milestones.map((item) => (
              <li data-reveal key={item.year}><time dateTime={item.year}>{item.year}</time><p>{item.text}</p></li>
            ))}
          </ol>
          <div className="sekar__chronicle-flower" aria-hidden="true"><Decoration id="orn-adat-jawa-01" /></div>
        </section>

        <section className="sekar__closing" id="ucapan" aria-labelledby="sekar-closing-title">
          <div className="sekar__closing-paper" aria-hidden="true"><Decoration id="bg-adat-jawa" /></div>
          <div className="sekar__closing-seal" aria-hidden="true"><Decoration id="orn-adat-jawa-02" /><span>N <i>&amp;</i> A</span></div>
          <div className="sekar__closing-content" data-reveal>
            <h2 id="sekar-closing-title">Ucapan</h2>
            <Rsvp className="sekar__rsvp" />
            <Gift className="sekar__gift" />
          </div>
        </section>
      </div>
    </InvitationFrame>
  );
}
