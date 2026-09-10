// Port of studio.design/ja/editor `main > .sd-133` (DOM order 6 of 13) — the "Visual Design"
// section: a CSS-only `position: sticky` rail (`.sd-135`, top 104px) beside a 6-card `<ul>`.
// Structure, class names, alt text and Japanese copy are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-133`).
//
// Interaction model is mixed(scroll + hover + click), but only the click needs JavaScript:
//   * the sticky rail is native `position: sticky` (relative ≤1280) — no scroll listener;
//   * 19 `appear` reveals (6 cards + `.sd-160` + 12 MOTION letters) use the shared `Appear`;
//   * the `.sd-161` hover treatment is 34 sliced `.sd-161:hover*` rules — see VisualDesignMotionCard;
//   * `.sd-211` play/pause is the one stateful node — see VisualDesignVideoPlayer.
// The `theme-*` classes stay on the text nodes: `.sd-root .text.theme-XXXX` is specificity (0,3,0)
// and carries the font sizes; no `.sd-NN` rule in 133…215 declares one for a themed node.
// The origin's six `<noscript>` image duplicates are inert with JS on and are not rendered.
// No "use client" here: `Appear`, `SdVideo` and `MaterialIcon` declare their own client boundaries.

import type { CSSProperties } from "react";

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";
import { VisualDesignMotionCard } from "./VisualDesignMotionCard";
import { VisualDesignVideoPlayer } from "./VisualDesignVideoPlayer";
import "./visual-design-section.css";

const BASE = "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb";
const IMAGES = `${BASE}/images`;
const VIDEO = `${BASE}/video`;

/** `.sd-199` paints its background through the origin's `--img-*` custom properties, which
 *  `.image__bg-container::before` in `app/studio-base.css` consumes — the one place where an
 *  inline style is the origin's own mechanism rather than an invention. */
const LOTTIE_BG = `${IMAGES}/s-1480x1600_v-fms_webp_4f1aaa92-4838-4893-9e98-0a0cf5568af6`;
const lottieBgVars = {
  "--img-origin": `url(${LOTTIE_BG}.webp)`,
  "--img-small": `url(${LOTTIE_BG}_small.webp)`,
  "--img-middle": `url(${LOTTIE_BG}_middle.webp)`,
  "--img-regular": `url(${LOTTIE_BG}.webp)`,
} as CSSProperties;

/** `.sd-154` ("FontPlus") is `display: none` at every viewport and its asset is never fetched,
 *  so the origin's inline placeholder stays instead of a local file. */
const FONTPLUS_PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='708' height='112' viewBox='0 0 708 112'></svg>";

