import "./senja.css";
import { CalendarLink, Countdown, Decoration, EventMap, Gift, InvitationFrame, OpenButton, PhotoButton, Rsvp } from "./preview-kit";

const story = [
  { year: "2021", text: "Kami mulai saling mengenal." },
  { year: "2024", text: "Kami memilih tumbuh bersama." },
  { year: "2027", text: "Dengan restu keluarga, kami menikah." },
];

function SenjaCover() {
  return (
    <section className="sj-cover" aria-labelledby="sj-cover-title">
      <PhotoButton index={6} className="sj-cover-photo" />
      <div className="sj-cover-shade" aria-hidden="true" />
      <div className="sj-cover-copy">
        <p><time dateTime="2027-12-12">12 Desember 2027</time><span>Bandung · Jawa Barat</span></p>
        <h1 id="sj-cover-title"><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
        <OpenButton className="sj-open" />
      </div>
    </section>
  );
}

export function SenjaPreview() {
  return (
    <InvitationFrame templateId="minimalist-senja" name="Senja" className="sj-frame" cover={<SenjaCover />}>
      <div className="sj-content">
        <section className="sj-intro" aria-label="Undangan">
          <header className="sj-intro-copy" data-reveal>
            <p><time dateTime="2027-12-12">Minggu, 12 Desember 2027</time><span>Bandung</span></p>
            <p>Dengan bahagia, kami mengundang Anda untuk hadir di hari pernikahan kami.</p>
          </header>
          <PhotoButton index={4} className="sj-intro-photo" />
        </section>

        <section className="sj-gallery" id="galeri" aria-labelledby="sj-gallery-title">
          <header className="sj-gallery-heading" data-reveal><h2 id="sj-gallery-title">Galeri</h2></header>
          <div className="sj-photo-essay">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <figure className={`sj-essay-photo sj-essay-photo--${index}`} key={index}>
                <PhotoButton index={index} />
              </figure>
            ))}
          </div>
        </section>

        <section className="sj-couple" id="mempelai" aria-labelledby="sj-couple-title">
          <header className="sj-couple-heading" data-reveal><h2 id="sj-couple-title">Mempelai</h2></header>
          <PhotoButton index={2} className="sj-couple-landscape" />
          <div className="sj-name-blocks">
            <article className="sj-name-block sj-name-block--nara" data-reveal>
              <PhotoButton index={1} className="sj-name-photo" />
              <div><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya dan Ibu Laras</p></div>
            </article>
            <article className="sj-name-block sj-name-block--aruna" data-reveal>
              <PhotoButton index={3} className="sj-name-photo" />
              <div><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara dan Ibu Ratih</p></div>
            </article>
          </div>
        </section>

        <section className="sj-events" id="acara" aria-labelledby="sj-events-title">
          <header className="sj-events-heading" data-reveal>
            <div><p>12 Desember 2027 · Bandung</p><h2 id="sj-events-title">Acara</h2></div>
            <Countdown className="sj-countdown" />
          </header>
          <div className="sj-event-bands">
            <article data-reveal><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time><h3>Akad nikah</h3></article>
            <article data-reveal><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time><h3>Resepsi</h3></article>
          </div>
          <div className="sj-event-tools" data-reveal><p>Bandung, Jawa Barat</p><CalendarLink /></div>
          <EventMap className="sj-map" />
        </section>

        <section className="sj-story" aria-labelledby="sj-story-title">
          <div className="sj-story-wash" aria-hidden="true"><Decoration id="bg-minimalist-senja" /></div>
          <header data-reveal><h2 id="sj-story-title">Cerita kami</h2></header>
          <ol>{story.map((item) => <li data-reveal key={item.year}><time dateTime={item.year}>{item.year}</time><p>{item.text}</p></li>)}</ol>
        </section>

        <section className="sj-rsvp" id="ucapan" aria-labelledby="sj-rsvp-title">
          <header data-reveal><h2 id="sj-rsvp-title">Ucapan</h2><p>Konfirmasi kehadiran dan kirimkan doa.</p></header>
          <Rsvp className="sj-rsvp-form" />
        </section>
        <section className="sj-gift" aria-label="Hadiah"><Gift className="sj-gift-details" /></section>
        <footer className="sj-closing"><div className="sj-closing-copy" data-reveal><p>Terima kasih atas doa dan kehadiran Anda.</p><strong>Nara <i aria-hidden="true">&amp;</i> Aruna</strong><time dateTime="2027-12-12">12 Desember 2027 · Bandung</time></div></footer>
      </div>
    </InvitationFrame>
  );
}
