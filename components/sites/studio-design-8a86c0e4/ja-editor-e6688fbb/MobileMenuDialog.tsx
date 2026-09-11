"use client";

// Port of studio.design/ja/editor `dialog.modal-ja_menu#sd-modal-b5c877c2c8794404`
// (direct child of `<body>` on the origin, DOM order 1b of 13) — the ≤1280px hamburger menu.
// Structure, class names, hrefs and Japanese copy are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `modal-ja_menu`).
// Styling comes from the sliced origin CSS plus the modal base layer in `app/studio-base.css`
// (scoped under `.sd-root`, which is why this dialog must render inside the `.sd-root` subtree —
// the native top layer moves the paint order, not the DOM ancestry). Do not restyle here.

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { MaterialSymbol } from "@/components/sites/studio-design-8a86c0e4/shared/icons";
import "./mobile-menu-dialog.css";

/** `.sd-root dialog[data-modal-transition-base].modal-closing` fades over 400ms; the origin
 * calls `close()` at +443ms (Escape) / +491ms (button). One timer, the measured midpoint. */
const CLOSE_FADE_MS = 440;
/** The origin holds `open` + `data-toggle-closing` on a collapsing panel for 806ms — its 800ms
 * timer, NOT the 300ms one `SiteHeader` (and the shared `SdToggle`) uses. */
const PANEL_CLOSE_MS = 800;

const sd = (id: number) => `modal-ja_menu__sd-${id}`;

type PanelId = 8 | 75 | 123 | 141 | 229;

