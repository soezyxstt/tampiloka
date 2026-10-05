import "./ruang-rindu.css";
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

const story = [
  { year: "2021", text: "Hari biasa yang mempertemukan dua jalan." },
  { year: "2024", text: "Percakapan kecil tumbuh menjadi rumah." },
  { year: "2027", text: "Kini, kami melangkah dengan restu keluarga." },
];

const galleryPairs = [
  { first: 1, second: 2, className: "ruang-rindu-spread--one" },
  { first: 3, second: 4, className: "ruang-rindu-spread--two" },
  { first: 5, second: 6, className: "ruang-rindu-spread--three" },
];

export function RuangRinduPreview() {
  const cover = (
    <section className="ruang-rindu-cover" aria-labelledby="ruang-rindu-cover-title">
      <div className="ruang-rindu-cover-backdrop" aria-hidden="true">
        <Decoration id="bg-minimalist-ruang-rindu" eager />
      </div>
      <div className="ruang-rindu-cover-meta">
        <time dateTime="2027-12-12">Minggu, 12 Desember 2027</time>
        <span>Bandung, Jawa Barat</span>
      </div>
      <h1 className="ruang-rindu-cover-names" id="ruang-rindu-cover-title">
        <span className="ruang-rindu-cover-nara">Nara</span>
        <i aria-hidden="true">&amp;</i>
        <span className="ruang-rindu-cover-aruna">Aruna</span>
      </h1>
      <div className="ruang-rindu-cover-photo-wrap" data-scene data-scene-depth="0.65">
        <PhotoButton index={5} className="ruang-rindu-cover-photo" />
      </div>
      <div className="ruang-rindu-cover-flower" data-scene data-scene-depth="-0.8" aria-hidden="true">
        <Decoration id="orn-minimalist-ruang-rindu-01" eager />
      </div>
      <div className="ruang-rindu-cover-bottom">
        <OpenButton className="ruang-rindu-open" />
      </div>
    </section>
  );

  return (
    <InvitationFrame templateId="minimalist-ruang-rindu" name="Ruang Rindu" className="rr-frame" cover={cover}>
      <div className="ruang-rindu-content">
        <section className="ruang-rindu-letter" id="mempelai" aria-label="Mempelai">
          <header className="ruang-rindu-letter-heading" data-reveal>
            <h2>Kami mengundang Anda untuk hadir.</h2>
          </header>
          <div className="ruang-rindu-letter-layout">
            <div className="ruang-rindu-letter-photo" data-reveal>
              <PhotoButton index={1} className="ruang-rindu-letter-photo-button" />
              <div className="ruang-rindu-letter-arch" aria-hidden="true">
                <Decoration id="orn-minimalist-ruang-rindu-02" />
              </div>
            </div>
            <div className="ruang-rindu-couple-columns">
              <article className="ruang-rindu-person" data-reveal>
                <h3>Nara Pradipta</h3>
                <p>Putra Bapak Aditya<br />&amp; Ibu Laras</p>
              </article>
              <span className="ruang-rindu-couple-amp" aria-hidden="true">&amp;</span>
              <article className="ruang-rindu-person" data-reveal>
                <h3>Aruna Kirana</h3>
                <p>Putri Bapak Baskara<br />&amp; Ibu Ratih</p>
              </article>
            </div>
          </div>
          <div className="ruang-rindu-letter-ribbon" data-scene data-scene-depth="0.55" aria-hidden="true">
            <Decoration id="orn-minimalist-ruang-rindu-04" />
          </div>
        </section>

        <section className="ruang-rindu-agenda" id="acara" aria-labelledby="ruang-rindu-agenda-title">
          <div className="ruang-rindu-agenda-heading" data-reveal>
            <h2 id="ruang-rindu-agenda-title">Acara</h2>
            <p>Minggu, 12 Desember 2027<br />Bandung, Jawa Barat</p>
          </div>
          <div className="ruang-rindu-countdown-row" data-reveal>
            <Countdown className="ruang-rindu-countdown" />
            <CalendarLink className="ruang-rindu-calendar" />
          </div>
          <ol className="ruang-rindu-agenda-list">
            <li data-reveal>
              <time>08.00–10.00 WIB</time>
              <h3>Akad nikah</h3>
            </li>
            <li data-reveal>
              <time>11.00–14.00 WIB</time>
              <h3>Resepsi</h3>
            </li>
          </ol>
          <div className="ruang-rindu-map" data-reveal>
            <EventMap className="ruang-rindu-map-frame" />
          </div>
          <div className="ruang-rindu-agenda-stem" data-scene data-scene-depth="-0.45" aria-hidden="true">
            <Decoration id="orn-minimalist-ruang-rindu-05" />
          </div>
        </section>

        <section className="ruang-rindu-story" aria-labelledby="ruang-rindu-story-title">
          <div className="ruang-rindu-story-letter" data-reveal>
            <span className="ruang-rindu-story-margin" aria-hidden="true">12.12</span>
            <div>
              <h2 id="ruang-rindu-story-title">Cerita kami</h2>
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
          <div className="ruang-rindu-story-flower" data-scene data-scene-depth="0.7" aria-hidden="true">
            <Decoration id="orn-minimalist-ruang-rindu-03" />
          </div>
        </section>

        <section className="ruang-rindu-gallery" id="galeri" aria-labelledby="ruang-rindu-gallery-title">
          <header className="ruang-rindu-gallery-heading" data-reveal>
            <h2 id="ruang-rindu-gallery-title">Galeri</h2>
          </header>
          <div className="ruang-rindu-spreads">
            {galleryPairs.map((pair, index) => (
              <div className={`ruang-rindu-spread ${pair.className}`} key={pair.first} data-reveal>
                <span className="ruang-rindu-spread-index" aria-hidden="true">0{index + 1}</span>
                <PhotoButton index={pair.first} className="ruang-rindu-spread-photo ruang-rindu-spread-photo--first" />
                <PhotoButton index={pair.second} className="ruang-rindu-spread-photo ruang-rindu-spread-photo--second" />
              </div>
            ))}
          </div>
          <div className="ruang-rindu-gallery-edge" aria-hidden="true">
            <Decoration id="orn-minimalist-ruang-rindu-06" />
          </div>
        </section>

        <section className="ruang-rindu-rsvp" id="ucapan" aria-labelledby="ruang-rindu-rsvp-title">
          <div className="ruang-rindu-rsvp-heading" data-reveal>
            <h2 id="ruang-rindu-rsvp-title">Ucapan</h2>
            <p>Kami menantikan kehadiran Anda.</p>
          </div>
          <Rsvp className="ruang-rindu-rsvp-form" />
        </section>

        <section className="ruang-rindu-gift" aria-label="Hadiah">
          <span aria-hidden="true">N <i>&amp;</i> A</span>
          <Gift className="ruang-rindu-gift-details" />
        </section>

        <footer className="ruang-rindu-closing">
          <p>Dengan hormat,</p>
          <strong>Nara &amp; Aruna</strong>
        </footer>
      </div>
    </InvitationFrame>
  );
}
