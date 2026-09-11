// Port of studio.design/ja/editor `main > .sd-271` (DOM order 9 of 13) — the "Collaboration"
// section: a CSS-only `position: sticky` rail (`.sd-273`, top 104px) beside a 4-card `<ul>`
// (`.sd-277`). Structure and class names are verbatim from the origin markup
// (docs/research/.../page.html, `box sd-271`); the copy and alt text are Thai, rewritten from
// nexa-rise.com's own capability cards (Multi-Source Review Collection / Automated Review Cycles /
// Calibration & Analytics) and from the screenshots in /public/nexa.
// The eight `<noscript>` image duplicates are inert with JS on and are not rendered.
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

export function CollaborationSection() {
  return (
    <div className="box sd-271">
      <div className="box sd-272">
        <div className="box sd-273">
          <h2 className="text sd-274 theme-cb8ba68c">NEXA</h2>

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
                <h3 className="text sd-280 theme-c1a9a55a">ฟีดแบ็ก 360° ครบทุกมุมมอง</h3>
                <p className="text sd-281 theme-a3931427">
                  รวมผลประเมินจากเพื่อนร่วมงาน หัวหน้า ตัวเอง และลูกทีม ไว้ในรอบเดียว
                  <br />
                  ตั้งค่าการไม่ระบุตัวตนได้ ทุกความเห็นจึงตรงไปตรงมา
                </p>
              </div>
              {/* Plain <img> (not next/image) so the sliced `.sd-282` rules apply unchanged. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-282"
                src="/nexa/nexa-1.png"
                alt="ภาพตัวอย่าง: หน้าแรกของ NEXA บนพื้นหลังภาพคลื่นน้ำ พร้อมพาดหัว See the whole picture. Grow with 360° feedback. และข้อความอธิบายว่ารวมการประเมินจากเพื่อนร่วมงาน หัวหน้า ตัวเอง และลูกทีม ไว้บนแพลตฟอร์มเดียว รองรับภาษาอังกฤษและภาษาไทย ตามมาตรฐาน SOC 2 ด้านบนมีแถบเมนู Product, Solutions, Pricing และ Resources"
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
                <h3 className="text sd-285 theme-c1a9a55a">มอนิเตอร์</h3>
                <p className="text sd-286 theme-a3931427">
                  ผู้ดูแลเห็นสุขภาพระบบแบบเรียลไทม์ ภายใต้มาตรฐาน SOC 2
                </p>
              </div>
              <div className="sd-287 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img absolute top-0 right-0 w-full h-full object-cover"
                  style={{ objectPosition: "top right" }}
                  src="/nexa/nexa-2.png"
                  alt="ภาพตัวอย่าง: หน้ามอนิเตอร์ของผู้ดูแลระบบ NEXA เมนูด้านซ้ายแสดงภาพรวม บริษัท พนักงาน ผังองค์กร รอบประเมิน และบันทึกการใช้งาน ถัดมาเป็นรายการแดชบอร์ด เช่น ภาพรวมระบบ API Performance และ Server Metrics ส่วนขวาเป็นแดชบอร์ดสีเข้มที่มีเกจวัด CPU หน่วยความจำ และดิสก์ พร้อมกราฟการใช้งานย้อนหลัง 24 ชั่วโมง"
                />
              </div>
            </Appear>
            <Appear
              as="li"
              className="box sd-288"
              rootMargin="0px"
              threshold={0}
              activeClass={false}
            >
              <div className="box sd-289">
                <h3 className="text sd-290 theme-c1a9a55a">รอบประเมินอัตโนมัติ</h3>
                <p className="text sd-291 theme-a3931427">
                  เปิดรอบ ส่งการแจ้งเตือน และปิดรอบให้เองอัตโนมัติ HR จึงไม่ต้องไล่ตามแบบฟอร์ม
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-292"
                src="/nexa/nexa-3.png"
                alt="ภาพตัวอย่าง: หน้าแรกของพนักงานใน NEXA ทักทายว่า สวัสดี Tanaset ด้านซ้ายเป็นการ์ดสรุปสิ่งที่ทำได้ในระบบ เช่น เลือกเพื่อนร่วมงานที่จะประเมินและทำแบบประเมินตนเอง ด้านขวาเป็นการ์ดรอบประเมินที่กำลังดำเนินอยู่และรายการแจ้งเตือนล่าสุดเกี่ยวกับการเปิดรอบ ปิดรอบ และแบบประเมินที่รออยู่"
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
                <h3 className="text sd-295 theme-c1a9a55a">ปรับเทียบคะแนนและวิเคราะห์ผล</h3>
                <p className="text sd-296 theme-a3931427">
                  ปรับคะแนนให้เป็นมาตรฐานเดียวกันทุกหัวหน้าและทุกทีม
                  <br />
                  เห็นแนวโน้มการมีส่วนร่วมย้อนหลังได้ทุกรอบประเมิน
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
                  src="/nexa/nexa-4.png"
                  alt=""
                />
                <Appear
                  as="img"
                  className="img sd-299"
                  rootMargin="0px"
                  threshold={0}
                  activeClass={false}
                  src="/nexa/nexa-1.png"
                  alt=""
                />
                <Appear
                  as="img"
                  className="img sd-300"
                  rootMargin="0px"
                  threshold={0}
                  activeClass={false}
                  src="/nexa/nexa-2.png"
                  alt=""
                />
                <Appear
                  as="img"
                  className="img sd-301"
                  rootMargin="0px"
                  threshold={0}
                  activeClass={false}
                  src="/nexa/nexa-3.png"
                  alt=""
                />
                <Appear
                  as="img"
                  className="img sd-302"
                  rootMargin="0px"
                  threshold={0}
                  activeClass={false}
                  src="/nexa/nexa-4.png"
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
