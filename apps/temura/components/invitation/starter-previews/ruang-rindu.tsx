import "./ruang-rindu.css";
import { CalendarLink, Countdown, Decoration, EventMap, Gift, InvitationFrame, OpenButton, PhotoButton, Rsvp } from "./preview-kit";

const story = [
  { year: "2021", text: "Kami mulai saling mengenal." },
  { year: "2024", text: "Kami memilih berjalan bersama." },
  { year: "2027", text: "Dengan restu keluarga, kami menikah." },
];

function RuangRinduCover() {
  return (
    <section className="rr-cover" aria-labelledby="rr-cover-title">
      <div className="rr-cover-ground" aria-hidden="true"><Decoration id="bg-minimalist-ruang-rindu" eager /></div>
      <div className="rr-cover-branch" aria-hidden="true"><Decoration id="orn-minimalist-ruang-rindu-02" eager /></div>
      <p className="rr-cover-date"><time dateTime="2027-12-12">12 Desember 2027</time><span>Bandung</span></p>
      <div className="rr-cover-lockup">
        <h1 id="rr-cover-title"><span>Nara</span><i aria-hidden="true">&amp;</i><span>Aruna</span></h1>
        <PhotoButton index={2} className="rr-cover-portrait" />
      </div>
      <OpenButton className="rr-open" />
    </section>
  );
}

export function RuangRinduPreview() {
  return (
    <InvitationFrame templateId="minimalist-ruang-rindu" name="Ruang Rindu" className="rr-frame" cover={<RuangRinduCover />}>
      <div className="rr-content">
        <section className="rr-editorial" id="mempelai" aria-labelledby="rr-editorial-title">
          <header className="rr-editorial-heading" data-reveal>
            <p><time dateTime="2027-12-12">Minggu, 12 Desember 2027</time><span>Bandung, Jawa Barat</span></p>
            <h2 id="rr-editorial-title">Mempelai</h2>
            <p className="rr-editorial-invitation">Dengan hormat, kami mengundang Anda untuk hadir di hari pernikahan kami.</p>
          </header>
          <div className="rr-identity-layout">
            <div className="rr-identities">
              <article className="rr-person" data-reveal>
                <p>Putra</p>
                <h3>Nara Pradipta</h3>
                <p>Putra dari Bapak Aditya dan Ibu Laras</p>
              </article>
              <span className="rr-identity-join" aria-hidden="true">&amp;</span>
              <article className="rr-person" data-reveal>
                <p>Putri</p>
                <h3>Aruna Kirana</h3>
                <p>Putri dari Bapak Baskara dan Ibu Ratih</p>
              </article>
            </div>
            <PhotoButton index={1} className="rr-identity-photo" />
          </div>
        </section>

        <section className="rr-agenda" id="acara" aria-labelledby="rr-agenda-title">
          <header className="rr-agenda-heading" data-reveal>
            <div><p>12 Desember 2027 · Bandung</p><h2 id="rr-agenda-title">Acara</h2></div>
            <Countdown className="rr-countdown" />
          </header>
          <ol className="rr-agenda-list">
            <li data-reveal><time dateTime="2027-12-12T08:00:00+07:00">08.00–10.00 WIB</time><h3>Akad nikah</h3><span>Bandung</span></li>
            <li data-reveal><time dateTime="2027-12-12T11:00:00+07:00">11.00–14.00 WIB</time><h3>Resepsi</h3><span>Bandung</span></li>
          </ol>
          <div className="rr-agenda-actions" data-reveal><CalendarLink /><p>Bandung, Jawa Barat</p></div>
          <EventMap className="rr-map" />
        </section>

        <section className="rr-story" aria-labelledby="rr-story-title">
          <header className="rr-story-heading" data-reveal><h2 id="rr-story-title">Cerita kami</h2></header>
          <div className="rr-story-layout">
            <ol className="rr-story-list">
              {story.map((item) => <li data-reveal key={item.year}><time dateTime={item.year}>{item.year}</time><p>{item.text}</p></li>)}
            </ol>
            <PhotoButton index={4} className="rr-story-photo" />
          </div>
        </section>

        <section className="rr-gallery" id="galeri" aria-labelledby="rr-gallery-title">
          <header className="rr-gallery-heading" data-reveal><h2 id="rr-gallery-title">Galeri</h2></header>
          <div className="rr-masonry">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <figure className={`rr-gallery-photo rr-gallery-photo--${index}`} key={index}>
                <PhotoButton index={index} />
              </figure>
            ))}
          </div>
          <div className="rr-gallery-leaf" aria-hidden="true"><Decoration id="orn-minimalist-ruang-rindu-01" /></div>
        </section>

        <section className="rr-rsvp" id="ucapan" aria-labelledby="rr-rsvp-title">
          <header data-reveal><h2 id="rr-rsvp-title">Ucapan</h2><p>Konfirmasi kehadiran dan kirimkan doa.</p></header>
          <Rsvp className="rr-rsvp-form" />
        </section>
        <section className="rr-gift" aria-label="Hadiah"><Gift className="rr-gift-details" /></section>
        <footer className="rr-closing"><div className="rr-closing-copy" data-reveal><p>Terima kasih atas doa dan kehadiran Anda.</p><strong>Nara <i aria-hidden="true">&amp;</i> Aruna</strong><time dateTime="2027-12-12">12 Desember 2027 · Bandung</time></div></footer>
      </div>
    </InvitationFrame>
  );
}
