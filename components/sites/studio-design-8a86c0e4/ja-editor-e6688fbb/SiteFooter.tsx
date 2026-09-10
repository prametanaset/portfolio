// Port of studio.design/ja/editor `footer.box.symbol-3` (DOM order 13 of 13, last child of
// `div.box.sd-1`). Structure, class names, hrefs, alt text and Japanese copy are verbatim from the
// origin markup (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `symbol-3`).
// Styling comes entirely from the sliced origin CSS — do not restyle here.
//
// The slice is regenerated with:
//   node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs \
//     'symbol-3*' 'list-2*' theme-87bf3e6d theme-35b9fc8a \
//     --out components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/site-footer.css
// The two `theme-*` tokens are load-bearing: at specificity (0,3,0) they outrank
// `.sd-root .symbol-3__sd-N` (0,2,0) and are the only typography source for sd-11/44/85/154/162/
// 179/181/186/190/191/439/440/441/442.
//
// This file itself is static; the two interactive pieces are split out as client components —
// `FooterLoopBox` (the `sd-loop-box` marquee) and `FooterAccordionNav` (the ≤480 accordions).
//
// Kept in the markup although `display: none` at every width: the `sd-446` language switcher
// (日本語 / English) and the `note` + `Facebook` social links (`sd-441` / `sd-442`).

import { MaterialSymbol } from "@/components/sites/studio-design-8a86c0e4/shared/icons";
import { FooterAccordionNav } from "./FooterAccordionNav";
import { FooterLoopBox } from "./FooterLoopBox";
import "./site-footer.css";

