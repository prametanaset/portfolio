// Port of studio.design/ja/editor `main > .sd-216` (DOM order 7 of 13). Structure, class names
// and layout are verbatim from the origin markup (docs/research/.../page.html, `box sd-216`);
// the two `<noscript>` image duplicates are inert with JS on and are not rendered. The copy and
// screenshots are swapped for Alphola's own dashboard/profile content (per dev.alphola.com) —
// the origin's "Creative Assets" / Studio.Stock+Unsplash text does not apply to this product.
//
// Interaction model is mixed(scroll + hover):
//   * two `appear` reveals, `.sd-224` and `.sd-234`, on the same rule (400 ms delay / 800 ms,
//     cubic-bezier(0.2,1,1,1)) with no stagger — they fire the instant the element top crosses
//     the viewport bottom, so `rootMargin="0px"` overrides the shared `0px 0px -10% 0px` default;
//   * one hover, `a.sd-229`, is 8 sliced `.sd-229:hover*` rules and needs no JavaScript: the
//     resting arrow (`.sd-233`) exits up-right while `.sd-232`, clipped out to the left of the
//     24×24 `overflow: hidden` mask at rest, slides in to replace it.
// Nothing else in the section reacts to hover — the profile card is not a link.
// The `theme-*` classes stay on the text nodes: `.text.theme-XXXX` (0,2,0) beats `.sd-NN` (0,1,0),
// so the origin renders 14px at 768/390 even though `.sd-222` declares 12px there. That dead rule
// is faithful to the origin — do not "fix" it and do not inline a size.
// No "use client" here: `Appear` and `MaterialSymbol` declare their own client boundaries.

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";
import { MaterialSymbol } from "@/components/sites/studio-design-8a86c0e4/shared/icons";
import "./creative-assets-section.css";

const DASHBOARD_IMG = "/alphola/alphola-1.png";
const PROFILE_IMG = "/alphola/alphola-4.png";

export function CreativeAssetsSection() {
  return (
    <div className="box sd-216">
      <div className="box sd-217">
        <h2 className="box sd-218">
          <span className="text sd-219 theme-b6b0338f">ALPHOLA</span>
          <span className="text sd-220 theme-57a9da79">
            แดชบอร์ดเดียวสำหรับพอร์ตของคุณ
            <br />
            โปรไฟล์เดียวสำหรับการเติบโต
          </span>
        </h2>
        <div className="box sd-221">
          <p className="text sd-222 theme-a3931427">
            ติดตามรายการที่เฝ้าดู หุ้นที่เคลื่อนไหวแรง และกำไรขาดทุนรวมได้จากแดชบอร์ด แล้วไต่ระดับ ค่า XP และเรดาร์ทักษะบนโปรไฟล์ของคุณ — ครบทุกอย่างใน Alphola
          </p>
        </div>
      </div>
      <div className="box sd-223">
        <Appear as="div" className="box sd-224" rootMargin="0px" threshold={0} activeClass={false}>
          <h3 className="box sd-225">
            {/* Plain <img> (not next/image) so the sliced `.sd-226` rules apply unchanged. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img sd-226"
              src={DASHBOARD_IMG}
              alt="แดชบอร์ดของ Alphola"
            />
          </h3>
 
        </Appear>
        <Appear as="h3" className="box sd-234" rootMargin="0px" threshold={0} activeClass={false}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="img sd-235"
            src={PROFILE_IMG}
            alt="โปรไฟล์ของ Alphola"
          />
        </Appear>
      </div>
    </div>
  );
}
