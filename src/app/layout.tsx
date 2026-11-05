import type { ReactNode } from "react";

import { buildRootMetadata } from "@/lib/metadata";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import "@/styles/global.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata = buildRootMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${sourceSans.variable}`}
    >
      <body className="site-shell">{children}</body>
    </html>
  );
}
