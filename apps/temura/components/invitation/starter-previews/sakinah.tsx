import "./sakinah.css";
import { CalendarLink, Countdown, Decoration, EventMap, Gift, InvitationFrame, OpenButton, PhotoButton, Rsvp } from "./preview-kit";

const story = [
  { year: "2022", text: "Kami mulai saling mengenal." },
  { year: "2025", text: "Kami memilih tumbuh bersama." },
  { year: "2027", text: "Dengan restu keluarga, kami menikah." },
];

function SakinahCover() {
  return (
    <section className="sk-cover" aria-labelledby="sk-cover-title">
      <div className="sk-cover-garden" aria-hidden="true"><Decoration id="bg-islamic-sakinah" eager /></div>
      <div className="sk-cover-arch" aria-hidden="true"><Decoration id="orn-islamic-01" eager /></div>
      <div className="sk-cover-lattice sk-cover-lattice--left" aria-hidden="true"><Decoration id="orn-islamic-03" eager /></div>
      <div className="sk-cover-lattice sk-cover-lattice--right" aria-hidden="true"><Decoration id="orn-islamic-03" eager /></div>
      <div className="sk-cover-copy">
        <p><time dateTime="2027-12-12">Minggu, 12 Desember 2027</time></p>
        <h1 id="sk-cover-title"><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
        <p>Bandung · Jawa Barat</p>
        <OpenButton className="sk-open" />
      </div>
    </section>
  );
}

export function SakinahPreview() {
  return (
    <InvitationFrame templateId="islamic-sakinah" name="Sakinah" className="sk-frame" cover={<SakinahCover />}>
      <div className="sk-content">
        <section className="sk-couple" id="mempelai" aria-labelledby="sk-couple-title">
          <header className="sk-couple-heading" data-reveal>
            <p><time dateTime="2027-12-12">12 Desember 2027 · Bandung</time></p>
            <h2 id="sk-couple-title">Nara <i aria-hidden="true">&amp;</i> Aruna</h2>
          </header>
          <figure className="sk-shared-frame" data-reveal>
            <PhotoButton index={5} className="sk-shared-photo" />
          </figure>
          <div className="sk-family-rows">
            <article data-reveal><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya dan Ibu Laras</p></article>
            <span aria-hidden="true">&amp;</span>
            <article data-reveal><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara dan Ibu Ratih</p></article>
          </div>
          <div className="sk-couple-foot" aria-hidden="true"><Decoration id="orn-islamic-03" /></div>
        </section>

        <section className="sk-events" id="acara" aria-labelledby="sk-events-title">
          <div className="sk-event-art" aria-hidden="true"><Decoration id="bg-islamic-sakinah" /></div>
          <header className="sk-event-heading" data-reveal>
            <p><time dateTime="2027-12-12">Minggu, 12 Desember 2027</time></p>
            <h2 id="sk-events-title">Acara</h2>
          </header>
          <Countdown className="sk-countdown" />
          <div className="sk-ceremonies">
            <article data-reveal><h3>Akad nikah</h3><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time></article>
            <article data-reveal><h3>Resepsi</h3><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time></article>
          </div>
          <CalendarLink className="sk-calendar" />
          <div className="sk-map-heading" data-reveal><h3>Bandung</h3><p>Jawa Barat, Indonesia</p></div>
          <EventMap className="sk-map" />
        </section>

        <section className="sk-gallery" id="galeri" aria-labelledby="sk-gallery-title">
          <header className="sk-gallery-heading" data-reveal><h2 id="sk-gallery-title">Galeri</h2></header>
          <div className="sk-gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <figure className={`sk-gallery-window sk-gallery-window--${index}`} key={index} data-reveal>
                <PhotoButton index={index} />
              </figure>
            ))}
          </div>
          <div className="sk-gallery-foot" aria-hidden="true"><Decoration id="orn-islamic-03" /></div>
        </section>

        <section className="sk-story" aria-labelledby="sk-story-title">
          <div className="sk-story-art" aria-hidden="true"><Decoration id="orn-islamic-01" /></div>
          <header data-reveal><h2 id="sk-story-title">Cerita kami</h2></header>
          <ol>{story.map((item) => <li data-reveal key={item.year}><time dateTime={item.year}>{item.year}</time><p>{item.text}</p></li>)}</ol>
        </section>

        <section className="sk-wishes" id="ucapan" aria-labelledby="sk-wishes-title">
          <header data-reveal><h2 id="sk-wishes-title">Ucapan</h2><p>Konfirmasi kehadiran dan kirimkan doa.</p></header>
          <Rsvp className="sk-rsvp" />
        </section>
        <section className="sk-gift" aria-label="Hadiah"><Gift className="sk-gift-details" /></section>
        <footer className="sk-closing">
          <div className="sk-closing-art" aria-hidden="true"><Decoration id="orn-islamic-05" /></div>
          <div className="sk-closing-copy" data-reveal><p>Terima kasih atas doa dan kehadiran Anda.</p><strong>Nara <i aria-hidden="true">&amp;</i> Aruna</strong><time dateTime="2027-12-12">12 Desember 2027 · Bandung</time></div>
        </footer>
      </div>
    </InvitationFrame>
  );
}
