import ChatInput from "@/components/ChatInput";
import HalfSun from "@/components/HalfSun";
import { hero } from "@/content/site";

/**
 * Homepage hero (spec 5.1). Background is plain charcoal in this step;
 * the R3F network mounts behind this content in build-order step 6,
 * and the half-sun motif arrives in step 5.
 */
export default function Hero() {
  return (
    <section className="bg-ink text-paper relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 md:px-10">
      {/* NETWORK-MOUNT: R3F scene renders here (step 6), behind content */}
      <HalfSun />
      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center text-center">
        {/* display type intentionally runs wider than the 1200px content grid */}
        <h1 className="display" style={{ fontSize: "clamp(2.6rem, 5.8vw, 5.25rem)" }}>
          <span className="block overflow-hidden">
            <span data-reveal-line className="block md:whitespace-nowrap">
              {hero.line1Pre} <em className="text-shu not-italic">{hero.line1Accent}</em>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal-line className="text-paper/55 block">
              {hero.line2}
            </span>
          </span>
        </h1>

        <p
          className="text-paper/60 mt-8 max-w-[58ch]"
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
