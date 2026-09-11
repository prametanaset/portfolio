"use client";

// Port of studio.design/ja/editor `#header` (`header.box.symbol-1`, DOM order 1 of 13).
// Structure and class names are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `symbol-1__sd-1`);
// the copy is the Thai translation.
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
    label: "ผลิตภัณฑ์",
    blocks: [
      {
        kind: "column",
        id: 14,
        heading: "สร้าง",
        links: [
          {
            kind: "detail",
            id: 16,
            href: "/ja/editor",
            title: "เครื่องมือออกแบบ",
            sub: "ออกแบบได้อย่างอิสระโดยไม่ต้องเขียนโค้ด",
            current: true,
          },
          { kind: "detail", id: 23, href: "/ja/cms", title: "CMS", sub: "ระบบจัดการเนื้อหาที่ยืดหยุ่น" },
          { kind: "detail", id: 30, href: "/ja/form", title: "ฟอร์ม", sub: "ตั้งค่าฟอร์มได้ครบโดยไม่ต้องเขียนโค้ด" },
          { kind: "detail", id: 37, href: "/ja/seo", title: "SEO", sub: "ตัวเลือกสำหรับเครื่องมือค้นหาครบชุด" },
        ],
      },
      { kind: "divider", id: 44 },
      {
        kind: "column",
        id: 46,
        heading: "ดูแลระบบ",
        links: [
          { kind: "detail", id: 48, href: "/ja/hosting", title: "การดูแลเว็บไซต์", sub: "สำรองข้อมูลที่เชื่อถือได้และควบคุมสิทธิ์การเข้าถึง" },
          { kind: "detail", id: 55, href: "/ja/lp/security", title: "ความปลอดภัย", sub: "ระบบที่คอยปกป้องเว็บไซต์ของคุณ" },
          { kind: "detail", id: 62, href: "/ja/workspace", title: "พื้นที่ทำงาน", sub: "จัดการหลายโปรเจกต์ได้จากที่เดียว" },
        ],
      },
      { kind: "divider", id: 69 },
      {
        kind: "column",
        id: 71,
        heading: "ต่อยอด",
        links: [
          {
            kind: "detail",
            id: 73,
            href: "/ja/figma-to-studio",
            title: "Figma to Studio",
            sub: "เปลี่ยนงานออกแบบเป็นเว็บไซต์ได้ในพริบตา",
          },
          { kind: "detail", id: 80, href: "/ja/lottie", title: "Lottie for Studio", sub: "การแสดงออกด้วยแอนิเมชันที่หลากหลายขึ้น" },
          { kind: "detail", id: 87, href: "/ja/accessibility", title: "การเข้าถึง", sub: "เว็บไซต์สำหรับทุกคน" },
        ],
      },
    ],
  },
  {
    id: 94,
    label: "โซลูชัน",
    blocks: [
      {
        kind: "column",
        id: 102,
        heading: "ตามประเภทเว็บไซต์",
        links: [
          { kind: "plain", id: 104, href: "/ja/solutions/site-types/corporate", title: "เว็บไซต์องค์กร" },
          { kind: "plain", id: 109, href: "/ja/solutions/site-types/recruit", title: "เว็บไซต์รับสมัครงาน" },
          { kind: "plain", id: 114, href: "/ja/solutions/site-types/service", title: "เว็บไซต์บริการ" },
        ],
      },
      { kind: "divider", id: 119 },
      { kind: "divider", id: 121 },
      {
        kind: "column",
        id: 123,
        heading: "ตามอุตสาหกรรม",
        links: [
          { kind: "plain", id: 125, href: "/ja/solutions/industries/leisure", title: "โรงแรมและการท่องเที่ยว" },
          { kind: "plain", id: 130, href: "/ja/solutions/industries/entertainment", title: "บันเทิง" },
          { kind: "plain", id: 135, href: "/ja/solutions/industries/local-government", title: "หน่วยงานราชการ" },
          { kind: "plain", id: 140, href: "/ja/lp/solution/restaurant-homepage", title: "ร้านอาหาร" },
          { kind: "plain", id: 145, href: "/ja/lp/solution/ec-homepage", title: "ค้าปลีกและอีคอมเมิร์ซ" },
        ],
      },
      { kind: "divider", id: 150 },
      {
        kind: "column",
        id: 152,
        heading: "ตามโจทย์ที่เจอ",
        links: [
          { kind: "plain", id: 154, href: "/ja/solutions/usecases/landingpage", title: "แลนดิงเพจสำหรับนักการตลาด" },
          { kind: "plain", id: 159, href: "/ja/solutions/usecases/wordpress-migration", title: "ย้ายจาก WordPress" },
          { kind: "plain", id: 164, href: "/ja/solutions/usecases/site-improvement", title: "ปรับโครงสร้างเมนูเว็บไซต์ใหม่" },
        ],
      },
      { kind: "divider", id: 169 },
      {
        kind: "column",
        id: 171,
        heading: "ตามประเภทองค์กร",
        links: [
          { kind: "plain", id: 173, href: "/ja/lp/enterprise", title: "องค์กรขนาดใหญ่" },
          { kind: "plain", id: 178, href: "/ja/creators", title: "เอเจนซีและครีเอเตอร์" },
          { kind: "plain", id: 183, href: "/ja/lp/solution/marketing-agency", title: "เอเจนซีโฆษณาและที่ปรึกษา", br: true },
          { kind: "plain", id: 188, href: "/ja/lp/startup", title: "สตาร์ตอัป", br: true },
        ],
      },
    ],
  },
  {
    id: 193,
    label: "ลูกค้า",
    blocks: [
      {
        kind: "column",
        id: 201,
        links: [
          { kind: "detail", id: 202, href: "/ja/customer-story", title: "เรื่องราวจากลูกค้า", sub: "ฟังจากปากลูกค้าของเราเอง" },
          { kind: "detail", id: 209, href: "/ja/customer", title: "รายชื่อลูกค้า", sub: "เลือกใช้โดยองค์กรทุกขนาดและทุกวงการ" },
        ],
      },
    ],
  },
  {
    id: 216,
    label: "แหล่งข้อมูล",
    blocks: [
      {
        kind: "column",
        id: 224,
        heading: "สร้างเองหรือจ้างทำ",
        links: [
          {
            kind: "detail",
            id: 226,
            href: "https://studio.design/ja/store",
            title: "Studio Store",
            sub: "เริ่มต้นจากเทมเพลต",
            blank: true,
          },
          {
            kind: "detail",
            id: 234,
            href: "https://experts.studio.design/",
            title: "Studio Experts",
            sub: "ปรึกษามืออาชีพเกี่ยวกับงานของคุณ",
            blank: true,
          },
          {
            kind: "detail",
            id: 242,
            href: "https://showcase.studio.design/ja",
            title: "Studio Showcase",
            sub: "หาแรงบันดาลใจจากผลงานจริง",
            blank: true,
          },
        ],
      },
      { kind: "divider", id: 250 },
      {
        kind: "column",
        id: 252,
        heading: "เรียนรู้",
        links: [
          {
            kind: "detail",
            id: 254,
            href: "https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ",
            title: "Studio Academy",
            sub: "เรียนพื้นฐานจากวิดีโออย่างเป็นทางการ",
            blank: true,
          },
          { kind: "detail", id: 262, href: "/ja/resources", title: "คู่มือและแหล่งข้อมูล", sub: "เอกสารที่ช่วยให้เริ่มใช้และดูแล Studio ได้ง่ายขึ้น" },
        ],
      },
      { kind: "divider", id: 269 },
      {
        kind: "column",
        id: 271,
        heading: "เชื่อมต่อ",
        links: [
          {
            kind: "detail",
            id: 273,
            href: "https://community-ja.studio.design/home",
            title: "Studio Community",
            sub: "แบ่งปันสิ่งที่คุณรู้กับผู้ใช้คนอื่น",
            blank: true,
          },
          { kind: "detail", id: 281, href: "/ja/lp/ambassador", title: "เวิร์กช็อปทั่วประเทศ", sub: "เรียนพื้นฐานแบบลงมือทำจริง" },
          {
            kind: "detail",
            id: 288,
            href: "https://lu.ma/studiodesign?k=c",
            title: "สัมมนา",
            sub: "ดูงานที่กำลังจัดอยู่ตอนนี้",
            blank: true,
          },
        ],
      },
      { kind: "divider", id: 296 },
      {
        kind: "column",
        id: 298,
        heading: "อ่าน",
        links: [
          { kind: "detail", id: 300, href: "/ja/whats-new", title: "มีอะไรใหม่", sub: "อัปเดตและประกาศจาก Studio" },
          {
            kind: "detail",
            id: 307,
            href: "https://studio.design/ja/blog",
            title: "Studio Blog",
            sub: "บทความที่ช่วยให้สร้างและดูแลเว็บได้ดีขึ้น",
          },
        ],
      },
      { kind: "divider", id: 314 },
    ],
  },
  {
    id: 316,
    label: "ช่วยเหลือ",
    blocks: [
      {
        kind: "column",
        id: 324,
        links: [
          {
            kind: "detail",
            id: 325,
            href: "https://studio.design/ja/support",
            title: "ติดต่อฝ่ายบริการ",
            sub: "เลือกช่องทางช่วยเหลือที่ตรงกับความต้องการ",
          },
          {
            kind: "detail",
            id: 332,
            href: "https://studio.design/ja/faq",
            title: "คำถามที่พบบ่อย",
            sub: "คำถามยอดฮิตสำหรับผู้เริ่มต้น",
          },
          {
            kind: "detail",
            id: 339,
            href: "https://help.studio.design/ja/",
            title: "ศูนย์ช่วยเหลือ",
            sub: "คู่มือครบทุกฟีเจอร์และทุกขั้นตอน",
            blank: true,
          },
          {
            kind: "detail",
            id: 347,
            href: "https://status.studio.design/",
            title: "สถานะระบบ",
            sub: "ตรวจสอบเหตุขัดข้องและการหยุดให้บริการ",
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
            aria-label="เปิดในแท็บใหม่"
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
      <div className="box symbol-1__sd-1 py-4">
        <a className="box symbol-1__sd-2" href="/ja">
          <span className="text symbol-1__wordmark">Tanaset Sriratda</span>
        </a>
       
      </div>
    </header>
  );
}
