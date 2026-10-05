import "./kabar-bahagia.css";
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
  { number: "01", title: "Berkenalan", text: "Dua keluarga dipertemukan dalam niat baik." },
  { number: "02", title: "Bertumbuh", text: "Perjalanan bersama dirawat dengan doa dan restu." },
  { number: "03", title: "Hari bahagia", text: "Nara dan Aruna mengundang Anda menyaksikan awal keluarga." },
];

const contactSheet = [1, 2, 3, 4, 5, 6];

export function KabarBahagiaPreview() {
  const cover = (
    <section className="kabar-cover" aria-labelledby="kabar-cover-title">
      <Decoration id="bg-retro-kabar-bahagia" className="kabar-cover-paper" eager />
      <div className="kabar-cover-content">
        <header className="kabar-masthead">
          <span>Bandung</span>
          <span>12 · 12 · 2027</span>
        </header>
        <div className="kabar-cover-image" data-scene data-scene-depth="-0.7">
          <PhotoButton index={5} className="kabar-frontpage-photo" />
          <div className="kabar-cover-corner" aria-hidden="true">
            <Decoration id="orn-retro-01" className="kabar-corner-art" eager />
          </div>
        </div>
        <h1 className="kabar-cover-title" id="kabar-cover-title">
          <span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span>
        </h1>
        <p className="kabar-cover-date"><time dateTime="2027-12-12">Minggu, 12 Desember 2027</time><span>Undangan pernikahan</span></p>
        <OpenButton className="kabar-open">Buka undangan</OpenButton>
      </div>
    </section>
  );

  return (
    <InvitationFrame templateId="retro-kabar-bahagia" name="Kabar Bahagia" className="kabar-frame" cover={cover}>
      <div className="kabar-content">
        <section className="kabar-couple" id="mempelai" aria-labelledby="kabar-couple-title">
          <header className="kabar-section-heading" data-reveal>
            <h2 id="kabar-couple-title">Mempelai</h2>
            <span>Bandung · 12.12.2027</span>
          </header>
          <div className="kabar-people">
            <article className="kabar-person" data-reveal>
              <PhotoButton index={2} className="kabar-person-photo" />
              <div className="kabar-person-name">
                <h3>Nara <span>Pradipta</span></h3>
                <p>Putra Bapak Aditya<br />&amp; Ibu Laras</p>
              </div>
            </article>
            <article className="kabar-person" data-reveal>
              <PhotoButton index={3} className="kabar-person-photo" />
              <div className="kabar-person-name">
                <h3>Aruna <span>Kirana</span></h3>
                <p>Putri Bapak Baskara<br />&amp; Ibu Ratih</p>
              </div>
            </article>
          </div>
          <div className="kabar-couple-rule" aria-hidden="true" />
        </section>

        <section className="kabar-events" id="acara" aria-labelledby="kabar-events-title">
          <div className="kabar-event-stamp" data-reveal>
            <time dateTime="2027-12-12"><span>12</span><span>Des</span><span>2027</span></time>
          </div>
          <div className="kabar-event-main" data-reveal>
            <h2 id="kabar-events-title">Acara</h2>
            <p className="kabar-event-place">Bandung, Jawa Barat</p>
            <table className="kabar-event-table">
              <tbody>
                <tr><th scope="row">Akad nikah</th><td><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time></td></tr>
                <tr><th scope="row">Resepsi</th><td><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time></td></tr>
              </tbody>
            </table>
            <Countdown className="kabar-countdown" />
            <CalendarLink className="kabar-calendar" />
          </div>
          <div className="kabar-map-row" data-reveal>
            <h3>Lokasi</h3>
            <EventMap className="kabar-map" />
          </div>
        </section>

        <section className="kabar-story" aria-labelledby="kabar-story-title">
          <div className="kabar-story-paper" data-reveal>
            <header><h2 id="kabar-story-title">Cerita kami</h2></header>
            <ol>
              {story.map((item) => (
                <li key={item.number} data-reveal>
                  <span>{item.number}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </li>
              ))}
            </ol>
            <div className="kabar-story-rose" data-scene data-scene-depth="-0.8" aria-hidden="true">
              <Decoration id="orn-shared-romance-01" className="kabar-story-rose-art" />
            </div>
          </div>
        </section>

        <section className="kabar-gallery" id="galeri" aria-labelledby="kabar-gallery-title">
          <header className="kabar-gallery-heading" data-reveal>
            <h2 id="kabar-gallery-title">Galeri</h2>
          </header>
          <div className="kabar-contact-sheet">
            {contactSheet.map((photoIndex) => (
              <PhotoButton
                index={photoIndex}
                className={`kabar-contact-photo kabar-contact-photo-${photoIndex}`}
                key={photoIndex}
              />
            ))}
          </div>
          <div className="kabar-gallery-edge" data-scene data-scene-depth="0.65" aria-hidden="true">
            <Decoration id="orn-retro-02" className="kabar-envelope-art" />
          </div>
        </section>

        <section className="kabar-rsvp" id="ucapan" aria-labelledby="kabar-rsvp-title">
          <header data-reveal>
            <h2 id="kabar-rsvp-title">Kehadiran &amp; doa</h2>
            <p>12 Desember 2027 · Bandung</p>
          </header>
          <Rsvp className="kabar-rsvp-form" />
        </section>

        <section className="kabar-gift" aria-label="Hadiah">
          <Gift className="kabar-gift-details" />
        </section>

        <footer className="kabar-closing" data-reveal>
          <div className="kabar-closing-envelope" data-scene data-scene-depth="-0.65" aria-hidden="true">
            <Decoration id="orn-shared-romance-04" className="kabar-closing-envelope-art" />
          </div>
          <p>Dengan hormat,</p>
          <strong>Nara Pradipta <i>&amp;</i> Aruna Kirana</strong>
          <time dateTime="2027-12-12">12 Desember 2027 · Bandung</time>
        </footer>
      </div>
    </InvitationFrame>
  );
}
