import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Refokus "Time to Refokus" — the site's own variable font (300–900), self-hosted.
const satoshi = localFont({
  src: "../public/sites/ai-timetorefokus-com-022fb5ff/shared/fonts/satoshi-variable.woff2",
  weight: "300 900",
  style: "normal",
  display: "swap",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Time to Refokus",
  description:
    "It’s time for a new breed of agency that combines design, innovation, and forward-thinking to help brands create better experiences, not just more of the same.",
  icons: {
    icon: "/sites/ai-timetorefokus-com-022fb5ff/shared/favicon.png",
    apple: "/sites/ai-timetorefokus-com-022fb5ff/shared/webclip.png",
  },
  openGraph: {
    title: "Time to Refokus",
    description:
      "It’s time for a new breed of agency that combines design, innovation, and forward-thinking to help brands create better experiences, not just more of the same.",
    images: ["/sites/ai-timetorefokus-com-022fb5ff/root-8a5edab2/images/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        satoshi.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
