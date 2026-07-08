import type { Metadata } from "next";
import { zodiak, generalSans, notoSerifJP } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ryoshin.solutions"),
  title: {
    default: "RYŌSHIN Solutions | Whole-hearted Solutions. Real-World Results.",
    template: "%s | RYŌSHIN Solutions",
  },
  description:
    "Empowering organizations with business and technology strategies that simplify challenges and amplify your positive impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zodiak.variable} ${generalSans.variable} ${notoSerifJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
