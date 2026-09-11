// Port of studio.design/ja/editor `main > .sd-331` (DOM order 12 of 13, last before `footer.symbol-3`)
// — the Studio.Stock band: one `<a>` card on a white run-out.
// Structure, class names, copy, alts and hrefs are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-331`).
// Hover-driven only: the nine `.sd-332:hover*` rules in the slice do the card un-zoom
// (`.sd-333` scale 1.02 → 1), the `brightness(70%)` on `.image__bg-container::before` and the two
// arrow-glyph translates — no React state, no JS, no reveal, no toggle, no `theme-*` class here.
// The origin ships no `rel` on the `target="_blank"` link; reproduced as-is.

import type { CSSProperties } from "react";

import { MaterialSymbol } from "@/components/sites/studio-design-8a86c0e4/shared/icons";

import "./stock-band-section.css";

const IMAGES = "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images";

/** `.sd-333` paints the card photo through the origin's `--img-*` custom properties, which
 *  `.image__bg-container::before` in `app/studio-base.css` consumes via the `image-container`
 *  container queries — the one place where an inline style is the origin's own mechanism. */
const CARD_BG = `${IMAGES}/s-11136x4000_v-frms_webp_aac6934b-3d26-4ddb-9617-27db10104869`;
const cardBgVars = {
  "--img-origin": `url(${CARD_BG}.webp)`,
  "--img-small": `url(${CARD_BG}_small.webp)`,
  "--img-middle": `url(${CARD_BG}_middle.webp)`,
  "--img-regular": `url(${CARD_BG}_regular.webp)`,
} as CSSProperties;

export function StockBandSection() {
  return (
    <div className="box sd-331">
      <a className="box sd-332" href="https://stock.studio.design/" target="_blank">
        <div className="box image image--horizontal sd-333" style={cardBgVars}>
          <span className="image__bg-container" aria-hidden="true"></span>
        </div>
        <div className="box sd-334">
          <MaterialSymbol name="arrow_forward" className="sd-335" />
          {/* `MaterialSymbol` hard-codes aria-hidden, so the labelled twin stays a raw span. */}
          <span
            className="icon sd-336 material-symbols-outlined"
            aria-label="เปิดในแท็บใหม่"
            role="img"
          >
            arrow_forward
          </span>
        </div>
        <div className="box sd-337">
          <div className="box sd-338">
            <img
              className="img sd-339"
              width="10"
              height="10"
              alt=""
              src={`${IMAGES}/s-10x10_c3ad64c4-ef55-4c85-aa36-33ce67884f87.svg`}
            />
          </div>
          <div className="box sd-340">
            <p className="text sd-341">แรงบันดาลใจคัดสรร</p>
          </div>
          <div className="box sd-342">
            <p className="text sd-343">สำหรับคุณ</p>
          </div>
          <div className="box sd-344">
            <p className="text sd-345">
              STOCK.STUDIO.DESIGN
              <br />
            </p>
          </div>
        </div>
        <div className="box sd-346">
          <div className="box sd-347"></div>
          <div className="box sd-348">
            <h2 className="box sd-349">
              <img
                className="img sd-350"
                width="330"
                height="41"
                alt="Studio.Stovk"
                src={`${IMAGES}/s-330x41_96410d1d-48da-4cc2-8a68-d55901385dad.svg`}
              />
            </h2>
            <div className="box sd-351">
              <p className="text sd-352">
                คลังภาพแห่งยุคใหม่
                <br />
                คลังภาพแห่งยุคใหม่
              </p>
            </div>
          </div>
          <div className="box sd-353"></div>
        </div>
      </a>
    </div>
  );
}
