import { aiProjects } from "@/content/site";

/**
 * Applied AI section (spec 5.7): glass modules on dark. [INTERVIEW RYAN]
 * placeholders render visibly so they cannot ship unnoticed.
 */
export default function AiProjects() {
  return (
    <section className="bg-ink-soft section-pad relative overflow-hidden">
      <div aria-hidden="true" className="glow-shu right-0 bottom-0 h-[70%] w-[60%]" />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="eyebrow text-paper/50 md:col-span-4 md:pt-3">
            <span className="eyebrow-num">06</span>
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

        <ul data-stagger-children className="mt-16 grid gap-6 md:grid-cols-3">
          {aiProjects.items.map((item) => (
            <li key={item.title} className="panel-dark p-8 md:p-9">
              {/* dashed rule signals unfinished content, cannot ship silently */}
              <p className="eyebrow text-shu/80 border-paper/20 border-b border-dashed pb-4 text-[11px]">
                Placeholder, awaiting Ryan
              </p>
              <h3 className="font-display text-paper/85 mt-5 text-xl">{item.title}</h3>
              <p className="text-paper/45 mt-4 text-base">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
