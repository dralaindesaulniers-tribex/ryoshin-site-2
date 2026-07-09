import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ChatInput from "@/components/ChatInput";
import FooterCta from "@/components/FooterCta";
import HalfSun from "@/components/HalfSun";
import KanjiArt from "@/components/KanjiArt";
import { about, brand } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meaningful progress is built on trust, integrity, and human connection. Meet Ryan Yada and the philosophy behind RYŌSHIN Solutions.",
};

export default function AboutPage() {
  return (
    <main>
      {/* ============ HERO: heading centered, headline split to two lines
          with visual space (Ryan punch list) ============ */}
      <section className="bg-ink text-paper relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 text-center md:px-10">
        <HalfSun variant="static" />
        <div className="relative z-10 flex w-full flex-col items-center">
        <p className="eyebrow text-paper/50">About Us</p>
        <h1 className="display mt-10" style={{ fontSize: "clamp(2.2rem, 4.6vw, 4.25rem)" }}>
          <span className="block overflow-hidden">
            <span data-reveal-line className="block">
              {about.heroLine1}
            </span>
          </span>
          <span className="mt-6 block overflow-hidden md:mt-8">
            <span data-reveal-line className="text-paper/55 block">
              {about.heroLine2}
            </span>
          </span>
        </h1>
        <p className="text-paper/55 mt-8">{about.heroAttribution}</p>
        <div className="mt-14 flex w-full justify-center">
          <ChatInput />
        </div>
        </div>
      </section>

      {/* ============ WHO WE ARE: alignment corrected, 4/8 grid ============ */}
      <section className="bg-paper section-pad">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <p className="eyebrow text-shu">{about.whoWeAre.eyebrow}</p>
            <h2
              className="display text-ink mt-5"
              style={{ fontSize: "var(--text-display-sm)" }}
            >
              {about.whoWeAre.headline}
            </h2>
          </div>
          <div className="space-y-6 md:col-span-7 md:col-start-6">
            {about.whoWeAre.paragraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-ink/75"
                style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.75 }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOUNDER: photo depth treatment + Co-pilot title ============ */}
      <section className="bg-paper-soft section-pad border-y border-(--color-line-light)">
        <div className="mx-auto grid max-w-[1200px] items-start gap-16 px-6 md:grid-cols-12 md:gap-12 md:px-10">
          {/* Photo with depth: vermilion offset frame, clipped for parallax (motion in step 5) */}
          <div className="relative md:col-span-5">
            <div
              aria-hidden="true"
              className="border-shu absolute inset-0 translate-x-3 translate-y-3 rounded-[2px] border-4"
            />
            <div data-clip-reveal className="relative overflow-hidden rounded-[2px]">
              <Image
                data-depth-photo
                src={about.founder.photo}
                alt="Ryan Yada, Principal Progressor"
                width={1707}
                height={2560}
                className="h-auto w-full grayscale"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
          </div>

          <div className="md:col-span-7 md:pl-4">
            <p className="eyebrow text-shu">{about.founder.eyebrow}</p>
            <h2 className="display text-ink mt-5" style={{ fontSize: "var(--text-display-sm)" }}>
              {about.founder.headline}
            </h2>
            <p className="eyebrow text-ink/50 mt-4">{about.founder.title}</p>
            <div className="mt-8 space-y-6">
              {about.founder.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="text-ink/75"
                  style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.75 }}
                >
                  {p}
                </p>
              ))}
            </div>
            <Link
              href="/contact"
              className="bg-shu hover:bg-shu-deep text-paper eyebrow mt-10 inline-block rounded-[2px] px-9 py-4 transition-all duration-200 hover:translate-y-[2px]"
            >
              {about.founder.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ THE NAME: Japanese lesson block (spec 8.1)
          MANDATORY native-speaker review before launch ============ */}
      <section className="bg-ink text-paper section-pad relative overflow-hidden">
        {/* backdrop kanji art, decorative */}
        <KanjiArt
          text="良心"
          data-parallax
          className="text-shu/8 pointer-events-none absolute -top-10 -right-8 select-none"
          style={{ width: "clamp(24rem, 60vw, 52rem)" }}
        />

        <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-12">
            <p className="eyebrow text-paper/50 md:col-span-4 md:pt-3">
              {about.japaneseLesson.eyebrow}
            </p>
            <h2
              className="display md:col-span-8"
              style={{ fontSize: "var(--text-display-sm)" }}
            >
              {about.japaneseLesson.headline}
            </h2>
          </div>

          <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-10">
            {about.japaneseLesson.entries.map((entry) => (
              <article
                key={entry.kanji}
                className="border-t border-(--color-line-dark) pt-10"
              >
                <p lang="ja" className="font-jp text-shu text-6xl font-light md:text-7xl">
                  {entry.kanji}
                </p>
                <p className="mt-6">
                  <span lang="ja" className="font-jp text-paper/80">
                    {entry.kana}
                  </span>
                  <span className="text-paper/80"> · {entry.romaji} </span>
                  <span className="text-paper/55">({entry.pronunciation})</span>
                </p>
                <p className="font-display text-paper mt-3 text-xl">{entry.literal}</p>
                <p className="text-paper/60 mt-4 max-w-[46ch]">{entry.meaning}</p>
              </article>
            ))}
          </div>

          <p className="text-paper/55 mt-16 max-w-[52ch]" style={{ fontSize: "var(--text-body-lg)" }}>
            {brand.tagline}
          </p>
        </div>
      </section>

      {/* ============ WHAT GUIDES US: heading centered, font size up ============ */}
      <section className="bg-paper section-pad">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <p className="eyebrow text-shu text-center">{about.values.eyebrow}</p>
          <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-10">
            {about.values.items.map((v, i) => (
              <div key={v.title}>
                <KanjiArt text={v.kanji} className="text-ink/25 h-12 w-auto" />
                <h3 className="display text-ink mt-5 text-2xl md:text-3xl">{v.title}</h3>
                <p className="text-ink/70 mt-4 max-w-[40ch]" style={{ fontSize: "var(--text-body-lg)" }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCta />
    </main>
  );
}
