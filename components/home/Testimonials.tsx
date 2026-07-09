import Image from "next/image";
import { testimonials } from "@/content/site";

/**
 * Testimonials (spec 5.6): contained light modules, asymmetric offset.
 * Five slots wired and waiting on collection; pending entries render nothing.
 */
export default function Testimonials() {
  const live = testimonials.filter((t) => !t.pending && t.quote);

  return (
    <section className="bg-paper section-pad">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="eyebrow text-ink/45">
          <span className="eyebrow-num">05</span>What people say{/* section 05 */}
        </p>
        <div className="mt-14 grid items-start gap-6 md:grid-cols-12">
          {live.map((t, i) => (
            <figure
              key={t.name}
              className={`panel-light p-9 md:col-span-6 md:p-12 ${i % 2 === 1 ? "md:mt-16" : ""}`}
            >
              <blockquote
                className="font-display text-ink/90 leading-snug"
                style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", fontWeight: 400 }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-(--color-line-light) pt-6">
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
