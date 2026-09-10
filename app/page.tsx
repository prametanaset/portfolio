// Clone of https://studio.design/ja/editor.
// The origin wraps the whole page in `div.box.sd-1` (header + main.sd-2 + footer); `.sd-root`
// is the clone's scope for the origin's stylesheet (app/studio-base.css + the per-section slices).
import "@/components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/page-shell.css";
import { SiteHeader } from "@/components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/SiteHeader";
import { HeroDesignEditor } from "@/components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/HeroDesignEditor";

export default function Page() {
  return (
    <div className="sd-root box sd-1">
      <SiteHeader />
      <main className="box sd-2">
        <HeroDesignEditor />
      </main>
    </div>
  );
}
