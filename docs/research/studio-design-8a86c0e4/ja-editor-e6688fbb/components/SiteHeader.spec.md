# SiteHeader Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `#header` (`header.box.symbol-1`) · DOM order 1 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/SiteHeader.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/site-header-1440.png`, `site-header-768.png`, `site-header-390.png`, `site-header-1440-open-{1..5}.png`
- **Interaction model:** click-driven (verified — see States & Behaviors)
- **Client component:** yes (5 disclosure toggles with open state + outside-click listener)
- **Root rect @1440:** x 0, y 32, w 1440, h 64 · **@768:** 0, 12, 768, 56 · **@390:** 0, 12, 390, 52
- **Sub-components:** `SdToggle` ×5 from `components/sites/studio-design-8a86c0e4/shared/toggle.tsx`. The mobile dialog `dialog.modal-ja_menu` is a SEPARATE section — this header only carries the button that opens it. **Non-DOM content:** none.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs symbol-1 --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/site-header.css` — class prefix **`symbol-1`** only (every node is `symbol-1__sd-N`, N = 1…372). Keep the origin class names verbatim.

## DOM Structure
```
header#header.box.symbol-1                       fixed, top 32
  div.box.symbol-1__sd-1                         the visible pill
    a.box.symbol-1__sd-2 href="/ja"
      img.img.symbol-1__sd-3  width 80 height 17 alt="Studio"
    nav.box.symbol-1__sd-4
      div.box.symbol-1__sd-5                     nav list, display:none ≤1280
        sd-toggle.toggle.symbol-1__sd-6   close-outside      ×5 (sd-6 / 94 / 193 / 216 / 316)
          button.box.symbol-1__sd-7  data-toggle-trigger aria-expanded type=button
            p.text.symbol-1__sd-8                label
            div.box.symbol-1__sd-9               icon stack (relative)
              span.icon.symbol-1__sd-10.fa-solid.fa-plus   aria-label="トグルを開く" role="img"
              span.icon.symbol-1__sd-11.fa-solid.fa-minus  aria-hidden (absolute, z 1)
          div.box.symbol-1__sd-12  data-toggle-content aria-hidden="true" inert   panel clipper
            div.box.symbol-1__sd-13              white card, margin-top 32
              div.box.symbol-1__sd-14            column (heading p + link a ×N)
              div.box.symbol-1__sd-44            divider wrapper > div.symbol-1__sd-45 (1px bar)
              … columns/dividers alternate
        div.box.symbol-1__sd-355 > a.symbol-1__sd-356 href="/ja/pricing" > p.symbol-1__sd-357
        a.box.symbol-1__sd-358 href="/ja/contact/sales"
          div.symbol-1__sd-359 > p.symbol-1__sd-360
          div.symbol-1__sd-361 (overflow clip, bg #e2e2e2ff, justify-content flex-end)
            div.symbol-1__sd-362 / 363 / 364     3× 1px underline segments
      a.box.symbol-1__sd-365 href="https://app.studio.design/ja/signup" target="_blank"
        div.symbol-1__sd-366 > p.symbol-1__sd-367 + div.symbol-1__sd-368 (absolute, bottom -3) > div.symbol-1__sd-369
      button.box.symbol-1__sd-370  aria-label="メニューを開く" data-modal="sd-modal-b5c877c2c8794404"
        div.symbol-1__sd-371 / div.symbol-1__sd-372   2× 1px bars
```
Panel column/divider ids: p1 `14,44,46,69,71` · p2 `102,119,121,123,150,152,169,171` · p3 `201` · p4 `224,250,252,269,271,296,298,314` · p5 `324`.

## Computed Styles (from getComputedStyle @1440, exact)
### `#header` (S1 in `site-header.1440.json`)
- position: fixed · top: 32px · zIndex: 5 · display: flex · flexDirection: column · alignItems: center
- width: 1440px · height: 64px · background: transparent
- transitionProperty: all · transitionDuration: 0.3s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1)
### `.symbol-1__sd-1` (pill, S2)
- width: 1300px · maxWidth: calc(100% - 48px) · height: 64px · margin: 0px 24px
- padding: 12px 12px 12px 24px · borderRadius: 12px · columnGap: 12px
- justifyContent: space-between · alignItems: center · flexWrap: wrap
- backgroundColor: rgba(255, 255, 255, 0.8) · boxShadow: rgba(14, 31, 53, 0.08) 0px 1px 4px 0px · backdropFilter: blur(2px)
### `.symbol-1__sd-3` (logo img) — rect [94,24,80,17] page coords
- width: 80px · height: auto · aspectRatio: auto 80 / 17 · objectFit: fill
### `.symbol-1__sd-4` (nav) / `.symbol-1__sd-5` (list)
- sd-4: columnGap: 32px · alignItems: center · rect [459,44,899.19,40]
- sd-5: display: flex · columnGap: 20px · rect [459,52,721.43,24]
### `.symbol-1__sd-8` (trigger label; identical for sd-96 / 195 / 218 / 318 and for sd-357)
- fontFamily: Inter, "Noto Sans JP" · fontSize: 15.5px · fontWeight: 500 · lineHeight: 15.5px
- letterSpacing: -0.31px · color: rgb(34, 34, 34) · textAlign: left
### `.symbol-1__sd-10` / `.symbol-1__sd-11` (＋ / − icons, ×5 pairs)
- fontFamily: "Font Awesome 6 Free" · ::before fontWeight: 900 · fontSize: 10px · color: rgb(51, 51, 51)
- sd-10 ::before content: "\2b" · base opacity: 0 · sd-11 ::before content: "\f068" · position: absolute; left: 0px; top: 0px; zIndex: 1
- rendered rect [547.41,58.75,8.75,10]
### `.symbol-1__sd-360` (お問い合わせ) / `.symbol-1__sd-361-364`
- sd-360: fontSize: 12px · fontWeight: 400 · lineHeight: 14.4px · color: rgb(34, 34, 34) · fontFeatureSettings: "palt"
- sd-361: background: #e2e2e2ff · height: 1px · width: 100% · overflow: clip · justifyContent: flex-end
- sd-362 background: #222222ff · sd-363 background: transparent · sd-364 background: #222222ff (each height 1px, width 100%)
### `.symbol-1__sd-365` (CTA) rect [1212.24,44,145.76,40]
- backgroundColor: rgb(34, 34, 34) · borderRadius: 8px · padding: 14px 16px · columnGap: 20px
- sd-367: fontSize: 12px · fontWeight: 500 · letterSpacing: -0.24px · color: rgb(250, 250, 250)
- sd-368: position: absolute · bottom: -3px · left: 0px · height: 1px · width: 100% · opacity: 0.9 · zIndex: 1
- sd-369: background: #222222ff · height: 100% · width: 0px
### Dropdown card `.symbol-1__sd-13` (and 101 / 200 / 223 / 323)
- background: #ffffffff · border: 1px solid var(--s-color-39850792) = #eaeaeaff · borderRadius: 12px
- backdropFilter: blur(10px) · margin: 32px 0px 0px · flexDirection: row · gap: 0px 28px · alignItems: stretch
- padding: 20px 22px 38px (cards 13 / 101 / 223) · padding: 20px 22px 30px (cards 200 / 323)
### Panel link `.symbol-1__sd-16` (×30 identical, style S-link)
- borderRadius: 6px · padding: 10px · gap: 6px 8px · width: 100% · flexDirection: row
- title p (sd-18): fontSize: 15px · fontWeight: 400 · lineHeight: 1.2 · letterSpacing: -0.02em · color: #222222
- sub p (sd-19): fontSize: 12px · fontWeight: 300 · lineHeight: 1.20 · color: #858585ff
- arrow chip (sd-20): 16×16 · borderRadius: 5px · border: 1px solid #e6e6e6ff · background: #ffffffff · overflow: clip
- arrow glyphs (sd-21 / sd-22): Material Symbols Outlined ligature `arrow_forward` · fontSize: 9px · color: #333333 · 16×16
### Column heading `.symbol-1__sd-15` (and 47 / 72 / 103 / 124 / 153 / 172 / 225 / 253 / 272 / 299)
- fontSize: 13px · fontWeight: 300 · lineHeight: 1.2 · color: #222222 · padding: 12px · fontFeatureSettings: 'palt' 1
### Divider bar `.symbol-1__sd-45` (and 70 / 120 / 122 / 151 / 170 / 251 / 270 / 297 / 315)
- background: #22222214 · width: 1px · height: 100%

