import Image from "next/image";
import { trustedBy } from "@/content/site";

/**
 * Trusted By strip (spec 5.2). Full-color logos per Ryan, label centered,
 * static centered row (classier than a marquee), generous gaps.
 */
export default function TrustedBy() {
  return (
    <section className="bg-paper border-b border-(--color-line-light) py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="eyebrow text-shu mb-12 text-center">{trustedBy.label}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10">
          {trustedBy.logos.map((logo) => (
            <li key={logo.name} className="flex items-center">
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={300}
                  height={150}
                  className="h-12 w-auto object-contain md:h-14"
                />
              ) : (
                /* TODO-ASSET: logo missing, styled text mark until provided */
                <span className="display text-ink/70 text-xl leading-none md:text-2xl">
                  {logo.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
