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
import "./kembang-kelapa.css";

function KembangKelapaCover() {
  return (
    <section className="kk-cover" aria-label="Undangan Nara dan Aruna">
      <Decoration id="bg-adat-betawi" className="kk-cover-paper" eager />
      <div className="kk-cover-wash" aria-hidden="true" />
      <Decoration id="orn-adat-betawi-01" className="kk-cover-kembang kk-cover-kembang-left" eager />
      <Decoration id="orn-adat-betawi-01" className="kk-cover-kembang kk-cover-kembang-right" eager />
      <Decoration id="orn-adat-betawi-02" className="kk-cover-encim" eager />
      <div className="kk-cover-content">
        <p className="kk-cover-date">12 · 12 · 2027</p>
        <h1 className="kk-cover-names">
          <span className="kk-name-top">Nara</span>
          <Photo index={1} className="kk-cover-photo" alt="Nara dan Aruna di kebun teh" />
          <span className="kk-name-bottom"><i>&amp;</i> Aruna</span>
        </h1>
        <p className="kk-cover-fullnames">Nara Pradipta <span>·</span> Aruna Kirana</p>
        <OpenButton className="kk-open-button" />
      </div>
      <span className="kk-cover-floor" aria-hidden="true" />
    </section>
  );
}

function KembangKelapaContent() {
  return (
    <div className="kk-content">
      <section className="kk-welcome" aria-labelledby="kk-welcome-title">
        <div className="kk-welcome-spray" data-scene data-scene-depth="0.65" style={{ "--tk-drift": "16px" } as CSSProperties}>
          <Decoration id="orn-adat-betawi-01" />
        </div>
        <div className="kk-welcome-copy">
          <p className="kk-eyebrow" data-reveal>Bandung · Minggu, 12 Desember 2027</p>
          <h1 id="kk-welcome-title" className="kk-welcome-title" data-reveal>Hari bahagia<br /><i>Nara &amp; Aruna</i></h1>
          <p data-reveal>Dengan bahagia, kami mengundang Anda untuk hadir.</p>
          <a className="kk-welcome-link" href="#mempelai" data-reveal>Lihat undangan <span aria-hidden="true">↓</span></a>
        </div>
        <div className="kk-welcome-frame" data-scene data-scene-depth="-0.8" style={{ "--tk-counter": "-20px" } as CSSProperties}>
          <Photo index={2} className="kk-welcome-photo" alt="Nara dan Aruna berjalan bersama" />
          <Decoration id="orn-adat-betawi-04" className="kk-welcome-medallion" />
        </div>
      </section>

      <section className="kk-couple" id="mempelai" aria-labelledby="kk-couple-title">
        <div className="kk-couple-heading" data-reveal><h2 id="kk-couple-title">Dua nama,<br /><i>satu perjalanan.</i></h2></div>
        <div className="kk-couple-strip" data-reveal>
          <Photo index={3} className="kk-strip-photo kk-strip-left" alt="Potret Nara dan Aruna di hutan pinus" />
          <Photo index={4} className="kk-strip-photo kk-strip-right" alt="Nara dan Aruna di tepi danau" />
        </div>
        <div className="kk-couple-names">
          <article className="kk-person kk-person-left" data-reveal>
            <span>01 / Putra</span><h3>Nara Pradipta</h3>
            <p>Bapak Aditya<br />&amp; Ibu Laras</p>
          </article>
          <Decoration id="orn-adat-betawi-06" className="kk-couple-ribbon" />
          <article className="kk-person kk-person-right" data-reveal>
            <span>02 / Putri</span><h3>Aruna Kirana</h3>
            <p>Bapak Baskara<br />&amp; Ibu Ratih</p>
          </article>
        </div>
      </section>

      <section className="kk-events" id="acara" aria-labelledby="kk-events-title">
        <div className="kk-events-header" data-reveal>
          <Decoration id="orn-adat-betawi-05" className="kk-event-fan" />
          <h2 id="kk-events-title">12.12.27</h2>
          <p>Minggu, 12 Desember 2027</p>
          <Countdown className="kk-countdown" />
          <CalendarLink className="kk-calendar" />
        </div>
        <div className="kk-fold" data-reveal>
          <article className="kk-fold-leaf kk-fold-akad">
            <span className="kk-fold-number">01</span><h3>Akad nikah</h3>
            <p>08.00–10.00 WIB</p><span className="kk-fold-day">Minggu pagi</span>
          </article>
          <article className="kk-fold-leaf kk-fold-resepsi">
            <span className="kk-fold-number">02</span><h3>Resepsi</h3>
            <p>11.00–14.00 WIB</p><span className="kk-fold-day">Bandung</span>
          </article>
        </div>
        <div className="kk-location" data-reveal>
          <div className="kk-location-copy"><p className="kk-eyebrow">Lokasi acara</p><h3>Bandung</h3><p>Jawa Barat, Indonesia</p></div>
          <EventMap className="kk-map" />
        </div>
      </section>

      <section className="kk-story" aria-labelledby="kk-story-title">
        <div className="kk-story-encim" data-scene data-scene-depth="-0.7" style={{ "--tk-drift": "-14px" } as CSSProperties}>
        <Decoration id="orn-adat-betawi-02" />
        </div>
        <Decoration id="orn-adat-betawi-04" className="kk-story-tile" />
        <div className="kk-story-heading" data-reveal><h2 id="kk-story-title">Cerita kami</h2></div>
        <ol className="kk-story-circles">
          <li data-reveal><div className="kk-story-photo"><Photo index={4} alt="Nara dan Aruna di tepi danau" /></div><span>2022</span><p>Berkenalan lewat teman.</p></li>
          <li data-reveal><div className="kk-story-photo"><Photo index={5} alt="Nara dan Aruna dengan latar pegunungan" /></div><span>2025</span><p>Memilih berjalan bersama.</p></li>
          <li data-reveal><div className="kk-story-photo"><Photo index={6} alt="Nara dan Aruna menari saat matahari terbenam" /></div><span>2027</span><p>Memulai hari baru.</p></li>
        </ol>
      </section>

      <section className="kk-gallery" id="galeri" aria-labelledby="kk-gallery-title">
        <div className="kk-gallery-heading" data-reveal>
          <h2 id="kk-gallery-title">Galeri</h2>
          <Decoration id="orn-adat-betawi-06" className="kk-gallery-ribbon" />
        </div>
        <div className="kk-postcards">
          <div className="kk-postcard-row kk-postcard-row-one" data-scene data-scene-depth="0.65" style={{ "--tk-counter": "16px" } as CSSProperties}>
            <PhotoButton index={1} className="kk-postcard kk-postcard-one" />
            <PhotoButton index={2} className="kk-postcard kk-postcard-two" />
          </div>
          <div className="kk-postcard-row kk-postcard-row-two" data-scene data-scene-depth="-0.75" style={{ "--tk-counter": "-14px" } as CSSProperties}>
            <PhotoButton index={3} className="kk-postcard kk-postcard-three" />
            <PhotoButton index={4} className="kk-postcard kk-postcard-four" />
          </div>
          <div className="kk-postcard-row kk-postcard-row-three" data-scene data-scene-depth="0.55" style={{ "--tk-counter": "12px" } as CSSProperties}>
            <PhotoButton index={5} className="kk-postcard kk-postcard-five" />
            <PhotoButton index={6} className="kk-postcard kk-postcard-six" />
          </div>
        </div>
      </section>

      <section className="kk-rsvp" id="ucapan" aria-labelledby="kk-rsvp-title">
        <Decoration id="orn-adat-betawi-03" className="kk-rsvp-garland" />
        <div className="kk-rsvp-heading" data-reveal><h2 id="kk-rsvp-title">Kehadiran &amp; doa</h2></div>
        <Rsvp className="kk-rsvp-form" />
      </section>

      <section className="kk-gift" aria-labelledby="kk-gift-title">
        <Decoration id="orn-adat-betawi-05" className="kk-gift-fan" />
        <div data-reveal><h2 id="kk-gift-title">Hadiah</h2><Gift className="kk-gift-control" /></div>
      </section>

      <footer className="kk-closing" data-reveal>
        <Decoration id="orn-adat-betawi-03" className="kk-closing-garland" />
        <Decoration id="orn-adat-betawi-01" className="kk-closing-kembang" />
        <p>Terima kasih atas doa dan kehadiran Anda.</p>
        <p className="kk-closing-names">Nara <i>&amp;</i> Aruna</p>
        <span>12 · 12 · 2027</span>
      </footer>
    </div>
  );
}

export function KembangKelapaPreview() {
  return (
    <InvitationFrame templateId="adat-betawi" name="Kembang Kelapa" className="tk-kembang-kelapa" cover={<KembangKelapaCover />}>
      <KembangKelapaContent />
    </InvitationFrame>
  );
}
