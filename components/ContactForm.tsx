"use client";

import { useState } from "react";
import { contact, contactPage } from "@/content/site";

/**
 * Contact form. Posts to Formspree; routes to ryan@ryoshin.ca (spec / brief).
 * TODO: replace FORMSPREE_ID with the real endpoint before launch.
 */
const FORMSPREE_ID = "ACTION_URL"; // TODO-ASSET: real Formspree form id

export default function ContactForm() {
  const [count, setCount] = useState(0);
  const max = contactPage.messageMaxLength;

  return (
    <form
      action={`https://formspree.io/f/${FORMSPREE_ID}`}
      method="POST"
      className="panel-light flex flex-col gap-6 p-8 md:p-10"
    >
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
        <span className="text-ink/45 self-end text-sm tabular-nums">
          {count} / {max}
        </span>
      </div>

      {/* Formspree routing to Ryan */}
      <input type="hidden" name="_replyto" value={contact.formRecipient} />

      <button
        type="submit"
        className="bg-shu hover:bg-shu-deep text-paper eyebrow self-start rounded-[2px] px-9 py-4 transition-all duration-200 hover:translate-y-[2px]"
      >
        Send Message
      </button>
    </form>
  );
}
