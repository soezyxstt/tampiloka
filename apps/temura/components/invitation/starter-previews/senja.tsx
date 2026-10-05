import "./senja.css";
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

const story = [
  { year: "2021", text: "Kami mulai saling mengenal." },
  { year: "2024", text: "Kami memilih untuk berjalan bersama." },
  { year: "2027", text: "Dengan restu keluarga, kami menikah." },
];

const spreads = [
  { portrait: 1, landscape: 2, className: "senja-spread--first" },
  { portrait: 3, landscape: 4, className: "senja-spread--second" },
  { portrait: 5, landscape: 6, className: "senja-spread--third" },
];

export function SenjaPreview() {
  const cover = (
    <section className="senja-cover" aria-labelledby="senja-cover-title">
      <div className="senja-cover-backdrop" aria-hidden="true">
        <Decoration id="bg-minimalist-senja" eager />
      </div>
      <div className="senja-cover-photo-band">
        <PhotoButton index={6} className="senja-cover-photo" />
        <div className="senja-cover-photo-shade" aria-hidden="true" />
      </div>
      <div className="senja-cover-copy">
        <h1 id="senja-cover-title"><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
        <p>Minggu, 12 Desember 2027 · Bandung, Jawa Barat</p>
        <OpenButton className="senja-open" />
      </div>
      <div className="senja-cover-sprig" data-scene data-scene-depth="-0.5" aria-hidden="true">
        <Decoration id="orn-minimalist-senja-01" eager />
      </div>
    </section>
  );

  return (
    <InvitationFrame templateId="minimalist-senja" name="Senja" className="senja-frame" cover={cover}>
      <div className="senja-content">
        <section className="senja-couple" id="mempelai" aria-label="Mempelai">
          <div className="senja-couple-composition" data-reveal>
            <span className="senja-name-rail senja-name-rail--nara">NARA PRADIPTA</span>
            <PhotoButton index={1} className="senja-couple-wide-photo" />
            <span className="senja-name-rail senja-name-rail--aruna">ARUNA KIRANA</span>
          </div>
          <div className="senja-couple-details">
            <article data-reveal>
              <h2>Nara Pradipta</h2>
              <p>Putra Bapak Aditya<br />&amp; Ibu Laras</p>
            </article>
            <span className="senja-couple-mark" aria-hidden="true">&amp;</span>
            <article data-reveal>
              <h2>Aruna Kirana</h2>
              <p>Putri Bapak Baskara<br />&amp; Ibu Ratih</p>
            </article>
          </div>
          <div className="senja-couple-wash" data-scene data-scene-depth="0.45" aria-hidden="true">
            <Decoration id="orn-minimalist-senja-02" />
          </div>
        </section>

        <section className="senja-events" id="acara" aria-labelledby="senja-events-title">
          <div className="senja-sunset-disc" data-scene data-scene-depth="-0.65" aria-hidden="true">
            <Decoration id="orn-minimalist-senja-04" />
          </div>
          <header className="senja-events-heading" data-reveal>
            <div>
              <h2 id="senja-events-title">Acara</h2>
              <p>Minggu, 12 Desember 2027</p>
            </div>
            <span>Bandung<br />Jawa Barat</span>
          </header>
          <Countdown className="senja-countdown" />
          <div className="senja-event-columns">
            <article data-reveal>
              <span className="senja-event-number">01</span>
              <h3>Akad nikah</h3>
              <time>08.00–10.00 WIB</time>
            </article>
            <article data-reveal>
              <span className="senja-event-number">02</span>
              <h3>Resepsi</h3>
              <time>11.00–14.00 WIB</time>
            </article>
          </div>
          <div className="senja-event-actions" data-reveal>
            <CalendarLink className="senja-calendar" />
          </div>
          <div className="senja-map" data-reveal>
            <EventMap className="senja-map-frame" />
          </div>
        </section>

        <section className="senja-story" aria-labelledby="senja-story-title">
          <header className="senja-story-heading" data-reveal>
            <h2 id="senja-story-title">Cerita kami</h2>
          </header>
          <div className="senja-story-body" data-reveal>
            <div className="senja-story-branch" data-scene data-scene-depth="0.55" aria-hidden="true">
              <Decoration id="orn-minimalist-senja-03" />
            </div>
            <ol>
              {story.map((item) => (
                <li key={item.year}>
                  <time dateTime={item.year}>{item.year}</time>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="senja-gallery" id="galeri" aria-labelledby="senja-gallery-title">
          <header className="senja-gallery-heading" data-reveal>
            <div>
              <h2 id="senja-gallery-title">Galeri</h2>
            </div>
            <span aria-hidden="true">06</span>
          </header>
          <div className="senja-spreads">
            {spreads.map((spread, index) => (
              <div className={`senja-spread ${spread.className}`} key={spread.portrait} data-reveal>
                <div className="senja-spread-botanical" data-scene data-scene-depth={index % 2 ? "-0.5" : "0.55"} aria-hidden="true">
                  <Decoration id={`orn-minimalist-senja-${String(index + 3).padStart(2, "0")}`} />
                </div>
                <PhotoButton index={spread.portrait} className="senja-spread-photo senja-spread-photo--portrait" />
                <PhotoButton index={spread.landscape} className="senja-spread-photo senja-spread-photo--landscape" />
              </div>
            ))}
          </div>
        </section>

        <section className="senja-rsvp" id="ucapan" aria-labelledby="senja-rsvp-title">
          <div className="senja-rsvp-heading" data-reveal>
            <h2 id="senja-rsvp-title">Ucapan</h2>
            <p>Kami menantikan kehadiran Anda.</p>
          </div>
          <Rsvp className="senja-rsvp-form" />
        </section>

        <section className="senja-gift" aria-label="Hadiah">
          <div className="senja-gift-bow" data-scene data-scene-depth="0.3" aria-hidden="true">
            <Decoration id="orn-minimalist-senja-06" />
          </div>
          <Gift className="senja-gift-details" />
        </section>

        <footer className="senja-closing">
          <div className="senja-closing-photo" data-scene data-scene-depth="0.22" aria-hidden="true">
            <Photo index={4} full alt="Nara dan Aruna di tepi danau" />
            <div className="senja-closing-shade" />
          </div>
          <div className="senja-closing-copy">
            <p>Dengan hormat,</p>
            <strong>Nara &amp; Aruna</strong>
          </div>
        </footer>
      </div>
    </InvitationFrame>
  );
}
