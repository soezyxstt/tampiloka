"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface HeaderAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface HeaderLogo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  href?: string;
  priority?: boolean;
}

export interface SiteHeaderProps {
  logo: HeaderLogo;
  darkLogo?: HeaderLogo;
  links: readonly NavLinkItem[] | NavLinkItem[];
  action?: HeaderAction;
  mobileTitle?: string;
  className?: string;
  transparentOnTop?: boolean;
}

function navigationLinkClass(pathname: string, href: string) {
  const isCurrent = pathname === href || (href !== "/" && !href.startsWith("#") && pathname.startsWith(href));
  return `header-nav-link${isCurrent ? " is-current" : ""}`;
}

export function SiteHeader({
  logo,
  darkLogo,
  links,
  action,
  mobileTitle = "Navigasi",
  className = "",
  transparentOnTop = false,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [hiddenFor, setHiddenFor] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastY = useRef(0);
  const scrollDirection = useRef(0);
  const scrollDistance = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    lastY.current = window.scrollY;
    scrollDirection.current = 0;
    scrollDistance.current = 0;

    if (transparentOnTop) {
      setIsScrolled(window.scrollY > 20);
    }

    const resetScrollIntent = () => {
      scrollDirection.current = 0;
      scrollDistance.current = 0;
    };

    const onScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastY.current;
      lastY.current = currentY;

      if (transparentOnTop) {
        setIsScrolled(currentY > 20);
      }

      if (reducedMotion.matches) {
        setHiddenFor(null);
        resetScrollIntent();
        return;
      }

      if (currentY <= 28) {
        setHiddenFor(null);
        resetScrollIntent();
        return;
      }

      if (delta === 0) return;
      const direction = Math.sign(delta);
      if (direction !== scrollDirection.current) {
        scrollDirection.current = direction;
        scrollDistance.current = 0;
      }
      scrollDistance.current += Math.abs(delta);

      if (scrollDistance.current >= 8) {
        setHiddenFor(direction < 0 ? null : pathname);
        resetScrollIntent();
      }
    };

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) setHiddenFor(null);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, [pathname, transparentOnTop]);

  const homeHref = logo.href ?? "/";
  const headerClassNames = [
    "site-header",
    "site-header--primary",
    transparentOnTop ? "site-header--transparent-top" : "",
    transparentOnTop && isScrolled ? "is-scrolled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={headerClassNames}
      data-hidden={hiddenFor === pathname && !sheetOpen ? "true" : undefined}
      data-scrolled={transparentOnTop ? (isScrolled ? "true" : "false") : undefined}
    >
      <Link href={homeHref} aria-label={`${logo.alt}, beranda`} className="header-brand">
        {transparentOnTop && darkLogo ? (
          <>
            <Image
              src={darkLogo.src}
              alt={darkLogo.alt}
              width={darkLogo.width ?? 800}
              height={darkLogo.height ?? 200}
              priority={darkLogo.priority ?? true}
              className="header-brand__dark"
            />
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width ?? 800}
              height={logo.height ?? 200}
              priority={logo.priority ?? true}
              className="header-brand__light"
            />
          </>
        ) : (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width ?? 800}
            height={logo.height ?? 200}
            priority={logo.priority ?? true}
          />
        )}
      </Link>

      <nav className="header-desktop-nav type-label" aria-label="Navigasi utama">
        {links.map(({ label, href }) => {
          const isCurrent = pathname === href;
          return href.startsWith("#") ? (
            <a key={href} className="header-nav-link" href={href}>
              {label}
            </a>
          ) : (
            <Link
              key={href}
              className={navigationLinkClass(pathname, href)}
              href={href}
              aria-current={isCurrent ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
        {action && (
          action.href.startsWith("http") || action.href.startsWith("mailto:") || action.href.startsWith("#") ? (
            <a className="header-contact-link" href={action.href}>
              {action.label} <ArrowUpRight aria-hidden="true" />
            </a>
          ) : (
            <Button
              className="header-contact-link"
              size="lg"
              nativeButton={false}
              render={<Link href={action.href} aria-current={pathname === action.href ? "page" : undefined} />}
            >
              {action.label} <ArrowUpRight aria-hidden="true" />
            </Button>
          )
        )}
      </nav>

      <div className="header-mobile-actions">
        {action && (
          action.href.startsWith("http") || action.href.startsWith("mailto:") || action.href.startsWith("#") ? (
            <a className="header-contact-link header-contact-link--mobile" href={action.href}>
              {action.label}
            </a>
          ) : (
            <Button
              className="header-contact-link header-contact-link--mobile"
              size="lg"
              nativeButton={false}
              render={<Link href={action.href} aria-current={pathname === action.href ? "page" : undefined} />}
            >
              {action.label}
            </Button>
          )
        )}
        <Sheet
          open={sheetOpen}
          onOpenChange={(open) => {
            setSheetOpen(open);
            if (open) setHiddenFor(null);
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
              <SheetTitle className="sr-only">{mobileTitle}</SheetTitle>
              <SheetClose nativeButton={false} render={<Link href={homeHref} aria-label={`${logo.alt}, beranda`} className="header-brand" />}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width ?? 800}
                  height={logo.height ?? 200}
                />
              </SheetClose>
              <SheetClose
                aria-label="Tutup navigasi"
                render={<Button variant="ghost" size="icon" aria-label="Tutup navigasi" />}
              >
                <X aria-hidden="true" />
              </SheetClose>
            </div>
            <nav className="header-sheet__nav type-heading-3" aria-label="Navigasi utama">
              {links.map(({ label, href }) =>
                href.startsWith("#") ? (
                  <SheetClose nativeButton={false} key={href} render={<a className="header-nav-link" href={href} />}>
                    {label}
                  </SheetClose>
                ) : (
                  <SheetClose
                    key={href}
                    nativeButton={false}
                    render={
                      <Link
                        className={navigationLinkClass(pathname, href)}
                        href={href}
                        aria-current={pathname === href ? "page" : undefined}
                      />
                    }
                  >
                    {label}
                  </SheetClose>
                )
              )}
              {action && (
                action.href.startsWith("http") || action.href.startsWith("mailto:") || action.href.startsWith("#") ? (
                  <SheetClose
                    nativeButton={false}
                    render={<a className="header-sheet__contact" href={action.href} />}
                  >
                    {action.label} <ArrowUpRight aria-hidden="true" />
                  </SheetClose>
                ) : (
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        className="header-sheet__contact"
                        href={action.href}
                        aria-current={pathname === action.href ? "page" : undefined}
                      />
                    }
                  >
                    {action.label} <ArrowUpRight aria-hidden="true" />
                  </SheetClose>
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default SiteHeader;
