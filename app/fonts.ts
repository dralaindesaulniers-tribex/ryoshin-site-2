import localFont from "next/font/local";
import { Noto_Serif_JP } from "next/font/google";

export const zodiak = localFont({
  src: [
    { path: "./fonts/Zodiak-Variable.woff2", style: "normal" },
    { path: "./fonts/Zodiak-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const generalSans = localFont({
  src: [{ path: "./fonts/GeneralSans-Variable.woff2", style: "normal" }],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jp",
  display: "swap",
  preload: false,
});
