import { hero } from "@/content/site";

// Temporary scaffold-verification page. Replaced in build-order step 3.
export default function Home() {
  return (
    <main className="bg-ink text-paper flex min-h-svh flex-col items-center justify-center gap-6 px-6">
      <p className="eyebrow text-paper/60">Scaffold check</p>
      <h1 className="display text-center" style={{ fontSize: "var(--text-display)" }}>
        {hero.line1Pre} <span className="text-shu">{hero.line1Accent}</span>
      </h1>
      <p className="display text-paper/55" style={{ fontSize: "var(--text-display-sm)" }}>
        {hero.line2}
      </p>
      <p className="font-jp text-shu text-3xl" lang="ja">
        良心 · 両親
      </p>
    </main>
  );
}
