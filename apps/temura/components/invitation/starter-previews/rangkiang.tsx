import type { CSSProperties } from "react";
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
import "./rangkiang.css";

function RangkiangCover() {
  return (
    <section className="rm-cover" aria-label="Undangan Nara dan Aruna">
      <Decoration id="bg-adat-minang" className="rm-cover-paper" eager />
      <div className="rm-cover-veil" aria-hidden="true" />
      <div className="rm-roof rm-roof-back" data-scene data-scene-depth="0.45" style={{ "--tk-counter": "-34px" } as CSSProperties}>
        <Decoration id="orn-adat-minang-02" className="rm-cover-gadang" eager />
      </div>
      <div className="rm-roof rm-roof-left" data-scene data-scene-depth="0.7" style={{ "--tk-drift": "-18px" } as CSSProperties}>
        <Decoration id="orn-adat-minang-01" className="rm-cover-corner" eager />
      </div>
      <div className="rm-roof rm-roof-right" data-scene data-scene-depth="-0.7" style={{ "--tk-drift": "18px" } as CSSProperties}>
        <Decoration id="orn-adat-minang-01" className="rm-cover-corner" eager />
      </div>
      <Decoration id="orn-adat-minang-06" className="rm-cover-rosette" eager />
      <div className="rm-cover-copy">
        <p className="rm-cover-date">12 · 12 · 2027</p>
        <h1 className="rm-cover-monogram">N<span>&</span>A</h1>
        <p className="rm-cover-names">Nara Pradipta <i>&</i> Aruna Kirana</p>
        <OpenButton className="rm-open-button" />
      </div>
      <span className="rm-cover-rule" aria-hidden="true" />
    </section>
  );
}

