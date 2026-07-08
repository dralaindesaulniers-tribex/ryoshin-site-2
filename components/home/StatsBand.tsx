import { stats } from "@/content/site";

/**
 * Stats band (spec 5.5). Numbers in vermilion display serif, labels paper 65%.
 * CONFIRM WITH RYAN before ship: 5+ (firm) vs 20+ (Ryan personally) years.
 */
export default function StatsBand() {
  return (
    <section className="bg-ink section-pad">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <dl className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {stats.items.map((stat, i) => (
            <div
              key={stat.value}
              /* stagger the baseline for an intentional grid-break */
              className={i % 2 === 1 ? "lg:pt-14" : ""}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  data-counter
                  className="display text-shu block"
                  style={{ fontSize: "var(--text-display-sm)" }}
                >
                  {stat.value}
                </span>
                <span className="text-paper/65 mt-4 block max-w-[30ch]">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
