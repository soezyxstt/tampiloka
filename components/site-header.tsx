"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import "../app/navigation.css"

const links = [
  ["Produk", "/produk"],
  ["Layanan", "/layanan"],
  ["Industri", "/industri"],
  ["Tentang", "/tentang"],
] as const

function navigationLinkClass(pathname: string, href: string) {
  return `header-nav-link${pathname === href ? " is-current" : ""}`
}

export function SiteHeader() {
  const pathname = usePathname()
  const [hiddenFor, setHiddenFor] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const lastY = useRef(0)
  const scrollDirection = useRef(0)
  const scrollDistance = useRef(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    lastY.current = window.scrollY
    scrollDirection.current = 0
    scrollDistance.current = 0

    const resetScrollIntent = () => {
      scrollDirection.current = 0
      scrollDistance.current = 0
    }

    const onScroll = () => {
      const currentY = Math.max(0, window.scrollY)
      const delta = currentY - lastY.current
      lastY.current = currentY

      if (reducedMotion.matches) {
        setHiddenFor(null)
        resetScrollIntent()
        return
      }

      if (currentY <= 28) {
        setHiddenFor(null)
        resetScrollIntent()
        return
      }

      if (delta === 0) return
      const direction = Math.sign(delta)
      if (direction !== scrollDirection.current) {
        scrollDirection.current = direction
        scrollDistance.current = 0
      }
      scrollDistance.current += Math.abs(delta)

      if (scrollDistance.current >= 8) {
        setHiddenFor(direction < 0 ? null : pathname)
        resetScrollIntent()
      }
    }

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) setHiddenFor(null)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    reducedMotion.addEventListener("change", onMotionPreferenceChange)
    return () => {
      window.removeEventListener("scroll", onScroll)
      reducedMotion.removeEventListener("change", onMotionPreferenceChange)
    }
  }, [pathname])

  return (
    <header
      className="site-header site-header--primary"
      data-hidden={hiddenFor === pathname && !sheetOpen ? "true" : undefined}
    >
      <Link href="/" aria-label="Tampiloka, beranda" className="header-brand">
        <Image src="/brand/logos/light/tampiloka-horizontal-light.svg" alt="Tampiloka" width={800} height={200} priority />
      </Link>

      <nav className="header-desktop-nav type-label" aria-label="Navigasi utama">
        {links.map(([label, href]) => (
          <Link key={href} className={navigationLinkClass(pathname, href)} href={href} aria-current={pathname === href ? "page" : undefined}>
            {label}
          </Link>
        ))}
        <Button
          className="header-contact-link"
          size="lg"
          render={<Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} />}
        >
          Contact <ArrowUpRight aria-hidden="true" />
        </Button>
      </nav>

      <div className="header-mobile-actions">
        <Button
          className="header-contact-link header-contact-link--mobile"
          size="lg"
          render={<Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} />}
        >
          Contact
        </Button>
        <Sheet
          open={sheetOpen}
          onOpenChange={(open) => {
            setSheetOpen(open)
            if (open) setHiddenFor(null)
          }}
        >
          <SheetTrigger
            aria-label="Buka navigasi"
            className="header-menu-trigger"
            render={<Button variant="ghost" size="icon" aria-label="Buka navigasi" />}
          >
            <Menu aria-hidden="true" />
          </SheetTrigger>
          <SheetContent className="header-sheet">
            <div className="header-sheet__top">
              <SheetTitle className="sr-only">Navigasi Tampiloka</SheetTitle>
              <SheetClose render={<Link href="/" aria-label="Tampiloka, beranda" className="header-brand" />}>
                <Image src="/brand/logos/light/tampiloka-horizontal-light.svg" alt="Tampiloka" width={800} height={200} />
              </SheetClose>
              <SheetClose
              aria-label="Tutup navigasi"
              render={<Button variant="ghost" size="icon" aria-label="Tutup navigasi" />}
              >
                <X aria-hidden="true" />
              </SheetClose>
            </div>
            <nav className="header-sheet__nav type-heading-3" aria-label="Navigasi utama">
              {links.map(([label, href]) => (
                <SheetClose key={href} render={<Link className={navigationLinkClass(pathname, href)} href={href} aria-current={pathname === href ? "page" : undefined} />}>{label}</SheetClose>
              ))}
              <SheetClose render={<Link className="header-sheet__contact" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} />}>
                Contact <ArrowUpRight aria-hidden="true" />
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
