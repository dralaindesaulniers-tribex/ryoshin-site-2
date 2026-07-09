import PartnersNetwork from "@/components/network/PartnersNetwork";
import { partnersClients } from "@/content/site";

/**
 * Partners & Clients (spec 5.3). Ryan priority: front and center.
 * Presented as a smaller, focused, clickable network: partners on the inner
 * ring, clients on the outer, each node a link to its work. The accessible
 * link list lives inside PartnersNetwork for keyboard/no-JS/SEO.
 */
export default function PartnersClients() {
  return (
    <section className="bg-paper section-pad">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* asymmetric header, intentional grid-break: headline pushes right */}
        <div className="grid gap-6 md:grid-cols-12">
          <p className="eyebrow text-ink/45 md:col-span-4 md:pt-4">
            <span className="eyebrow-num">01</span>
            {partnersClients.eyebrow}
          </p>
          <h2 className="display text-ink md:col-span-8" style={{ fontSize: "var(--text-display-sm)" }}>
            {partnersClients.headline}
          </h2>
        </div>

        <div className="mt-16 md:mt-20">
          <PartnersNetwork />
        </div>
      </div>
    </section>
  );
}
