"use client";

import useUserInterfaceState from "@/stores/ui-store";
import { useShallow } from "zustand/shallow";
import { disableBodyScroll, enableBodyScroll } from "@/utils/body-scroll-lock";
import { useEffect, useState } from "react";

export default function Overlay() {
  const [overlay] = useUserInterfaceState(
    useShallow((state) => [state.overlay])
  );

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (overlay) {
      setScrollPosition(disableBodyScroll());
    } else {
      enableBodyScroll(scrollPosition);
    }
  }, [overlay]);

  return (
    <div
      className={`fixed inset-0 z-30 bg-black transition opacity duration-300 ${
        overlay
          ? "opacity-20 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    />
  );
}
