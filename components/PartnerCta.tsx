"use client";

import { useState } from "react";
import { contact } from "@/content/site";
import { partnersPage } from "@/content/partners";

/**
 * Partner inquiry form at the bottom of /partners. Same WhatsApp handoff as
 * the contact form: submit opens a chat to the business number with the
 * message prefilled, no backend needed.
 */
export default function PartnerCta() {
  const [count, setCount] = useState(0);
  const { cta } = partnersPage;
  const max = cta.messageMaxLength;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const org = fd.get("organization");
    const text = [
      `Partner inquiry via ryoshin.solutions`,
      `Name: ${fd.get("name")}`,
      `Email: ${fd.get("email")}`,
      ...(org ? [`Organization: ${org}`] : []),
      "",
      `${fd.get("message")}`,
    ].join("\n");
    window.open(
      `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
  };

  return (
    <section className="bg-paper section-pad">
      <div className="mx-auto max-w-[720px] px-6 md:px-10">
        <div className="text-center">
          <p className="eyebrow text-ink/45">{cta.eyebrow}</p>
          <h2 className="display text-ink mt-6" style={{ fontSize: "var(--text-display-sm)" }}>
            {cta.headline}
          </h2>
          <p
            className="text-ink/60 mx-auto mt-5 max-w-[44ch]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {cta.body}
          </p>
        </div>

        <form onSubmit={onSubmit} className="panel-light mt-12 flex flex-col gap-6 p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="partner-name" className="eyebrow text-ink/50">
                Name
              </label>
              <input
                id="partner-name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="bg-paper text-ink border border-(--color-line-light) rounded-[2px] px-4 py-3 outline-none focus:border-shu"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="partner-email" className="eyebrow text-ink/50">
                Email
              </label>
              <input
                id="partner-email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="bg-paper text-ink border border-(--color-line-light) rounded-[2px] px-4 py-3 outline-none focus:border-shu"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="partner-organization" className="eyebrow text-ink/50">
              Organization <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id="partner-organization"
              name="organization"
              type="text"
              placeholder="Company, practice, or project"
              className="bg-paper text-ink border border-(--color-line-light) rounded-[2px] px-4 py-3 outline-none focus:border-shu"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="partner-message" className="eyebrow text-ink/50">
              Message
            </label>
            <textarea
              id="partner-message"
              name="message"
              required
              maxLength={max}
              rows={5}
              placeholder="Tell us about the impact you want to make."
              onChange={(e) => setCount(e.target.value.length)}
              className="bg-paper text-ink border border-(--color-line-light) resize-y rounded-[2px] px-4 py-3 outline-none focus:border-shu"
            />
            <span className="text-ink/65 self-end text-sm tabular-nums">
              {count} / {max}
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="bg-shu hover:bg-shu-deep text-paper eyebrow rounded-[2px] px-9 py-4 transition-all duration-200 hover:translate-y-[2px]"
            >
              {cta.button}
            </button>
            <p className="text-ink/65 mt-4 text-sm">{cta.note}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
