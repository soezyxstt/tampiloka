"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Fragment, type ReactNode } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { menuTransition } from "./menu-state.mjs";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

export interface NavLinkItem {
  label: string;
  href: string;
  children?: readonly NavLinkItem[];
  overviewLabel?: string;
  disclosureLabel?: string;
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
  /** Optional app-specific internal link renderer, for example a localized router. */
  renderInternalLink?: (props: {
    href: string;
    children?: ReactNode;
    className?: string;
    ariaLabel?: string;
    ariaCurrent?: "page";
    onClick?: () => void;
  }) => ReactNode;
  /** Optional localized language control rendered in desktop and mobile navigation. */
  localization?: ReactNode;
  navigationLabel?: string;
  homeLabel?: string;
  openMenuLabel?: string;
  closeMenuLabel?: string;
  currentPath?: string;
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
  renderInternalLink,
  localization,
  navigationLabel = "Navigasi utama",
  homeLabel = "beranda",
  openMenuLabel = "Buka navigasi",
  closeMenuLabel = "Tutup navigasi",
  currentPath,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const activePathname = currentPath ?? pathname;
  const [hiddenFor, setHiddenFor] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [menu, setMenu] = useState<{ href: string; mode: "hover" | "pinned" } | null>(null);
  const openMenu = menu?.href;
  const closeMenu = () => setMenu(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    const dismiss = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node) && !mobileMenuRef.current?.contains(event.target as Node)) closeMenu();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const focusInside = sheetOpen
          ? mobileMenuRef.current?.contains(document.activeElement)
          : document.activeElement === menuButtonRef.current || menuRef.current?.querySelector(".header-subnav__panel")?.contains(document.activeElement);
        closeMenu();
        if (focusInside) { event.stopPropagation(); (sheetOpen ? mobileButtonRef : menuButtonRef).current?.focus(); }
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape, true);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape, true); };
  }, [openMenu, sheetOpen]);

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
  const logoContent = transparentOnTop && darkLogo ? (
    <>
      <Image src={darkLogo.src} alt={darkLogo.alt} width={darkLogo.width ?? 800} height={darkLogo.height ?? 200} priority={darkLogo.priority ?? true} className="header-brand__dark" />
      <Image src={logo.src} alt={logo.alt} width={logo.width ?? 800} height={logo.height ?? 200} priority={logo.priority ?? true} className="header-brand__light" />
    </>
  ) : (
    <Image src={logo.src} alt={logo.alt} width={logo.width ?? 800} height={logo.height ?? 200} priority={logo.priority ?? true} />
  );
  const renderLink = (props: { href: string; children: ReactNode; className?: string; ariaLabel?: string; ariaCurrent?: "page"; onClick?: () => void }) =>
    renderInternalLink ? renderInternalLink(props) : (
      <Link href={props.href} className={props.className} aria-label={props.ariaLabel} aria-current={props.ariaCurrent} onClick={props.onClick}>
        {props.children}
      </Link>
    );
  const headerClassNames = [
    "site-header",
    "site-header--primary",
    transparentOnTop ? "site-header--transparent-top" : "",
    transparentOnTop && isScrolled ? "is-scrolled" : "",
    links.some(link => link.children?.length) ? "site-header--has-subnav" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={headerClassNames}
      data-hidden={hiddenFor === pathname && !sheetOpen && !openMenu ? "true" : undefined}
      data-scrolled={transparentOnTop ? (isScrolled ? "true" : "false") : undefined}
    >
      {renderLink({ href: homeHref, ariaLabel: `${logo.alt}, ${homeLabel}`, className: "header-brand", children: logoContent })}

      <nav className="header-desktop-nav type-label" aria-label={navigationLabel}>
        {links.map(({ label, href, children, overviewLabel, disclosureLabel }) => {
          if (children?.length) return <div className="header-subnav" key={href} ref={menuRef}
            onPointerEnter={event => { if (event.pointerType === "mouse") setMenu(current => menuTransition(current, href, "enter")); }}
            onPointerLeave={event => { if (event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) setMenu(current => menuTransition(current, href, "leave")); }}
            onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenu(); }}>
            {renderLink({ href, className: navigationLinkClass(activePathname, href), ariaCurrent: activePathname === href ? "page" : undefined, onClick: closeMenu, children: label })}
            <button ref={menuButtonRef} type="button" className="header-subnav__trigger" aria-label={disclosureLabel ?? label} aria-expanded={openMenu === href} aria-controls="header-subnav-desktop" onClick={() => setMenu(current => menuTransition(current, href, "click"))}><ChevronDown aria-hidden="true" size={16} /></button>
            <div id="header-subnav-desktop" className="header-subnav__panel" data-open={openMenu === href} inert={openMenu !== href}>
              {renderLink({ href, className: "header-subnav__overview", onClick: () => closeMenu(), children: overviewLabel ?? label })}
              {children.map(child => <Fragment key={child.href}>{renderLink({ ...child, children: child.label, onClick: () => closeMenu() })}</Fragment>)}
            </div>
          </div>;
          const isCurrent = activePathname === href;
          return href.startsWith("#") ? (
            <a key={href} className="header-nav-link" href={href}>
              {label}
            </a>
          ) : (
            <Fragment key={href}>{renderLink({ href, className: navigationLinkClass(activePathname, href), ariaCurrent: isCurrent ? "page" : undefined, children: label })}</Fragment>
          );
        })}
        {action && (
          action.href.startsWith("http") || action.href.startsWith("mailto:") || action.href.startsWith("#") ? (
            <a className={buttonVariants({ variant: "brand", size: "pill", className: "header-contact-link" })} href={action.href}>
              {action.label}
            </a>
          ) : (
            renderLink({ href: action.href, className: buttonVariants({ variant: "brand", size: "pill", className: "header-contact-link" }), ariaCurrent: activePathname === action.href ? "page" : undefined, children: action.label })
          )
        )}
        {localization}
      </nav>

      <div className="header-mobile-actions">
        {localization}
        {action && (
          action.href.startsWith("http") || action.href.startsWith("mailto:") || action.href.startsWith("#") ? (
            <a className={buttonVariants({ variant: "brand", size: "pill", className: "header-contact-link header-contact-link--mobile" })} href={action.href}>
              {action.label}
            </a>
          ) : (
            renderLink({ href: action.href, className: buttonVariants({ variant: "brand", size: "pill", className: "header-contact-link header-contact-link--mobile" }), ariaCurrent: activePathname === action.href ? "page" : undefined, children: action.label })
          )
        )}
        <Sheet
          open={sheetOpen}
          onOpenChange={(open: boolean) => {
            setSheetOpen(open);
            closeMenu();
            if (open) setHiddenFor(null);
          }}
        >
          <SheetTrigger
            aria-label={openMenuLabel}
            className="header-menu-trigger"
            render={<Button variant="ghost" size="icon" aria-label={openMenuLabel} />}
          >
            <Menu aria-hidden="true" />
          </SheetTrigger>
          <SheetContent className="header-sheet">
            <div className="header-sheet__top">
              <SheetTitle className="sr-only">{mobileTitle}</SheetTitle>
              {renderLink({ href: homeHref, ariaLabel: `${logo.alt}, ${homeLabel}`, className: "header-brand", onClick: () => setSheetOpen(false), children: <Image src={logo.src} alt={logo.alt} width={logo.width ?? 800} height={logo.height ?? 200} /> })}
              <SheetClose
                aria-label={closeMenuLabel}
                render={<Button variant="ghost" size="icon" aria-label={closeMenuLabel} />}
              >
                <X aria-hidden="true" />
              </SheetClose>
            </div>
            <nav className="header-sheet__nav type-heading-3" aria-label={navigationLabel}>
              {links.map(({ label, href, children, overviewLabel, disclosureLabel }) =>
                children?.length ? <div className="header-sheet__group" key={href} ref={mobileMenuRef}>
                  <button ref={mobileButtonRef} type="button" className="header-sheet__toggle" aria-label={disclosureLabel} aria-current={activePathname === href ? "page" : undefined} aria-expanded={openMenu === href} aria-controls="header-subnav-mobile" onClick={() => setMenu(current => menuTransition(current, href, "click"))}>{label}<ChevronDown aria-hidden="true" size={20} /></button>
                  <div id="header-subnav-mobile" className="header-sheet__submenu" data-open={openMenu === href} inert={openMenu !== href}><div>
                    {renderLink({ href, onClick: () => { closeMenu(); setSheetOpen(false); }, children: overviewLabel ?? label })}
                    {children.map(child => <Fragment key={child.href}>{renderLink({ ...child, children: child.label, onClick: () => { closeMenu(); setSheetOpen(false); } })}</Fragment>)}
                  </div></div>
                </div> : href.startsWith("#") ? (
                  <a key={href} className="header-nav-link" href={href} onClick={() => setSheetOpen(false)}>{label}</a>
                ) : (
                  <Fragment key={href}>{renderLink({ href, className: navigationLinkClass(activePathname, href), ariaCurrent: activePathname === href ? "page" : undefined, onClick: () => setSheetOpen(false), children: label })}</Fragment>
                )
              )}
              {action && (
                action.href.startsWith("http") || action.href.startsWith("mailto:") || action.href.startsWith("#") ? (
                  <a className="header-sheet__contact" href={action.href} onClick={() => setSheetOpen(false)}>{action.label}</a>
                ) : (
                  renderLink({ href: action.href, className: "header-sheet__contact", ariaCurrent: activePathname === action.href ? "page" : undefined, onClick: () => setSheetOpen(false), children: action.label })

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
