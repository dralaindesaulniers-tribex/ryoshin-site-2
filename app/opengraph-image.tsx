import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Social share card: the half-sun mark rising on ink, wordmark centered.
 * Uses the logo PNG for type so no font embedding is needed.
 * TODO-ASSET: regenerate when the SVG logo arrives.
 */
export const alt = "RYŌSHIN Solutions | Whole-hearted Solutions. Real-World Results.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await readFile(join(process.cwd(), "public/images/logo-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101112",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: 220,
            width: 760,
            height: 380,
            borderRadius: "380px 380px 0 0",
            background:
              "linear-gradient(to top, rgba(196,58,47,0.55), rgba(196,58,47,0.06))",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={620} style={{ marginBottom: 40 }} />
      </div>
    ),
    size,
  );
}
