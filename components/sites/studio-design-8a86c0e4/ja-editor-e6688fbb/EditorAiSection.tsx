// Port of studio.design/ja/editor `main > .sd-79` (DOM order 5 of 13) — the page's dark zone
// ("Editor AI", background #1a1a1a, 2042.47px tall @1440). Structure, class names, alt text and
// Japanese copy are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-79`).
// `id="ai"` is the page's #ai anchor target — keep it.
// The section is scroll-only: exactly four `appear` reveals and nothing else. Zero links, buttons,
// toggles, carousels, videos, sticky elements and hover rules — none are invented here.
// Reveal timing (400ms delay / 800ms / cubic-bezier(0.2, 1, 1, 1), identical on all four, no
// stagger) lives in the `.sd-NN.appear` rules of the sliced CSS, never in JS.
// The `theme-b6b0338f` / `theme-57a9da79` classes stay on the text nodes: `.sd-root .text.theme-*`
// is specificity (0,3,0) and beats `.sd-root .sd-NN`, which is where `.sd-82`'s 12.96px and
// `.sd-83`'s 36px (→ 28px @480) come from. No font-size is inlined to "fix" that.
// No "use client" here: `Appear` declares its own client boundary, so the rest stays server-rendered.
// The origin's four `<noscript>` image duplicates are inert with JS on and are not rendered.

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";
import "./editor-ai-section.css";

const IMAGES = "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images";

/** The origin's runtime swaps `_small.webp` (600w) in for `_middle.webp` (1200w) at 390 —
 *  reproduced declaratively so the browser resolves the same `currentSrc` at each width:
 *  682–718px rendered → 1200w, 340px rendered → 600w. */
function imgSrcSet(stem: string) {
  return `${IMAGES}/${stem}_small.webp 600w, ${IMAGES}/${stem}_middle.webp 1200w`;
}
const IMG_SIZES = "(max-width: 768px) 100vw, 50vw";

const CARD1 = "s-5472x3040_v-frms_webp_3f01b21f-daf6-487a-8507-22cfa2acd455";
const CARD2 = "s-5472x3040_v-frms_webp_e605ad0a-fa6b-4594-8a45-3d852ebf534e";
const ROW3 = "s-5472x3080_v-frms_webp_addb103c-efd7-4e76-99dd-f31208bede0a";
const ROW4 = "s-5472x3080_v-frms_webp_a3dd9297-5346-4589-962c-c34cc8830429";

