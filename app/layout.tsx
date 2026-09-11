import type { Metadata } from "next";
import { Geist_Mono, Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The Thai fallback behind Inter. The origin's type scale is tuned for Latin/CJK metrics, so
// Inter still leads the stack and Noto Sans Thai only picks up the Thai glyphs it cannot render.
// The weights mirror the 300-700 range the origin's `--s-font-*` rules actually ask for.
const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-thai",
  display: "swap",
});

// Inter, Noto Sans Thai and Geist Mono are self-hosted through next/font above; what is left here
// is the part next/font/google cannot serve — Material Symbols has no entry at all — plus the two
// display faces the origin's stylesheet names verbatim.
const STUDIO_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=IBM+Plex+Mono:ital,wght@0,500;1,500&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=swap";

export const metadata: Metadata = {
  title: "ออกแบบได้ดั่งใจคิด | Studio",
  description:
    "เครื่องมือออกแบบของ Studio ให้คุณออกแบบได้อย่างอิสระตั้งแต่ศูนย์ ตั้งแต่การขยับระดับพิกเซลไปจนถึงแอนิเมชันที่เคลื่อนไหวจริง โดยไม่ต้องเขียนโค้ดและไม่ถูกจำกัดด้วยเทมเพลตอีกต่อไป",
  icons: {
    icon: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/3303d963-e1b6-467d-bfab-b0cb3913b39c.png",
    apple:
      "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/3303d963-e1b6-467d-bfab-b0cb3913b39c.png",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://studio.design/ja/editor",
    siteName: "Studio | แพลตฟอร์มสร้างเว็บแบบโนโค้ด",
    title: "ออกแบบได้ดั่งใจคิด | Studio",
    description:
      "เครื่องมือออกแบบของ Studio ให้คุณออกแบบได้อย่างอิสระตั้งแต่ศูนย์ ตั้งแต่การขยับระดับพิกเซลไปจนถึงแอนิเมชันที่เคลื่อนไหวจริง โดยไม่ต้องเขียนโค้ดและไม่ถูกจำกัดด้วยเทมเพลตอีกต่อไป",
    images: [
      "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/dfd263e5-049b-4c84-9607-3d634c91c1ea.png",
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        inter.variable,
        notoSansThai.variable,
        geistMono.variable,
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={STUDIO_FONTS_HREF} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
