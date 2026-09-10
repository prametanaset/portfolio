// Port of studio.design/ja/editor `main > .sd-45` (DOM order 4 of 13) — the "Free Layout"
// section: a CSS-only `position: sticky` rail (`.sd-47`) beside a 5-card `<ul>` (`.sd-51`).
// Structure, class names, alt text and Japanese copy are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-45`).
// The `theme-*` classes stay on the text nodes: `.sd-root .text.theme-XXXX` is specificity (0,3,0)
// and beats `.sd-root .sd-NN` for font-size / line-height (e.g. `.sd-49` 0.94rem loses to 1rem).
// Client component only because the 5 `appear` reveals need an IntersectionObserver — the sticky
// rail and the two autoplay videos are declarative, so no scroll handler and no timers here.
// The origin's three `<noscript>` image duplicates are inert with JS on and are not rendered.

import type { CSSProperties } from "react";

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";
import { SdVideo } from "@/components/sites/studio-design-8a86c0e4/shared/video";
import "./free-layout-section.css";

const BASE = "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb";
const IMAGES = `${BASE}/images`;
const VIDEO = `${BASE}/video`;

/** `.sd-77` paints its background through the origin's `--img-*` custom properties, which
 *  `.image__bg-container::before` in `app/studio-base.css` consumes — the one place where an
 *  inline style is the origin's own mechanism rather than an invention. */
const CARD5_BG = `${IMAGES}/s-1478x1600_v-fms_webp_1228027a-e582-45f7-a17f-976623568666`;
const card5BgVars = {
  "--img-origin": `url(${CARD5_BG}.webp)`,
  "--img-small": `url(${CARD5_BG}_small.webp)`,
  "--img-middle": `url(${CARD5_BG}_middle.webp)`,
  "--img-regular": `url(${CARD5_BG}.webp)`,
} as CSSProperties;

export function FreeLayoutSection() {
  return (
    <div className="box sd-45">
      <div className="box sd-46">
        <div className="box sd-47">
          <h3 className="text sd-48 theme-cb8ba68c">Free Layout</h3>
          <p className="text sd-49 theme-969c5ae1">
            スマートなレイアウトと、
            <br />
            直感的な編集体験。
          </p>
        </div>
        <div className="box sd-50">
          <ul className="box sd-51">
            <Appear as="li" className="box sd-52">
              <div className="box sd-53">
                <h4 className="text sd-54 theme-c1a9a55a">ボックスレイアウト</h4>
                <p className="text sd-55 theme-a3931427">
                  ボックスレイアウトやスナップ機能で、複雑な配置も直感的に。
                  <br />
                  美しい構造を一瞬で作成できます。
                </p>
              </div>
              <SdVideo
                className="sd-56"
                src={`${VIDEO}/s-2672x1856_cd6091a9-5173-4219-9604-470d08abbfb4.mp4`}
              />
            </Appear>
            <Appear as="li" className="box sd-57">
              <div className="box sd-58">
                <h4 className="text sd-59 theme-c1a9a55a">レスポンシブ</h4>
                <p className="text sd-60 theme-a3931427">
                  各デバイスサイズに合わせて、デザインを最適化。
                  <br />
                  レイアウトの変更も自由自在に可能です。
                </p>
              </div>
              <SdVideo
                className="sd-61"
                src={`${VIDEO}/s-2160x2160_b9fe14c4-85dd-46a0-a114-f34348472441.mp4`}
              />
            </Appear>
            <Appear as="li" className="box sd-62">
              <div className="box sd-63">
                <h4 className="text sd-64 theme-c1a9a55a">コンポーネント</h4>
                <p className="text sd-65 theme-a3931427">
                  共通パーツをまとめて、効率的な制作を。
                  <br />
                  一度作れば、複数ページで使い回しも簡単。
                </p>
              </div>
              {/* Plain <img> (not next/image) so the sliced `.sd-66` rules apply unchanged. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-66"
                src={`${IMAGES}/s-1476x920_v-fms_webp_15cde8d8-0d0e-498d-92c2-09770d1ed83f_small.webp`}
                alt="サンプル画像：コンポーネントの例。上段に2種類の見出しブロック、下段に2種類のカードが配置されている。それぞれ、紫色の枠で囲まれ、左上にはコンポーネント名である「Heading01」、「Heading02」、「Card01」、「Card02」の文字が表示されている。"
              />
            </Appear>
            <Appear as="li" className="box sd-67">
              <div className="box sd-68">
                <h4 className="text sd-69 theme-c1a9a55a">プリセットパーツ</h4>
                <p className="text sd-70 theme-a3931427">
                  用意されたセクション・パーツで最初の一歩が、ぐっと簡単に。
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-71"
                src={`${IMAGES}/s-739x503_v-fs_webp_03a514fa-203a-4936-a7cd-e7f4cb58a083_small.webp`}
                alt="サンプル画像：白と黒を基調にしたセクション・パーツの例。矢印などのアイコン付きのボタン、円形のメニューを開く/閉じるボタン、画像付きの横長ボタン、余白を広く取ったカード型のボタンなどが並​んでいる。"
              />
              <div className="box sd-72" />
            </Appear>
            <Appear as="li" className="box sd-73">
              <div className="box sd-74">
                <h4 className="text sd-75 theme-f799e4ef">Figma to Studio</h4>
                <p className="text sd-76 theme-a3931427">
                  Figmaデータを簡単にStudioサイトに変換。
                </p>
              </div>
              <div className="box image image--vertical sd-77" style={card5BgVars}>
                <span className="image__bg-container" aria-hidden="true" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-78"
                src={`${IMAGES}/s-1478x996_v-fms_webp_21bca91a-9f5c-40dd-bd60-c179ce3709df_small.webp`}
                alt="サンプル画像：同一のWebデザインのFigmaデータの上に、Studioサイトへ変換されたデータが重なっているイメージ。Webデザインは指紋の画像と白文字「General Lab©」が配置された青基調のデザイン。右下には「Figma → Studio」のロゴが配置されている。"
              />
            </Appear>
          </ul>
        </div>
      </div>
    </div>
  );
}
