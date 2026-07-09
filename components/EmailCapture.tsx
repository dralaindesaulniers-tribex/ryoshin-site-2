"use client";

import { emailCapture } from "@/content/site";

/**
 * Insider-list capture. MailerLite integration deferred; styled stub only.
 * Glass module on dark with vermilion glow.
 */
export default function EmailCapture() {
  return (
    <section className="bg-ink section-pad relative overflow-hidden">
      <div aria-hidden="true" className="glow-shu inset-x-0 bottom-0 h-[70%]" />
      <div className="relative mx-auto max-w-[720px] px-6 text-center md:px-10">
        <h2 className="display text-paper" style={{ fontSize: "var(--text-display-sm)" }}>
          {emailCapture.headline}
        </h2>
        <p className="text-paper/55 mx-auto mt-5 max-w-[52ch]" style={{ fontSize: "var(--text-body-lg)" }}>
          {emailCapture.body}
        </p>
        {/* stub: no submission wired */}
        <form
          className="panel-dark mx-auto mt-10 flex max-w-[480px] items-center p-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder={emailCapture.placeholder}
            aria-label="Your email address"
            className="text-paper placeholder:text-paper/40 min-w-0 flex-1 bg-transparent px-4 py-3 outline-none"
          />
          <button
            type="submit"
            className="bg-shu hover:bg-shu-deep text-paper eyebrow shrink-0 rounded-[2px] px-6 py-3 transition-colors"
          >
            {emailCapture.button}
          </button>
        </form>
      </div>
    </section>
  );
}
