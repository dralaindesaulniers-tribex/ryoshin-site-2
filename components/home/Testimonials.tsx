import Image from "next/image";
import { testimonials } from "@/content/site";

/**
 * Testimonials (spec 5.6). Two live quotes now; five slots wired and
 * waiting on collection (a human task). Pending entries render nothing.
 */
export default function Testimonials() {
  const live = testimonials.filter((t) => !t.pending && t.quote);

  return (
    <section className="bg-paper section-pad">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="eyebrow text-shu">What people say</p>
        <div className="mt-14 grid gap-16 md:grid-cols-12 md:gap-10">
          {live.map((t, i) => (
            <figure
              key={t.name}
              /* offset second column for asymmetry */
              className={
                i % 2 === 0 ? "md:col-span-6" : "md:col-span-6 md:pt-20"
              }
            >
              <blockquote
                className="font-display text-ink/90 leading-snug"
                style={{ fontSize: "var(--text-display-xs)", fontWeight: 400 }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                {t.photo && (
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={96}
                    height={96}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-ink font-medium">{t.name}</p>
                  <p className="text-ink/55 text-sm">{t.title}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
