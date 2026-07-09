import type { Metadata } from "next";
import { zodiak, generalSans, notoSerifJP } from "./fonts";
import SmoothScroll from "@/components/SmoothScroll";
import MotionEffects from "@/components/MotionEffects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  // Netlify sets URL to the site's primary address (the netlify.app URL now,
  // the custom domain once it is pointed), so share cards always resolve
  metadataBase: new URL(process.env.URL || "https://www.ryoshin.solutions"),
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
        <SmoothScroll />
        <MotionEffects />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
