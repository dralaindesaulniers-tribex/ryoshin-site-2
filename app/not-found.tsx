import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-ink text-paper relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <span
        aria-hidden="true"
        lang="ja"
        className="font-jp text-shu/10 pointer-events-none absolute leading-none font-light select-none"
        style={{ fontSize: "clamp(14rem, 40vw, 34rem)" }}
      >
        迷
      </span>
      <div className="relative z-10 flex flex-col items-center">
        <p className="eyebrow text-shu">Error 404</p>
        <h1 className="display mt-6" style={{ fontSize: "var(--text-display-sm)" }}>
          This path leads nowhere.
        </h1>
        <p className="text-paper/55 mt-5 max-w-[42ch]" style={{ fontSize: "var(--text-body-lg)" }}>
          The page you are looking for has moved or never existed. Let us point you back to solid ground.
        </p>
        <Link
          href="/"
          className="bg-shu hover:bg-shu-deep text-paper eyebrow mt-10 inline-block rounded-[2px] px-9 py-4 transition-all duration-200 hover:translate-y-[2px]"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