export function VisualDesignSection() {
  return (
    <div className="box sd-133">
      <div className="box sd-134">
        <div className="box sd-135">
          <h2 className="text sd-136 theme-cb8ba68c">
            Visual
            <br />
            Design
          </h2>
          <p className="text sd-137 theme-969c5ae1">
            ブランドをカタチづくる、
            <br />
            スタイルとフォント。
          </p>
        </div>
        <div className="box sd-138">
          <ul className="box sd-139">
            <Appear as="li" className="box sd-140" rootMargin="0px" threshold={0} activeClass={false}>
              <div className="box sd-141">
                <h3 className="text sd-142 theme-c1a9a55a">スタイルパネル</h3>
                <p className="text sd-143 theme-a3931427">
                  色や文字のルールをまとめて管理。
                  <br />
                  ブランドカラーや見出しのスタイルも、
                  <br />
                  全ページで一括適用。
                </p>
              </div>
              {/* Plain <img> (not next/image) so the sliced `.sd-144` rules apply unchanged. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-144"
                src={`${IMAGES}/s-896x438_v-fs_webp_977a7850-4c23-4d9f-9272-f71e6805ca8c_small.webp`}
                alt="サンプル画像：デザインエディタの一部の切り取り。画面左にはカラー設定パネルとテキストスタイルパネルが並んでいる。その下には「Start your story」と記載されたテキストボックスが表示されており、スタイルパネルで選択したスタイルが青い曲線で紐づけられている。"
              />
            </Appear>
            <Appear as="li" className="box sd-145" rootMargin="0px" threshold={0} activeClass={false}>
              <div className="box sd-146">
                <h3 className="text sd-147 theme-c1a9a55a">タイポグラフィ</h3>
                <div className="box sd-148">
                  <p className="text sd-149">9,200種類以上のフォントが無料で利用可能。</p>
                  <p className="text sd-150 theme-a3931427">
                    モリサワフォント(TypeSquare)、Google Fonts、カスタムフォント、System Fontsに対応。ブランドに合わせた多彩な書体を自由に使えます。
                  </p>
                </div>
              </div>
              <div className="box sd-151">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img sd-152"
                  src={`${IMAGES}/s-708x112_v-fs_webp_85f38531-a365-44a6-990e-22d439d9a165_small.webp`}
                  alt="Google Fonts"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img sd-153"
                  src={`${IMAGES}/s-1112x162_v-fs_webp_96c1b19d-dda8-419d-acbd-dc94b14976bb_small.webp`}
                  alt="TypeSquare"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="img sd-154" src={FONTPLUS_PLACEHOLDER} alt="FontPlus" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img sd-155"
                  src={`${IMAGES}/s-708x112_v-fs_webp_dcc890a8-eb4f-4f01-88b1-a03577f30cce_small.webp`}
                  alt="CustomFonts"
                />
              </div>
            </Appear>
            <VisualDesignMotionCard />
            <Appear as="li" className="box sd-194" rootMargin="0px" threshold={0} activeClass={false}>
              <div className="box sd-195">
                <h3 className="text sd-196 theme-c1a9a55a">色々な形式に対応</h3>
                <p className="text sd-197 theme-a3931427">
                  動画・画像・PDFなど、幅広いファイル形式をアップロードして利用できます。
                  <br />
                  {"\n"}
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-198"
                width="272"
                height="165"
                alt="サンプル画像：灰色の背景に白い8枚のカードが2段4列で並ぶ。各カードは拡張子を示し、アイコンと「.png」「.svg」「.mp4」などのテキストで構成されている。左上には黒いポインターとそれに追従する緑色の「＋」アイコン、赤い「8」の通知が付いており、複数ファイルの追加する様子を示している。"
                src={`${IMAGES}/s-272x165_db94a6c4-7da1-4ae6-94da-1da1013385f1.svg`}
              />
            </Appear>
            <Appear
              as="li"
              className="box image image--vertical sd-199"
              rootMargin="0px"
              threshold={0}
              activeClass={false}
              style={lottieBgVars}
            >
              <span className="image__bg-container" aria-hidden="true" />
              <div className="box sd-200">
                <h3 className="text sd-201 theme-f799e4ef">Lottie</h3>
                <p className="text sd-202 theme-a3931427">軽量で滑らかなLottieアニメーションに対応。</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-203"
                src={`${IMAGES}/s-1476x1164_v-fms_webp_d7f44742-e650-44e9-8060-f2092732599c_small.webp`}
                alt=""
              />
            </Appear>
            <Appear as="li" className="box sd-204" rootMargin="0px" threshold={0} activeClass={false}>
              <div className="box sd-205">
                <h3 className="text sd-206 theme-f799e4ef">iframe</h3>
                <p className="text sd-207 theme-a3931427">外部コンテンツをiframeで自由に埋め込み可能。</p>
              </div>
              <div className="box sd-208">
                <VisualDesignVideoPlayer
                  src={`${VIDEO}/s-3456x1080_462cefa8-05a9-4f79-8632-62d4e1647f5c.mp4`}
                />
              </div>
            </Appear>
          </ul>
        </div>
      </div>
    </div>
  );
}
