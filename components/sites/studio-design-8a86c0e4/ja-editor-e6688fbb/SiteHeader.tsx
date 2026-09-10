"use client";

// Port of studio.design/ja/editor `#header` (`header.box.symbol-1`, DOM order 1 of 13).
// Structure, class names and Japanese copy are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `symbol-1__sd-1`).
// Styling comes from the sliced origin CSS — do not restyle here.

import { useCallback, useEffect, useRef, useState } from "react";
import { MaterialSymbol } from "@/components/sites/studio-design-8a86c0e4/shared/icons";
import "./site-header.css";
import "./site-header.local.css";

/** Panel entry with a title + description line (`.symbol-1__sd-16` shape, 7 or 8 ids). */
type DetailLink = {
  kind: "detail";
  /** id of the `<a>`; the subtree consumes id…id+6 (internal) or id…id+7 (target=_blank). */
  id: number;
  href: string;
  title: string;
  sub: string;
  blank?: true;
  current?: true;
};

/** Panel entry with a bare title (`.symbol-1__sd-104` shape, 5 ids). */
type PlainLink = {
  kind: "plain";
  id: number;
  href: string;
  title: string;
  /** The origin ends a few of these `<p>`s with a literal `<br>`. */
  br?: true;
};

type PanelLink = DetailLink | PlainLink;

type PanelColumn = {
  kind: "column";
  /** id of the column `<div>`; the heading `<p>` (when present) is id+1. */
  id: number;
  heading?: string;
  links: PanelLink[];
};

/** `div.symbol-1__sd-44 > div.symbol-1__sd-45` — the 1px vertical rule between columns. */
type PanelDivider = { kind: "divider"; id: number };

type PanelBlock = PanelColumn | PanelDivider;

type Panel = {
  /** id of `sd-toggle`; trigger id+1, label id+2, icon stack id+3, ＋ id+4, − id+5, content id+6, card id+7. */
  id: number;
  label: string;
  blocks: PanelBlock[];
};

