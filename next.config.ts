import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev badge paints over the bottom-left corner of every visual-QA capture.
  devIndicators: false,
  // The noindex meta in app/layout.tsx only covers HTML; this header also covers images and other
  // files served from public/.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
