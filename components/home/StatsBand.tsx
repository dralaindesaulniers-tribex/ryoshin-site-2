import { stats } from "@/content/site";

/**
 * Stats band (spec 5.5): contained data tiles, glass on dark with a vermilion
 * glow behind so the blur reads as depth. Numbers in vermilion display serif.
 * CONFIRM WITH RYAN before ship: 5+ (firm) vs 20+ (Ryan personally) years.
 */
export default function StatsBand() {
  return (
    <section className="bg-ink section-pad relative overflow-hidden">
      <div aria-hidden="true" className="glow-shu inset-x-0 top-1/4 h-[60%]" />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="eyebrow text-paper/45 mb-12">
          <span className="eyebrow-num">04</span>By the numbers
        </p>
        <dl data-stagger-children className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((stat, i) => (
            <div
              key={stat.value}
              className={`panel-dark p-8 md:p-9 ${i % 2 === 1 ? "lg:mt-10" : ""}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  data-counter
                  className="display text-shu block"
                  style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
                >
                  {stat.value}
                </span>
                <span className="text-paper/65 mt-5 block text-base">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
