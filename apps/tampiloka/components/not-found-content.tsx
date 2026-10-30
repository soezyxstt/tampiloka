import { Button } from "@/components/ui/button";
import { localePath, type Locale } from "@/i18n/routing";

export function NotFoundContent({ locale }: { locale: Locale }) {
  const english = locale === "en";
  return (
    <div className="inner-page">
      <section className="inner-page__hero" aria-labelledby="not-found-title">
        <div className="inner-page__intro">
          <p className="type-label text-brand-primary-dark">404</p>
          <h1 id="not-found-title" className="type-display-xl">{english ? "Page not found." : "Halaman tidak ditemukan."}</h1>
          <p className="type-body-lg">{english ? "Check the address, or return to the home page." : "Periksa alamat yang Anda buka, atau kembali ke beranda."}</p>
          <Button
            className="inner-page__cta"
            size="pill"
            nativeButton={false}
            render={<a href={localePath(locale, "/")} />}
          >
            {english ? "Back to home" : "Kembali ke beranda"}
          </Button>
          <a className="contact-page__email type-body" href={localePath(locale, "/produk")}>
            {english ? "View our work" : "Lihat karya"}
          </a>
        </div>
      </section>
    </div>
  );
}
