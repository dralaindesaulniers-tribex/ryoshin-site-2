import Image from "next/image";
import Link from "next/link";
import { partnersClients } from "@/content/site";
import { networkEntities } from "@/content/network";

/**
 * Partners & Clients (spec 5.3). Ryan priority: front and center.
 * Two-tier hierarchy: partners large, recent clients smaller.
 * Same data renders the named nodes in the hero network (content/network.ts).
 */
export default function PartnersClients() {
  const partners = networkEntities.filter((e) => e.tier === "partner");
  const clients = networkEntities.filter((e) => e.tier === "client");

  return (
    <section className="bg-paper section-pad">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* asymmetric header, intentional grid-break: headline pushes right */}
        <div className="grid gap-6 md:grid-cols-12">
          <p className="eyebrow text-shu md:col-span-4 md:pt-4">
            {partnersClients.eyebrow}
          </p>
          <h2
            className="display text-ink md:col-span-8"
            style={{ fontSize: "var(--text-display-sm)" }}
          >
            {partnersClients.headline}
          </h2>
        </div>

        {/* Partners: large marks */}
        <ul className="mt-16 grid gap-px overflow-hidden rounded-[2px] bg-(--color-line-light) sm:grid-cols-3 md:mt-20">
          {partners.map((p) => (
            <li
              key={p.id}
              className="bg-paper-soft flex min-h-44 flex-col justify-between p-8 md:min-h-52 md:p-10"
            >
              {/* TODO-ASSET: partner logos missing, typographic marks until provided */}
              <span className="display text-ink text-2xl md:text-3xl">{p.name}</span>
              <span className="eyebrow text-ink/45 mt-6 text-[11px]">Partner</span>
            </li>
          ))}
        </ul>

        {/* Recent clients: quieter row */}
        <div className="mt-14 md:mt-16">
          <h3 className="eyebrow text-ink/45 mb-8">Recent clients</h3>
          <ul className="flex flex-wrap gap-x-12 gap-y-6">
            {clients.map((c) => (
              <li key={c.id}>
                {c.workAnchor ? (
                  <Link
                    href={c.workAnchor}
                    className="link-draw text-ink/75 hover:text-ink inline-flex items-center gap-4 transition-colors"
                  >
                    {c.logo && (
                      <Image
                        src={c.logo}
                        alt=""
                        width={200}
                        height={200}
                        className="h-9 w-auto object-contain"
                      />
                    )}
                    <span style={{ fontSize: "var(--text-body-lg)" }}>{c.name}</span>
                  </Link>
                ) : (
                  <span
                    className="text-ink/75 inline-flex items-center gap-4"
                    style={{ fontSize: "var(--text-body-lg)" }}
                  >
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
