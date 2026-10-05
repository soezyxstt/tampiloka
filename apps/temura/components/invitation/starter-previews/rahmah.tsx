import "./rahmah.css";
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

const chapters = [
  { date: "12.12.2027 · 08.00", title: "Akad", text: "Dengan restu keluarga, Nara dan Aruna mengikrarkan janji." },
  { date: "12.12.2027 · 11.00", title: "Resepsi", text: "Keluarga dan sahabat berkumpul untuk berbagi kebahagiaan." },
  { date: "12 Desember 2027", title: "Awal keluarga", text: "Sebuah keluarga baru memulai langkahnya di Bandung." },
];

const galleryPages = [
  { kind: "wide", photos: [1] },
  { kind: "pair", photos: [2, 3] },
  { kind: "wide", photos: [4] },
  { kind: "pair", photos: [5, 6] },
] as const;

export function RahmahPreview() {
  const cover = (
    <section className="rahmah-cover" aria-labelledby="rahmah-cover-title">
      <Decoration id="bg-islamic-rahmah" className="rahmah-cover-paper" eager />
      <div className="rahmah-cover-rule" aria-hidden="true" />
      <p className="rahmah-cover-label">Undangan pernikahan</p>
      <div className="rahmah-cover-art" data-scene data-scene-depth="-0.8" aria-hidden="true">
        <Decoration id="orn-islamic-05" className="rahmah-cover-flower" eager />
      </div>
      <div className="rahmah-cover-monogram" aria-hidden="true">
        <span>N</span><i>&amp;</i><span>A</span>
      </div>
      <PhotoButton index={5} className="rahmah-cover-portrait" />
      <div className="rahmah-cover-names">
        <h1 id="rahmah-cover-title"><span>Nara</span><span>Aruna</span></h1>
        <p><time dateTime="2027-12-12">Minggu, 12 Desember 2027</time><span>Bandung, Jawa Barat</span></p>
      </div>
      <OpenButton className="rahmah-open">Buka undangan</OpenButton>
    </section>
  );

  return (
    <InvitationFrame templateId="islamic-rahmah" name="Rahmah" className="rahmah-frame" cover={cover}>
      <div className="rahmah-content">
        <section className="rahmah-couple" id="mempelai" aria-labelledby="rahmah-couple-title">
          <header className="rahmah-couple-heading" data-reveal>
            <h2 id="rahmah-couple-title">Mempelai</h2>
            <time dateTime="2027-12-12">12 · 12 · 2027</time>
          </header>
          <div className="rahmah-couple-portrait" data-reveal>
            <PhotoButton index={1} className="rahmah-fullwidth-photo" />
          </div>
          <div className="rahmah-name-columns">
            <article className="rahmah-person rahmah-person-nara" data-reveal>
              <p className="rahmah-person-role">Putra</p>
              <h3>Nara <span>Pradipta</span></h3>
              <p>Putra dari<br />Bapak Aditya &amp; Ibu Laras</p>
            </article>
            <span className="rahmah-name-amp" aria-hidden="true">&amp;</span>
            <article className="rahmah-person rahmah-person-aruna" data-reveal>
              <p className="rahmah-person-role">Putri</p>
              <h3>Aruna <span>Kirana</span></h3>
              <p>Putri dari<br />Bapak Baskara &amp; Ibu Ratih</p>
            </article>
          </div>
          <div className="rahmah-couple-divider" data-scene data-scene-depth="1.1" aria-hidden="true">
            <Decoration id="orn-islamic-06" className="rahmah-divider-art" />
          </div>
        </section>

        <section className="rahmah-events" id="acara" aria-labelledby="rahmah-events-title">
          <div className="rahmah-events-heading" data-reveal>
            <h2 id="rahmah-events-title">Acara</h2>
            <p><time dateTime="2027-12-12">Minggu, 12 Desember 2027</time><span>Bandung, Jawa Barat</span></p>
            <Countdown className="rahmah-countdown" />
          </div>
          <div className="rahmah-schedule" data-reveal>
            <article>
              <time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time>
              <h3>Akad nikah</h3>
            </article>
            <article>
              <time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time>
              <h3>Resepsi</h3>
            </article>
          </div>
          <div className="rahmah-event-actions" data-reveal>
            <CalendarLink className="rahmah-calendar" />
            <EventMap className="rahmah-map" />
          </div>
          <div className="rahmah-event-flower" data-scene data-scene-depth="-1.05" aria-hidden="true">
            <Decoration id="orn-shared-romance-02" className="rahmah-event-flower-art" />
          </div>
        </section>

        <section className="rahmah-story" aria-labelledby="rahmah-story-title">
          <header data-reveal>
            <h2 id="rahmah-story-title">Cerita kami</h2>
          </header>
          <ol>
            {chapters.map((chapter) => (
              <li key={chapter.date} data-reveal>
                <time className="rahmah-chapter-number" dateTime="2027-12-12">{chapter.date}</time>
                <div><h3>{chapter.title}</h3><p>{chapter.text}</p></div>
              </li>
            ))}
          </ol>
          <div className="rahmah-story-flower" data-scene data-scene-depth="0.85" aria-hidden="true">
            <Decoration id="orn-shared-romance-06" className="rahmah-story-flower-art" />
          </div>
        </section>

        <section className="rahmah-gallery" id="galeri" aria-labelledby="rahmah-gallery-title">
          <header className="rahmah-gallery-heading" data-reveal>
            <h2 id="rahmah-gallery-title">Galeri</h2>
          </header>
          <div className="rahmah-gallery-pages">
            {galleryPages.map((page, pageIndex) => (
              <div className={`rahmah-gallery-page rahmah-gallery-page-${page.kind}`} key={page.photos[0]} data-reveal>
                <span className="rahmah-page-number" aria-hidden="true">{String(pageIndex + 1).padStart(2, "0")}</span>
                {page.photos.map((photoIndex) => (
                  <PhotoButton
                    index={photoIndex}
                    className={`rahmah-gallery-photo rahmah-gallery-photo-${photoIndex}`}
                    key={photoIndex}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="rahmah-rsvp" id="ucapan" aria-labelledby="rahmah-rsvp-title">
          <header data-reveal>
            <h2 id="rahmah-rsvp-title">Kehadiran &amp; doa</h2>
            <p>Doa dan kehadiran Anda berarti bagi kami.</p>
          </header>
          <Rsvp className="rahmah-rsvp-form" />
        </section>

        <section className="rahmah-gift" aria-label="Hadiah">
          <Gift className="rahmah-gift-details" />
        </section>

        <footer className="rahmah-closing" data-reveal>
          <div className="rahmah-closing-flower" data-scene data-scene-depth="-0.6" aria-hidden="true">
            <Decoration id="orn-shared-romance-05" className="rahmah-closing-flower-art" />
          </div>
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <strong>Nara Pradipta <i>&amp;</i> Aruna Kirana</strong>
          <time dateTime="2027-12-12">12 Desember 2027 · Bandung</time>
        </footer>
      </div>
    </InvitationFrame>
  );
}
