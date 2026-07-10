"use client";

import { useState } from "react";
import { contact, contactPage } from "@/content/site";

/**
 * Contact form. Hands the composed message to WhatsApp (Ryan's critique,
 * July 2026: email was not being read; WhatsApp is where he works).
 * No backend needed: submit opens a chat to the business number with the
 * message prefilled; the visitor taps send inside WhatsApp itself.
 */
export default function ContactForm() {
  const [count, setCount] = useState(0);
  const max = contactPage.messageMaxLength;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = [
      `New inquiry via ryoshin.solutions`,
      `Name: ${fd.get("name")}`,
      `Email: ${fd.get("email")}`,
      `Topic: ${fd.get("inquiry")}`,
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
    <form onSubmit={onSubmit} className="panel-light flex flex-col gap-6 p-8 md:p-10">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="eyebrow text-ink/50">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your full name"
          className="bg-paper text-ink border border-(--color-line-light) rounded-[2px] px-4 py-3 outline-none focus:border-shu"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="eyebrow text-ink/50">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="bg-paper text-ink border border-(--color-line-light) rounded-[2px] px-4 py-3 outline-none focus:border-shu"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry" className="eyebrow text-ink/50">
          How can RYŌSHIN Solutions help you?
        </label>
        <select
          id="inquiry"
          name="inquiry"
          required
          defaultValue=""
          aria-label="How can RYŌSHIN Solutions help you?"
          className="bg-paper text-ink border border-(--color-line-light) rounded-[2px] px-4 py-3 outline-none focus:border-shu"
        >
          <option value="" disabled>
            Select an option
          </option>
          {contactPage.inquiryOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="eyebrow text-ink/50">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={max}
          rows={5}
          placeholder="Tell us what you are working on."
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
          Send via WhatsApp
        </button>
        <p className="text-ink/65 mt-4 text-sm">
          Opens WhatsApp with your message ready to send.
        </p>
      </div>
    </form>
  );
}
