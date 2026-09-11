// Port of studio.design/ja/editor `main > .sd-303` (DOM order 10 of 13) — the "Data" section: a
// CSS-only `position: sticky` rail (`.sd-305`, top 104px) beside a 4-card `<ul>` (`.sd-309`).
// Structure and class names are verbatim from the origin markup (docs/research/.../page.html,
// `box sd-303`); the copy and alt text are the Thai translation. The four `<noscript>` image
// duplicates are inert with JS on and are not rendered.
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

export function DataSection() {
  return (
    <div className="box sd-303">
      <div className="box sd-304">
        <div className="box sd-305">
          <h2 className="text sd-306 theme-cb8ba68c">WOXA STUDIO</h2>
          <p className="text sd-307 theme-969c5ae1">
            รวมเครื่องมือ AI สำหรับความฝันไว้ที่เดียว
            <br />
            แล้วปรับแต่งได้อย่างยืดหยุ่น
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
                <h3 className="text sd-312 theme-f799e4ef">Upscaler</h3>
                <p className="text sd-313 theme-a3931427">
                  อัปสเกลภาพด้วย AI สูงสุด 16 เท่า พร้อมสร้างรายละเอียดใหม่ให้สมจริง
                  <br />
                  ได้ภาพความละเอียดสูงจากต้นฉบับในไม่กี่อึดใจ
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-314"
                src="/woxa-studio/woxa-studio-1.png"
                alt="ภาพตัวอย่าง: หน้ารายละเอียดบทความซ้อนอยู่บนหน้ารายการบทความ รายการแสดงบทความหลายรายการพร้อมสถานะและชื่อเรื่อง ส่วนหน้ารายละเอียดแสดงชื่อเรื่องและเนื้อหาของบทความ โดยมีเคอร์เซอร์สีส้มและสีน้ำเงินวางอยู่เพื่อบอกว่ากำลังถูกแก้ไข"
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
                <h3 className="text sd-317 theme-c1a9a55a">Creative &amp; Precision</h3>
                <p className="text sd-318 theme-a3931427">
                  เลือกโหมด Creative เติมรายละเอียดใหม่ หรือ Precision คงต้นฉบับตรงตามความจริง
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-319"
                src="/woxa-studio/woxa-studio-2.png"
                alt="ภาพตัวอย่าง: การตั้งค่าตัวกรองบนแผงสีเทา แถวบนแสดงคำว่า “Tags:” ข้างแท็กที่เลือกไว้ “Branding Dynamic” ถัดลงมาเป็นแท็กอย่าง “Web Design”, “Marketing”, “Development” และ “DX” เรียงกันในแนวตั้ง"
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
                <h3 className="text sd-323 theme-c1a9a55a">Workflow</h3>
                <p className="text sd-324 theme-a3931427">
                  ต่อโหนดเป็นเวิร์กโฟลว์ ไล่จากภาพต้นแบบไปจนถึงทุกท่าและทุกเวอร์ชัน
                  <br />
                  เห็นทั้งกระบวนการสร้างงานบนผืนเดียว แก้จุดไหนก็อัปเดตทั้งสาย
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-325"
                src="/woxa-studio/woxa-studio-3.png"
                alt="ภาพตัวอย่าง: สี่เหลี่ยมที่แทนเครื่องมือภายนอกเรียงอยู่บนพื้นหลังตารางหมากรุกสีขาวสลับเทา แต่ละช่องมีโลโก้อย่าง Notion หรือ Airtable อยู่ตรงกลาง"
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
                <h3 className="text sd-328 theme-c1a9a55a">Video Generator</h3>
                <p className="text sd-329 theme-a3931427">
                  สร้างวิดีโอจากภาพหรือข้อความ ตั้งแต่ cinematic hero shot ถึงโฆษณาสินค้า
                  <br />
                  เลือกมุมกล้อง ความยาว และความละเอียดได้เอง พร้อมพรีเซตพร้อมใช้
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-330"
                src="/woxa-studio/woxa-studio-4.png"
                alt="ภาพตัวอย่าง: แผงสำหรับแทรกชิ้นส่วนฟอร์มอยู่ทางซ้าย และฟอร์มที่กำลังประกอบอยู่ทางขวา ตรงกลางมีชิ้นส่วน “input” ที่มีกรอบสีน้ำเงินอยู่ใต้เคอร์เซอร์รูปมือ แสดงว่ากำลังลากฟิลด์จากแผงเข้าไปวางในฟอร์ม"
              />
            </Appear>
          </ul>
        </div>
      </div>
    </div>
  );
}