function ProductPanel() {
  return (
    <div className="box modal-ja_menu__sd-15">
      <div className="box modal-ja_menu__sd-16">
        <p className="text modal-ja_menu__sd-17 theme-feb2fadc">構築</p>
        <div className="box modal-ja_menu__sd-18">
          <a className="box modal-ja_menu__sd-19" href="/ja/editor" data-current="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img modal-ja_menu__sd-20" width={20} height={20} alt="" src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-20x20_2dd3ba64-f3f1-44c3-8e22-764ab4a4e0b5.svg" />
            <div className="box modal-ja_menu__sd-21">
              <p className="text modal-ja_menu__sd-22 theme-87bf3e6d">デザインエディタ</p>
              <p className="text modal-ja_menu__sd-23 theme-e3b73cd0">コードを書かずにデザイン自体を自在に</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-24" href="/ja/cms">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img modal-ja_menu__sd-25" width={20} height={20} alt="" src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-20x20_80a11e2e-5e59-4582-9d63-ba1b1c165863.svg" />
            <div className="box modal-ja_menu__sd-26">
              <p className="text modal-ja_menu__sd-27 theme-87bf3e6d">CMS</p>
              <p className="text modal-ja_menu__sd-28 theme-e3b73cd0">柔軟なコンテンツ管理システム</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-29" href="/ja/form">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img modal-ja_menu__sd-30" width={20} height={20} alt="" src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-20x20_aadbed33-84be-4643-b288-e59e96651c83.svg" />
            <div className="box modal-ja_menu__sd-31">
              <p className="text modal-ja_menu__sd-32 theme-87bf3e6d">フォーム</p>
              <p className="text modal-ja_menu__sd-33 theme-e3b73cd0">フォーム設置もノーコードで完結</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-34" href="/ja/seo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img modal-ja_menu__sd-35" width={20} height={20} alt="" src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-20x20_811fb59b-498b-4bea-9963-c12d075243e6.svg" />
            <div className="box modal-ja_menu__sd-36">
              <p className="text modal-ja_menu__sd-37 theme-87bf3e6d">SEO</p>
              <p className="text modal-ja_menu__sd-38 theme-e3b73cd0">検索エンジン向けの設定項目も充実</p>
            </div>
          </a>
        </div>
      </div>
      <div className="box modal-ja_menu__sd-39">
        <p className="text modal-ja_menu__sd-40 theme-feb2fadc">運用</p>
        <div className="box modal-ja_menu__sd-41">
          <a className="box modal-ja_menu__sd-42" href="/ja/hosting">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img modal-ja_menu__sd-43" width={20} height={20} alt="" src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-20x20_362adb5c-e83c-4b2d-8e60-1dade276f6ef.svg" />
            <div className="box modal-ja_menu__sd-44">
              <p className="text modal-ja_menu__sd-45 theme-87bf3e6d">サイト運用</p>
              <p className="text modal-ja_menu__sd-46 theme-b6b0338f">安心のバックアップや権限管理</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-47" href="/ja/lp/security">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img modal-ja_menu__sd-48" width={20} height={20} alt="" src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-20x20_c4c5842e-2c38-41c2-ad5e-969f36c47c56.svg" />
            <div className="box modal-ja_menu__sd-49">
              <p className="text modal-ja_menu__sd-50 theme-87bf3e6d">セキュリティ</p>
              <p className="text modal-ja_menu__sd-51 theme-b6b0338f">サイトの安全を守る取組み</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-52" href="/ja/workspace">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img modal-ja_menu__sd-53" width={72} height={72} alt="" src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-72x72_webp_fdacd97f-6a14-4875-9c83-3cb3300488d5.webp" loading="lazy" />
            <div className="box modal-ja_menu__sd-54">
              <p className="text modal-ja_menu__sd-55 theme-87bf3e6d">ワークスペース</p>
              <p className="text modal-ja_menu__sd-56 theme-b6b0338f">複数プロジェクトを一括管理</p>
            </div>
          </a>
        </div>
      </div>
      <div className="box modal-ja_menu__sd-57">
        <p className="text modal-ja_menu__sd-58 theme-feb2fadc">より自在に</p>
        <div className="box modal-ja_menu__sd-59">
          <a className="box modal-ja_menu__sd-60" href="/ja/figma-to-studio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img modal-ja_menu__sd-61" width={20} height={20} alt="" src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-20x20_9d0092c5-a24f-4750-b551-87f8244ce764.svg" />
            <div className="box modal-ja_menu__sd-62">
              <p className="text modal-ja_menu__sd-63 theme-87bf3e6d">Figma to Studio</p>
              <p className="text modal-ja_menu__sd-64 theme-b6b0338f">デザインを一瞬でWebサイトに</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-65" href="/ja/lottie">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img modal-ja_menu__sd-66" width={20} height={20} alt="" src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-20x20_8c82bee6-201f-4890-a4b5-49686d9c25fa.svg" />
            <div className="box modal-ja_menu__sd-67">
              <p className="text modal-ja_menu__sd-68 theme-87bf3e6d">Lottie</p>
              <p className="text modal-ja_menu__sd-69 theme-b6b0338f">より豊かなアニメーション表現</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-70" href="/ja/accessibility">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img modal-ja_menu__sd-71" width={20} height={20} alt="" src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-20x20_30d24730-fc13-416d-882b-23639177b88d.svg" />
            <div className="box modal-ja_menu__sd-72">
              <p className="text modal-ja_menu__sd-73 theme-87bf3e6d">アクセシビリティ</p>
              <p className="text modal-ja_menu__sd-74 theme-b6b0338f">Webサイトをすべての人に</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function SolutionsPanel() {
  return (
    <div className="box modal-ja_menu__sd-82">
      <div className="box modal-ja_menu__sd-83">
        <div className="box modal-ja_menu__sd-84">
          <div className="box modal-ja_menu__sd-85">
            <p className="text modal-ja_menu__sd-86">サイト種別から探す</p>
            <a className="box modal-ja_menu__sd-87" href="/ja/solutions/site-types/corporate">
              <p className="text modal-ja_menu__sd-88 theme-87bf3e6d">コーポレートサイト</p>
            </a>
            <a className="box modal-ja_menu__sd-89" href="/ja/solutions/site-types/recruit">
              <p className="text modal-ja_menu__sd-90 theme-87bf3e6d">採用サイト</p>
            </a>
            <a className="box modal-ja_menu__sd-91" href="/ja/solutions/site-types/service">
              <p className="text modal-ja_menu__sd-92 theme-87bf3e6d">サービスサイト</p>
            </a>
          </div>
          <div className="box modal-ja_menu__sd-93">
            <p className="text modal-ja_menu__sd-94">業種から探す</p>
            <a className="box modal-ja_menu__sd-95" href="/ja/solutions/industries/leisure">
              <p className="text modal-ja_menu__sd-96 theme-87bf3e6d">
                宿泊・レジャー
                <br />
              </p>
            </a>
            <a className="box modal-ja_menu__sd-97" href="/ja/solutions/industries/entertainment">
              <p className="text modal-ja_menu__sd-98 theme-87bf3e6d">エンタメ</p>
            </a>
            <a className="box modal-ja_menu__sd-99" href="/ja/solutions/industries/local-government">
              <p className="text modal-ja_menu__sd-100 theme-87bf3e6d">自治体</p>
            </a>
            <a className="box modal-ja_menu__sd-101" href="/ja/lp/solution/restaurant-homepage">
              <p className="text modal-ja_menu__sd-102 theme-87bf3e6d">飲食店</p>
            </a>
            <a className="box modal-ja_menu__sd-103" href="/ja/lp/solution/ec-homepage">
              <p className="text modal-ja_menu__sd-104 theme-87bf3e6d">小売・EC</p>
            </a>
          </div>
          <div className="box modal-ja_menu__sd-105">
            <p className="text modal-ja_menu__sd-106">課題から探す</p>
            <a className="box modal-ja_menu__sd-107" href="/ja/solutions/usecases/landingpage">
              <p className="text modal-ja_menu__sd-108 theme-87bf3e6d">マーケターでのLP運用</p>
            </a>
            <a className="box modal-ja_menu__sd-109" href="/ja/solutions/usecases/wordpress-migration">
              <p className="text modal-ja_menu__sd-110 theme-87bf3e6d">WordPressからの移行</p>
            </a>
            <a className="box modal-ja_menu__sd-111" href="/ja/solutions/usecases/site-improvement">
              <p className="text modal-ja_menu__sd-112 theme-87bf3e6d">サイト導線の変更</p>
            </a>
          </div>
          <div className="box modal-ja_menu__sd-113">
            <p className="text modal-ja_menu__sd-114">企業タイプから探す</p>
            <a className="box modal-ja_menu__sd-115" href="/ja/lp/enterprise">
              <p className="text modal-ja_menu__sd-116 theme-87bf3e6d">大企業・エンタープライズ</p>
            </a>
            <a className="box modal-ja_menu__sd-117" href="/ja/creators">
              <p className="text modal-ja_menu__sd-118 theme-87bf3e6d">制作会社・クリエイター</p>
            </a>
            <a className="box modal-ja_menu__sd-119" href="/ja/lp/solution/marketing-agency">
              <p className="text modal-ja_menu__sd-120 theme-87bf3e6d">広告代理店・コンサル</p>
            </a>
            <a className="box modal-ja_menu__sd-121" href="/ja/lp/startup">
              <p className="text modal-ja_menu__sd-122 theme-87bf3e6d">スタートアップ</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomersPanel() {
  return (
    <div className="box modal-ja_menu__sd-130">
      <div className="box modal-ja_menu__sd-131">
        <a className="box modal-ja_menu__sd-132" href="/ja/customer-story">
          <div className="box modal-ja_menu__sd-133">
            <p className="text modal-ja_menu__sd-134 theme-87bf3e6d">事例インタビュー</p>
            <p className="text modal-ja_menu__sd-135 theme-b6b0338f">お客様からの声をご紹介</p>
          </div>
        </a>
        <a className="box modal-ja_menu__sd-136" href="/ja/customer">
          <div className="box modal-ja_menu__sd-137">
            <div className="box modal-ja_menu__sd-138">
              <p className="text modal-ja_menu__sd-139 theme-87bf3e6d">導入企業</p>
              <p className="text modal-ja_menu__sd-140 theme-e3b73cd0">様々な規模・業種の企業が採用</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

function ResourcesPanel() {
  return (
    <div className="box modal-ja_menu__sd-148">
      <div className="box modal-ja_menu__sd-149">
        <p className="text modal-ja_menu__sd-150 theme-feb2fadc">つくる・依頼する</p>
        <div className="box modal-ja_menu__sd-151">
          <a className="box modal-ja_menu__sd-152" href="https://studio.design/ja/store" target="_blank">
            <div className="box modal-ja_menu__sd-153">
              <div className="box modal-ja_menu__sd-154">
                <p className="text modal-ja_menu__sd-155 theme-87bf3e6d">Studio Store</p>
                <div className="box modal-ja_menu__sd-156">
                  <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-157" />
                  <span className="icon modal-ja_menu__sd-158 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </div>
              <p className="text modal-ja_menu__sd-159 theme-e3b73cd0">テンプレートから始める</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-160" href="https://studio.design/ja/experts/" target="_blank">
            <div className="box modal-ja_menu__sd-161">
              <div className="box modal-ja_menu__sd-162">
                <p className="text modal-ja_menu__sd-163 theme-87bf3e6d">Studio Experts</p>
                <div className="box modal-ja_menu__sd-164">
                  <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-165" />
                  <span className="icon modal-ja_menu__sd-166 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </div>
              <p className="text modal-ja_menu__sd-167 theme-e3b73cd0">制作をプロに相談する</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-168" href="https://showcase.studio.design/ja" target="_blank">
            <div className="box modal-ja_menu__sd-169">
              <div className="box modal-ja_menu__sd-170">
                <p className="text modal-ja_menu__sd-171 theme-87bf3e6d">Studio Showcase</p>
                <div className="box modal-ja_menu__sd-172">
                  <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-173" />
                  <span className="icon modal-ja_menu__sd-174 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </div>
              <p className="text modal-ja_menu__sd-175 theme-e3b73cd0">制作事例からヒントを探す</p>
            </div>
          </a>
        </div>
      </div>
      <div className="box modal-ja_menu__sd-176">
        <p className="text modal-ja_menu__sd-177 theme-feb2fadc">学ぶ</p>
        <div className="box modal-ja_menu__sd-178">
          <a className="box modal-ja_menu__sd-179" href="https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ" target="_blank">
            <div className="box modal-ja_menu__sd-180">
              <div className="box modal-ja_menu__sd-181">
                <p className="text modal-ja_menu__sd-182 theme-87bf3e6d">Studio Academy</p>
                <div className="box modal-ja_menu__sd-183">
                  <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-184" />
                  <span className="icon modal-ja_menu__sd-185 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </div>
              <p className="text modal-ja_menu__sd-186 theme-e3b73cd0">公式動画で使い方を学ぶ</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-187" href="/ja/resources" target="_blank">
            <div className="box modal-ja_menu__sd-188">
              <p className="text modal-ja_menu__sd-189 theme-87bf3e6d">お役立ち資料</p>
              <p className="text modal-ja_menu__sd-190 theme-e3b73cd0">導入・運用に役立つ資料</p>
            </div>
          </a>
        </div>
      </div>
      <div className="box modal-ja_menu__sd-191">
        <p className="text modal-ja_menu__sd-192 theme-feb2fadc">つながる</p>
        <div className="box modal-ja_menu__sd-193">
          <a className="box modal-ja_menu__sd-194" href="https://community-ja.studio.design/feed" target="_blank">
            <div className="box modal-ja_menu__sd-195">
              <div className="box modal-ja_menu__sd-196">
                <p className="text modal-ja_menu__sd-197 theme-87bf3e6d">Studio Community</p>
                <div className="box modal-ja_menu__sd-198">
                  <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-199" />
                  <span className="icon modal-ja_menu__sd-200 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </div>
              <p className="text modal-ja_menu__sd-201 theme-e3b73cd0">ユーザー同士で知見を共有する</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-202" href="/ja/lp/ambassador">
            <div className="box modal-ja_menu__sd-203">
              <p className="text modal-ja_menu__sd-204 theme-87bf3e6d">全国ワークショップ</p>
              <p className="text modal-ja_menu__sd-205 theme-e3b73cd0">基本操作を実践的に学ぶ</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-206" href="https://luma.com/studiodesign?k=c" target="_blank">
            <div className="box modal-ja_menu__sd-207">
              <div className="box modal-ja_menu__sd-208">
                <p className="text modal-ja_menu__sd-209 theme-87bf3e6d">セミナー</p>
                <div className="box modal-ja_menu__sd-210">
                  <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-211" />
                  <span className="icon modal-ja_menu__sd-212 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </div>
              <p className="text modal-ja_menu__sd-213 theme-e3b73cd0">開催中のイベントを探す</p>
            </div>
          </a>
        </div>
      </div>
      <div className="box modal-ja_menu__sd-214">
        <p className="text modal-ja_menu__sd-215 theme-feb2fadc">読む</p>
        <div className="box modal-ja_menu__sd-216">
          <a className="box modal-ja_menu__sd-217" href="/ja/whats-new">
            <div className="box modal-ja_menu__sd-218">
              <p className="text modal-ja_menu__sd-219 theme-87bf3e6d">最新情報</p>
              <p className="text modal-ja_menu__sd-220 theme-e3b73cd0">Studioのアップデートやお知らせ</p>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-221" href="https://studio.design/ja/blog" target="_blank">
            <div className="box modal-ja_menu__sd-222">
              <div className="box modal-ja_menu__sd-223">
                <p className="text modal-ja_menu__sd-224 theme-87bf3e6d">Studio Blog</p>
                <div className="box modal-ja_menu__sd-225">
                  <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-226" />
                  <span className="icon modal-ja_menu__sd-227 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </div>
              <p className="text modal-ja_menu__sd-228 theme-e3b73cd0">制作・運用に役立つ記事を読む</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function SupportPanel() {
  return (
    <div className="box modal-ja_menu__sd-236">
      <div className="box modal-ja_menu__sd-237">
        <a className="box modal-ja_menu__sd-238" href="/ja/support">
          <div className="box modal-ja_menu__sd-239">
            <div className="box modal-ja_menu__sd-240">
              <p className="text modal-ja_menu__sd-241 theme-87bf3e6d">総合窓口</p>
              <p className="text modal-ja_menu__sd-242 theme-e3b73cd0">目的に沿ったサポートコンテンツを探す</p>
            </div>
          </div>
        </a>
        <a className="box modal-ja_menu__sd-243" href="/ja/faq">
          <div className="box modal-ja_menu__sd-244">
            <div className="box modal-ja_menu__sd-245">
              <p className="text modal-ja_menu__sd-246 theme-87bf3e6d">よくある質問</p>
              <p className="text modal-ja_menu__sd-247 theme-e3b73cd0">導入にあたってよくある質問を探す</p>
            </div>
          </div>
        </a>
        <a className="box modal-ja_menu__sd-248" href="https://help.studio.design/ja/" target="_blank">
          <div className="box modal-ja_menu__sd-249">
            <div className="box modal-ja_menu__sd-250">
              <p className="text modal-ja_menu__sd-251 theme-87bf3e6d">ヘルプセンター</p>
              <div className="box modal-ja_menu__sd-252">
                <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-253" />
                <span className="icon modal-ja_menu__sd-254 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
              </div>
            </div>
            <p className="text modal-ja_menu__sd-255 theme-b6b0338f">操作や機能に関するマニュアルを探す</p>
          </div>
        </a>
        <a className="box modal-ja_menu__sd-256" href="https://status.studio.design/" target="_blank">
          <div className="box modal-ja_menu__sd-257">
            <div className="box modal-ja_menu__sd-258">
              <p className="text modal-ja_menu__sd-259 theme-87bf3e6d">システムステータス</p>
              <div className="box modal-ja_menu__sd-260">
                <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-261" />
                <span className="icon modal-ja_menu__sd-262 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
              </div>
            </div>
            <p className="text modal-ja_menu__sd-263 theme-b6b0338f">不具合・障害情報を確認する</p>
          </div>
        </a>
      </div>
    </div>
  );
}

/** Panel trigger/content ids run `id` (sd-toggle), +1 trigger, +2 label, +3 ＋/− stack,
 * +4 bar, +5 bar, +6 content — identically for all five panels. */
const PANELS: readonly { id: PanelId; label: string; Content: () => ReactElement }[] = [
  { id: 8, label: "プロダクト", Content: ProductPanel },
  { id: 75, label: "活用方法", Content: SolutionsPanel },
  { id: 123, label: "導入事例", Content: CustomersPanel },
  { id: 141, label: "リソース", Content: ResourcesPanel },
  { id: 229, label: "サポート", Content: SupportPanel },
];

/**
 * One `<sd-toggle close-outside>` disclosure. Hand-rolled rather than the shared `SdToggle`,
 * which renders a `<div class="toggle">`, adds an `aria-controls` the origin lacks, closes on
 * Escape (here Escape must close the whole dialog) and defaults to a 300ms closing timer.
 */
function Accordion({
  id,
  label,
  isOpen,
  isClosing,
  onActivate,
  children,
}: {
  id: PanelId;
  label: string;
  isOpen: boolean;
  isClosing: boolean;
  onActivate: () => void;
  children: ReactNode;
}) {
  return (
    <sd-toggle
      className={`toggle ${sd(id)} appear`}
      close-outside=""
      {...(isOpen || isClosing ? { open: true } : {})}
      {...(isClosing ? { "data-toggle-closing": "" } : {})}
    >
      <button
        className={`box ${sd(id + 1)}`}
        data-toggle-trigger=""
        aria-expanded={isOpen}
        type="button"
        onClick={onActivate}
      >
        <span className={`text ${sd(id + 2)} appear theme-87bf3e6d`}>{label}</span>
        <div className={`box ${sd(id + 3)}`}>
          <div className={`box ${sd(id + 4)}`} />
          <div className={`box ${sd(id + 5)}`} />
        </div>
      </button>
      <div
        className={`box ${sd(id + 6)}`}
        data-toggle-content=""
        {...(isOpen || isClosing ? {} : { "aria-hidden": true, inert: true })}
      >
        {children}
      </div>
    </sd-toggle>
  );
}

export type MobileMenuDialogProps = {
  /** Driven by `SiteHeader`'s `button.symbol-1__sd-370[data-modal="sd-modal-b5c877c2c8794404"]`. */
  open: boolean;
  /** Requested by the close button, by Escape, and by a click on the backdrop chrome. */
  onClose: () => void;
};

export function MobileMenuDialog({ open, onClose }: MobileMenuDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  /** The 29 `.appear` targets, captured once — after the first open they no longer carry the class. */
  const appearTargets = useRef<Element[] | null>(null);
  const [openPanel, setOpenPanel] = useState<PanelId | null>(null);
  const [closingPanels, setClosingPanels] = useState<readonly PanelId[]>([]);
  const panelTimers = useRef(new Map<PanelId, number>());

  const collectAppearTargets = useCallback((root: HTMLDialogElement) => {
    appearTargets.current ??= Array.from(root.querySelectorAll(".appear"));
    return appearTargets.current;
  }, []);

  const cancelPanelClose = useCallback((id: PanelId) => {
    const timer = panelTimers.current.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      panelTimers.current.delete(id);
    }
    setClosingPanels((ids) => ids.filter((closing) => closing !== id));
  }, []);

  const beginPanelClose = useCallback((id: PanelId) => {
    const running = panelTimers.current.get(id);
    if (running !== undefined) window.clearTimeout(running);
    setClosingPanels((ids) => (ids.includes(id) ? ids : [...ids, id]));
    panelTimers.current.set(
      id,
      window.setTimeout(() => {
        panelTimers.current.delete(id);
        setClosingPanels((ids) => ids.filter((closing) => closing !== id));
      }, PANEL_CLOSE_MS),
    );
  }, []);

  /** `close-outside` on every `<sd-toggle>`: only one panel is open at a time. */
  const activatePanel = useCallback(
    (id: PanelId) => {
      if (openPanel === id) {
        setOpenPanel(null);
        beginPanelClose(id);
        return;
      }
      if (openPanel !== null) beginPanelClose(openPanel);
      cancelPanelClose(id);
      setOpenPanel(id);
    },
    [openPanel, beginPanelClose, cancelPanelClose],
  );

  // The origin dialog carries a bare `autofocus`, which is what makes `showModal()` focus the
  // dialog itself instead of the first focusable descendant. React drops the `autoFocus` prop on
  // anything that is not a form control, so the attribute is written directly.
  useEffect(() => {
    dialogRef.current?.setAttribute("autofocus", "");
  }, []);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (open) {
      if (!el.open) el.showModal();
      el.classList.remove("modal-closing");
      // The origin adds `modal-ready` on the frame after `showModal()`; until then
      // `dialog[open]…:not(.modal-ready) .modal-container *{transition:none}` pins the start state.
      const frame = requestAnimationFrame(() => el.classList.add("modal-ready"));
      // Reveal: drop `appear` as each target intersects. Batches are emergent — children of a
      // `translate:-160px` ancestor only intersect once the ancestor has slid in — so no timers.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.remove("appear");
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: "0px", threshold: 0 },
      );
      for (const target of collectAppearTargets(el)) observer.observe(target);
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
      };
    }

    if (!el.open) return;
    el.classList.remove("modal-ready");
    el.classList.add("modal-closing");
    const timer = window.setTimeout(() => {
      el.classList.remove("modal-closing");
      el.close();
      // Re-arm the reveal and reset the accordions so the next open replays from the start.
      for (const target of collectAppearTargets(el)) target.classList.add("appear");
      for (const running of panelTimers.current.values()) window.clearTimeout(running);
      panelTimers.current.clear();
      setOpenPanel(null);
      setClosingPanels([]);
    }, CLOSE_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [open, collectAppearTargets]);

  // A pointer down on the dialog chrome outside the open `<sd-toggle>` collapses it and leaves
  // the dialog open (`close-outside`). Measured on the origin; no extra attribute is needed
  // because the panel element is addressable by its own origin class.
  useEffect(() => {
    if (!open || openPanel === null) return;
    const onPointerDown = (event: PointerEvent) => {
      const panel = dialogRef.current?.querySelector(`.${sd(openPanel)}`);
      if (panel?.contains(event.target as Node)) return;
      setOpenPanel(null);
      beginPanelClose(openPanel);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, openPanel, beginPanelClose]);

  useEffect(() => {
    const timers = panelTimers.current;
    return () => {
      for (const timer of timers.values()) window.clearTimeout(timer);
      timers.clear();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="modal-ja_menu"
      data-modal-transition-base='{"opacity":0,"transform":"none"}'
      id="sd-modal-b5c877c2c8794404"
      // Escape must run the same 400ms `modal-closing` fade the close button does, so the
      // native cancel is suppressed and the close request is routed through `onClose`.
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="modal-backdrop modal-ja_menu__backdrop" />
      <div className="modal-container modal-ja_menu__container">
        <div className="box modal-ja_menu__sd-1 appear">
          <div className="box modal-ja_menu__sd-2">
            <a className="box modal-ja_menu__sd-3 appear" href="/ja">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img modal-ja_menu__sd-4"
                width={462}
                height={101}
                alt="Studio"
                src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-462x101_4fd187ae-1783-4644-ba51-6f318d811c8b.svg"
              />
            </a>
            <button
              className="box modal-ja_menu__sd-5 appear"
              aria-label="Menuを閉じる"
              data-action="modal-close"
              type="button"
              onClick={onClose}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img modal-ja_menu__sd-6 appear"
                width={22}
                height={22}
                alt=""
                src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-22x22_bc1616b1-e492-4349-b07a-821291ac7c22.svg"
              />
            </button>
          </div>
        </div>
        <div className="box modal-ja_menu__sd-7 appear">
          {PANELS.map(({ id, label, Content }) => (
            <Accordion
              key={id}
              id={id}
              label={label}
              isOpen={openPanel === id}
              isClosing={closingPanels.includes(id)}
              onActivate={() => activatePanel(id)}
            >
              <Content />
            </Accordion>
          ))}
          <a className="box modal-ja_menu__sd-264 appear" href="/ja/pricing">
            <div className="box modal-ja_menu__sd-265">
              <span className="text modal-ja_menu__sd-266 appear theme-87bf3e6d">料金プラン</span>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-267 appear" href="https://studio.inc/" target="_blank">
            <div className="box modal-ja_menu__sd-268">
              <span className="text modal-ja_menu__sd-269 appear">運営会社</span>
              <div className="box modal-ja_menu__sd-270">
                <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-271" />
                <span className="icon modal-ja_menu__sd-272 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
              </div>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-273 appear" href="https://studio.inc/career" target="_blank">
            <div className="box modal-ja_menu__sd-274">
              <span className="text modal-ja_menu__sd-275 appear">採用情報</span>
              <div className="box modal-ja_menu__sd-276">
                <MaterialSymbol name="arrow_forward" className="modal-ja_menu__sd-277" />
                <span className="icon modal-ja_menu__sd-278 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
              </div>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-279 appear" href="/ja/terms">
            <div className="box modal-ja_menu__sd-280">
              <span className="text modal-ja_menu__sd-281 appear">利用規約・プライバシーポリシー</span>
            </div>
          </a>
          <a className="box modal-ja_menu__sd-282 appear" href="/ja/guidelines">
            <div className="box modal-ja_menu__sd-283">
              <span className="text modal-ja_menu__sd-284 appear">ユーザーガイドライン</span>
            </div>
          </a>
          <div className="box modal-ja_menu__sd-285 appear">
            <div className="box modal-ja_menu__sd-286">
              <a className="text modal-ja_menu__sd-287 appear" href="https://x.com/StudioDesign" target="_blank">X（Twitter）</a>
              <a className="text modal-ja_menu__sd-288 appear" href="https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ" target="_blank">YouTube</a>
            </div>
            <div className="box modal-ja_menu__sd-289 appear">
              <a className="text modal-ja_menu__sd-290" href="https://studio.design/">English</a>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
