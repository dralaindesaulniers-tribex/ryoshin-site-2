import ChatInput from "@/components/ChatInput";
import HalfSun from "@/components/HalfSun";
import NetworkHero from "@/components/network/NetworkHero";
import { hero } from "@/content/site";

/**
 * Homepage hero (spec 5.1). Background is plain charcoal in this step;
 * the R3F network mounts behind this content in build-order step 6,
 * and the half-sun motif arrives in step 5.
 */
export default function Hero() {
  return (
    // isolate traps the drei Html label z-indexes inside the hero so they
    // can never paint over the fixed nav or its menu overlay
    <section className="bg-ink text-paper isolate relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 md:px-10">
      {/* living network background, then half sun */}
      <NetworkHero />
      <HalfSun />
      {/* scrim (from the approved prototype): quiets the network right behind
          the text so headline/subhead/chat pop, while the edges stay lively */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 50% at 50% 50%, rgba(16,17,18,0.62) 0%, rgba(16,17,18,0) 72%)",
        }}
      />
      <div
        className="relative z-10 flex w-full max-w-[1200px] flex-col items-center text-center"
        style={{ textShadow: "0 1px 4px rgba(16,17,18,0.9), 0 0 30px rgba(16,17,18,0.7)" }}
      >
        {/* display type intentionally runs wider than the 1200px content grid */}
        <h1 className="display" style={{ fontSize: "clamp(2.6rem, 5.8vw, 5.25rem)" }}>
          <span className="block overflow-hidden">
            <span data-reveal-line className="block md:whitespace-nowrap">
              {hero.line1Pre} <em className="text-shu not-italic">{hero.line1Accent}</em>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal-line className="text-paper/75 block">
              {hero.line2}
            </span>
          </span>
        </h1>

        <p
          className="text-paper/80 mt-8 max-w-[58ch]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {hero.subhead}
        </p>

        <div className="mt-12 flex w-full justify-center">
          <ChatInput />
        </div>
      </div>
    </section>
  );
}
