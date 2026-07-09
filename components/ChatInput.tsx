import { hero } from "@/content/site";

/**
 * The AI concierge input (spec 5.1 / 3B). Ships as a styled placeholder with
 * the exact final layout so nothing shifts when live chat lands later.
 * LIVE chat functionality (Claude API) is explicitly out of this build.
 */
export default function ChatInput() {
  return (
    <div className="w-full max-w-[620px]">
      <div className="border-(--color-line-dark) bg-ink-soft focus-within:border-paper/30 flex items-center rounded-[2px] border transition-colors">
        {/* breathing dot */}
        <span className="relative ml-5 flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="bg-shu absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 [animation-duration:2.4s]" />
          <span className="bg-shu relative inline-flex h-2 w-2 rounded-full" />
        </span>
        <input
          type="text"
          placeholder={hero.chatPlaceholder}
          disabled
          aria-label="AI concierge, coming soon"
          className="text-paper placeholder:text-paper/40 min-w-0 flex-1 cursor-not-allowed bg-transparent px-4 py-5 outline-none"
        />
        <button
          type="button"
          disabled
          aria-label="Send"
          className="bg-shu m-2 flex h-11 w-11 shrink-0 cursor-not-allowed items-center justify-center rounded-[2px] opacity-80"
        >
          <svg
            viewBox="0 0 24 24"
            className="stroke-paper h-[18px] w-[18px] fill-none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      </div>
      <p className="eyebrow text-paper/55 mt-4 text-center text-[11px]">
        {hero.chatMicrocopy}
      </p>
    </div>
  );
}
