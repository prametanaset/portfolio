import type { DetailedHTMLProps, HTMLAttributes } from "react";

// studio.design ships its behavior on custom elements. The clone keeps the tag names so the
// origin's own stylesheet (app/studio-base.css) still matches, and re-implements the behavior
// in React (see carousel.tsx / video.tsx / toggle.tsx).
type CustomElement<T = HTMLElement> = DetailedHTMLProps<HTMLAttributes<T>, T> & {
  [attr: `data-${string}`]: string | boolean | undefined;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "sd-carousel": CustomElement;
      "sd-video": CustomElement;
      "sd-video-player": CustomElement;
      "sd-toggle": CustomElement & { open?: boolean; "close-outside"?: string };
      "sd-loop-box": CustomElement;
    }
  }
}
