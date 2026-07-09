import { audiences } from "@/content/site";

/**
 * For Organizations / For Individuals (spec 5.4).
 * Numbered contained modules on light, asymmetric 7/5 split, not twin cards.
 */
export default function Audiences() {
  return (
    <section className="bg-paper section-pad">
      <div className="mx-auto grid max-w-[1200px] items-start gap-6 px-6 md:grid-cols-12 md:px-10">
        <article className="panel-light p-9 md:col-span-7 md:p-12">
          <p className="eyebrow text-ink/45">
            <span className="eyebrow-num">02</span>
            {audiences.organizations.eyebrow}
          </p>
          <h2 className="display text-ink mt-6" style={{ fontSize: "var(--text-display-xs)" }}>
            {audiences.organizations.headline}
          </h2>
          <p className="text-ink/70 mt-6 max-w-[56ch]" style={{ fontSize: "var(--text-body-lg)" }}>
            {audiences.organizations.body}
          </p>
        </article>

        {/* offset module breaks the twin-card symmetry */}
        <article className="panel-light p-9 md:col-span-5 md:mt-16 md:p-12">
          <p className="eyebrow text-ink/45">
            <span className="eyebrow-num">03</span>
            {audiences.individuals.eyebrow}
          </p>
          <h2 className="display text-ink mt-6" style={{ fontSize: "var(--text-display-xs)" }}>
            {audiences.individuals.headline}
          </h2>
          <p className="text-ink/70 mt-6 max-w-[48ch]" style={{ fontSize: "var(--text-body-lg)" }}>
            {audiences.individuals.body}
          </p>
        </article>
      </div>
    </section>
  );
}
