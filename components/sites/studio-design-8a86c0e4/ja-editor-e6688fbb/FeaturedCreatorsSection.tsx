// Port of studio.design/ja/editor `main > .sd-236` (DOM order 8 of 13) — the "Featured Creators"
// showcase: a static header row, the `<sd-carousel class="box sd-244">` track with its two edge
// fades, and the bottom gradient hand-off to the next section's #f7f7f7.
// Structure, class names and Japanese copy are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-236`).
// The `theme-*` classes stay on the text nodes: `.sd-root .text.theme-XXXX` is specificity (0,3,0)
// and beats `.sd-root .sd-NN`, so at ≤768 the body copy is 14px, not `.sd-242`'s 12px.
// No `Appear` wrapper: the 21 `appear` targets in this section are visually inert (their `.appear`
// rules carry transition timing only) — see the spec's "Reveal" entry.

import { FeaturedCreatorsCarousel } from "./FeaturedCreatorsCarousel";
import "./featured-creators-section.css";

export function FeaturedCreatorsSection() {
  return (
    <div className="box sd-236">
      <div className="box sd-237">
        <h2 className="box sd-238">
          <span className="text sd-239 theme-b6b0338f">Featured Creators</span>
          <span className="text sd-240 theme-57a9da79">
            創造の裏側を語る、
            <br />
            クリエイターたちのストーリー。
          </span>
        </h2>
        <div className="box sd-241">
          <p className="text sd-242 theme-a3931427">
            日々の制作で培われた思考や工夫、プロジェクトを進めるうえでのこだわりを紹介。リアルなプロセスに触れることで、次の制作につながる学びや発見が生まれます。
          </p>
        </div>
      </div>
      <div className="box sd-243">
        <FeaturedCreatorsCarousel />
        <div className="box sd-266">
          <div className="box sd-267" />
        </div>
        <div className="box sd-268">
          <div className="box sd-269" />
        </div>
      </div>
      <div className="box sd-270" />
    </div>
  );
}
