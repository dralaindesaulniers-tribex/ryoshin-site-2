import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import HalfSun from "@/components/HalfSun";
import { contact, contactPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a business inquiry or a question about RYŌSHIN Solutions? We would love to hear from you.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero: "How can we help?" + chat concierge over the half sun */}
      <section className="bg-ink text-paper relative flex flex-col items-center justify-center overflow-hidden px-6 pt-40 pb-20 text-center md:px-10 md:pt-48">
        <HalfSun variant="static" />
        <div className="relative z-10 flex w-full max-w-[1000px] flex-col items-center">
          <p className="eyebrow text-paper/50">Contact</p>
          <h1 className="display mt-8" style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}>
            <span className="block overflow-hidden">
              <span data-reveal-line className="block">
                {contactPage.headline}
              </span>
            </span>
          </h1>
          <p className="text-paper/50 mt-6 max-w-[48ch]" style={{ fontSize: "var(--text-body-lg)" }}>
            {contactPage.body}
          </p>
        </div>
      </section>

      {/* Details + form. Bottom padding tighter on mobile: the form runs long
          there and the full section-pad read as dead white space (Ryan) */}
      <section className="bg-paper pt-[clamp(96px,14vh,180px)] pb-20 md:pb-[clamp(96px,14vh,180px)]">
        <div className="mx-auto grid max-w-[1200px] items-start gap-12 px-6 md:grid-cols-12 md:px-10">
          {/* Details + testimonial */}
          <div className="md:col-span-5">
            <p className="eyebrow text-ink/45">
              <span className="eyebrow-num">01</span>Get in touch
            </p>

            <dl className="mt-8 space-y-6">
              <div>
                <dt className="eyebrow text-shu">Address</dt>
                <dd className="text-ink/70 mt-2">
                  {contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-shu">Email</dt>
                <dd className="mt-2">
                  <a href={`mailto:${contact.email}`} className="link-draw text-ink/70 hover:text-ink">
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>

            <figure className="panel-light mt-12 p-8">
              <blockquote className="font-display text-ink/90 text-lg leading-snug">
                &ldquo;{contactPage.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="text-ink/65 mt-5 text-sm">
                {contactPage.testimonial.name}
              </figcaption>
            </figure>
          </div>

          {/* Form */}
          <div className="md:col-span-6 md:col-start-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
