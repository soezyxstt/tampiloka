import "./rahmah.css";
import { CalendarLink, Countdown, Decoration, EventMap, Gift, InvitationFrame, OpenButton, PhotoButton, Rsvp } from "./preview-kit";

const story = [
  { year: "2022", text: "Kami mulai berkenalan." },
  { year: "2025", text: "Kami memilih melangkah bersama." },
  { year: "2027", text: "Dengan restu keluarga, kami menikah." },
];

function RahmahCover() {
  return (
    <section className="rh-cover" aria-labelledby="rh-cover-title">
      <div className="rh-cover-paper" aria-hidden="true"><Decoration id="bg-islamic-rahmah" eager /></div>
      <div className="rh-cover-corners rh-cover-corners--left" aria-hidden="true"><Decoration id="orn-islamic-03" eager /></div>
      <div className="rh-cover-corners rh-cover-corners--right" aria-hidden="true"><Decoration id="orn-islamic-03" eager /></div>
      <div className="rh-title-leaf">
        <div className="rh-title-ornament" aria-hidden="true"><Decoration id="orn-islamic-05" eager /></div>
        <div className="rh-cover-copy">
          <p>Undangan pernikahan</p>
          <h1 id="rh-cover-title"><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
          <p><time dateTime="2027-12-12">12 Desember 2027</time> · Bandung</p>
          <OpenButton className="rh-open" />
        </div>
      </div>
    </section>
  );
}

export function RahmahPreview() {
  return (
    <InvitationFrame templateId="islamic-rahmah" name="Rahmah" className="rh-frame" cover={<RahmahCover />}>
      <div className="rh-content">
        <section className="rh-couple" id="mempelai" aria-labelledby="rh-couple-title">
          <figure className="rh-couple-photo" data-reveal><PhotoButton index={2} /></figure>
          <div className="rh-couple-copy" data-reveal>
            <p><time dateTime="2027-12-12">12 Desember 2027 · Bandung</time></p>
            <h2 id="rh-couple-title"><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h2>
            <div className="rh-family-lines"><article><h3>Nara Pradipta</h3><p>Putra dari Bapak Aditya dan Ibu Laras</p></article><article><h3>Aruna Kirana</h3><p>Putri dari Bapak Baskara dan Ibu Ratih</p></article></div>
          </div>
        </section>

        <section className="rh-events" id="acara" aria-labelledby="rh-events-title">
          <div className="rh-event-date" data-reveal><p><time dateTime="2027-12-12">Minggu</time></p><h2 id="rh-events-title">12<span>·</span>12<span>·</span>2027</h2><Countdown className="rh-countdown" /><CalendarLink className="rh-calendar" /></div>
          <div className="rh-event-details">
            <h3>Bandung · Jawa Barat</h3>
            <article data-reveal><h4>Akad nikah</h4><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time></article>
            <article data-reveal><h4>Resepsi</h4><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time></article>
          </div>
          <EventMap className="rh-map" />
        </section>

        <section className="rh-gallery" id="galeri" aria-labelledby="rh-gallery-title">
          <div className="rh-gallery-paper" aria-hidden="true"><Decoration id="bg-islamic-rahmah" /></div>
          <header className="rh-gallery-heading" data-reveal><h2 id="rh-gallery-title">Galeri</h2></header>
          <div className="rh-manuscript">
            {[1, 2, 3, 4, 5, 6].map((index) => {
              const note = story[Math.floor((index - 1) / 2)];
              return (
                <figure className={`rh-manuscript-entry rh-manuscript-entry--${index}`} key={index}>
                  <PhotoButton index={index} className="rh-manuscript-photo" />
                  <figcaption className="rh-manuscript-margin">
                    {index % 2 === 1 ? <><time dateTime={note.year}>{note.year}</time><p>{note.text}</p></> : <span aria-hidden="true" />}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <section className="rh-wishes" id="ucapan" aria-labelledby="rh-wishes-title">
          <header data-reveal><h2 id="rh-wishes-title">Ucapan</h2><p>Konfirmasi kehadiran dan kirimkan doa.</p></header>
          <Rsvp className="rh-rsvp" />
        </section>
        <section className="rh-gift" aria-label="Hadiah"><Gift className="rh-gift-details" /></section>
        <footer className="rh-closing">
          <div className="rh-closing-seal" aria-hidden="true"><Decoration id="orn-islamic-05" /></div>
          <div className="rh-closing-copy" data-reveal><p>Terima kasih atas doa dan kehadiran Anda.</p><strong>Nara <i aria-hidden="true">&amp;</i> Aruna</strong><time dateTime="2027-12-12">12 Desember 2027 · Bandung</time></div>
        </footer>
      </div>
    </InvitationFrame>
  );
}
