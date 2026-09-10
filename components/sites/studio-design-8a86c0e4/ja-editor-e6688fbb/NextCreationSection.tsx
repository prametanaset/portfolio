// Port of studio.design/ja/editor `main > .sd-13` (DOM order 3 of 13) — the "Next Creation"
// showcase: a static header row plus the `<sd-carousel class="box sd-20">` track.
// Structure, class names and Japanese copy are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-13`).
// The `theme-*` classes stay on the text nodes: `.sd-root .text.theme-XXXX` is specificity (0,3,0)
// and beats `.sd-root .sd-NN` for font-size / line-height.
// No `appear` reveal here — the 7 `[data-appear-manual]` slides carry no `appear` class.

import { NextCreationCarousel } from "./NextCreationCarousel";
import "./next-creation-section.css";

export function NextCreationSection() {
  return (
    <div className="box sd-13">
      <div className="box sd-14">
        <h2 className="box sd-15">
          <span className="text sd-16 theme-b6b0338f">Next Creation</span>
          <span className="text sd-17 theme-57a9da79">
            細部まで思い通りに仕上げる、
            <br />
            新たな制作体験。
          </span>
        </h2>
        <div className="box sd-18">
          <p className="text sd-19 theme-a3931427">
            レイアウトからフォント、アニメーションまで。
            <br />
            クリエイターが求める自由度と直感性を兼ね備えた、デザインエディタ。
          </p>
        </div>
      </div>
      <NextCreationCarousel />
    </div>
  );
}
