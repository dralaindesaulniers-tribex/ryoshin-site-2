import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import PartnerCta from "@/components/PartnerCta";
import { partnersPage } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The people behind the RYŌSHIN network: leadership, AI engineering, operations, heritage travel, Indigenous food sovereignty, and philanthropy.",
};

/* initials for the styled placeholder while a headshot is pending */
function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function PartnersPage() {
  return (
    <main>
      <PageHero
        eyebrow={partnersPage.eyebrow}
        quote={partnersPage.heroQuote}
        attribution={partnersPage.heroAttribution}
      />

      {/* Intro */}
      <section className="bg-paper pt-24 pb-8 md:pt-32">
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-10">
          <p className="text-ink/70" style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.75 }}>
            {partnersPage.intro}
          </p>
        </div>
      </section>

      {/* People, alternating contained modules with anchor ids for the network */}
      <section className="bg-paper section-pad">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 md:px-10">
          {partnersPage.people.map((p, idx) => (
            <article
              key={p.id}
              id={p.id}
              className="panel-light scroll-mt-28 grid items-start gap-8 p-8 md:grid-cols-12 md:gap-12 md:p-12"
            >
              {/* headshot alternates side for rhythm */}
              <div
                data-clip-reveal
                className={`overflow-hidden rounded-[2px] md:col-span-4 ${
                  idx % 2 === 1 ? "md:order-2 md:col-start-9" : ""
                }`}
              >
                {p.photo ? (
                  <Image
                    src={p.photo}
                    alt={p.name}
                    width={800}
                    height={1000}
                    className="aspect-[4/5] w-full object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                ) : (
                  /* TODO-ASSET: headshot pending, styled initials placeholder */
                  <div className="bg-paper-soft border-(--color-line-light) flex aspect-[4/5] w-full items-center justify-center border">
                    <span className="font-display text-ink/25" style={{ fontSize: "4rem" }}>
                      {initials(p.name)}
                    </span>
                  </div>
                )}
              </div>

              <div className={`md:col-span-7 ${idx % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-6"}`}>
                {/* no numbers: the roster has no ranking (Alain) */}
                <p className="eyebrow text-ink/45">{p.org}</p>
                <h2 className="display text-ink mt-5" style={{ fontSize: "var(--text-display-xs)" }}>
                  {p.name}
                </h2>
                {/* role stays neutral: the numbered eyebrow already carries
                    the single vermilion accent for this card */}
                <p className="eyebrow text-ink/60 mt-3">{p.role}</p>
                <div className="mt-6 space-y-5">
                  {p.bio.map((para) => (
                    <p key={para.slice(0, 32)} className="text-ink/70 text-base" style={{ lineHeight: 1.75 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Partner inquiry form replaces the generic Ready to Start CTA (Alain) */}
      <PartnerCta />
    </main>
  );
}