const PANELS: Panel[] = [
  {
    id: 6,
    label: "プロダクト",
    blocks: [
      {
        kind: "column",
        id: 14,
        heading: "構築",
        links: [
          {
            kind: "detail",
            id: 16,
            href: "/ja/editor",
            title: "デザインエディタ",
            sub: "コードを書かずにデザイン自体を自在に",
            current: true,
          },
          { kind: "detail", id: 23, href: "/ja/cms", title: "CMS", sub: "柔軟なコンテンツ管理システム" },
          { kind: "detail", id: 30, href: "/ja/form", title: "フォーム", sub: "フォーム設置もノーコードで完結" },
          { kind: "detail", id: 37, href: "/ja/seo", title: "SEO", sub: "検索エンジン向けの設定項目も充実" },
        ],
      },
      { kind: "divider", id: 44 },
      {
        kind: "column",
        id: 46,
        heading: "運用",
        links: [
          { kind: "detail", id: 48, href: "/ja/hosting", title: "サイト運用", sub: "安心のバックアップや権限管理" },
          { kind: "detail", id: 55, href: "/ja/lp/security", title: "セキュリティ", sub: "サイトの安全を守る仕組み" },
          { kind: "detail", id: 62, href: "/ja/workspace", title: "ワークスペース", sub: "複数プロジェクトを一括管理" },
        ],
      },
      { kind: "divider", id: 69 },
      {
        kind: "column",
        id: 71,
        heading: "より自在に",
        links: [
          {
            kind: "detail",
            id: 73,
            href: "/ja/figma-to-studio",
            title: "Figma to Studio",
            sub: "デザインを一瞬でWebサイトに",
          },
          { kind: "detail", id: 80, href: "/ja/lottie", title: "Lottie for Studio", sub: "より豊かなアニメーション表現" },
          { kind: "detail", id: 87, href: "/ja/accessibility", title: "アクセシビリティ", sub: "Webサイトをすべての人に" },
        ],
      },
    ],
  },
  {
    id: 94,
    label: "活用方法",
    blocks: [
      {
        kind: "column",
        id: 102,
        heading: "サイト種別から探す",
        links: [
          { kind: "plain", id: 104, href: "/ja/solutions/site-types/corporate", title: "コーポレートサイト" },
          { kind: "plain", id: 109, href: "/ja/solutions/site-types/recruit", title: "採用サイト" },
          { kind: "plain", id: 114, href: "/ja/solutions/site-types/service", title: "サービスサイト" },
        ],
      },
      { kind: "divider", id: 119 },
      { kind: "divider", id: 121 },
      {
        kind: "column",
        id: 123,
        heading: "業種から探す",
        links: [
          { kind: "plain", id: 125, href: "/ja/solutions/industries/leisure", title: "宿泊・レジャー" },
          { kind: "plain", id: 130, href: "/ja/solutions/industries/entertainment", title: "エンタメ" },
          { kind: "plain", id: 135, href: "/ja/solutions/industries/local-government", title: "自治体" },
          { kind: "plain", id: 140, href: "/ja/lp/solution/restaurant-homepage", title: "飲食店" },
          { kind: "plain", id: 145, href: "/ja/lp/solution/ec-homepage", title: "小売・EC" },
        ],
      },
      { kind: "divider", id: 150 },
      {
        kind: "column",
        id: 152,
        heading: "課題から探す",
        links: [
          { kind: "plain", id: 154, href: "/ja/solutions/usecases/landingpage", title: "マーケターでのLP運用" },
          { kind: "plain", id: 159, href: "/ja/solutions/usecases/wordpress-migration", title: "WordPressからの移行" },
          { kind: "plain", id: 164, href: "/ja/solutions/usecases/site-improvement", title: "サイトの導線の変更" },
        ],
      },
      { kind: "divider", id: 169 },
      {
        kind: "column",
        id: 171,
        heading: "企業タイプから探す",
        links: [
          { kind: "plain", id: 173, href: "/ja/lp/enterprise", title: "エンタープライズ" },
          { kind: "plain", id: 178, href: "/ja/creators", title: "制作会社・クリエイター" },
          { kind: "plain", id: 183, href: "/ja/lp/solution/marketing-agency", title: "広告代理店・コンサル", br: true },
          { kind: "plain", id: 188, href: "/ja/lp/startup", title: "スタートアップ", br: true },
        ],
      },
    ],
  },
  {
    id: 193,
    label: "導入事例",
    blocks: [
      {
        kind: "column",
        id: 201,
        links: [
          { kind: "detail", id: 202, href: "/ja/customer-story", title: "事例インタビュー", sub: "お客様からの声をご紹介" },
          { kind: "detail", id: 209, href: "/ja/customer", title: "導入企業一覧", sub: "様々な規模・業種の企業が採用" },
        ],
      },
    ],
  },
  {
    id: 216,
    label: "リソース",
    blocks: [
      {
        kind: "column",
        id: 224,
        heading: "つくる・依頼する",
        links: [
          {
            kind: "detail",
            id: 226,
            href: "https://studio.design/ja/store",
            title: "Studio Store",
            sub: "テンプレートから始める",
            blank: true,
          },
          {
            kind: "detail",
            id: 234,
            href: "https://experts.studio.design/",
            title: "Studio Experts",
            sub: "制作をプロに相談する",
            blank: true,
          },
          {
            kind: "detail",
            id: 242,
            href: "https://showcase.studio.design/ja",
            title: "Studio Showcase",
            sub: "制作事例からヒントを探す",
            blank: true,
          },
        ],
      },
      { kind: "divider", id: 250 },
      {
        kind: "column",
        id: 252,
        heading: "学ぶ",
        links: [
          {
            kind: "detail",
            id: 254,
            href: "https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ",
            title: "Studio Academy",
            sub: "公式動画で使い方を学ぶ",
            blank: true,
          },
          { kind: "detail", id: 262, href: "/ja/resources", title: "お役立ち資料", sub: "導入・運用に役立つ資料" },
        ],
      },
      { kind: "divider", id: 269 },
      {
        kind: "column",
        id: 271,
        heading: "つながる",
        links: [
          {
            kind: "detail",
            id: 273,
            href: "https://community-ja.studio.design/home",
            title: "Studio Community",
            sub: "ユーザー同士で知見を共有する",
            blank: true,
          },
          { kind: "detail", id: 281, href: "/ja/lp/ambassador", title: "全国ワークショップ", sub: "基本操作を実践的に学ぶ" },
          {
            kind: "detail",
            id: 288,
            href: "https://lu.ma/studiodesign?k=c",
            title: "セミナー",
            sub: "開催中のイベントを探す",
            blank: true,
          },
        ],
      },
      { kind: "divider", id: 296 },
      {
        kind: "column",
        id: 298,
        heading: "読む",
        links: [
          { kind: "detail", id: 300, href: "/ja/whats-new", title: "最新情報", sub: "Studioのアップデートやお知らせ" },
          {
            kind: "detail",
            id: 307,
            href: "https://studio.design/ja/blog",
            title: "Studio Blog",
            sub: "制作・運用に役立つ記事を読む",
          },
        ],
      },
      { kind: "divider", id: 314 },
    ],
  },
  {
    id: 316,
    label: "サポート",
    blocks: [
      {
        kind: "column",
        id: 324,
        links: [
          {
            kind: "detail",
            id: 325,
            href: "https://studio.design/ja/support",
            title: "相談窓口",
            sub: "目的に合ったサポートを探す",
          },
          {
            kind: "detail",
            id: 332,
            href: "https://studio.design/ja/faq",
            title: "よくある質問",
            sub: "導入にあたってよくある質問を探す",
          },
          {
            kind: "detail",
            id: 339,
            href: "https://help.studio.design/ja/",
            title: "ヘルプセンター",
            sub: "操作や機能に関するマニュアルを探す",
            blank: true,
          },
          {
            kind: "detail",
            id: 347,
            href: "https://status.studio.design/",
            title: "システムステータス",
            sub: "不具合・障害情報を確認する",
            blank: true,
          },
        ],
      },
    ],
  },
];

