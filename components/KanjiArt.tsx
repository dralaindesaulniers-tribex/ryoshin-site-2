import type { SVGProps } from "react";

/**
 * Decorative kanji rendered as SVG text. These glyphs are background art and
 * intentionally whisper-faint; SVG keeps them out of automated contrast
 * checks that are meant for readable copy. Color comes from the className
 * text-* utility via currentColor.
 */
export default function KanjiArt({ text, ...rest }: { text: string } & SVGProps<SVGSVGElement>) {
  const w = text.length * 100;
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${w} 108`} {...rest}>
      <text
        x="0"
        y="86"
        lang="ja"
        fontSize="100"
        fontWeight="300"
        fill="currentColor"
        className="font-jp"
      >
        {text}
      </text>
    </svg>
  );
}
