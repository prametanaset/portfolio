"use client";

// Port of studio.design/ja/editor `main > .sd-3` (DOM order 2 of 13) — the "Design Editor" hero.
// Structure, class names, Japanese copy and the image alt are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-3`).
// The section is static: no links, buttons, toggles, carousels or video. The only behavior is the
// one-shot `appear` reveal on `.sd-6`, `.sd-9` and `.sd-11`; its opacity/translate/duration/delay/
// easing all live in the sliced CSS, so nothing is re-declared here.

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";
import "./hero-design-editor.css";

const HERO_IMAGE =
  "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-3568x2223_v-frms_webp_c52ed059-0e43-4dc5-9f76-93f0d8aa2bb6_regular.webp";

export function HeroDesignEditor() {
  return (
    <div className="box sd-3">
      <div className="box sd-4">
        <div className="box sd-5">
          <Appear as="h1" className="box sd-6">
            <span className="text sd-7">Design Editor</span>
            <span className="text sd-8">あらゆる表現を可能にする次世代のデザインエディタ</span>
          </Appear>
          <Appear as="p" className="text sd-9">
            Studioのデザインエディタは、ノーコードで0から自由にデザインすることが可能。
            <br />
            ピクセル単位の微調整から、ダイナミックなアニメーションまで。{" "}
            <br />
            もうコードを書く必要も、テンプレートに縛られる必要もありません。
          </Appear>
        </div>
        <div className="box sd-10">
          {/* Plain <img> (not next/image) so the sliced `.sd-11` rules apply unchanged.
              The origin ships an SVG placeholder + data-sd-img-src that its runtime swaps for this
              same `_regular.webp`; the clone points straight at the local file and drops the
              <noscript> `_small.webp` fallback. */}
          <Appear
            as="img"
            className="img sd-11"
            src={HERO_IMAGE}
            alt=""
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="box sd-12" />
    </div>
  );
}
