import Link from "next/link";
import { WelcomeExample } from "@/components/welcome-example";
import { JsonLd } from "@/components/json-ld";
import {
  TEMURA_ORGANIZATION_ID,
  TEMURA_ORIGIN,
  createPageMetadata,
  temuraOfferCatalogSchema,
  temuraWebPageSchema,
} from "@/lib/seo";

const pageTitle = "Fitur undangan digital";
const pageDescription =
  "Lihat fitur undangan digital Temura, dari detail acara dan peta hingga RSVP, galeri, dashboard, dan studio.";

export const metadata = createPageMetadata({
  path: "/fitur",
  title: pageTitle,
  description: pageDescription,
});

const groups = [
  { name: "Undangan", rows: [["Detail acara", "Nama pasangan, keluarga, tanggal, dan lokasi."], ["Peta lokasi", "Bantu tamu menemukan lokasi acara lewat tautan peta."], ["Sambutan", "Sesuaikan salam pembuka untuk tamu."], ["Musik & galeri", "Lagu pilihan, foto, dan cerita pasangan."], ["Hadiah", "Tampilkan pilihan hadiah lewat transfer atau QRIS, beserta ucapan terima kasih."]] },
  { name: "Tamu", rows: [["Tautan personal", "Cantumkan nama tamu pada tautan undangan."], ["RSVP", "Tamu dapat mengonfirmasi kehadiran dan jumlah orang yang datang."], ["Ucapan", "Doa dan pesan dari keluarga dan sahabat."]] },
  { name: "Pengelolaan", rows: [["Dashboard", "Detail acara, daftar tamu, RSVP, dan ucapan."], ["Studio", "Atur teks dan elemen dengan menggesernya di kanvas."]] },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...temuraWebPageSchema({
        path: "/fitur",
        title: `${pageTitle} | Temura`,
        description: pageDescription,
        imagePath: "/images/wedding-hero.webp",
      }),
      mainEntity: {
        "@type": "Service",
        name: "Undangan pernikahan digital Temura",
        description: pageDescription,
        serviceType: "Undangan pernikahan digital",
        provider: { "@id": TEMURA_ORGANIZATION_ID },
        areaServed: { "@type": "Country", name: "Indonesia" },
        hasOfferCatalog: { "@id": `${TEMURA_ORIGIN}/#paket` },
      },
    },
    temuraOfferCatalogSchema(),
    ...groups.map((group) => ({
      "@type": "ItemList",
      name: `Fitur ${group.name}`,
      numberOfItems: group.rows.length,
      itemListElement: group.rows.map(([title, description], index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "DefinedTerm",
          name: title,
          description,
        },
      })),
    })),
  ],
};

export default function FeaturesPage() {
  return (
    <div className="temura-site">
      <JsonLd data={structuredData} />
      <section className="temura-section temura-container temura-page-intro">
        <h1 className="type-display">Fitur</h1>
        <p className="type-body temura-muted temura-page-description">Fitur tersedia sesuai paket dan tahap pengembangan. Hubungi kami untuk memastikan kebutuhan kalian.</p>
        <div className="temura-feature-groups">
          {groups.map((group) => (
            <section key={group.name}>
              <h2 className="type-heading-3">{group.name}</h2>
              <dl>
                {group.rows.map(([title, description]) => (
                  <div key={title} className="temura-feature-row">
                    <dt className="type-label-lg">{title}</dt>
                    <dd className="type-body temura-muted">
                      {description}
                      {title === "Sambutan" && <WelcomeExample />}
                      {(title === "Studio" || title === "Dashboard") && <Link className="temura-inline-link type-label" href={`/${title.toLowerCase()}`}>Coba demo ↗</Link>}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