## States & Behaviors
### Dropdown open/close (5×)
- **Trigger:** `click` on `button[data-toggle-trigger]`. Hover does NOT open.
- **State A (closed):** `sd-toggle` has no `open`; `aria-expanded="false"`; content `aria-hidden="true" inert`; content height: 0px (rule `.symbol-1__sd-6:not([open]) .symbol-1__sd-12 { flex:none; height:0px }`); `.sd-10` opacity: 1; `.sd-11` opacity: 0.
- **State B (open):** `sd-toggle[open]`; `aria-expanded="true"`; `aria-hidden`/`inert` removed; content height: auto; `.sd-10` opacity: 0; `.sd-11` opacity: 1.
- **Closing phase:** `sd-toggle` carries `open` AND `data-toggle-closing` for 300ms, then both are removed.
- **Transition:** all / 0.3s / cubic-bezier(0.4, 0.4, 0, 1) / 0s.
- **Only one open at a time:** opening #2 while #1 is open closes #1.
- **Close on outside click:** yes (`close-outside`). **Escape:** does NOT close.
- **Evidence:** hover 600ms → `diff('base','h1')` changedNodes 1 = `{rotate: none → 180deg}` only, panel height stayed 0px. Click → height 0 → 375.586px. Mid-close at 60ms height 271.008px. `__cloneSnap.animations('#header')` = `{count:0}`.
- **Open geometry @1440 (panel rect / card rect):** 1 プロダクト [136.41,75.5,868.8,375.59] / [136.41,107.5,868.8,343.59] · 2 活用方法 [120.81,75.5,1008,321.59] · 3 導入事例 [586.02,75.5,285.59,198.8] · 4 リソース [256.97,75.5,1110.7,303.79] · 5 サポート [776.22,75.5,319.2,313.59]. Off-centre widths come from `width: calc(720% + 120px); margin-right:-120px` (p1), `1200%` (p2), `340%` (p3), `calc(1290% + 40px); margin-left:-40px` (p4), `380%` (p5) on the clipper, centred by `align-items:center` on `sd-toggle`.
- **Implementation approach:** do NOT use the shared `SdToggle` here — it renders `<div class="toggle">` instead of `<sd-toggle>`, adds an `aria-controls` the origin lacks, and closes on Escape, which the origin does not. Hand-roll the disclosure inside `SiteHeader` with a parent-level "only one open" coordinator, one 300 ms closing timer PER panel (a panel already closing keeps its own transition when another opens), and a re-open mid-close that cancels that panel's closing flag.
### Scroll
- Computed style at scrollY 0 and scrollY 800 identical (top 32px, position fixed, zIndex 5, rect [0,32,1440,64], pill background rgba(255,255,255,0.8), boxShadow rgba(14,31,53,0.08) 0px 1px 4px 0px, backdropFilter blur(2px)). No scroll state.
### Hover / focus states
- **`.symbol-1__sd-7|95|194|217|317`:** `.sd-10` rotate: none → 180deg, 0.3s cubic-bezier(0.4,0.4,0,1).
- **`.symbol-1__sd-365`:** `.sd-369` width: 0px → 113.758px (`:hover .symbol-1__sd-369 { width:100% }`).
- **`.symbol-1__sd-358`:** `.sd-363` and `.sd-364` width: 70.4766px → 0px, so `.sd-362` slides x 965 → 1106.
- **`.symbol-1__sd-16` + 29 siblings:** background: transparent → `var(--s-color-56baa902)` = #f7f7f7; trailing arrow `.sd-22` margin: 0px → 0px -16px 0px 0px.
- **`.symbol-1__sd-173|178|183|188`:** background → `var(--s-color-06b63738)` = rgb(255,255,255).
- **`.symbol-1__sd-2`, `.symbol-1__sd-356`, `.symbol-1__sd-370`:** no `:hover` rule, no measured change.
### Mobile menu handoff
- `button.symbol-1__sd-370[aria-label="メニューを開く"][data-modal="sd-modal-b5c877c2c8794404"]` `onclick="showModal(&quot;sd-modal-b5c877c2c8794404&quot;,this)"` → opens `dialog.modal-ja_menu`, owned by another component.

