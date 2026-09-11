// Port of studio.design/ja/editor `main > .sd-79` (DOM order 5 of 13) — the page's dark zone
// (background #1a1a1a, 2042.47px tall @1440). Structure and class names are verbatim from the
// origin markup (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-79`);
// the copy, alt text and screenshots are Alphola's (https://dev.alphola.com/) — the product this
// section now describes: an investment learning platform with a virtual portfolio.
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

const CARD1 = "/alphola/alphola-1.png";
const CARD2 = "/alphola/alphola-2.png";
const ROW3 = "/alphola/alphola-3.png";
const ROW4 = "/alphola/alphola-4.png";

export function EditorAiSection() {
  return (
    <div className="box sd-79" id="ai">
      <div className="box sd-80">
        <h2 className="box sd-81">
          <span className="text sd-82 theme-b6b0338f">Alphola</span>
          <span className="text sd-83 theme-57a9da79">
            เรียนรู้ ฝึกฝน
            <br />
            แล้วลงทุนอย่างมั่นใจ
          </span>
        </h2>
        <div className="box sd-84">
          <div className="richText sd-85">
            <p>
              Alphola คือแพลตฟอร์มเรียนรู้การลงทุน
              <br />
              สร้างความรู้ทางการเงิน ฝึกซ้อมด้วยพอร์ตจำลอง และ
              <strong>สะสมความมั่นใจก่อนลงทุนด้วยเงินจริง</strong>
              ทุกคำสั่งซื้อขายที่นี่ไม่มีค่าใช้จ่าย แต่ได้บทเรียนกลับไปเสมอ
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
                <span className="text sd-93">แดชบอร์ดตลาด</span>
                <span className="text sd-94">{"จากการ \u201cเฝ้าดู\u201d ตลาด\u2028สู่การ \u201cเข้าใจ\u201d มันจริง ๆ"}</span>
              </h3>
              <p className="text sd-95">
                รายการที่เฝ้าดู สินทรัพย์ที่เคลื่อนไหวแรง และกำไรขาดทุนรายวัน
                <br />
                รวมอยู่ในหน้าเดียวที่อ่านง่ายและไม่รก
                <br />
                ครอบคลุมทั้งหุ้น คริปโท ฟอเร็กซ์ ETF และสินค้าโภคภัณฑ์
              </p>
            </div>
          </div>
          <div className="box sd-96">
            {/* Plain <img> (not next/image) so the sliced `.sd-97` rules apply unchanged. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img sd-97"
              src={CARD1}
              alt="ภาพหน้าจอแดชบอร์ดของ Alphola: ภาพรวมพอร์ตพร้อมเงินคงเหลือและกำไรขาดทุนของวันนี้ แผงสินทรัพย์ที่ถือมากที่สุด การ์ดรายการเฝ้าดูที่ยังว่างอยู่ และตารางสินทรัพย์ที่เคลื่อนไหวแรงซึ่งแสดงตัวที่ซื้อขายคึกคักที่สุด ตัวที่ขึ้นแรงที่สุด และตัวที่ลงแรงที่สุด"
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
                {/* U+00A0 between the two words, as authored in the origin markup. */}
                <span className="text sd-105">{"พอร์ต จำลอง"}</span>
                <span className="text sd-106">ได้ฟีลตลาดจริง โดยไม่มีความเสี่ยงจริง</span>
              </h3>
              <p className="text sd-107">
                ซื้อ ขาย และปรับสัดส่วนพอร์ตด้วยเงินจำลอง
                <br />
                ราคาขยับจริง คำสั่งจับคู่จริง กำไรขาดทุนเปลี่ยนตามจริง
                <br />
                ติดตามสัดส่วนการลงทุนเทียบกับ S&amp;P 500 ได้ตลอดทาง
              </p>
            </div>
          </div>
          <div className="box sd-108">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img sd-109"
              src={CARD2}
              alt="ภาพหน้าจอพอร์ตจำลองของ Alphola: มูลค่าพอร์ตรวมพร้อมเงินคงเหลือและกำไรขาดทุน ปุ่มซื้อและถอนเงิน กราฟเปรียบเทียบมูลค่าเงินลงทุนรวมกับ S&P 500 สัดส่วนการลงทุนแยกตามหุ้น คริปโท ฟอเร็กซ์ ETF และสินค้าโภคภัณฑ์ และรายการธุรกรรม"
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
                <span className="text sd-117">เส้นทางการเรียนรู้</span>
                <span className="text sd-118">เส้นทางที่ออกแบบตามระดับความเสี่ยงของคุณ</span>
              </h3>
              <div className="richText sd-119">
                <p>
                  บทเรียนที่เรียงลำดับมาอย่างเป็นระบบ ค่อย ๆ สร้างความรู้ทีละขั้น
                  <br />
                  หลักสูตรปรับตามโปรไฟล์และจังหวะของคุณ จึงไม่รู้สึกว่าง่ายเกินไปหรือยากเกินตัว
                </p>
              </div>
            </div>
          </div>
          <Appear className="box sd-120" rootMargin="0px" threshold={0} activeClass={false} once>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img sd-121"
              src={ROW3}
              alt="ภาพหน้าจอหน้าการเรียนรู้ของ Alphola: ส่วนหัวทักทายพร้อมกำหนดเรียนจบโดยประมาณ สถานะคอร์ส และเวลาที่ใช้ไป แถบความคืบหน้าของระดับ แผนที่คอร์สแบบเส้นทางคดเคี้ยวที่มีจุดบทเรียน และแผงรายละเอียดคอร์สที่ระบุบทความในคอร์สและทักษะที่เกี่ยวข้อง"
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
                <span className="text sd-128">ค่า XP และการไต่ระดับ</span>
                <span className="text sd-129">ความคืบหน้าที่มองเห็นได้จริง</span>
              </h3>
              <div className="richText sd-130">
                <p>
                  ทุกบทเรียนและทุกรอบการฝึกซ้อมได้รับ XP และปลดล็อกระดับถัดไป
                  <br />
                  XP วัดผลการเรียนรู้เท่านั้น ไม่มีมูลค่าเป็นตัวเงิน และไม่ผูกกับผลตอบแทนจากการลงทุนแต่อย่างใด
                </p>
              </div>
            </div>
          </div>
          <Appear className="box sd-131" rootMargin="0px" threshold={0} activeClass={false} once>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img sd-132"
              src={ROW4}
              alt="ภาพหน้าจอหน้าโปรไฟล์ของ Alphola: รายละเอียดบัญชี ผลประเมินความเสี่ยงที่แสดงโปรไฟล์แบบรับความเสี่ยงสูง การยืนยันสถานะผู้เชี่ยวชาญ และแผงระดับที่แสดงค่า XP ปัจจุบันพร้อมลำดับขั้นเจ็ดระดับตั้งแต่ Aspirant ถึง Vanguard"
            />
          </Appear>
        </li>
      </ul>
    </div>
  );
}
