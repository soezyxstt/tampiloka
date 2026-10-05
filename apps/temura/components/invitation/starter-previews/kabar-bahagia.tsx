import "./kabar-bahagia.css";
import {
  CalendarLink,
  Countdown,
  EventMap,
  Gift,
  InvitationFrame,
  OpenButton,
  Photo,
  PhotoButton,
  Rsvp,
} from "./preview-kit";

const dispatches = [
  { date: "2022", title: "Berkenalan", text: "Kedua keluarga mempertemukan langkah kami." },
  { date: "2025", title: "Bertumbuh", text: "Hari-hari sederhana menjadi cerita bersama." },
  { date: "2027", title: "Hari bahagia", text: "Dengan restu keluarga, kami melangkah bersama." },
];

function Cover() {
  return (
    <section className="kb-cover" aria-labelledby="kb-cover-title">
      <header className="kb-cover-masthead">
        <span>Kabar Bahagia</span>
        <time dateTime="2027-12-12">12 Desember 2027</time>
      </header>
      <p className="kb-cover-edition">Undangan pernikahan · Bandung</p>
      <h1 id="kb-cover-title" className="kb-cover-names">
        <span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span>
      </h1>
      <figure className="kb-cover-photo">
        <Photo index={5} alt="Nara dan Aruna dengan latar pegunungan" />
      </figure>
      <OpenButton className="kb-cover-open">Buka undangan</OpenButton>
    </section>
  );
}

function ContactSheet() {
  return (
    <section className="kb-gallery" id="galeri" aria-labelledby="kb-gallery-title">
      <header className="kb-section-heading">
        <p>12 Desember 2027 · Bandung</p>
        <h2 id="kb-gallery-title">Galeri</h2>
      </header>
      <div className="kb-contact-sheet">
        <figure className="kb-contact-photo kb-contact-lead"><PhotoButton index={1} /></figure>
        <figure className="kb-contact-photo kb-contact-two"><PhotoButton index={2} /></figure>
        <figure className="kb-contact-photo kb-contact-three"><PhotoButton index={3} /></figure>
        <figure className="kb-contact-photo kb-contact-four"><PhotoButton index={4} /></figure>
        <figure className="kb-contact-photo kb-contact-five"><PhotoButton index={5} /></figure>
        <figure className="kb-contact-photo kb-contact-six"><PhotoButton index={6} /></figure>
      </div>
    </section>
  );
}

export function KabarBahagiaPreview() {
  return (
    <InvitationFrame
      templateId="retro-kabar-bahagia"
      name="Kabar Bahagia"
      className="kabar-frame"
      cover={<Cover />}
    >
      <article className="kabar-content">
        <section className="kb-frontpage" id="mempelai" aria-labelledby="kb-frontpage-title">
          <div className="kb-publication-rule" aria-hidden="true" />
          <header className="kb-frontpage-heading" data-reveal>
            <p>Bandung · 12 Desember 2027</p>
            <h1 id="kb-frontpage-title"><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
            <p>Putra Aditya &amp; Laras · Putri Baskara &amp; Ratih</p>
          </header>
          <figure className="kb-frontpage-photo" data-reveal>
            <PhotoButton index={1} />
          </figure>
          <p className="kb-frontpage-note" data-reveal>
            Dengan restu keluarga, kami mengundang Anda untuk hadir.
          </p>
          <div className="kb-frontpage-dateline" aria-label="Informasi mempelai">
            <div><strong>Nara Pradipta</strong><span>Putra Bapak Aditya &amp; Ibu Laras</span></div>
            <i aria-hidden="true">&amp;</i>
            <div><strong>Aruna Kirana</strong><span>Putri Bapak Baskara &amp; Ibu Ratih</span></div>
          </div>
        </section>

        <section className="kb-events" id="acara" aria-labelledby="kb-events-title">
          <header className="kb-section-heading" data-reveal>
            <p>Bandung, Jawa Barat</p>
            <h2 id="kb-events-title">Acara</h2>
          </header>
          <div className="kb-event-date" data-reveal>
            <time dateTime="2027-12-12">Minggu, 12 Desember 2027</time>
            <Countdown className="kb-countdown" />
          </div>
          <ol className="kb-event-rows">
            <li><h3>Akad nikah</h3><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time></li>
            <li><h3>Resepsi</h3><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time></li>
            <li><h3>Lokasi</h3><span>Bandung, Jawa Barat</span></li>
          </ol>
          <div className="kb-map">
            <EventMap />
            <CalendarLink />
          </div>
        </section>

        <section className="kb-story" aria-labelledby="kb-story-title">
          <header className="kb-section-heading" data-reveal>
            <p>Catatan keluarga</p>
            <h2 id="kb-story-title">Cerita kami</h2>
          </header>
          <ol className="kb-dispatches">
            {dispatches.map((item) => (
              <li key={item.date} data-reveal>
                <time dateTime={item.date}>{item.date}</time>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <ContactSheet />

        <section className="kb-rsvp" id="ucapan" aria-labelledby="kb-rsvp-title">
          <header className="kb-section-heading" data-reveal>
            <p>12 Desember 2027</p>
            <h2 id="kb-rsvp-title">Kehadiran &amp; doa</h2>
          </header>
          <Rsvp className="kb-rsvp-form" />
        </section>

        <section className="kb-gift" aria-label="Hadiah">
          <Gift />
        </section>

        <footer className="kb-closing">
          <div className="kb-colophon-rule" aria-hidden="true" />
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <strong>Nara Pradipta <i aria-hidden="true">&amp;</i> Aruna Kirana</strong>
          <time dateTime="2027-12-12">12 Desember 2027 · Bandung</time>
        </footer>
      </article>
    </InvitationFrame>
  );
}
