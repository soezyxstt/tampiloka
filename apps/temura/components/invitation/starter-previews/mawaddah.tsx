import "./mawaddah.css";
import { CalendarLink, Countdown, Decoration, EventMap, Gift, InvitationFrame, OpenButton, PhotoButton, Rsvp } from "./preview-kit";

const story = [
  { year: "2022", text: "Kami bertemu melalui keluarga." },
  { year: "2025", text: "Kami memilih tumbuh bersama." },
  { year: "2027", text: "Kami memulai keluarga baru." },
];

function MawaddahCover() {
  return (
    <section className="mw-cover" aria-labelledby="mw-cover-title">
      <div className="mw-cover-garden" aria-hidden="true"><Decoration id="bg-islamic-mawaddah" eager /></div>
      <div className="mw-cover-lattice mw-cover-lattice--left" aria-hidden="true"><Decoration id="orn-islamic-03" eager /></div>
      <div className="mw-cover-lattice mw-cover-lattice--right" aria-hidden="true"><Decoration id="orn-islamic-03" eager /></div>
      <div className="mw-cover-layout">
        <div className="mw-cover-copy">
          <p><time dateTime="2027-12-12">12 Desember 2027 · Bandung</time></p>
          <h1 id="mw-cover-title"><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
          <p>Jawa Barat</p>
          <OpenButton className="mw-open" />
        </div>
        <div className="mw-cover-window"><PhotoButton index={5} className="mw-cover-photo" /></div>
      </div>
      <div className="mw-cover-seal" aria-hidden="true"><Decoration id="orn-islamic-05" eager /></div>
    </section>
  );
}

export function MawaddahPreview() {
  return (
    <InvitationFrame templateId="islamic-mawaddah" name="Mawaddah" className="mw-frame" cover={<MawaddahCover />}>
      <div className="mw-content">
        <section className="mw-couple" id="mempelai" aria-labelledby="mw-couple-title">
          <header className="mw-couple-heading" data-reveal><h2 id="mw-couple-title">Mempelai</h2><p>12 Desember 2027 · Bandung</p></header>
          <div className="mw-alcoves">
            <article className="mw-alcove mw-alcove--nara" data-reveal>
              <div className="mw-alcove-image"><PhotoButton index={1} /></div>
              <div className="mw-alcove-name"><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya dan Ibu Laras</p></div>
            </article>
            <span className="mw-alcove-join" aria-hidden="true">&amp;</span>
            <article className="mw-alcove mw-alcove--aruna" data-reveal>
              <div className="mw-alcove-image"><PhotoButton index={3} /></div>
              <div className="mw-alcove-name"><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara dan Ibu Ratih</p></div>
            </article>
          </div>
          <div className="mw-couple-pattern" aria-hidden="true"><Decoration id="orn-islamic-03" /></div>
        </section>

        <section className="mw-gallery" id="galeri" aria-labelledby="mw-gallery-title">
          <header className="mw-gallery-heading" data-reveal><h2 id="mw-gallery-title">Galeri</h2></header>
          <div className="mw-gallery-pattern" aria-hidden="true"><Decoration id="bg-islamic-mawaddah" /></div>
          <div className="mw-gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <figure className={`mw-gallery-tile mw-gallery-tile--${index}`} key={index} data-reveal>
                <PhotoButton index={index} />
              </figure>
            ))}
          </div>
          <div className="mw-gallery-lattice" aria-hidden="true"><Decoration id="orn-islamic-03" /></div>
        </section>

        <section className="mw-events" id="acara" aria-labelledby="mw-events-title">
          <div className="mw-event-garden" aria-hidden="true"><Decoration id="bg-islamic-mawaddah" /></div>
          <div className="mw-event-date" data-reveal>
            <p><time dateTime="2027-12-12">Minggu</time> · Bandung</p>
            <h2 id="mw-events-title"><span>12</span><span>12</span><span>2027</span></h2>
            <Countdown className="mw-countdown" />
            <div className="mw-event-rows"><article><h3>Akad nikah</h3><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time></article><article><h3>Resepsi</h3><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time></article></div>
            <CalendarLink className="mw-calendar" />
          </div>
          <div className="mw-event-map" data-reveal><div className="mw-map-heading"><h3>Bandung</h3><p>Jawa Barat, Indonesia</p></div><EventMap className="mw-map" /></div>
        </section>

        <section className="mw-story" aria-labelledby="mw-story-title">
          <header data-reveal><h2 id="mw-story-title">Cerita kami</h2></header>
          <ol className="mw-porticoes">{story.map((item) => <li data-reveal key={item.year}><time dateTime={item.year}>{item.year}</time><p>{item.text}</p></li>)}</ol>
          <div className="mw-story-branch" aria-hidden="true"><Decoration id="orn-islamic-02" /></div>
        </section>

        <section className="mw-wishes" id="ucapan" aria-labelledby="mw-wishes-title">
          <header data-reveal><h2 id="mw-wishes-title">Ucapan</h2><p>Konfirmasi kehadiran dan kirimkan doa.</p></header>
          <Rsvp className="mw-rsvp" />
        </section>
        <section className="mw-gift" aria-label="Hadiah"><Gift className="mw-gift-details" /></section>
        <footer className="mw-closing">
          <div className="mw-closing-garden" aria-hidden="true"><Decoration id="bg-islamic-mawaddah" /></div>
          <div className="mw-closing-seal" aria-hidden="true"><Decoration id="orn-islamic-05" /></div>
          <div className="mw-closing-copy" data-reveal><p>Terima kasih atas doa dan kehadiran Anda.</p><strong>Nara <i aria-hidden="true">&amp;</i> Aruna</strong><time dateTime="2027-12-12">12 Desember 2027 · Bandung</time></div>
        </footer>
      </div>
    </InvitationFrame>
  );
}
