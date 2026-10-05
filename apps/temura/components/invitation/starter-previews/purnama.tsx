import "./purnama.css";
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
  { title: "Berkenalan", text: "Sebuah pertemuan membuka cerita kami." },
  { title: "Melangkah", text: "Kami memilih tumbuh dan berjalan bersama." },
  { title: "Hari ini", text: "Dengan restu keluarga, kami memulai bab baru." },
];

function BaliArch({ number, title, time }: { number: string; title: string; time: string }) {
  return (
    <article className="purnama-event-niche">
      <Decoration id="orn-adat-bali-04" className="purnama-event-arch" />
      <span className="purnama-event-number">{number}</span>
      <h3>{title}</h3>
      <p>{time}</p>
      <span className="purnama-event-place">Bandung · Jawa Barat</span>
    </article>
  );
}

function BaliSpread({ first, second, third, label }: { first: number; second: number; third: number; label: string }) {
  return (
    <div className="purnama-gallery-spread" data-reveal>
      <PhotoButton index={first} className="purnama-gallery-large" />
      <PhotoButton index={second} className="purnama-gallery-inset purnama-gallery-inset-top" />
      <PhotoButton index={third} className="purnama-gallery-inset purnama-gallery-inset-bottom" />
      <span className="purnama-gallery-label">{label}</span>
    </div>
  );
}

export function PurnamaPreview() {
  const cover = (
    <section className="purnama-cover" aria-labelledby="purnama-cover-title">
      <Decoration id="bg-adat-bali" className="purnama-cover-background" eager />
      <div className="purnama-cover-wash" aria-hidden="true" />
      <div className="purnama-cover-stamp">Undangan pernikahan</div>
      <div className="purnama-cover-gateway" data-scene data-scene-depth="-1.4" aria-hidden="true">
        <Decoration id="orn-adat-bali-04" className="purnama-cover-arch" eager />
      </div>
      <div className="purnama-cover-palm purnama-cover-palm-left" data-scene data-scene-depth="1.5" aria-hidden="true">
        <Decoration id="orn-adat-bali-02" className="purnama-cover-palm-art" eager />
      </div>
      <div className="purnama-cover-palm purnama-cover-palm-right" data-scene data-scene-depth="-1.2" aria-hidden="true">
        <Decoration id="orn-adat-bali-01" className="purnama-cover-flower-art" eager />
      </div>
      <PhotoButton index={6} className="purnama-cover-photo" />
      <div className="purnama-cover-name-band">
        <h1 id="purnama-cover-title"><span>Nara</span><i>&amp;</i><span>Aruna</span></h1>
      </div>
      <p className="purnama-cover-date">Minggu, 12 Desember 2027 <span>Bandung</span></p>
      <OpenButton className="purnama-open">Buka undangan</OpenButton>
    </section>
  );

  return (
    <InvitationFrame templateId="adat-bali" name="Purnama" className="purnama" cover={cover}>
      <article className="purnama-content">
        <section className="purnama-intro" id="mempelai">
          <div className="purnama-intro-flower" data-scene data-scene-depth="-1.3" aria-hidden="true">
            <Decoration id="orn-adat-bali-01" className="purnama-intro-flower-art" />
          </div>
          <p className="purnama-kicker">12 · 12 · 2027</p>
          <h1>Nara <i>&amp;</i> Aruna</h1>
          <p>Dengan restu keluarga, kami mengundang Anda.</p>
          <a href="#pasangan" className="purnama-scroll-link">Lihat cerita <span aria-hidden="true">↓</span></a>
        </section>

        <section className="purnama-couple" id="pasangan" data-reveal>
          <div className="purnama-couple-collage">
            <PhotoButton index={1} className="purnama-couple-main-photo" />
            <PhotoButton index={3} className="purnama-couple-overlap-photo" />
            <div className="purnama-couple-ribbon" data-scene data-scene-depth="1.2" aria-hidden="true">
              <Decoration id="orn-adat-bali-03" className="purnama-ribbon-art" />
            </div>
          </div>
          <div className="purnama-couple-paper">
            <div className="purnama-couple-names">
              <div><h2>Nara Pradipta</h2><p>Putra Bapak Aditya<br />&amp; Ibu Laras</p></div>
              <span aria-hidden="true">&amp;</span>
              <div><h2>Aruna Kirana</h2><p>Putri Bapak Baskara<br />&amp; Ibu Ratih</p></div>
            </div>
          </div>
        </section>

        <section className="purnama-events" id="acara" data-reveal>
          <div className="purnama-section-heading">
            <p className="purnama-kicker">Bandung · Jawa Barat</p>
            <h2>Acara</h2>
            <p>Minggu, 12 Desember 2027</p>
          </div>
          <Countdown className="purnama-countdown" />
          <div className="purnama-event-niches">
            <BaliArch number="01" title="Akad nikah" time="08.00–10.00 WIB" />
            <BaliArch number="02" title="Resepsi" time="11.00–14.00 WIB" />
          </div>
          <div className="purnama-map-wrap">
            <div className="purnama-map-heading"><h3>Bandung</h3><CalendarLink className="purnama-calendar" /></div>
            <EventMap className="purnama-map" />
          </div>
        </section>

        <section className="purnama-story" data-reveal>
          <div className="purnama-story-head">
            <Decoration id="orn-adat-bali-05" className="purnama-marigold" />
            <h2>Cerita kami</h2>
          </div>
          <ol>{story.map((item, index) => <li key={item.title} data-scene>
            <span className="purnama-story-no">0{index + 1}</span>
            <div><h3>{item.title}</h3><p>{item.text}</p></div>
          </li>)}</ol>
        </section>

        <section className="purnama-gallery" id="galeri">
          <div className="purnama-gallery-heading" data-reveal>
            <h2>Galeri</h2>
          </div>
          <BaliSpread first={1} second={2} third={3} label="01 / 02" />
          <BaliSpread first={4} second={5} third={6} label="02 / 02" />
        </section>

        <section className="purnama-rsvp" id="ucapan" data-reveal>
          <p className="purnama-kicker">12 Desember 2027</p>
          <h2>Kabar kehadiran</h2>
          <Rsvp className="purnama-rsvp-form" />
        </section>

        <section className="purnama-gift" data-reveal>
          <div className="purnama-gift-frame" data-scene aria-hidden="true">
            <Decoration id="orn-adat-bali-04" className="purnama-gift-arch" />
          </div>
          <Gift className="purnama-gift-content" />
        </section>

        <footer className="purnama-closing" data-reveal>
          <div className="purnama-closing-shell" data-scene data-scene-depth="-1" aria-hidden="true"><Decoration id="orn-adat-bali-06" className="purnama-closing-shell-art" /></div>
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <strong>Nara <i>&amp;</i> Aruna</strong>
          <span>Bandung · 12.12.2027</span>
        </footer>
      </article>
    </InvitationFrame>
  );
}