export function SiteFooter() {
  return (
    <footer className="box symbol-3">
      <FooterLoopBox />
      <div className="box symbol-3__sd-3">
        <div className="box symbol-3__sd-4">
          <a className="box symbol-3__sd-5" href="https://studio.design/ja">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img symbol-3__sd-6"
              width={462}
              height={100}
              alt="Studio"
              src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-462x100_063f63d1-97e2-47ac-9aa5-31bb671abdfe.svg"
            />
          </a>
        </div>
        <div className="box symbol-3__sd-7">
          <div className="box symbol-3__sd-8">
            <div className="box symbol-3__sd-9">
              <div className="box symbol-3__sd-10">
                <p className="text symbol-3__sd-11 theme-87bf3e6d">プロダクト</p>
                <div className="box symbol-3__sd-12">
                  <div className="box symbol-3__sd-13" />
                </div>
              </div>
              <div className="box symbol-3__sd-14">
                <div className="box symbol-3__sd-15">
                  <p className="text symbol-3__sd-16">構築</p>
                  <div className="box symbol-3__sd-17">
                    <div className="box symbol-3__sd-18" />
                  </div>
                </div>
                <div className="box symbol-3__sd-19">
                  <a className="text symbol-3__sd-20" href="/ja/editor" data-current="">デザインエディタ</a>
                  <a className="text symbol-3__sd-21" href="/ja/cms">CMS</a>
                  <a className="text symbol-3__sd-22" href="/ja/form">フォーム</a>
                  <a className="text symbol-3__sd-23" href="/ja/seo">SEO</a>
                </div>
              </div>
              <div className="box symbol-3__sd-24">
                <div className="box symbol-3__sd-25">
                  <p className="text symbol-3__sd-26">運用</p>
                  <div className="box symbol-3__sd-27">
                    <div className="box symbol-3__sd-28" />
                  </div>
                </div>
                <div className="box symbol-3__sd-29">
                  <a className="text symbol-3__sd-30" href="/ja/hosting">
                    サイト運用
                    <br />
                  </a>
                  <a className="text symbol-3__sd-31" href="/ja/lp/security">
                    セキュリティ
                    <br />
                  </a>
                  <a className="text symbol-3__sd-32" href="/ja/workspace">
                    ワークスペース
                    <br />
                  </a>
                </div>
              </div>
              <div className="box symbol-3__sd-33">
                <div className="box symbol-3__sd-34">
                  <p className="text symbol-3__sd-35">より自在に</p>
                  <div className="box symbol-3__sd-36">
                    <div className="box symbol-3__sd-37" />
                  </div>
                </div>
                <div className="box symbol-3__sd-38">
                  <a className="text symbol-3__sd-39" href="/ja/figma-to-studio">
                    Figma to Studio
                    <br />
                  </a>
                  <a className="text symbol-3__sd-40" href="/ja/lottie">
                    Lottie for Studio
                    <br />
                  </a>
                  <a className="box symbol-3__sd-41" href="/ja/accessibility">
                    <p className="text symbol-3__sd-42">アクセシビリティ</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="box symbol-3__sd-43">
            <p className="text symbol-3__sd-44 theme-87bf3e6d">活用方法</p>
            <div className="box symbol-3__sd-45">
              <div className="box symbol-3__sd-46">
                <p className="text symbol-3__sd-47">サイト種別から探す</p>
                <div className="box symbol-3__sd-48">
                  <div className="box symbol-3__sd-49" />
                </div>
              </div>
              <div className="box symbol-3__sd-50">
                <a className="text symbol-3__sd-51" href="/ja/solutions/site-types/corporate">コーポレートサイト</a>
                <a className="text symbol-3__sd-52" href="/ja/solutions/site-types/recruit">
                  採用サイト
                  <br />
                </a>
                <a className="text symbol-3__sd-53" href="/ja/solutions/site-types/service">
                  サービスサイト
                  <br />
                </a>
              </div>
            </div>
            <div className="box symbol-3__sd-54">
              <div className="box symbol-3__sd-55">
                <p className="text symbol-3__sd-56">業種から探す</p>
                <div className="box symbol-3__sd-57">
                  <div className="box symbol-3__sd-58" />
                </div>
              </div>
              <div className="box symbol-3__sd-59">
                <a className="text symbol-3__sd-60" href="/ja/solutions/industries/leisure">宿泊・レジャー</a>
                <a className="text symbol-3__sd-61" href="/ja/solutions/industries/entertainment">エンタメ</a>
                <a className="text symbol-3__sd-62" href="/ja/solutions/industries/local-government">自治体</a>
                <a className="text symbol-3__sd-63" href="/ja/lp/solution/restaurant-homepage">
                  飲食店
                  <br />
                </a>
                <a className="text symbol-3__sd-64" href="/ja/lp/solution/ec-homepage">
                  小売・EC
                  <br />
                </a>
              </div>
            </div>
            <div className="box symbol-3__sd-65">
              <div className="box symbol-3__sd-66">
                <p className="text symbol-3__sd-67">課題から探す</p>
                <div className="box symbol-3__sd-68">
                  <div className="box symbol-3__sd-69" />
                </div>
              </div>
              <div className="box symbol-3__sd-70">
                <a className="text symbol-3__sd-71" href="/ja/solutions/usecases/landingpage">マーケターでのLP運用</a>
                <a className="text symbol-3__sd-72" href="/ja/solutions/usecases/wordpress-migration">WordPressからの移行</a>
                <a className="text symbol-3__sd-73" href="/ja/solutions/usecases/site-improvement">
                  サイト導線の変更
                  <br />
                </a>
              </div>
            </div>
            <div className="box symbol-3__sd-74">
              <div className="box symbol-3__sd-75">
                <p className="text symbol-3__sd-76">企業タイプから探す</p>
                <div className="box symbol-3__sd-77">
                  <div className="box symbol-3__sd-78" />
                </div>
              </div>
              <div className="box symbol-3__sd-79">
                <a className="text symbol-3__sd-80" href="/ja/lp/enterprise">
                  エンタープライズ
                  <br />
                </a>
                <a className="text symbol-3__sd-81" href="/ja/creators">制作会社・クリエイター</a>
                <a className="text symbol-3__sd-82" href="/ja/lp/solution/marketing-agency">広告代理店・コンサル</a>
                <a className="text symbol-3__sd-83" href="/ja/lp/startup">
                  スタートアップ
                  <br />
                </a>
              </div>
            </div>
          </div>
          <div className="box symbol-3__sd-84">
            <p className="text symbol-3__sd-85 theme-87bf3e6d">リソース</p>
            <div className="box symbol-3__sd-86">
              <div className="box symbol-3__sd-87">
                <p className="text symbol-3__sd-88">つくる・依頼する</p>
                <div className="box symbol-3__sd-89">
                  <div className="box symbol-3__sd-90" />
                </div>
              </div>
              <div className="box symbol-3__sd-91">
                <a className="box symbol-3__sd-92" href="https://studio.design/ja/store" target="_blank">
                  <p className="text symbol-3__sd-93">Studio Store</p>
                  <div className="box symbol-3__sd-94">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-95" />
                    <span className="icon symbol-3__sd-96 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </a>
                <a className="box symbol-3__sd-97" href="https://experts.studio.design/" target="_blank">
                  <p className="text symbol-3__sd-98">Studio Experts</p>
                  <div className="box symbol-3__sd-99">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-100" />
                    <span className="icon symbol-3__sd-101 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </a>
                <a className="box symbol-3__sd-102" href="https://showcase.studio.design/ja" target="_blank">
                  <p className="text symbol-3__sd-103">Studio Showcase</p>
                  <div className="box symbol-3__sd-104">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-105" />
                    <span className="icon symbol-3__sd-106 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="box symbol-3__sd-107">
              <div className="box symbol-3__sd-108">
                <p className="text symbol-3__sd-109">学ぶ</p>
                <div className="box symbol-3__sd-110">
                  <div className="box symbol-3__sd-111" />
                </div>
              </div>
              <div className="box symbol-3__sd-112">
                <a className="box symbol-3__sd-113" href="https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ" target="_blank">
                  <p className="text symbol-3__sd-114">Studio Academy</p>
                  <div className="box symbol-3__sd-115">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-116" />
                    <span className="icon symbol-3__sd-117 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </a>
                <a className="box symbol-3__sd-118" href="/ja/resources">
                  <p className="text symbol-3__sd-119">お役立ち資料</p>
                </a>
              </div>
            </div>
            <div className="box symbol-3__sd-120">
              <div className="box symbol-3__sd-121">
                <p className="text symbol-3__sd-122">つながる</p>
                <div className="box symbol-3__sd-123">
                  <div className="box symbol-3__sd-124" />
                </div>
              </div>
              <div className="box symbol-3__sd-125">
                <a className="box symbol-3__sd-126" href="https://community-ja.studio.design/home" target="_blank">
                  <p className="text symbol-3__sd-127">Studio Community</p>
                  <div className="box symbol-3__sd-128">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-129" />
                    <span className="icon symbol-3__sd-130 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </a>
                <a className="box symbol-3__sd-131" href="/ja/lp/ambassador">
                  <p className="text symbol-3__sd-132">全国ワークショップ</p>
                </a>
                <a className="box symbol-3__sd-133" href="https://lu.ma/studiodesign?k=c" target="_blank">
                  <p className="text symbol-3__sd-134">セミナー</p>
                  <div className="box symbol-3__sd-135">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-136" />
                    <span className="icon symbol-3__sd-137 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="box symbol-3__sd-138">
              <div className="box symbol-3__sd-139">
                <p className="text symbol-3__sd-140">読む</p>
                <div className="box symbol-3__sd-141">
                  <div className="box symbol-3__sd-142" />
                </div>
              </div>
              <div className="box symbol-3__sd-143">
                <a className="box symbol-3__sd-144" href="/ja/whats-new">
                  <p className="text symbol-3__sd-145">最新情報</p>
                </a>
                <a className="box symbol-3__sd-146" href="https://studio.design/ja/blog" target="_blank">
                  <p className="text symbol-3__sd-147">Studio Blog</p>
                  <div className="box symbol-3__sd-148">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-149" />
                    <span className="icon symbol-3__sd-150 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="box symbol-3__sd-151">
            <div className="box symbol-3__sd-152">
              <div className="box symbol-3__sd-153">
                <p className="text symbol-3__sd-154 theme-87bf3e6d">導入事例</p>
                <div className="box symbol-3__sd-155">
                  <div className="box symbol-3__sd-156" />
                </div>
              </div>
              <div className="box symbol-3__sd-157">
                <a className="text symbol-3__sd-158" href="/ja/customer-story">
                  事例インタビュー
                  <br />
                </a>
                <a className="text symbol-3__sd-159" href="/ja/customer">
                  導入企業一覧
                  <br />
                </a>
              </div>
            </div>
            <div className="box symbol-3__sd-160">
              <div className="box symbol-3__sd-161">
                <p className="text symbol-3__sd-162 theme-87bf3e6d">サポート</p>
                <div className="box symbol-3__sd-163">
                  <div className="box symbol-3__sd-164" />
                </div>
              </div>
              <div className="box symbol-3__sd-165">
                <a className="text symbol-3__sd-166" href="https://studio.design/ja/support">総合窓口</a>
                <a className="text symbol-3__sd-167" href="https://studio.design/ja/faq">よくある質問</a>
                <a className="box symbol-3__sd-168" href="https://help.studio.design/ja/" target="_blank">
                  <p className="text symbol-3__sd-169">ヘルプセンター</p>
                  <div className="box symbol-3__sd-170">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-171" />
                    <span className="icon symbol-3__sd-172 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </a>
                <a className="box symbol-3__sd-173" href="https://status.studio.design/" target="_blank">
                  <p className="text symbol-3__sd-174">システムステータス</p>
                  <div className="box symbol-3__sd-175">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-176" />
                    <span className="icon symbol-3__sd-177 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="box symbol-3__sd-178">
              <a className="text symbol-3__sd-179 theme-87bf3e6d" href="https://studio.design/ja/pricing">料金プラン</a>
              <a className="box symbol-3__sd-180" href="https://studio.inc/" target="_blank">
                <p className="text symbol-3__sd-181 theme-87bf3e6d">運営会社</p>
                <div className="box symbol-3__sd-182">
                  <MaterialSymbol name="arrow_forward" className="symbol-3__sd-183" />
                  <span className="icon symbol-3__sd-184 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </a>
              <a className="box symbol-3__sd-185" href="https://studio.inc/career" target="_blank">
                <p className="text symbol-3__sd-186 theme-87bf3e6d">採用情報</p>
                <div className="box symbol-3__sd-187">
                  <MaterialSymbol name="arrow_forward" className="symbol-3__sd-188" />
                  <span className="icon symbol-3__sd-189 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </a>
              <a className="text symbol-3__sd-190 theme-87bf3e6d" href="https://studio.design/ja/terms">利用規約・プライバシーポリシー</a>
              <a className="text symbol-3__sd-191 theme-87bf3e6d" href="https://studio.design/ja/guidelines">ユーザーガイドライン</a>
            </div>
          </div>
        </div>
      </div>
      <FooterAccordionNav />
      <div className="box symbol-3__sd-434">
        <div className="box symbol-3__sd-435">
          <p className="text symbol-3__sd-436">Follow Us</p>
          <div className="box symbol-3__sd-437" />
        </div>
        <div className="box symbol-3__sd-438">
          <a className="text symbol-3__sd-439 theme-35b9fc8a" href="https://x.com/StudioDesign" target="_blank">X（Twitter）</a>
          <a className="text symbol-3__sd-440 theme-35b9fc8a" href="https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ" target="_blank">YouTube</a>
          <a className="text symbol-3__sd-441 theme-35b9fc8a" href="https://note.com/studio_design/" target="_blank">note</a>
          <a className="text symbol-3__sd-442 theme-35b9fc8a" href="https://www.facebook.com/studiodesignapp/" target="_blank">Facebook</a>
        </div>
      </div>
      <div className="box symbol-3__sd-443">
        <div className="box symbol-3__sd-444">
          <p className="text symbol-3__sd-445">
            © Studio Inc. All Rights Reserved.
            <br />
          </p>
          <div className="box symbol-3__sd-446">
            <a className="text symbol-3__sd-447" href="/ja">日本語</a>
            <div className="box symbol-3__sd-448" />
            <a className="text symbol-3__sd-449" href="https://studio.design/">English</a>
          </div>
          <div className="box symbol-3__sd-450">
            <a className="text symbol-3__sd-451" href="https://studio.design/">English</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
