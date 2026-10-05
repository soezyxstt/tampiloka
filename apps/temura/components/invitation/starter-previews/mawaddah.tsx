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
import "./mawaddah.css";

const story = [
  { year: "2022", text: "Pertemuan pertama." },
  { year: "2025", text: "Memilih untuk tumbuh bersama." },
  { year: "2027", text: "Memulai keluarga baru." },
];

function MawaddahCover() {
  return (
    <section className="mw-cover" aria-label="Undangan Nara dan Aruna">
      <Decoration id="bg-islamic-mawaddah" className="mw-cover-background" eager />
      <div className="mw-cover-wash" aria-hidden="true" />
      <Decoration id="orn-islamic-03" className="mw-cover-gate" eager />
      <div className="mw-cover-content">
        <div className="mw-cover-diamond" data-scene data-scene-depth="0.6">
          <PhotoButton index={5} className="mw-cover-photo" />
          <span className="mw-diamond-rule" aria-hidden="true" />
        </div>
        <div className="mw-cover-copy">
          <p className="mw-cover-date">Minggu, 12 Desember 2027</p>
          <h1>Nara <i aria-hidden="true">&amp;</i> Aruna</h1>
          <p className="mw-cover-place">Bandung · Jawa Barat</p>
        </div>
        <OpenButton className="mw-cover-open" />
      </div>
      <Decoration id="orn-islamic-04" className="mw-cover-flower" eager />
    </section>
  );
}

export function MawaddahPreview() {
  return (
    <InvitationFrame
      templateId="islamic-mawaddah"
      name="Mawaddah"
      className="mw-theme"
      cover={<MawaddahCover />}
    >
      <article className="mw-content">
        <section className="mw-couple" id="mempelai" aria-labelledby="mw-couple-title">
          <div className="mw-couple-layout">
            <div className="mw-couple-image" data-scene data-scene-depth="0.8">
              <Photo index={1} className="mw-couple-photo" alt="Nara dan Aruna di kebun teh" />
              <Decoration id="orn-islamic-04" className="mw-couple-spray" />
            </div>
            <div className="mw-couple-copy" data-reveal>
              <h2 id="mw-couple-title">Mempelai</h2>
              <div className="mw-name-entry">
                <h3>Nara Pradipta</h3>
                <p>Putra dari Bapak Aditya<br />&amp; Ibu Laras</p>
              </div>
              <span className="mw-name-join" aria-hidden="true">&amp;</span>
              <div className="mw-name-entry">
                <h3>Aruna Kirana</h3>
                <p>Putri dari Bapak Baskara<br />&amp; Ibu Ratih</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mw-events" id="acara" aria-labelledby="mw-events-title">
          <div className="mw-event-heading" data-reveal>
            <h2 id="mw-events-title">Acara</h2>
            <p>Minggu, 12 Desember 2027</p>
            <p className="mw-event-place">Bandung · Jawa Barat</p>
            <Countdown className="mw-countdown" />
            <CalendarLink className="mw-calendar" />
          </div>
          <div className="mw-courtyards">
            <article className="mw-courtyard" data-reveal>
              <Decoration id="orn-islamic-03" className="mw-courtyard-art" />
              <div><h3>Akad nikah</h3><p>08.00–10.00 WIB</p></div>
            </article>
            <article className="mw-courtyard" data-reveal>
              <Decoration id="orn-islamic-03" className="mw-courtyard-art" />
              <div><h3>Resepsi</h3><p>11.00–14.00 WIB</p></div>
            </article>
          </div>
          <div className="mw-map-block" data-reveal>
            <div className="mw-map-heading"><h3>Bandung</h3><p>Jawa Barat, Indonesia</p></div>
            <EventMap className="mw-map" />
          </div>
        </section>

        <section className="mw-story" aria-labelledby="mw-story-title">
          <div className="mw-story-heading" data-reveal><h2 id="mw-story-title">Cerita kami</h2></div>
          <div className="mw-story-years">
            {story.map((item, index) => (
              <article className="mw-story-year" data-reveal key={item.year}>
                <h3>{item.year}</h3>
                <p>{item.text}</p>
                {index < story.length - 1 && <span aria-hidden="true" />}
              </article>
            ))}
          </div>
          <div className="mw-story-geometry" data-scene data-scene-depth="-0.9" aria-hidden="true">
            <Decoration id="orn-islamic-03" className="mw-story-geometry-art" />
          </div>
        </section>

        <section className="mw-gallery" id="galeri" aria-labelledby="mw-gallery-title">
          <div className="mw-gallery-heading" data-reveal>
            <h2 id="mw-gallery-title">Galeri</h2>
            <Decoration id="orn-islamic-04" className="mw-gallery-spray" />
          </div>
          <div className="mw-mosaic">
            <div className="mw-mosaic-tile mw-mosaic-one" data-scene data-scene-depth="0.75"><PhotoButton index={1} /></div>
            <div className="mw-mosaic-tile mw-mosaic-two" data-reveal><PhotoButton index={2} /></div>
            <div className="mw-mosaic-tile mw-mosaic-three" data-scene data-scene-depth="-0.65"><PhotoButton index={3} /></div>
            <div className="mw-mosaic-tile mw-mosaic-four" data-reveal><PhotoButton index={4} /></div>
            <div className="mw-mosaic-tile mw-mosaic-five" data-scene data-scene-depth="0.9"><PhotoButton index={5} /></div>
            <div className="mw-mosaic-tile mw-mosaic-six" data-reveal><PhotoButton index={6} /></div>
          </div>
        </section>

        <section className="mw-wishes" id="ucapan" aria-labelledby="mw-wishes-title">
          <div className="mw-wishes-heading" data-reveal><h2 id="mw-wishes-title">Ucapan</h2></div>
          <Rsvp className="mw-rsvp" />
        </section>

        <section className="mw-gift" data-reveal>
          <Decoration id="orn-shared-romance-01" className="mw-gift-rose" />
          <Gift className="mw-gift-details" />
        </section>

        <footer className="mw-closing" data-reveal>
          <Decoration id="orn-islamic-03" className="mw-closing-geometry" />
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <strong>Nara <i>&amp;</i> Aruna</strong>
          <span>Bandung · 12.12.2027</span>
        </footer>
      </article>
    </InvitationFrame>
  );
}
