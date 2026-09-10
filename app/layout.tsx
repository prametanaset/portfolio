import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// studio.design/ja/editor loads its whole type system from Google Fonts, including the
// Japanese Noto Sans JP subsets and the Material Symbols icon face. next/font/google has no
// `japanese` subset for Noto Sans JP and no Material Symbols entry at all, so the clone links
// the origin's stylesheet verbatim rather than shipping a font with missing glyphs.
const STUDIO_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=IBM+Plex+Mono:ital,wght@0,500;1,500&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=swap";

export const metadata: Metadata = {
  title: "デザインを、思いのままに。｜Studio",
  description:
    "Studioのデザインエディタは、0から自由にデザインすることが可能です。ピクセル単位の微調整から、ダイナミックなアニメーションまで、もうコードを書く必要も、テンプレートに縛られる必要もありません。",
  icons: {
    icon: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/3303d963-e1b6-467d-bfab-b0cb3913b39c.png",
    apple:
      "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/3303d963-e1b6-467d-bfab-b0cb3913b39c.png",
  },
  openGraph: {
    type: "website",
    url: "https://studio.design/ja/editor",
    siteName: "Studio｜ノーコードWeb制作プラットフォーム",
    title: "デザインを、思いのままに。｜Studio",
    description:
      "Studioのデザインエディタは、0から自由にデザインすることが可能です。ピクセル単位の微調整から、ダイナミックなアニメーションまで、もうコードを書く必要も、テンプレートに縛られる必要もありません。",
    images: [
      "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/dfd263e5-049b-4c84-9607-3d634c91c1ea.png",
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={cn("h-full", "antialiased", "font-sans", inter.variable, geistMono.variable)}
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
