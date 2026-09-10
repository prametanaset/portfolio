// Port of studio.design/ja/editor `main > .sd-271` (DOM order 9 of 13) — the "Collaboration"
// section: a CSS-only `position: sticky` rail (`.sd-273`, top 104px) beside a 4-card `<ul>`
// (`.sd-277`). Structure, class names, alt text and Japanese copy are verbatim from the origin
// markup (docs/research/.../page.html, `box sd-271`) — including the origin's own typo
// 「英文テキス」 in the `.sd-287` alt, which is kept. The eight `<noscript>` image duplicates are
// inert with JS on and are not rendered.
//
// Interaction model is scroll only:
//   * the rail is pure CSS `position: sticky` — no scroll handler, no class flip, and nothing
//     changes visually while it is stuck (State A and State B are identical);
//   * nine `appear` reveals — the four cards on one rule (400 ms delay / 800 ms /
//     cubic-bezier(0.2,1,1,1)) and the five stacked screenshots on 1000 ms /
//     cubic-bezier(0,1,0.56,1) with a right→left cascade (700/600/500/400/300 ms). Every one of
//     those numbers lives in collaboration-section.css — none of them is expressed here.
//     `rootMargin="0px"` overrides `Appear`'s shared `0px 0px -10% 0px` default, matching the
//     origin runtime's observer.
// Hover is refuted: the only `:hover` rules in the slice are five no-ops inside the origin's
// `(max-width: 768px)` block, so no hover behaviour is wired up here.
// The `theme-*` classes stay on the text nodes: `.text.theme-XXXX` (0,2,0) beats `.sd-NN` (0,1,0)
// and is what yields 34px / 28px / 16px here — do not inline a size.
// No "use client" here: `Appear` declares its own client boundary.

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";
import "./collaboration-section.css";

const IMAGES = "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images";

/** `.sd-282` is the one image whose variant the origin runtime swaps: `_middle` (1200×631) at
 *  1440 where the box is 642.20px, `_small` (600×315) at 768 (401.59px) and 390 (318px).
 *  `srcSet` + `sizes` reproduces that mapping natively — the widths below are the rendered box at
 *  each breakpoint: >1280 `calc((100vw - 287px) * 0.6 - 49.6px)` (48px page margin + 215px rail +
 *  24px gap, card padding 40, image margin-right -40, `--gap-h` 24); ≤1280 the rail goes
 *  full-width and `--gap-h` drops to 16; ≤768 the card padding drops to 24; ≤480 the cards stack
 *  full width. All other eight images ship a single `_small` variant at every viewport. */
const SD282 = `${IMAGES}/s-1288x678_v-fms_webp_5c0329b7-8f53-4dfb-a80a-d0dead2ab901`;
const SD282_SIZES =
  "(max-width: 480px) calc(100vw - 72px)," +
  " (max-width: 768px) calc((100vw - 48px) * 0.6 - 30.4px)," +
  " (max-width: 1280px) calc((100vw - 48px) * 0.6 - 46.4px)," +
  " calc((100vw - 287px) * 0.6 - 49.6px)";

