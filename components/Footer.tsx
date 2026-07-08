import Image from "next/image";
import Link from "next/link";
import { brand, contact, nav } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/60">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid gap-14 border-b border-(--color-line-dark) pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Logo significantly larger per Ryan's punch list, aligned to grid */}
          {/* TODO-ASSET: swap PNG for SVG when provided */}
          <div>
            <Link href="/" aria-label="RYŌSHIN Solutions home">
              <Image
                src={brand.logoLight}
                alt="RYŌSHIN Solutions"
                width={640}
                height={180}
                className="h-16 w-auto md:h-20"
              />
            </Link>
            <p className="text-paper/50 mt-6 max-w-[36ch]">{brand.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow text-paper/40 mb-6">Explore</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="link-draw hover:text-paper transition-colors">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw hover:text-paper transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="link-draw hover:text-paper transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="link-draw hover:text-paper transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-paper/40 mb-6">Contact</h2>
            <address className="space-y-3 not-italic">
              <p>
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p>
                <a href={contact.phoneHref} className="link-draw hover:text-paper transition-colors">
                  {contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="link-draw hover:text-paper transition-colors"
                >
                  {contact.email}
                </a>
              </p>
            </address>
            <ul className="mt-6 flex gap-6">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="link-draw eyebrow text-paper/50 hover:text-paper transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-paper/35 pt-8 text-sm">
          Copyright {new Date().getFullYear()} {brand.name}, all rights reserved.
        </p>
      </div>
    </footer>
  );
}
