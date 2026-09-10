// Port of studio.design/ja/editor `main > .sd-303` (DOM order 10 of 13) — the "Data" section: a
// CSS-only `position: sticky` rail (`.sd-305`, top 104px) beside a 4-card `<ul>` (`.sd-309`).
// Structure, class names, alt text and Japanese copy are verbatim from the origin markup
// (docs/research/.../page.html, `box sd-303`). The four `<noscript>` image duplicates are inert
// with JS on and are not rendered.
//
// Interaction model is scroll only:
//   * the rail is pure CSS `position: sticky` (relative again at ≤1280) — no scroll handler, no
//     class flip, and nothing changes visually while it is stuck (State A and State B are
//     identical over 19 scroll samples);
//   * four `appear` reveals — `.sd-310` `.sd-315` `.sd-321` `.sd-326`, all on the same rule
//     (400 ms delay / 800 ms / cubic-bezier(0.2,1,1,1), no stagger). Every one of those numbers
//     lives in data-section.css — none of them is expressed here. `rootMargin="0px"` overrides
//     `Appear`'s shared `0px 0px -10% 0px` default, matching the origin runtime's observer.
// No toggle (0 `data-toggle-trigger` / `<button>` / `aria-expanded` in this section), no hover,
// no focus and no click state: 21 hover and 21 click probes changed 0 properties, and the origin
// stylesheet has no pseudo-class rule for any `.sd-303`…`.sd-330` class.
// The `theme-*` classes stay on the text nodes: `.text.theme-XXXX` (0,2,0) beats `.sd-NN` (0,1,0)
// and is what yields 34px / 30px / 28px / 16px here — do not inline a size. `.sd-312` is the one
// heading on `theme-f799e4ef` (30px / -1.2px) rather than `theme-c1a9a55a`.
// `.sd-320` is the white→transparent gradient over the bottom of `.sd-319`; the origin rule also
// declares the invalid `top: NaNpx` (kept verbatim in the slice, dropped by every parser), so the
// used geometry comes from `bottom: 0` + `height: 104px` (64px at ≤480) — never a literal top.
// No "use client" here: `Appear` declares its own client boundary.

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";
import "./data-section.css";

const IMAGES = "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images";

/** `.sd-314` is the one image whose variant the origin runtime swaps: `_middle` (1200×633) at
 *  1440 where the box is 644px, `_small` (600×317) at 768 (401.59px) and 390 (318px).
 *  `srcSet` + `sizes` reproduces that mapping natively — the widths below are the rendered box at
 *  each breakpoint: >1280 `calc((100vw - 284px) * 0.6 - 49.6px)` (48px page margin + 212px rail +
 *  24px gap, card padding 40, image margin-right -40, `--gap-h` 24); ≤1280 the rail goes
 *  full-width and `--gap-h` drops to 16; ≤768 the card padding drops to 24 (image margin -24);
 *  ≤480 the cards stack full width. The other three images ship a single `_small` variant at
 *  every viewport. */
const SD314 = `${IMAGES}/s-1932x1020_v-frms_webp_c0281a1c-b889-4aca-b73b-ccf52f491bac`;
const SD314_SIZES =
  "(max-width: 480px) calc(100vw - 72px)," +
  " (max-width: 768px) calc((100vw - 48px) * 0.6 - 30.4px)," +
  " (max-width: 1280px) calc((100vw - 48px) * 0.6 - 46.4px)," +
  " calc((100vw - 284px) * 0.6 - 49.6px)";

