import { aiProjects } from "@/content/site";

/**
 * Applied AI section (spec 5.7). Scaffolded with [INTERVIEW RYAN] placeholders
 * that render visibly so they cannot ship unnoticed. Copy comes from Ryan.
 */
export default function AiProjects() {
  return (
    <section className="bg-ink-soft section-pad">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="eyebrow text-paper/50 md:col-span-4 md:pt-3">
            {aiProjects.eyebrow}
          </p>
          <div className="md:col-span-8">
            <h2 className="display text-paper" style={{ fontSize: "var(--text-display-sm)" }}>
              {aiProjects.headline}
            </h2>
            <p className="text-paper/55 mt-6 max-w-[58ch]" style={{ fontSize: "var(--text-body-lg)" }}>
              {aiProjects.intro}
            </p>
          </div>
        </div>

        <ul className="mt-16 grid gap-px bg-(--color-line-dark) md:grid-cols-3">
          {aiProjects.items.map((item) => (
            <li key={item.title} className="bg-ink-soft p-8 md:p-10">
              {/* placeholder styling: dashed border signals unfinished content */}
              <div className="border-paper/15 rounded-[2px] border border-dashed p-6">
                <h3 className="font-display text-paper/85 text-xl">{item.title}</h3>
                <p className="text-paper/45 mt-4 text-base">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
