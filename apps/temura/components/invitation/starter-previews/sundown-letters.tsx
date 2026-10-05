import "./sundown-letters.css";
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

const milestones = [
  { year: "2022", text: "Kedua keluarga bertemu." },
  { year: "2025", text: "Kami memilih berjalan bersama." },
  { year: "2027", text: "Dengan doa keluarga, kami memulai hari baru." },
];

function SundownCover() {
  return (
    <section className="sd-cover" aria-labelledby="sd-cover-title">
      <Decoration id="bg-retro-sundown-letters" className="sd-cover-background" eager />
      <div className="sd-cover-letter">
        <p>Bandung · 12 Desember 2027</p>
        <h1 id="sd-cover-title">Nara <i aria-hidden="true">&amp;</i><br />Aruna</h1>
        <OpenButton className="sd-cover-open">Buka undangan</OpenButton>
      </div>
    </section>
  );
}

function PortraitPostcards() {
  return (
    <section className="sd-postcards" id="mempelai" aria-labelledby="sd-postcards-title">
      <header className="sd-section-heading" data-reveal>
        <p>12 Desember 2027 · Bandung</p>
        <h1 id="sd-postcards-title">Nara &amp; Aruna</h1>
      </header>
      <div className="sd-portrait-pair">
        <article className="sd-portrait-card" data-reveal>
          <PhotoButton index={2} className="sd-portrait-photo" />
          <div className="sd-portrait-copy">
            <h2>Nara Pradipta</h2>
            <p>Putra Bapak Aditya &amp; Ibu Laras</p>
          </div>
        </article>
        <article className="sd-portrait-card" data-reveal>
          <PhotoButton index={3} className="sd-portrait-photo" />
          <div className="sd-portrait-copy">
            <h2>Aruna Kirana</h2>
            <p>Putri Bapak Baskara &amp; Ibu Ratih</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function CorrespondenceGallery() {
  return (
    <section className="sd-gallery" id="galeri" aria-labelledby="sd-gallery-title">
      <header className="sd-section-heading" data-reveal>
        <p>Bandung · Desember 2027</p>
        <h2 id="sd-gallery-title">Galeri</h2>
      </header>
      <div className="sd-postcard-stack">
        {([1, 2, 3, 4, 5, 6] as const).map((photo) => (
          <figure className="sd-postcard" key={photo} data-reveal>
            <div className="sd-postcard-stamp" aria-hidden="true"><span /><i /></div>
            <PhotoButton index={photo} className="sd-postcard-photo" />
            <figcaption>12 Desember 2027 · Bandung</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function SundownLettersPreview() {
  return (
    <InvitationFrame
      templateId="retro-sundown-letters"
      name="Sundown Letters"
      className="sd-frame"
      cover={<SundownCover />}
    >
      <article className="sd-content">
        <PortraitPostcards />

        <section className="sd-itinerary" id="acara" aria-labelledby="sd-itinerary-title">
          <header className="sd-section-heading" data-reveal>
            <p>Bandung, Jawa Barat</p>
            <h2 id="sd-itinerary-title">Acara</h2>
          </header>
          <div className="sd-route-date" data-reveal>
            <time dateTime="2027-12-12">Minggu, 12 Desember 2027</time>
            <Countdown className="sd-countdown" />
          </div>
          <ol className="sd-itinerary-stops">
            <li><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time><strong>Akad nikah</strong></li>
            <li><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time><strong>Resepsi</strong></li>
          </ol>
          <div className="sd-location">
            <h3>Lokasi acara</h3>
            <EventMap />
            <CalendarLink />
          </div>
        </section>

        <CorrespondenceGallery />

        <section className="sd-story" aria-labelledby="sd-story-title">
          <header className="sd-section-heading" data-reveal>
            <p>Catatan perjalanan</p>
            <h2 id="sd-story-title">Cerita kami</h2>
          </header>
          <ol className="sd-story-beats">
            {milestones.map((item) => (
              <li key={item.year} data-reveal>
                <time dateTime={item.year}>{item.year}</time>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="sd-rsvp" id="ucapan" aria-labelledby="sd-rsvp-title">
          <header className="sd-section-heading" data-reveal>
            <p>12 Desember 2027</p>
            <h2 id="sd-rsvp-title">Kehadiran &amp; doa</h2>
          </header>
          <Rsvp className="sd-rsvp-form" />
        </section>

        <section className="sd-gift" aria-label="Hadiah"><Gift /></section>

        <footer className="sd-closing">
          <Decoration id="orn-retro-05" className="sd-closing-envelope" />
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <strong>Nara <i aria-hidden="true">&amp;</i> Aruna</strong>
          <time dateTime="2027-12-12">12 Desember 2027 · Bandung</time>
        </footer>
      </article>
    </InvitationFrame>
  );
}
