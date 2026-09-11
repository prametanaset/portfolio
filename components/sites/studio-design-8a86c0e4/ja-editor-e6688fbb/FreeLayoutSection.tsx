// Port of studio.design/ja/editor `main > .sd-45` (DOM order 4 of 13) — the "Free Layout"
// section: a CSS-only `position: sticky` rail (`.sd-47`) beside a 5-card `<ul>` (`.sd-51`).
// Structure and class names follow the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-45`), but the
// five media slots now show product screenshots from iux24 (www.iux24.com), sourced from
// `public/iux24`, instead of the origin's stock videos and images, and the copy describes
// iux24's own features (per www.iux24.com/llms.txt) rather than Studio's editor.
// Each card's copy keeps the origin's line count so `<br />` breaks land where the layout expects.
// The `theme-*` classes stay on the text nodes: `.sd-root .text.theme-XXXX` is specificity (0,3,0)
// and beats `.sd-root .sd-NN` for font-size / line-height (e.g. `.sd-49` 0.94rem loses to 1rem).
// Client component only because the 5 `appear` reveals need an IntersectionObserver — the sticky
// rail is declarative, so no scroll handler and no timers here.

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";
import "./free-layout-section.css";

const IUX24 = "/iux24";

export function FreeLayoutSection() {
  return (
    <div className="box sd-45">
      <div className="box sd-46">
        <div className="box sd-47">
          <h3 className="text sd-48 theme-cb8ba68c">IUX24</h3>
          <p className="text sd-49 theme-969c5ae1">
            ตลาดแบบเรียลไทม์
            <br />
            พร้อม AI ที่อธิบายให้เข้าใจ
          </p>
        </div>
        <div className="box sd-50">
          <ul className="box sd-51">
            <Appear as="li" className="box sd-52">
              <div className="box sd-53">
                <h4 className="text sd-54 theme-c1a9a55a">รู้จักกับ Xurve</h4>
                <p className="text sd-55 theme-a3931427">
                  ถามอะไรก็ได้เกี่ยวกับตลาด แล้วได้คำตอบที่อ้างอิงข้อมูลสด
                  <br />
                  Xurve อ่านความเคลื่อนไหวของตลาดให้ คุณจึงไม่ต้องนั่งไล่เอง
                </p>
              </div>
              <video
                className="img sd-56"
                src="https://storage-iux24.com/static/cta/xurve-intro.webm"
                // style={{ objectPosition: "top left" }}
                autoPlay
                loop
                muted
                playsInline
              />
            </Appear>
            <Appear as="li" className="box sd-57">
              <div className="box sd-58">
                <h4 className="text sd-59 theme-c1a9a55a">ห้องข่าวแบบสด</h4>
                <p className="text sd-60 theme-a3931427">
                  ข่าวตลาดโลก เศรษฐกิจ และธุรกิจใน 8 ภาษา อัปเดตทุกนาที
                  <br />
                  Market Overview แสดงดัชนี ทองคำ น้ำมันดิบ และค่าเงินไว้ในสายตาตลอด
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-61"
                style={{ objectPosition: "top left" }}
                src={`${IUX24}/iux24-1.png`}
                alt="หน้าฟีดของ IUX24 บนเดสก์ท็อป: แถบข้าง Feed / Explore / Market / Portfolio ข่าวเด่นนำด้วย “Global bonds and stocks fall on surging oil prices” และแผง Ask Xurve อยู่เหนือกริด Market Overview ที่แสดง S&P 500, Dow Jones, Nasdaq, ทองคำ, น้ำมันดิบเบรนต์ และ EUR/USD"
              />
            </Appear>
            <Appear as="li" className="box sd-62">
              <div className="box sd-63">
                <h4 className="text sd-64 theme-c1a9a55a">ออกแบบมาเพื่อมือถือ</h4>
                <p className="text sd-65 theme-a3931427">
                  ทั้งฟีด พอร์ตของคุณ และคำสั่งถาม Xurve ใช้งานได้ด้วยมือเดียว
                  <br />
                  เซสชันเดียวกันทั้งบนมือถือ แท็บเล็ต และเดสก์ท็อป
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-66"
                src={`${IUX24}/iux24-6.png`}
                alt="IUX24 บนมือถือ: แถบแท็บ Top / Market / World / Economy ชิปคำสั่งถาม Xurve อย่าง “Summarize my portfolio performance” ข่าวนำเรื่องคำเตือนจาก MI5 และแถว Highlights ด้านล่าง"
                style={{ margin: 0, width: "100%", maxWidth: "100%" }}
              />
            </Appear>
            <Appear as="li" className="box sd-67">
              <div className="box sd-68">
                <h4 className="text sd-69 theme-c1a9a55a">เจาะลึกรายตัว</h4>
                <p className="text sd-70 theme-a3931427">
                  ราคา ปริมาณซื้อขาย RSI, MACD, EMA, ATR และ Bollinger Bands รวมอยู่ในกราฟเดียว แล้วถาม
                  Xurve ได้เลยว่ามันหมายความว่าอะไร
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-71"
                src={`${IUX24}/iux24-8.png`}
                alt="หน้ารายตัวของ IUX24 สำหรับ WTICOUSD ที่ 90.52 ลดลง 2.47 เปอร์เซ็นต์: กราฟแท่งเทียนรายวันย้อนหลัง 6 เดือน พร้อมแผงปริมาณซื้อขาย RSI, MACD และ ATR มีเส้น Bollinger Bands และ EMA ซ้อนอยู่ และช่องถาม Xurve ด้านล่าง"
              />
              <div className="box sd-72" />
            </Appear>
            <Appear as="li" className="box sd-73">
              <div className="box sd-74">
                <h4 className="text sd-75 theme-f799e4ef">สัญญาณ Alpha</h4>
                <p className="text sd-76 theme-a3931427">
                  คาดการณ์ทิศทางล่วงหน้า 1 วัน 3 วัน และ 7 วันของทุกสัญลักษณ์ พร้อมแสดงช่วงที่เป็นกลาง
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img sd-78"
                src={`${IUX24}/iux24-10.png`}
                alt="แท็บ Alpha ของ IUX24 สำหรับ 688795.SS (Moore Threads Technology) ที่ 364.05: คาดการณ์ทิศทางขาลง พร้อมค่าคาดการณ์ 1 วัน 3 วัน และ 7 วัน ทาบอยู่บนกราฟแท่งเทียนที่ยื่นเลยเส้นปัจจุบันออกไป และปุ่ม Deep Dive"
              />
            </Appear>
          </ul>
        </div>
      </div>
    </div>
  );
}