export function CollaborationSection() {
  return (
    <div className="box sd-271">
      <div className="box sd-272">
        <div className="box sd-273">
          <h2 className="text sd-274 theme-cb8ba68c">Collaboration</h2>
          <p className="text sd-275 theme-969c5ae1">
            同時編集で進む、
            <br />
            チームの制作体験。
          </p>
        </div>
        <div className="box sd-276">
          <ul className="box sd-277">
            <Appear
              as="li"
              className="box sd-278"
              rootMargin="0px"
              threshold={0}
              activeClass={false}
            >
              <div className="box sd-279">
                <h3 className="text sd-280 theme-c1a9a55a">リアルタイムコラボレーション</h3>
                <p className="text sd-281 theme-a3931427">
                  複数人で同時に編集できるリアルタイムコラボレーション。
                  <br />
                  誰がどこを作業しているかを確認しながら、チームでスムーズに制作できます。
                </p>
              </div>
              {/* Plain <img> (not next/image) so the sliced `.sd-282` rules apply unchanged. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-282"
                src={`${SD282}_middle.webp`}
                srcSet={`${SD282}_small.webp 600w, ${SD282}_middle.webp 1200w`}
                sizes={SD282_SIZES}
                alt="サンプル画像：複数のテキストボックスと、草原に立つ家の写真で構成されたページを、2人のユーザーが編集している様子。左上のテキストボックスは青色の枠で、右下のテキストボックスはオレンジ色の枠で囲まれ、それぞれ編集中であることを示す矢印とユーザーアイコンが重なって表示されている。"
              />
            </Appear>
            <Appear
              as="li"
              className="box sd-283"
              rootMargin="0px"
              threshold={0}
              activeClass={false}
            >
              <div className="box sd-284">
                <h3 className="text sd-285 theme-c1a9a55a">コメント機能</h3>
                <p className="text sd-286 theme-a3931427">
                  Studio上に直接コメントを残せる機能です。
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-287"
                src={`${IMAGES}/s-1632x1356_v-fms_webp_1afb3be4-7c11-4d0b-af78-c374a27ba654_small.webp`}
                alt="サンプル画像：デザインエディタ上でコメントを残している様子。青枠で囲まれた英文テキスの上に、白背景の吹き出しのアイコンとコメントパネルが浮かぶ。コメントパネル内にはユーザーのアイコンやユーザー同士の短いやり取りが表示されている。"
              />
            </Appear>
            <Appear
              as="li"
              className="box sd-288"
              rootMargin="0px"
              threshold={0}
              activeClass={false}
            >
              <div className="box sd-289">
                <h3 className="text sd-290 theme-c1a9a55a">コンテンツ編集モード</h3>
                <p className="text sd-291 theme-a3931427">
                  レイアウトを崩さずに、テキストや画像だけを安全に編集できるモード。
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-292"
                src={`${IMAGES}/s-816x676_v-fs_webp_c7f1e56c-b94a-48df-b889-9798e2ffd1cc_small.webp`}
                alt="サンプル画像：デザインエディタでテキストの編集を行う様子。ページは複数のテキストと画像で構成され、それ以外の背景部分には編集不可であることを示す薄い青色が重なっている。青い矢印がテキストの一部に重なっており、編集中であることを示している。"
              />
            </Appear>
            <Appear
              as="li"
              className="box sd-293"
              rootMargin="0px"
              threshold={0}
              activeClass={false}
            >
              <div className="box sd-294">
                <h3 className="text sd-295 theme-c1a9a55a">バージョン管理</h3>
                <p className="text sd-296 theme-a3931427">
                  これまでの編集履歴をいつでも確認・復元できるバージョン管理機能。
                  <br />
                  変更前の状態にもワンクリックで戻せます。
                </p>
              </div>
              {/* In-flow row: the five screenshots overlap through `margin-right: -324px` and
                  stair-step upward through `margin-top` 72/54/36/18/0; `z-index` 4/3/2/1/auto
                  puts `.sd-298` on top, and `li.sd-293 { overflow: hidden }` clips the overflow. */}
              <div className="box sd-297">
                <Appear
                  as="img"
                  className="img sd-298"
                  rootMargin="0px"
                  threshold={0}
                  activeClass={false}
                  src={`${IMAGES}/s-865x852_v-fs_webp_48214724-a010-43fa-aa45-d681a6d391b6_small.webp`}
                  alt=""
                />
                <Appear
                  as="img"
                  className="img sd-299"
                  rootMargin="0px"
                  threshold={0}
                  activeClass={false}
                  src={`${IMAGES}/s-865x852_v-fs_webp_ad3da2af-a173-44c3-8dff-b271ef0baf82_small.webp`}
                  alt=""
                />
                <Appear
                  as="img"
                  className="img sd-300"
                  rootMargin="0px"
                  threshold={0}
                  activeClass={false}
                  src={`${IMAGES}/s-864x851_v-fs_webp_76ee5ccd-fa6a-4ce9-8c93-a4d28efc3b00_small.webp`}
                  alt=""
                />
                <Appear
                  as="img"
                  className="img sd-301"
                  rootMargin="0px"
                  threshold={0}
                  activeClass={false}
                  src={`${IMAGES}/s-865x852_v-fs_webp_46e1a776-8667-4242-8ced-ce57aa8610ee_small.webp`}
                  alt=""
                />
                <Appear
                  as="img"
                  className="img sd-302"
                  rootMargin="0px"
                  threshold={0}
                  activeClass={false}
                  src={`${IMAGES}/s-764x802_v-fs_webp_3f824ef8-03d9-4c09-bb14-2a595539ac64_small.webp`}
                  alt=""
                />
              </div>
            </Appear>
          </ul>
        </div>
      </div>
    </div>
  );
}
