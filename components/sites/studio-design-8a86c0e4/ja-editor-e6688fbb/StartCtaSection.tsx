// Port of studio.design/ja/editor `main > .symbol-2` (DOM order 11 of 13) — the closing CTA:
// a centred column of badge + headline + copy + two links. Structure, class names, Japanese copy,
// alt text, hrefs and `target` are verbatim from the origin markup (docs/research/.../page.html,
// `box symbol-2`); the origin ships no `rel` on either link, so none is added here.
//
// Interaction model is CSS `:hover` only — all 13 pseudo-class rules for these classes are
// `:hover` and every one of them lives in start-cta-section.css, so there is no JS here:
//   * `.symbol-2__sd-8` goes filled → outline (background rgb(34,34,34) → transparent, label and
//     both glyphs → rgb(34,34,34)) while the two arrows translate through the 24×24 mask;
//   * `.symbol-2__sd-13` only slides `.symbol-2__sd-17` by `margin-right: -14px` inside the
//     rotated 14×14 mask — visually a no-op (the hover screenshot is byte-identical to the base),
//     reproduced because the origin ships the rules.
// Both use the inherited base `all .3s cubic-bezier(.4,.4,0,1)` from app/studio-base.css.
// No reveal anywhere in this section (`appear` census = 0 at 1440/768/390), no toggle, no
// animation, no inline style — hence no `Appear` and no "use client".
// `theme-57a9da79` stays on `.symbol-2__sd-5`: `.text.theme-57a9da79` (0,2,0) supplies the whole
// type scale (36px, 28px at ≤480) and never collides with `.symbol-2__sd-5`'s own declarations.
// `.symbol-2__sd-12` cannot use `MaterialSymbol` — that component hard-codes `aria-hidden`, while
// the origin gives this glyph `aria-label="新規タブで開く"` + `role="img"`.

import { MaterialSymbol } from "@/components/sites/studio-design-8a86c0e4/shared/icons";
import "./start-cta-section.css";

const IMAGES = "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images";

export function StartCtaSection() {
  return (
    <div className="box symbol-2">
      <div className="box symbol-2__sd-1">
        <div className="box symbol-2__sd-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="img symbol-2__sd-3"
            width={44}
            height={26}
            alt="Studio"
            src={`${IMAGES}/s-44x26_3430d13a-42ae-4e12-9d99-3075f619b6b3.svg`}
          />
        </div>
        <div className="box symbol-2__sd-4">
          <h2 className="text symbol-2__sd-5 theme-57a9da79">さあ、今すぐStudioを始めよう。</h2>
          <div className="richText symbol-2__sd-6">
            <p>AI搭載の軽快なデザインエディタと美しいプリセットで、</p>
            <p>理想のサイトを最速でカタチに。これが、Web制作ツールの新基準。</p>
          </div>
        </div>
        <div className="box symbol-2__sd-7">
          <a
            className="box symbol-2__sd-8"
            href="https://app.studio.design/ja/signup"
            target="_blank"
          >
            <p className="text symbol-2__sd-9">今すぐ無料で始める</p>
            <div className="box symbol-2__sd-10">
              <MaterialSymbol name="arrow_forward" className="symbol-2__sd-11" />
              <span
                className="icon symbol-2__sd-12 material-symbols-outlined"
                aria-label="新規タブで開く"
                role="img"
              >
                arrow_forward
              </span>
            </div>
          </a>
          <a className="box symbol-2__sd-13" href="/ja/business/download" target="_blank">
            <p className="text symbol-2__sd-14">法人向け製品資料をダウンロード</p>
            <div className="box symbol-2__sd-15">
              <MaterialSymbol name="arrow_forward" className="symbol-2__sd-16" />
              <MaterialSymbol name="arrow_forward" className="symbol-2__sd-17" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
