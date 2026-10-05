import "./sekar-mataram.css";
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

const moments = [
  { title: "Awal", text: "Sebuah pertemuan menjadi permulaan." },
  { title: "Bersama", text: "Kami melangkah dan belajar saling menguatkan." },
  { title: "Hari ini", text: "Kami memulai keluarga dengan doa orang tua." },
];

const gallery = [
  { index: 1, mode: "full" },
  { index: 2, mode: "framed" },
  { index: 3, mode: "full" },
  { index: 4, mode: "framed" },
  { index: 5, mode: "full" },
  { index: 6, mode: "framed" },
] as const;

function CoupleColumn({
  firstName,
  lastName,
  role,
  parentOne,
  parentTwo,
}: {
  firstName: string;
  lastName: string;
  role: string;
  parentOne: string;
  parentTwo: string;
}) {
  return (
    <div className="sekar-person-column">
      <h3><span>{firstName}</span><span>{lastName}</span></h3>
      <p>{role}</p>
      <p>{parentOne}<br />&amp; {parentTwo}</p>
    </div>
  );
}

export function SekarMataramPreview() {
  const cover = (
    <section className="sekar-cover" aria-labelledby="sekar-cover-title">
      <Decoration id="bg-adat-jawa" className="sekar-cover-background" eager />
      <div className="sekar-cover-veil" aria-hidden="true" />
      <p className="sekar-cover-label">Undangan pernikahan</p>
      <div className="sekar-cover-medallion" data-scene data-scene-depth="-1.2">
        <Decoration id="orn-adat-jawa-02" className="sekar-medallion-art" eager />
        <PhotoButton index={5} className="sekar-cover-photo" />
      </div>
      <h1 id="sekar-cover-title" className="sekar-cover-names">
        <span><b>Nara</b><small>Pradipta</small></span>
        <i aria-hidden="true">&amp;</i>
        <span><b>Aruna</b><small>Kirana</small></span>
      </h1>
      <p className="sekar-cover-date">Minggu · 12 Desember 2027 <span>Bandung, Jawa Barat</span></p>
      <OpenButton className="sekar-open">Buka undangan</OpenButton>
    </section>
  );

  return (
    <InvitationFrame templateId="adat-jawa" name="Sekar Mataram" className="sekar-mataram" cover={cover}>
      <article className="sekar-content">
        <section className="sekar-couple" id="mempelai">
          <div className="sekar-couple-heading" data-reveal>
            <div className="sekar-garland" data-scene data-scene-depth="-1" aria-hidden="true">
              <Decoration id="orn-adat-jawa-01" className="sekar-garland-art" />
            </div>
            <h2>Mempelai</h2>
          </div>
          <div className="sekar-pair-columns" data-reveal>
            <CoupleColumn firstName="Nara" lastName="Pradipta" role="Putra" parentOne="Bapak Aditya" parentTwo="Ibu Laras" />
            <div className="sekar-pair-mark" aria-hidden="true"><span>&amp;</span></div>
            <CoupleColumn firstName="Aruna" lastName="Kirana" role="Putri" parentOne="Bapak Baskara" parentTwo="Ibu Ratih" />
          </div>
          <div className="sekar-couple-rule" data-scene data-scene-depth="1.25" aria-hidden="true">
            <Decoration id="orn-adat-jawa-03" className="sekar-couple-rule-art" />
          </div>
        </section>

        <section className="sekar-events" id="acara" data-reveal>
          <p className="sekar-kicker">Bandung, Jawa Barat</p>
          <h2>Acara</h2>
          <p className="sekar-event-date">Minggu, 12 Desember 2027</p>
          <Countdown className="sekar-countdown" />
          <div className="sekar-timetable">
            <div className="sekar-table-corner sekar-table-corner-left" data-scene data-scene-depth="-1" aria-hidden="true">
              <Decoration id="orn-adat-jawa-04" className="sekar-teak-corner" />
            </div>
            <div className="sekar-table-corner sekar-table-corner-right" aria-hidden="true">
              <Decoration id="orn-adat-jawa-04" className="sekar-teak-corner" />
            </div>
            <table>
              <thead><tr><th>Waktu</th><th>Acara</th></tr></thead>
              <tbody>
                <tr><td>08.00–10.00 WIB</td><td>Akad nikah</td></tr>
                <tr><td>11.00–14.00 WIB</td><td>Resepsi</td></tr>
              </tbody>
            </table>
            <CalendarLink className="sekar-calendar" />
          </div>
          <div className="sekar-map-section">
            <div className="sekar-map-title"><span>Lokasi</span><h3>Bandung</h3></div>
            <EventMap className="sekar-map" />
          </div>
          <div className="sekar-event-divider" data-scene data-scene-depth="1" aria-hidden="true">
            <Decoration id="orn-adat-jawa-05" className="sekar-divider-art" />
          </div>
        </section>

        <section className="sekar-story" data-reveal>
          <header className="sekar-story-heading">
            <h2>Cerita kami</h2>
          </header>
          <ol>{moments.map((moment, index) => (
            <li key={moment.title}>
              <span className="sekar-story-number">0{index + 1}</span>
              <h3>{moment.title}</h3>
              <p>{moment.text}</p>
            </li>
          ))}</ol>
        </section>

        <section className="sekar-gallery" id="galeri">
          <div className="sekar-gallery-heading" data-reveal>
            <h2>Galeri</h2>
          </div>
          <div className="sekar-gallery-list">
            {gallery.map(({ index, mode }) => (
              <figure className={`sekar-gallery-item sekar-gallery-${mode}`} data-reveal key={index}>
                {mode === "full" && <span className="sekar-photo-index">0{index} / 06</span>}
                <PhotoButton index={index} className="sekar-gallery-photo" />
                {mode === "framed" && <span className="sekar-photo-index sekar-photo-index-caption">0{index} / 06</span>}
              </figure>
            ))}
          </div>
        </section>

        <section className="sekar-rsvp" id="ucapan" data-reveal>
          <div className="sekar-rsvp-heading">
            <p className="sekar-kicker">Bandung · 12.12.2027</p>
            <h2>Kehadiran</h2>
          </div>
          <Rsvp className="sekar-rsvp-form" />
        </section>

        <section className="sekar-gift" data-reveal>
          <Gift className="sekar-gift-details" />
        </section>

        <footer className="sekar-closing" data-reveal>
          <div className="sekar-closing-fan" data-scene data-scene-depth="-1.2" aria-hidden="true">
            <Decoration id="orn-adat-jawa-06" className="sekar-fan-art" />
          </div>
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <div className="sekar-closing-pair"><span>Nara Pradipta</span><i>&amp;</i><span>Aruna Kirana</span></div>
          <span className="sekar-closing-date">12 Desember 2027 · Bandung</span>
        </footer>
      </article>
    </InvitationFrame>
  );
}
