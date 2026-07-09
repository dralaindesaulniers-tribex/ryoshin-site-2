import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import EmailCapture from "@/components/EmailCapture";
import FooterCta from "@/components/FooterCta";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategic growth consulting, technology strategy, AI and digital platforms, vision-led project delivery, and systems that scale.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        quote={services.heroQuote}
        attribution={services.heroAttribution}
      />

      {/* Kokoro / Mondai / Kaidan framework, glass modules on dark */}
      <section className="bg-ink-soft section-pad relative overflow-hidden">
        <div aria-hidden="true" className="glow-shu inset-x-0 top-0 h-[50%]" />
        <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
          <p className="eyebrow text-paper/55 mb-14">
            <span className="eyebrow-num">01</span>The framework
          </p>
          <div data-stagger-children className="grid gap-6 md:grid-cols-3">
            {services.framework.map((f, i) => (
              <article key={f.romaji} className={`panel-dark p-8 md:p-9 ${i === 1 ? "md:mt-10" : ""}`}>
                <p lang="ja" className="font-jp text-shu text-4xl font-light">
                  {f.kanji}
                </p>
                <h2 className="eyebrow text-paper/50 mt-6">
                  {f.romaji}, {f.title}
                </h2>
                <p className="text-paper/70 mt-4 text-base">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Intro with the services hero image, contained on light */}
      <section className="bg-paper section-pad">
        <div className="mx-auto grid max-w-[1200px] items-start gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <p className="eyebrow text-ink/45">
              <span className="eyebrow-num">02</span>We are here to help
            </p>
            <h2 className="display text-ink mt-6" style={{ fontSize: "var(--text-display-sm)" }}>
              Strategy. Technology. Impact.
            </h2>
            <div data-clip-reveal className="panel-light mt-8 overflow-hidden">
              <Image
                src="/images/services-hero.png"
                alt="RYŌSHIN Solutions at work"
                width={1200}
                height={800}
                className="h-64 w-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            <p className="text-ink/75" style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.75 }}>
              {services.intro}
            </p>
          </div>
        </div>
      </section>

      {/* 8-service operational grid, contained modules on light */}
      <section className="bg-paper-soft section-pad border-y border-(--color-line-light)">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <p className="eyebrow text-ink/45 mb-12">
            <span className="eyebrow-num">03</span>What we offer
          </p>
          <ul data-stagger-children className="grid gap-6 sm:grid-cols-2">
            {services.list.map((s, i) => (
              <li key={s.title} className="panel-light group flex items-start gap-5 p-7 md:p-8">
                <span className="font-display text-shu/70 text-lg tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-ink text-xl">{s.title}</h3>
                  <p className="text-ink/60 mt-2 text-base">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EmailCapture />
      <FooterCta />
    </main>
  );
}
