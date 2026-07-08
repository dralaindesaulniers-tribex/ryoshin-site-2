import { audiences } from "@/content/site";

/**
 * For Organizations / For Individuals (spec 5.4).
 * Asymmetric 7/5 split, not twin cards. Font size up per Ryan.
 */
export default function Audiences() {
  return (
    <section className="bg-paper-soft section-pad border-y border-(--color-line-light)">
      <div className="mx-auto grid max-w-[1200px] gap-16 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-7">
          <p className="eyebrow text-shu">{audiences.organizations.eyebrow}</p>
          <h2 className="display text-ink mt-5" style={{ fontSize: "var(--text-display-xs)" }}>
            {audiences.organizations.headline}
          </h2>
          <p className="text-ink/70 mt-6 max-w-[56ch]" style={{ fontSize: "var(--text-body-lg)" }}>
            {audiences.organizations.body}
          </p>
        </div>
        <div className="border-t border-(--color-line-light) pt-14 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-10">
          <p className="eyebrow text-ink/45">{audiences.individuals.eyebrow}</p>
          <h2 className="display text-ink mt-5" style={{ fontSize: "var(--text-display-xs)" }}>
            {audiences.individuals.headline}
          </h2>
          <p className="text-ink/70 mt-6 max-w-[48ch]" style={{ fontSize: "var(--text-body-lg)" }}>
            {audiences.individuals.body}
          </p>
        </div>
      </div>
    </section>
  );
}
