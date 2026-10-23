import Image from "next/image";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import "./location.css";

const query = "Historia Coffee & Eatery Jl. Cimanuk No. 305 Garut";
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const embeddedMap = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

export function Location() {
  return (
    <section className="location-section" id="kunjungi" aria-labelledby="location-title">
      <div className="location-layout">
        <div className="location-details">
          <h2 data-scroll-reveal="" id="location-title">Cimanuk 305,<br />Garut.</h2>

          <address className="location-address" data-scroll-reveal="">
            <MapPin size={20} aria-hidden="true" />
            <div>Jl. Cimanuk No. 305, Pataruman<br />Tarogong Kidul, Garut, Jawa Barat<span>Di samping Dealer Toyota Garut.</span></div>
          </address>
          <div className="location-hours" data-scroll-reveal=""><Clock3 size={20} aria-hidden="true" /><div>Setiap hari<strong>09.00–23.00 WIB</strong></div></div>
          <div className="location-actions" data-scroll-reveal="">
            <Button className="location-directions" nativeButton={false} render={<a href={maps} target="_blank" rel="noopener noreferrer" />}>Petunjuk arah <ArrowUpRight size={20} aria-hidden="true" /></Button>
            <Button variant="ghost" className="location-contact" nativeButton={false} render={<a href="https://wa.me/6282130468241" target="_blank" rel="noopener noreferrer" />}><Image src="/icons/whatsapp.svg" alt="" width={20} height={20} aria-hidden="true" />Hubungi Historia<span className="sr-only"> melalui WhatsApp</span><ArrowUpRight size={18} aria-hidden="true" /></Button>
          </div>
        </div>
        <div className="location-map-area">
          <figure className="location-photo" data-scroll-reveal="">
            <Image src="/images/location.webp" alt="Papan nama Historia Coffee & Eatery di Jalan Cimanuk, Garut" fill sizes="(max-width: 767px) 100vw, 60vw" />
            <figcaption>Jl. Cimanuk No. 305</figcaption>
          </figure>
          <iframe className="location-map" title="Peta lokasi Historia Coffee & Eatery, Jalan Cimanuk No. 305 Garut" src={embeddedMap} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <p className="location-map-note">Peta tidak terbuka? <a href={maps} target="_blank" rel="noopener noreferrer">Lihat lokasi di Google Maps <ArrowUpRight size={14} aria-hidden="true" /></a></p>
        </div>
      </div>
      <div className="location-bottom"><span>Garut, Jawa Barat</span><p>Untuk ketersediaan tempat dan informasi terbaru, hubungi tim Historia sebelum berkunjung.</p></div>
    </section>
  );
}
