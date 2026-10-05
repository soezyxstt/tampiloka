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
import "./sakinah.css";

const story = [
  { year: "2022", title: "Berkenalan", text: "Kami mulai mengenal satu sama lain." },
  { year: "2025", title: "Melangkah", text: "Kami memilih untuk berjalan bersama." },
  { year: "2027", title: "Berkeluarga", text: "Dengan restu keluarga, kami memulai hidup baru." },
];

function SakinahCover() {
  return (
    <section className="sk-cover" aria-label="Undangan Nara dan Aruna">
      <Decoration id="bg-islamic-sakinah" className="sk-cover-background" eager />
      <div className="sk-cover-wash" aria-hidden="true" />
      <Decoration id="orn-islamic-01" className="sk-cover-arch" eager />
      <div className="sk-cover-copy">
        <p className="sk-cover-date">Minggu, 12 Desember 2027</p>
        <h1><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
        <p className="sk-cover-place">Bandung · Jawa Barat</p>
        <OpenButton className="sk-cover-open" />
      </div>
    </section>
  );
}

export function SakinahPreview() {
  return (
    <InvitationFrame
      templateId="islamic-sakinah"
      name="Sakinah"
      className="sk-theme"
      cover={<SakinahCover />}
    >
      <article className="sk-content">
        <section className="sk-couple" id="mempelai" aria-labelledby="sk-couple-title">
          <h2 id="sk-couple-title" data-reveal>Mempelai</h2>
          <div className="sk-couple-pair">
            <article className="sk-person" data-reveal>
              <div className="sk-portrait sk-portrait-nara" data-scene data-scene-depth="0.8">
                <Photo index={1} className="sk-portrait-photo" alt="Potret Nara dan Aruna di kebun teh" />
                <Decoration id="orn-islamic-01" className="sk-portrait-arch" />
              </div>
              <h3>Nara Pradipta</h3>
              <p>Putra dari Bapak Aditya<br />&amp; Ibu Laras</p>
            </article>
            <span className="sk-couple-join" aria-hidden="true">&amp;</span>
            <article className="sk-person" data-reveal>
              <div className="sk-portrait sk-portrait-aruna" data-scene data-scene-depth="-0.65">
                <Photo index={3} className="sk-portrait-photo" alt="Potret Nara dan Aruna di hutan pinus" />
                <Decoration id="orn-islamic-01" className="sk-portrait-arch" />
              </div>
              <h3>Aruna Kirana</h3>
              <p>Putri dari Bapak Baskara<br />&amp; Ibu Ratih</p>
            </article>
          </div>
        </section>

        <section className="sk-events" id="acara" aria-labelledby="sk-events-title">
          <div className="sk-event-date" data-reveal>
            <h2 id="sk-events-title">Acara</h2>
            <p className="sk-event-weekday">Minggu</p>
            <p className="sk-event-date-line"><span>12</span><i aria-hidden="true" />Desember<i aria-hidden="true" /><span>2027</span></p>
            <p className="sk-event-place">Bandung · Jawa Barat</p>
            <Countdown className="sk-countdown" />
            <CalendarLink className="sk-calendar" />
          </div>

          <div className="sk-ceremonies" data-reveal>
            <article className="sk-ceremony">
              <h3>Akad nikah</h3>
              <p>08.00–10.00 WIB</p>
            </article>
            <article className="sk-ceremony">
              <h3>Resepsi</h3>
              <p>11.00–14.00 WIB</p>
            </article>
          </div>

          <div className="sk-map-wrap" data-reveal>
            <div className="sk-map-heading">
              <h3>Bandung</h3>
              <p>Jawa Barat, Indonesia</p>
            </div>
            <EventMap className="sk-map" />
          </div>
          <Decoration id="orn-islamic-02" className="sk-event-divider" />
        </section>

        <section className="sk-story" aria-labelledby="sk-story-title">
          <div className="sk-story-heading" data-reveal>
            <h2 id="sk-story-title">Cerita kami</h2>
          </div>
          <ol>
            {story.map((item, index) => (
              <li key={item.year} data-reveal>
                <span className="sk-story-number">0{index + 1}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
                <time>{item.year}</time>
              </li>
            ))}
          </ol>
          <div className="sk-story-spray" data-scene data-scene-depth="1.1" aria-hidden="true">
            <Decoration id="orn-shared-romance-02" className="sk-story-spray-art" />
          </div>
        </section>

        <section className="sk-gallery" id="galeri" aria-labelledby="sk-gallery-title">
          <div className="sk-gallery-heading" data-reveal><h2 id="sk-gallery-title">Galeri</h2></div>
          <div className="sk-gallery-pair">
            <div className="sk-gallery-frame sk-gallery-arch" data-scene data-scene-depth="0.7"><PhotoButton index={1} /></div>
            <div className="sk-gallery-frame sk-gallery-landscape" data-reveal><PhotoButton index={2} /></div>
          </div>
          <div className="sk-gallery-pair sk-gallery-pair-reverse">
            <div className="sk-gallery-frame sk-gallery-arch" data-scene data-scene-depth="-0.7"><PhotoButton index={3} /></div>
            <div className="sk-gallery-frame sk-gallery-landscape" data-reveal><PhotoButton index={4} /></div>
          </div>
          <div className="sk-gallery-pair">
            <div className="sk-gallery-frame sk-gallery-arch" data-scene data-scene-depth="0.8"><PhotoButton index={5} /></div>
            <div className="sk-gallery-frame sk-gallery-landscape" data-reveal><PhotoButton index={6} /></div>
          </div>
        </section>

        <section className="sk-wishes" id="ucapan" aria-labelledby="sk-wishes-title">
          <div className="sk-wishes-heading" data-reveal><h2 id="sk-wishes-title">Ucapan</h2></div>
          <Rsvp className="sk-rsvp" />
        </section>

        <section className="sk-gift" data-reveal>
          <Decoration id="orn-shared-romance-02" className="sk-gift-flower" />
          <Gift className="sk-gift-details" />
        </section>

        <footer className="sk-closing" data-reveal>
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <strong>Nara <i>&amp;</i> Aruna</strong>
          <span>12 · 12 · 2027</span>
        </footer>
      </article>
    </InvitationFrame>
  );
}