export function EditorAiSection() {
  return (
    <div className="box sd-79" id="ai">
      <div className="box sd-80">
        <h2 className="box sd-81">
          <span className="text sd-82 theme-b6b0338f">Editor AI</span>
          <span className="text sd-83 theme-57a9da79">
            AIが伴走する、
            <br />
            最速の制作体験。
          </span>
        </h2>
        <div className="box sd-84">
          <div className="richText sd-85">
            <p>
              Editor AIは、クリエイターに全く新しい制作体験を提供します。
              <br />
              ドラフト文章の作成はもちろん、直感的な画像編集、
              <strong>面倒だった作業も自動で代行。</strong>
              すべての作業が、これまでにない速さに。
            </p>
          </div>
        </div>
      </div>
      <ul className="box sd-86">
        <Appear as="li" className="box sd-87" rootMargin="0px" threshold={0} activeClass={false} once>
          <div className="box sd-88">
            <div className="box sd-89">
              <p className="text sd-90">01</p>
            </div>
            <div className="box sd-91">
              <h3 className="box sd-92">
                <span className="text sd-93">Image AI</span>
                <span className="text sd-94">{"画像を「探す」から 「編集する」へ"}</span>
              </h3>
              <p className="text sd-95">
                指示を出すだけで、
                <br />
                画像素材を自在に編集可能に。
                <br />
                素材探しのストレスから、自由になろう。
              </p>
            </div>
          </div>
          <div className="box sd-96">
            {/* Plain <img> (not next/image) so the sliced `.sd-97` rules apply unchanged. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img sd-97"
              src={`${IMAGES}/${CARD1}_middle.webp`}
              srcSet={imgSrcSet(CARD1)}
              sizes={IMG_SIZES}
              alt="サンプル画像：黒い背景の上に複数の画像が浮かび上がるように並んでいる。赤みがかったオレンジ色の背景に横向きの人物シルエットが映された画像が中央手前に配置され、その奥で同じ構成・異なる色味の写真が放射状に並んでいる。"
            />
            <div className="box sd-98" />
          </div>
        </Appear>
        <Appear as="li" className="box sd-99" rootMargin="0px" threshold={0} activeClass={false} once>
          <div className="box sd-100">
            <div className="box sd-101">
              <p className="text sd-102">02</p>
            </div>
            <div className="box sd-103">
              <h3 className="box sd-104">
                {/* U+00A0 between "Text" and "AI", as authored in the origin markup. */}
                <span className="text sd-105">{"Text AI"}</span>
                <span className="text sd-106">あなた専属のコピーライター</span>
              </h3>
              <p className="text sd-107">
                プロンプトひとつで、
                <br />
                あなたの意図に沿った文章を自動生成。
                <br />
                他言語翻訳なども、もっと簡単に。
              </p>
            </div>
          </div>
          <div className="box sd-108">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img sd-109"
              src={`${IMAGES}/${CARD2}_middle.webp`}
              srcSet={imgSrcSet(CARD2)}
              sizes={IMG_SIZES}
              alt="サンプル画像：暗い背景に韓国語・日本語・英語など複数言語のテキストが記載されたカードが並んでいる。中央の英語カードのみ発光しているようなピンク色のエフェクトと赤い円形アイコンが追加され、他のカードより強調されている。"
            />
            <div className="box sd-110" />
          </div>
        </Appear>
        <li className="box sd-111">
          <div className="box sd-112">
            <div className="box sd-113">
              <p className="text sd-114">03</p>
            </div>
            <div className="box sd-115">
              <h3 className="box sd-116">
                <span className="text sd-117">Auto Layer Rename</span>
                <span className="text sd-118">自動でリネーム、自動で整理</span>
              </h3>
              <div className="richText sd-119">
                <p>
                  煩雑なレイヤーの整理もStudioにお任せ。
                  <br />
                  各レイヤーを自動で命名、サイト構造がよりわかりやすく。
                </p>
              </div>
            </div>
          </div>
          <Appear className="box sd-120" rootMargin="0px" threshold={0} activeClass={false} once>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img sd-121"
              src={`${IMAGES}/${ROW3}_middle.webp`}
              srcSet={imgSrcSet(ROW3)}
              sizes={IMG_SIZES}
              alt="サンプル画像：デザインエディタ画面の切り取り。左側にレイヤーパネル、右側に人物写真が並ぶ。レイヤーパネルの中には階層構造を示すレイヤー名が縦に並んでおり、リネーム中のレイヤーはピンク色のテキストと細長い線で強調して表示されている。"
            />
          </Appear>
        </li>
        <li className="box sd-122">
          <div className="box sd-123">
            <div className="box sd-124">
              <p className="text sd-125">04</p>
            </div>
            <div className="box sd-126">
              <h3 className="box sd-127">
                <span className="text sd-128">Auto Responsive</span>
                <span className="text sd-129">あっという間に、レスポンシブ対応</span>
              </h3>
              <div className="richText sd-130">
                <p>
                  1つのデザインで、すべてのデバイスに対応。
                  <br />
                  制作したレイアウトを、自動でレスポンシブ対応します。
                </p>
              </div>
            </div>
          </div>
          <Appear className="box sd-131" rootMargin="0px" threshold={0} activeClass={false} once>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img sd-132"
              src={`${IMAGES}/${ROW4}_middle.webp`}
              srcSet={imgSrcSet(ROW4)}
              sizes={IMG_SIZES}
              alt="サンプル画像：黒い画面の中央にWebサイトのデザインが配置され、その背景に赤いガイドラインやレスポンシブ時のレイアウト例が薄く表示されている。Webサイトはオレンジ色基調の人物写真や英文で構成されている。"
            />
          </Appear>
        </li>
      </ul>
    </div>
  );
}
