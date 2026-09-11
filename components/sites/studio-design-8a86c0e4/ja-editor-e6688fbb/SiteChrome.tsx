"use client";

import { useState } from "react";
import { MobileMenuDialog } from "./MobileMenuDialog";
import { SiteHeader } from "./SiteHeader";

/**
 * The origin's hamburger calls `showModal("sd-modal-b5c877c2c8794404", this)` on an inline
 * handler; the clone holds that one boolean here so the header stays a pure renderer and the
 * dialog stays controlled. It must live inside `.sd-root`: the native top layer does not change
 * DOM ancestry, so the scoped modal rules in `app/studio-base.css` still match.
 */
export function SiteChrome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SiteHeader onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenuDialog open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
