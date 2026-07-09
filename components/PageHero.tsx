import ChatInput from "@/components/ChatInput";
import HalfSun from "@/components/HalfSun";

/**
 * Shared inner-page hero: eyebrow, a display quote, attribution, and the
 * chat concierge, over the scroll-driven half sun. Used by services / work /
 * contact so the chat placeholder is consistent site-wide.
 */
export default function PageHero({
  eyebrow,
  quote,
  attribution,
  children,
}: {
  eyebrow: string;
  quote: string;
  attribution?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-ink text-paper relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 text-center md:px-10">
      <HalfSun variant="static" />
      <div className="relative z-10 flex w-full max-w-[1000px] flex-col items-center">
        <p className="eyebrow text-paper/50">{eyebrow}</p>
        <blockquote
          className="display mt-8"
          style={{ fontSize: "clamp(1.9rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
        >
          <span className="block overflow-hidden">
            <span data-reveal-line className="block">
              {quote}
            </span>
          </span>
        </blockquote>
        {attribution && <p className="text-paper/55 mt-8">{attribution}</p>}
        {children}
        <div className="mt-12 flex w-full justify-center">
          <ChatInput />
        </div>
      </div>
    </section>
  );
}
