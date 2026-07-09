import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "RYŌSHIN Solutions privacy policy.",
};

// Placeholder page. Full policy to be drafted for the new site (spec: deferred).
export default function PrivacyPage() {
  return (
    <main>
      <section className="bg-ink text-paper px-6 pt-40 pb-20 md:px-10 md:pt-48">
        <div className="mx-auto max-w-[820px]">
          <p className="eyebrow text-paper/50">Legal</p>
          <h1 className="display mt-6" style={{ fontSize: "var(--text-display-sm)" }}>
            Privacy Policy
          </h1>
        </div>
      </section>
      <section className="bg-paper section-pad">
        <div className="mx-auto max-w-[820px] px-6 md:px-10">
          <p className="text-ink/70" style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.75 }}>
            This page is coming soon. We are drafting our privacy policy and will publish it here
            shortly.
          </p>
          <p className="text-ink/70 mt-6" style={{ fontSize: "var(--text-body-lg)" }}>
            In the meantime, if you have any questions, please{" "}
            <Link href="/contact" className="link-draw text-shu">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
