import ChatInput from "@/components/ChatInput";
import HalfSun from "@/components/HalfSun";
import NetworkHero from "@/components/network/NetworkHero";
import { hero } from "@/content/site";

/**
 * Homepage hero (spec 5.1) with the pinned scroll intro (Alain, July 2026):
 * the inner wrapper pins for ~85vh of scroll while the headline and subhead
 * exit, the chat glides to the center of the screen, and the scrim lifts so
 * the network fills the viewport at full strength. Then the pin releases and
 * the page scrolls normally. Choreography lives in MotionEffects
 * ([data-hero-pin] and friends); reduced motion skips the pin entirely.
 *
 * HalfSun stays OUTSIDE the pinned wrapper: ScrollTrigger leaves a transform
 * on the pinned element after release, which would break the sun's
 * position: fixed layer if it lived inside.
 */
export default function Hero() {
  return (
    <section className="bg-ink text-paper isolate relative overflow-hidden">
      <HalfSun />
      {/* 100lvh, not svh: iOS Safari grows the viewport when its URL bar
          collapses mid-scroll, and an svh-sized pin left a dark band under
          the whiteout (Alain). lvh covers the largest possible viewport */}
      <div
        data-hero-pin
        className="relative flex min-h-[100lvh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 md:px-10"
      >
        {/* living network background */}
        <NetworkHero />
        {/* scrim (from the approved prototype): quiets the network right
            behind the text so headline/subhead/chat pop, while the edges stay
            lively. The scroll intro fades it out */}
        <div
          data-hero-scrim
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
          <h1 data-hero-fade className="display" style={{ fontSize: "clamp(2.6rem, 5.8vw, 5.25rem)" }}>
            <span className="block overflow-hidden">
              <span data-reveal-line className="block md:whitespace-nowrap">
                {hero.line1Pre} <em className="text-shu not-italic">{hero.line1Accent}</em>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-reveal-line className="text-paper block">
                {hero.line2}
              </span>
            </span>
          </h1>

          <p
            data-hero-fade
            className="text-paper/90 mt-8 max-w-[58ch]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {hero.subhead}
          </p>

          <div data-hero-chat className="mt-12 flex w-full justify-center">
            <ChatInput />
          </div>
        </div>
      </div>
    </section>
  );
}
