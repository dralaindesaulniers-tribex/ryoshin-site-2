import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FooterCta from "@/components/FooterCta";
import { work } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "From cultural preservation to global tech startups and enterprise transformation. Case studies in strategy, innovation, and lasting impact.",
};

export default function WorkPage() {
  return (
    <main>
      <PageHero eyebrow="Work" quote={work.heroQuote} attribution={work.heroAttribution} />

      {/* Intro */}
      <section className="bg-paper pt-24 pb-8 md:pt-32">
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-10">
          <p className="text-ink/70" style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.75 }}>
            {work.intro}
          </p>
        </div>
      </section>

      {/* Case studies, alternating contained modules with anchor ids for the network */}
      <section className="bg-paper section-pad">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 md:px-10">
          {work.caseStudies.map((cs, idx) => (
            <article
              key={cs.id}
              id={cs.id}
              className="panel-light scroll-mt-28 grid items-center gap-8 p-8 md:grid-cols-12 md:gap-12 md:p-12"
            >
              {/* image alternates side for rhythm */}
              <div
                data-clip-reveal
                className={`overflow-hidden rounded-[2px] md:col-span-5 ${
                  idx % 2 === 1 ? "md:order-2 md:col-start-8" : ""
                }`}
              >
                {/* photos fill the frame; logo marks sit contained in a shorter box */}
                <Image
                  src={cs.image}
                  alt={cs.client}
                  width={800}
                  height={600}
                  className={
                    cs.logo
                      ? "h-64 w-full object-cover md:h-80"
                      : "bg-paper h-48 w-full object-contain p-8 md:h-64"
                  }
                />
              </div>

              <div className={`md:col-span-6 ${idx % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
                <p className="eyebrow text-ink/45">
                  <span className="eyebrow-num">{String(idx + 1).padStart(2, "0")}</span>
                  Case study
                </p>
                <h2 className="display text-ink mt-5" style={{ fontSize: "var(--text-display-xs)" }}>
                  {cs.client}
                </h2>
                {cs.blocks.map((b) => (
                  <div key={b.title} className="mt-6">
                    <h3 className="font-display text-ink text-lg">{b.title}</h3>
                    <p className="text-ink/70 mt-2 text-base">{b.body}</p>
                  </div>
                ))}
                {cs.highlights && (
                  <ul className="mt-6 space-y-2 border-t border-(--color-line-light) pt-6">
                    {cs.highlights.map((h) => (
                      <li key={h} className="text-ink/70 flex gap-3 text-base">
                        <span className="text-shu mt-[0.55em] h-px w-4 shrink-0 bg-current" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {cs.logo && (
                  <Image
                    src={cs.logo}
                    alt={`${cs.client} logo`}
                    width={200}
                    height={100}
                    className="mt-8 h-9 w-auto object-contain"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink section-pad relative overflow-hidden text-center">
        <div aria-hidden="true" className="glow-shu inset-x-0 top-1/4 h-[60%]" />
        <div className="relative mx-auto max-w-[820px] px-6 md:px-10">
          <h2 className="display text-paper" style={{ fontSize: "var(--text-display-sm)" }}>
            {work.closingCta.headline}
          </h2>
          <p className="text-paper/55 mx-auto mt-5 max-w-[48ch]" style={{ fontSize: "var(--text-body-lg)" }}>
            {work.closingCta.body}
          </p>
          <Link
            href={work.closingCta.href}
            className="bg-shu hover:bg-shu-deep text-paper eyebrow mt-10 inline-block rounded-[2px] px-9 py-4 transition-all duration-200 hover:translate-y-[2px]"
          >
            {work.closingCta.button}
          </Link>
        </div>
      </section>

      <FooterCta />
    </main>
  );
}
