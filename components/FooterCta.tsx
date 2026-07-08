import Link from "next/link";
import { footerCta } from "@/content/site";

/**
 * "Ready to Start?" section, perfectly centered per Ryan's punch list (spec 5.8).
 * Sits above the site footer on primary pages.
 */
export default function FooterCta() {
  return (
    <section className="bg-paper section-pad text-center">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <h2 className="display text-ink" style={{ fontSize: "var(--text-display-sm)" }}>
          {footerCta.headline}
        </h2>
        {/* TODO: copywriter pass on this line (spec 5.8) */}
        <p className="text-ink/60 mx-auto mt-5 max-w-[44ch]" style={{ fontSize: "var(--text-body-lg)" }}>
          {footerCta.subline}
        </p>
        <Link
          href={footerCta.href}
          className="bg-shu hover:bg-shu-deep text-paper eyebrow mt-10 inline-block rounded-[2px] px-9 py-4 transition-all duration-200 hover:translate-y-[2px]"
        >
          {footerCta.button}
        </Link>
      </div>
    </section>
  );
}