## Per-State Content
Each of the 5 panels renders one fixed content tree. All 45 links are listed verbatim below; ids are in `extract/site-header.states.json` → `openPanels`, screenshots `site-header-1440-open-{1..5}.png`.

## Assets
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-80x17_b5c1ab9c-6742-40f1-8fad-48d23bafba5b.svg` — wordmark, rendered 80×17 @1440/768 and 72×15.3 @390, objectFit: fill.
- Icons: 66 `arrow_forward` Material Symbols Outlined ligature spans — use `MaterialSymbol` from `components/sites/studio-design-8a86c0e4/shared/icons.tsx`, rendered 16×16 at fontSize 9px.
- Icons: 10 Font Awesome spans (`fa-solid fa-plus` / `fa-solid fa-minus`), glyphs supplied by `::before` content `"\2b"` / `"\f068"`.
- Font Awesome: RESOLVED — `fa-solid-900.woff2` (and `fa-brands-400.woff2`, `MaterialIcons-Regular.woff2`) are self-hosted at `public/sites/studio-design-8a86c0e4/shared/fonts/` and declared in `app/studio-base.css`. MISSING: none.
- Layered composition: `.symbol-1__sd-11` is absolutely positioned on top of `.symbol-1__sd-10` inside the 8.75×10 stack `.symbol-1__sd-9`; opacity cross-fades between them.

## Text Content (verbatim)
Nav triggers: `プロダクト` (sd-8) · `活用方法` (sd-96) · `導入事例` (sd-195) · `リソース` (sd-218) · `サポート` (sd-318). Trigger icon aria-label: `トグルを開く`. Logo alt: `Studio`, href `/ja`. Hamburger aria-label: `メニューを開く`.
Panel 1 プロダクト — headings `構築` / `運用` / `より自在に`; links: `デザインエディタ` + `コードを書かずにデザイン自体を自在に` → `/ja/editor` (`data-current`) · `CMS` + `柔軟なコンテンツ管理システム` → `/ja/cms` · `フォーム` + `フォーム設置もノーコードで完結` → `/ja/form` · `SEO` + `検索エンジン向けの設定項目も充実` → `/ja/seo` · `サイト運用` + `安心のバックアップや権限管理` → `/ja/hosting` · `セキュリティ` + `サイトの安全を守る仕組み` → `/ja/lp/security` · `ワークスペース` + `複数プロジェクトを一括管理` → `/ja/workspace` · `Figma to Studio` + `デザインを一瞬でWebサイトに` → `/ja/figma-to-studio` · `Lottie for Studio` + `より豊かなアニメーション表現` → `/ja/lottie` · `アクセシビリティ` + `Webサイトをすべての人に` → `/ja/accessibility`.
Panel 2 活用方法 — headings `サイト種別から探す` / `業種から探す` / `課題から探す` / `企業タイプから探す`; links (title only, no sub): `コーポレートサイト` → `/ja/solutions/site-types/corporate` · `採用サイト` → `/ja/solutions/site-types/recruit` · `サービスサイト` → `/ja/solutions/site-types/service` · `宿泊・レジャー` → `/ja/solutions/industries/leisure` · `エンタメ` → `/ja/solutions/industries/entertainment` · `自治体` → `/ja/solutions/industries/local-government` · `飲食店` → `/ja/lp/solution/restaurant-homepage` · `小売・EC` → `/ja/lp/solution/ec-homepage` · `マーケターでのLP運用` → `/ja/solutions/usecases/landingpage` · `WordPressからの移行` → `/ja/solutions/usecases/wordpress-migration` · `サイトの導線の変更` → `/ja/solutions/usecases/site-improvement` · `エンタープライズ` → `/ja/lp/enterprise` · `制作会社・クリエイター` → `/ja/creators` · `広告代理店・コンサル` → `/ja/lp/solution/marketing-agency` · `スタートアップ` → `/ja/lp/startup`.
Panel 3 導入事例 — `事例インタビュー` + `お客様からの声をご紹介` → `/ja/customer-story` · `導入企業一覧` + `様々な規模・業種の企業が採用` → `/ja/customer`.
Panel 4 リソース — headings `つくる・依頼する` / `学ぶ` / `つながる` / `読む`; `Studio Store` + `テンプレートから始める` → `https://studio.design/ja/store` (target=_blank) · `Studio Experts` + `制作をプロに相談する` → `https://experts.studio.design/` (_blank) · `Studio Showcase` + `制作事例からヒントを探す` → `https://showcase.studio.design/ja` (_blank) · `Studio Academy` + `公式動画で使い方を学ぶ` → `https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ` (_blank) · `お役立ち資料` + `導入・運用に役立つ資料` → `/ja/resources` · `Studio Community` + `ユーザー同士で知見を共有する` → `https://community-ja.studio.design/home` (_blank) · `全国ワークショップ` + `基本操作を実践的に学ぶ` → `/ja/lp/ambassador` · `セミナー` + `開催中のイベントを探す` → `https://lu.ma/studiodesign?k=c` (_blank) · `最新情報` + `Studioのアップデートやお知らせ` → `/ja/whats-new` · `Studio Blog` + `制作・運用に役立つ記事を読む` → `https://studio.design/ja/blog`.
Panel 5 サポート — `相談窓口` + `目的に合ったサポートを探す` → `https://studio.design/ja/support` · `よくある質問` + `導入にあたってよくある質問を探す` → `https://studio.design/ja/faq` · `ヘルプセンター` + `操作や機能に関するマニュアルを探す` → `https://help.studio.design/ja/` (_blank) · `システムステータス` + `不具合・障害情報を確認する` → `https://status.studio.design/` (_blank).
Right rail: `料金プラン` → `/ja/pricing` · `お問い合わせ` → `/ja/contact/sales` · `ログイン ／ 新規登録` → `https://app.studio.design/ja/signup` (target=_blank).
Every column heading `<p>` and `料金プラン` end with a literal `<br>` inside the `<p>` — keep it.

