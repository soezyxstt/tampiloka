import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="inner-page">
      <section className="inner-page__hero" aria-labelledby="not-found-title">
        <div className="inner-page__intro">
          <p className="type-label text-brand-primary-dark">404</p>
          <h1 id="not-found-title" className="type-display-xl">Halaman tidak ditemukan.</h1>
          <p className="type-body-lg">Periksa alamat yang Anda buka, atau kembali ke beranda.</p>
          <Button
            className="inner-page__cta"
            size="pill"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <ArrowLeft aria-hidden="true" /> Kembali ke beranda
          </Button>
          <Link className="contact-page__email type-body" href="/produk">
            Lihat karya <ArrowUpRight className="inline size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