const sd = (id: number) => `symbol-1__sd-${id}`;

/**
 * The 16×16 arrow chip that trails every panel link. Two stacked
 * `arrow_forward` ligatures — the first is decorative, the second slides out on
 * hover (`:hover .symbol-1__sd-22 { margin: 0 -16px 0 0 }`). `target="_blank"`
 * links wrap the pair in one extra box and label the visible glyph.
 */
function ArrowChip({ boxId, blank }: { boxId: number; blank?: true }) {
  if (blank) {
    return (
      <div className={`box ${sd(boxId)}`}>
        <div className={`box ${sd(boxId + 1)}`}>
          <MaterialSymbol name="arrow_forward" className={sd(boxId + 2)} />
          <span
            className={`icon ${sd(boxId + 3)} material-symbols-outlined`}
            aria-label="新規タブで開く"
            role="img"
          >
            arrow_forward
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={`box ${sd(boxId)}`}>
      <MaterialSymbol name="arrow_forward" className={sd(boxId + 1)} />
      <span className={`icon ${sd(boxId + 2)} material-symbols-outlined`}>arrow_forward</span>
    </div>
  );
}

function PanelLinkItem({ link }: { link: PanelLink }) {
  if (link.kind === "plain") {
    return (
      <a className={`box ${sd(link.id)}`} href={link.href}>
        <p className={`text ${sd(link.id + 1)}`}>
          {link.title}
          {link.br ? <br /> : null}
        </p>
        <ArrowChip boxId={link.id + 2} />
      </a>
    );
  }
  return (
    <a
      className={`box ${sd(link.id)}`}
      href={link.href}
      {...(link.blank ? { target: "_blank" as const } : {})}
      {...(link.current ? { "data-current": "" } : {})}
    >
      <div className={`box ${sd(link.id + 1)}`}>
        <p className={`text ${sd(link.id + 2)}`}>{link.title}</p>
        <p className={`text ${sd(link.id + 3)}`}>{link.sub}</p>
      </div>
      <ArrowChip boxId={link.id + 4} blank={link.blank} />
    </a>
  );
}

function PanelBlockItem({ block }: { block: PanelBlock }) {
  if (block.kind === "divider") {
    return (
      <div className={`box ${sd(block.id)}`}>
        <div className={`box ${sd(block.id + 1)}`} />
      </div>
    );
  }
  return (
    <div className={`box ${sd(block.id)}`}>
      {block.heading ? (
        <p className={`text ${sd(block.id + 1)}`}>
          {block.heading}
          <br />
        </p>
      ) : null}
      {block.links.map((link) => (
        <PanelLinkItem key={link.id} link={link} />
      ))}
    </div>
  );
}

export function SiteHeader({ onOpenMenu }: { onOpenMenu?: () => void } = {}) {
  // `SdToggle` (shared) is deliberately not used here: the origin header allows only one
  // open panel at a time, which needs a coordinator above the five toggles. The rendered
  // attributes are identical to `SdToggle`'s, because the sliced CSS keys off `[open]`,
  // `:not([open])` and `[data-toggle-closing]`.
  const [openId, setOpenId] = useState<number | null>(null);
  // Each panel runs its own 300ms leave transition, so a panel closing while another one opens
  // must keep counting down independently — hence a set of ids and a timer per id.
  const [closingIds, setClosingIds] = useState<readonly number[]>([]);
  const rootRef = useRef<HTMLElement>(null);
  const closeTimers = useRef(new Map<number, number>());

  const cancelClose = useCallback((id: number) => {
    const timer = closeTimers.current.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      closeTimers.current.delete(id);
    }
    setClosingIds((ids) => ids.filter((openId) => openId !== id));
  }, []);

  /** The origin keeps `open` alongside `data-toggle-closing` for the 300ms leave transition. */
  const beginClose = useCallback((id: number) => {
    const running = closeTimers.current.get(id);
    if (running !== undefined) window.clearTimeout(running);
    setClosingIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
    closeTimers.current.set(
      id,
      window.setTimeout(() => {
        closeTimers.current.delete(id);
        setClosingIds((ids) => ids.filter((closing) => closing !== id));
      }, 300),
    );
  }, []);

  const activate = useCallback(
    (id: number) => {
      if (openId === id) {
        setOpenId(null);
        beginClose(id);
        return;
      }
      if (openId !== null) beginClose(openId);
      // Re-opening a panel mid-close must reach the open state, not inherit its own closing flag.
      cancelClose(id);
      setOpenId(id);
    },
    [openId, beginClose, cancelClose],
  );

  // `close-outside` on every `<sd-toggle>`: a pointer down outside the header closes the
  // open panel. Escape does NOT close (verified on the origin).
  useEffect(() => {
    if (openId === null) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpenId(null);
      beginClose(openId);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openId, beginClose]);

  useEffect(() => {
    const timers = closeTimers.current;
    return () => {
      for (const timer of timers.values()) window.clearTimeout(timer);
      timers.clear();
    };
  }, []);

  return (
    <header className="box symbol-1" id="header" ref={rootRef}>
      <div className="box symbol-1__sd-1">
        <a className="box symbol-1__sd-2" href="/ja">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="img symbol-1__sd-3"
            width={80}
            height={17}
            alt="Studio"
            src="/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-80x17_b5c1ab9c-6742-40f1-8fad-48d23bafba5b.svg"
          />
        </a>
        <nav className="box symbol-1__sd-4">
          <div className="box symbol-1__sd-5">
            {PANELS.map((panel) => {
              const isOpen = openId === panel.id;
              const isClosing = closingIds.includes(panel.id);
              return (
                <sd-toggle
                  key={panel.id}
                  className={`toggle ${sd(panel.id)}`}
                  close-outside=""
                  {...(isOpen || isClosing ? { open: true } : {})}
                  {...(isClosing ? { "data-toggle-closing": "" } : {})}
                >
                  <button
                    className={`box ${sd(panel.id + 1)}`}
                    data-toggle-trigger=""
                    aria-expanded={isOpen}
                    type="button"
                    onClick={() => activate(panel.id)}
                  >
                    <p className={`text ${sd(panel.id + 2)}`}>{panel.label}</p>
                    <div className={`box ${sd(panel.id + 3)}`}>
                      <span
                        className={`icon ${sd(panel.id + 4)} fa-solid fa-plus`}
                        aria-label="トグルを開く"
                        role="img"
                      />
                      <span className={`icon ${sd(panel.id + 5)} fa-solid fa-minus`} aria-hidden="true" />
                    </div>
                  </button>
                  <div
                    className={`box ${sd(panel.id + 6)}`}
                    data-toggle-content=""
                    {...(isOpen || isClosing ? {} : { "aria-hidden": true, inert: true })}
                  >
                    <div className={`box ${sd(panel.id + 7)}`}>
                      {panel.blocks.map((block) => (
                        <PanelBlockItem key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                </sd-toggle>
              );
            })}
            <div className="box symbol-1__sd-355">
              <a className="box symbol-1__sd-356" href="/ja/pricing">
                <p className="text symbol-1__sd-357">
                  料金プラン
                  <br />
                </p>
              </a>
            </div>
            <a className="box symbol-1__sd-358" href="/ja/contact/sales">
              <div className="box symbol-1__sd-359">
                <p className="text symbol-1__sd-360">お問い合わせ</p>
              </div>
              <div className="box symbol-1__sd-361">
                <div className="box symbol-1__sd-362" />
                <div className="box symbol-1__sd-363" />
                <div className="box symbol-1__sd-364" />
              </div>
            </a>
          </div>
          <a className="box symbol-1__sd-365" href="https://app.studio.design/ja/signup" target="_blank">
            <div className="box symbol-1__sd-366">
              <p className="text symbol-1__sd-367">ログイン ／ 新規登録 </p>
              <div className="box symbol-1__sd-368">
                <div className="box symbol-1__sd-369" />
              </div>
            </div>
          </a>
          <button
            className="box symbol-1__sd-370"
            aria-label="メニューを開く"
            data-modal="sd-modal-b5c877c2c8794404"
            type="button"
            onClick={onOpenMenu}
          >
            <div className="box symbol-1__sd-371" />
            <div className="box symbol-1__sd-372" />
          </button>
        </nav>
      </div>
    </header>
  );
}