## Responsive Behavior
- **Desktop (1440):** pill 1300×64 at margin 0 24px, radius 12px, padding 12px 12px 12px 24px; logo 80px; nav list visible (5 toggles + 料金プラン + お問い合わせ, columnGap 20px); CTA visible 145.76×40; hamburger display: none.
- **Tablet (768):** header top 12px, height 56px; pill 744×56 at [12,12], margin 0px 12px, padding 8px 8px 8px 16px, radius 12px, maxWidth calc(100% - 24px). Nav list display: none (`@media (max-width: 1280px) .symbol-1__sd-5 { display:none }`). CTA display: none (`@media (max-width: 768px) .symbol-1__sd-365 { display:none }`). Hamburger display: flex, 40×40 at [708,20], radius 8px, background rgba(255,255,255,0.9), border 1px solid rgb(85,85,85), padding 8px, rowGap 5px; two 22×1 bars #222222 at y 36.5 and 42.5. Logo 80×17 at [28,31.5].
- **Mobile (390):** header top 12px, height 52px; pill 366×52 at [12,12], radius 8px (`@media (max-width: 480px) .symbol-1__sd-1 { border-radius:8px }`); logo 72×15.3 at [28,30.35] (`@media (max-width: 480px) .symbol-1__sd-3 { width:72px }`); hamburger 36×36 at [334,20], radius 6px (`@media (max-width: 480px) .symbol-1__sd-370 { height:36px; width:36px; border-radius:6px }`); two 18×1 bars at y 34.5 and 40.5.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`, `(max-width: 360px)` — the only width media queries in `css/main.css`; full rule text in `extract/site-header.states.json` → `breakpointRules`.
- `#header { top }` = 32px desktop, 24px `(max-width:1280px)`, 12px `(max-width:768px)`; the slice DOES carry it as `.sd-root .symbol-1 { top: … }`.
- `[data-boolean1] .symbol-1__sd-1 { background:#1a1a1acc }` and three siblings ship a dark header variant. No ancestor on this page has `data-boolean1`, so the light values apply; keep the rules in the slice and do not set the attribute.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/site-header.1440.json` (387 nodes, 124 style buckets)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/site-header.768.json` (387 nodes)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/site-header.390.json` (387 nodes)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/site-header.states.json` (159 pseudo-class rules, 231 text nodes, 5 open-panel measurements, hover diffs, scroll comparison)

## QA Exclusions
none — the header contains no video, canvas, counter or autoplaying element. Diff the full header band (0,0,1440,96 @1440 · 0,0,390,64 @390) at the default 1.5 percent.