export function DataSection() {
  return (
    <div className="box sd-303">
      <div className="box sd-304">
        <div className="box sd-305">
          <h2 className="text sd-306 theme-cb8ba68c">Data</h2>
          <p className="text sd-307 theme-969c5ae1">
            コンテンツを束ね、
            <br />
            柔軟に活用できるデータ管理。
          </p>
        </div>
        <div className="box sd-308">
          <ul className="box sd-309">
            <Appear
              as="li"
              className="box sd-310"
              rootMargin="0px"
              threshold={0}
              activeClass={false}
            >
              <div className="box sd-311">
                <h3 className="text sd-312 theme-f799e4ef">CMS</h3>
                <p className="text sd-313 theme-a3931427">
                  コンテンツを一箇所でまとめて管理。
                  <br />
                  ブログやニュース、制作実績などをCMSで簡単に更新。
                </p>
              </div>
              {/* Plain <img> (not next/image) so the sliced `.sd-314` rules apply unchanged. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-314"
                src={`${SD314}_middle.webp`}
                srcSet={`${SD314}_small.webp 600w, ${SD314}_middle.webp 1200w`}
                sizes={SD314_SIZES}
                alt="サンプル画像：記事一覧画面の上に、記事詳細画面が重なって配置されている。一覧画面には複数の記事が並び、各記事のステータスやタイトルを確認できる。詳細画面には記事のタイトル・本文とその上にオレンジ色と青色の矢印が重なって表示され、編集中であることを示している。"
              />
            </Appear>
            <Appear
              as="li"
              className="box sd-315"
              rootMargin="0px"
              threshold={0}
              activeClass={false}
            >
              <div className="box sd-316">
                <h3 className="text sd-317 theme-c1a9a55a">フィルタリング</h3>
                <p className="text sd-318 theme-a3931427">
                  CMSで登録したデータをもとに、カテゴリやタグなどの条件で動的に絞り込み表示ができます。
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-319"
                src={`${IMAGES}/s-816x676_v-fs_webp_a7dbb1fb-f0d5-4a40-abd4-10113626e95e_small.webp`}
                alt="サンプル画像：灰色のパネル上で、絞り込み設定を行う様子。上段は「Tags:」の横に選択中のタグ「Branding Dynamic」が横並びで表示されている。その下に「Web Design」「Marketing」「Development」「DX」などのタグが縦積みで並ぶ。"
              />
              <div className="box sd-320" />
            </Appear>
            <Appear
              as="li"
              className="box sd-321"
              rootMargin="0px"
              threshold={0}
              activeClass={false}
            >
              <div className="box sd-322">
                <h3 className="text sd-323 theme-c1a9a55a">API連携</h3>
                <p className="text sd-324 theme-a3931427">
                  外部サービスとのデータ連携を可能に。
                  <br />
                  Studioサイトにリアルタイムで反映できます。
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-325"
                src={`${IMAGES}/s-1578x1020_v-fms_webp_0b30e50c-53f2-43bc-b03c-b32f3ad32e02_small.webp`}
                alt="サンプル画像：白とグレーの格子柄の背景に、外部ツールを示す複数の正方形が並ぶ。それぞれの正方形の中央にはNotion、Airtableなどのロゴが配置されている。"
              />
            </Appear>
            <Appear
              as="li"
              className="box sd-326"
              rootMargin="0px"
              threshold={0}
              activeClass={false}
            >
              <div className="box sd-327">
                <h3 className="text sd-328 theme-c1a9a55a">フォーム</h3>
                <p className="text sd-329 theme-a3931427">
                  Studio上で簡単にフォームを作成・管理。
                  <br />
                  問い合わせ、イベント申し込み、資料請求など、目的に合わせて柔軟にカスタマイズできます。
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-330"
                src={`${IMAGES}/s-2104x1272_v-frms_webp_f4b96e9c-542d-4a4c-a8f7-0ee288812458_small.webp`}
                alt="サンプル画像：画面の左側にはフォームを構成する複数のパーツが並ぶ追加パネルが、右側には制作中のフォームが配置されている。中央には青枠で囲まれたパーツ「input」と手のアイコンが重なって表示されており、追加パネルから編集中のフォームへ、項目をドラッグして追加する様子を示している。"
              />
            </Appear>
          </ul>
        </div>
      </div>
    </div>
  );
}
