// src/components/ScrollProvider.tsx
"use client";

import { useEffect } from "react";
import Lenis, { LenisOptions } from "@studio-freight/lenis";

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const options: LenisOptions = {
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false, // ✅ now type-safe
    };

    const lenis = new Lenis(options);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}