function RangkiangContent() {
  return (
    <div className="rm-content">
      <section className="rm-prologue" aria-labelledby="rm-title">
        <Decoration id="orn-adat-minang-01" className="rm-prologue-roof" />
        <Decoration id="orn-adat-minang-05" className="rm-prologue-line" />
        <p className="rm-eyebrow" data-reveal>Bandung · 12 Desember 2027</p>
        <h1 id="rm-title" className="rm-prologue-title" data-reveal>
          Nara <i>&</i> Aruna
        </h1>
        <p className="rm-prologue-copy" data-reveal>Dengan bahagia, kami mengundang Anda merayakan hari pernikahan kami.</p>
        <a href="#mempelai" className="rm-scroll-link" data-reveal>Mulai dari sini <span aria-hidden="true">↓</span></a>
      </section>

      <section className="rm-couple" id="mempelai" aria-label="Mempelai">
        <div className="rm-couple-heading" data-reveal>
          <Decoration id="orn-adat-minang-06" className="rm-couple-medallion" />
          <h2>Nara &amp; Aruna</h2>
        </div>
        <article className="rm-person-row rm-person-nara" data-reveal>
          <div className="rm-person-photo rm-photo-first"><Photo index={1} alt="Potret Nara dan Aruna di kebun teh" /></div>
          <div className="rm-person-copy">
            <span className="rm-person-number">01 / Mempelai pria</span>
            <h3>Nara Pradipta</h3>
            <p>Putra dari Bapak Aditya<br />&amp; Ibu Laras</p>
          </div>
          <Decoration id="orn-adat-minang-04" className="rm-person-flower rm-flower-first" />
        </article>
        <div className="rm-between" aria-hidden="true"><span>dan</span><Decoration id="orn-adat-minang-03" /></div>
        <article className="rm-person-row rm-person-aruna" data-reveal>
          <div className="rm-person-photo rm-photo-second"><Photo index={4} alt="Potret Nara dan Aruna di tepi danau" /></div>
          <div className="rm-person-copy">
            <span className="rm-person-number">02 / Mempelai wanita</span>
            <h3>Aruna Kirana</h3>
            <p>Putri dari Bapak Baskara<br />&amp; Ibu Ratih</p>
          </div>
          <Decoration id="orn-adat-minang-04" className="rm-person-flower rm-flower-second" />
        </article>
      </section>

      <section className="rm-ceremony" id="acara" aria-labelledby="rm-date-title">
        <div className="rm-date-stage" data-reveal>
          <Decoration id="orn-adat-minang-06" className="rm-date-medallion" />
          <h2 className="rm-vertical-date" id="rm-date-title"><span>12</span><i>·</i><span>12</span><i>·</i><span>27</span></h2>
          <p className="rm-weekday">Minggu, 12 Desember 2027</p>
          <Countdown className="rm-countdown" />
          <CalendarLink className="rm-calendar-link" />
        </div>
        <div className="rm-event-bands">
          <article className="rm-event-band rm-akad" data-reveal>
            <span className="rm-event-index">I</span>
            <div><h3>Akad nikah</h3><p>08.00–10.00 WIB</p></div>
            <span className="rm-event-day">12.12.27</span>
          </article>
          <article className="rm-event-band rm-resepsi" data-reveal>
            <span className="rm-event-index">II</span>
            <div><h3>Resepsi</h3><p>11.00–14.00 WIB</p></div>
            <span className="rm-event-day">Bandung</span>
          </article>
        </div>
        <div className="rm-location" data-reveal>
          <div className="rm-location-heading"><p className="rm-eyebrow">Lokasi acara</p><h3>Bandung</h3><p>Jawa Barat, Indonesia</p></div>
          <EventMap className="rm-map" />
        </div>
      </section>

      <section className="rm-story" aria-labelledby="rm-story-title">
        <Decoration id="orn-adat-minang-01" className="rm-story-edge" />
        <div className="rm-story-inner">
          <h2 id="rm-story-title" data-reveal>Cerita kami</h2>
          <ol>
            <li data-reveal><span>2022</span><p>Berkenalan lewat teman.</p></li>
            <li data-reveal><span>2025</span><p>Memilih berjalan bersama.</p></li>
            <li data-reveal><span>2027</span><p>Memulai hari baru sebagai keluarga.</p></li>
          </ol>
        </div>
        <Decoration id="orn-adat-minang-03" className="rm-story-ribbon" />
      </section>

      <section className="rm-gallery" id="galeri" aria-labelledby="rm-gallery-title">
        <div className="rm-gallery-heading" data-reveal>
          <h2 id="rm-gallery-title">Galeri</h2>
          <Decoration id="orn-adat-minang-05" className="rm-gallery-divider" />
        </div>
        <div className="rm-gallery-scene rm-gallery-first" data-scene data-scene-depth="0.8" style={{ "--tk-counter": "18px" } as CSSProperties}>
          <div className="rm-photo-small rm-photo-left" data-reveal><PhotoButton index={1} className="rm-photo-action" /></div>
          <div className="rm-photo-large" data-reveal><PhotoButton index={2} className="rm-photo-action" /><span className="rm-photo-index">01—03</span></div>
          <div className="rm-photo-small rm-photo-right" data-reveal><PhotoButton index={3} className="rm-photo-action" /></div>
        </div>
        <div className="rm-gallery-scene rm-gallery-second" data-scene data-scene-depth="-0.75" style={{ "--tk-counter": "-18px" } as CSSProperties}>
          <div className="rm-photo-small rm-photo-left" data-reveal><PhotoButton index={4} className="rm-photo-action" /></div>
          <div className="rm-photo-large" data-reveal><PhotoButton index={5} className="rm-photo-action" /><span className="rm-photo-index">04—06</span></div>
          <div className="rm-photo-small rm-photo-right" data-reveal><PhotoButton index={6} className="rm-photo-action" /></div>
        </div>
      </section>

      <section className="rm-rsvp" id="ucapan" aria-labelledby="rm-rsvp-title">
        <div className="rm-rsvp-heading" data-reveal><h2 id="rm-rsvp-title">Kehadiran &amp; doa</h2></div>
        <Rsvp className="rm-rsvp-form" />
      </section>

      <section className="rm-gift" aria-labelledby="rm-gift-title">
        <Decoration id="orn-adat-minang-04" className="rm-gift-flower" />
        <div data-reveal><h2 id="rm-gift-title">Hadiah</h2><Gift className="rm-gift-control" /></div>
      </section>

      <footer className="rm-closing" data-reveal>
        <Decoration id="orn-adat-minang-02" className="rm-closing-roof" />
        <Decoration id="orn-adat-minang-05" className="rm-closing-line" />
        <p>Terima kasih atas doa dan kehadiran Anda.</p>
        <p className="rm-closing-names">Nara <i>&</i> Aruna</p>
        <span>12 · 12 · 2027</span>
      </footer>
    </div>
  );
}

export function RangkiangPreview() {
  return (
    <InvitationFrame templateId="adat-minang" name="Rangkiang" className="tk-rangkiang" cover={<RangkiangCover />}>
      <RangkiangContent />
    </InvitationFrame>
  );
}
