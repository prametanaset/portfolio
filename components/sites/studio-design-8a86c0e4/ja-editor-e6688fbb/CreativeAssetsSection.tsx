// Port of studio.design/ja/editor `main > .sd-216` (DOM order 7 of 13) — the "Creative Assets"
// section: the page's second black zone (the colour is `.sd-216`'s own background plus its
// `96px 0` padding — `64px 0` ≤480), butt-joined to the white sections above and below with no
// margin, border or overlap. Structure, class names, alt text, aria-label and Japanese copy are
// verbatim from the origin markup (docs/research/.../page.html, `box sd-216`); the two
// `<noscript>` image duplicates are inert with JS on and are not rendered.
//
// Interaction model is mixed(scroll + hover):
//   * two `appear` reveals, `.sd-224` and `.sd-234`, on the same rule (400 ms delay / 800 ms,
//     cubic-bezier(0.2,1,1,1)) with no stagger — they fire the instant the element top crosses
//     the viewport bottom, so `rootMargin="0px"` overrides the shared `0px 0px -10% 0px` default;
//   * one hover, `a.sd-229`, is 8 sliced `.sd-229:hover*` rules and needs no JavaScript: the
//     resting arrow (`.sd-233`) exits up-right while `.sd-232`, clipped out to the left of the
//     24×24 `overflow: hidden` mask at rest, slides in to replace it.
// Nothing else in the section reacts to hover — the Unsplash card is not a link.
// The `theme-*` classes stay on the text nodes: `.text.theme-XXXX` (0,2,0) beats `.sd-NN` (0,1,0),
// so the origin renders 14px at 768/390 even though `.sd-222` declares 12px there. That dead rule
// is faithful to the origin — do not "fix" it and do not inline a size.
// No "use client" here: `Appear` and `MaterialSymbol` declare their own client boundaries.

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";
import { MaterialSymbol } from "@/components/sites/studio-design-8a86c0e4/shared/icons";
import "./creative-assets-section.css";

const IMAGES = "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images";

const STOCK_IMG = `${IMAGES}/s-1380x1000_v-fms_webp_53907708-1354-4a2c-a2a2-3148a83aacbc`;
const UNSPLASH_IMG = `${IMAGES}/s-1380x1000_v-fms_webp_84a9bfbf-876e-4ccc-93ff-df84b35b5de2`;

/** The origin's runtime swaps `src` per viewport: `_middle` (1200×869) at 1440 and 768, `_small`
 *  (600×434) at ≤480. `srcSet` + `sizes` reproduces that mapping natively on the plain `<img>` —
 *  the card is `calc(100vw - 48px)` once `.sd-223` stacks at ≤768 and half of it minus the 12 px
 *  gap above, so 342 px @390 selects `_small` and 720/690 px @768/@1440 select `_middle`. */
const cardSrcSet = (base: string) => `${base}_small.webp 600w, ${base}_middle.webp 1200w`;
const CARD_SIZES = "(max-width: 768px) calc(100vw - 48px), calc((100vw - 60px) / 2)";

export function CreativeAssetsSection() {
  return (
    <div className="box sd-216">
      <div className="box sd-217">
        <h2 className="box sd-218">
          <span className="text sd-219 theme-b6b0338f">Creative Assets</span>
          <span className="text sd-220 theme-57a9da79">
            Studio内で使える、
            <br />
            多彩なクリエイティブアセット。
          </span>
        </h2>
        <div className="box sd-221">
          <p className="text sd-222 theme-a3931427">
            新しく登場したStudio.Stockをはじめ、Unsplashや手持ちの素材も使用可能。多彩なビジュアルをStudio上で自由に取り込めます。
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
              src={`${STOCK_IMG}_middle.webp`}
              srcSet={cardSrcSet(STOCK_IMG)}
              sizes={CARD_SIZES}
              alt="Studio Stock"
            />
          </h3>
          <div className="box sd-227">
            <p className="text sd-228">
              クリエイターのための
              <br />
              次世代フォトストック
            </p>
            {/* The origin's `<a>` carries no `rel` attribute (`a.rel` reads "") — keep it that way. */}
            <a className="box sd-229" href="https://stock.studio.design/" target="_blank">
              <p className="text sd-230">Studio.Stockをみる</p>
              <div className="box sd-231">
                <MaterialSymbol name="arrow_forward" className="sd-232" />
                {/* Not `MaterialSymbol`: that component hard-codes `aria-hidden` and cannot
                    express the origin's `aria-label` + `role="img"` on this glyph. */}
                <span
                  className="icon sd-233 material-symbols-outlined"
                  aria-label="新規タブで開く"
                  role="img"
                >
                  arrow_forward
                </span>
              </div>
            </a>
          </div>
        </Appear>
        <Appear as="h3" className="box sd-234" rootMargin="0px" threshold={0} activeClass={false}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="img sd-235"
            src={`${UNSPLASH_IMG}_middle.webp`}
            srcSet={cardSrcSet(UNSPLASH_IMG)}
            sizes={CARD_SIZES}
            alt="Unsplash"
          />
        </Appear>
      </div>
    </div>
  );
}
