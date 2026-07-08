"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, nav } from "@/content/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // lock body scroll while menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled && !open ? "bg-ink/95" : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 md:px-10"
        aria-label="Main"
      >
        {/* Logo, significantly larger per Ryan's punch list */}
        {/* TODO-ASSET: swap PNG for SVG when provided */}
        <Link href="/" className="relative z-50 block" aria-label="RYŌSHIN Solutions home">
          <Image
            src={brand.logoLight}
            alt="RYŌSHIN Solutions"
            width={640}
            height={180}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`link-draw eyebrow transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-paper"
                    : "text-paper/65 hover:text-paper"
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[7px] md:hidden"
        >
          <span
            className={`bg-paper block h-px w-7 transition-transform duration-300 ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`bg-paper block h-px w-7 transition-transform duration-300 ${
              open ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu, full ink overlay with display type */}
      <div
        className={`bg-ink fixed inset-0 z-40 flex flex-col justify-center px-8 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-7">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`display block text-[2.5rem] leading-tight ${
                  pathname === item.href ? "text-shu" : "text-paper"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
