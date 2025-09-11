// components/ScrollManifesto.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ----------------------------- Props / Defaults ----------------------------- */
type Props = {
  text?: string;
  heightVh?: number;
  anchor?: number;
  softness?: number;
  className?: string;
};

/* New Attendify manifesto copy (each page must be unique; this is distinct) */
const ATTENDIFY_COPY = [
  "Attendance you can trust.",
  "Actionable presence data for operations.",
].join("\n");

/**
 * Custom hook wrapper for color transform.
 * Hooks must start with `use` to satisfy the linter rule.
 */
function useColorFor(
  scrollYProgress: MotionValue<number>,
  totalWords: number,
  prefix: number[],
  lineIdx: number,
  wordIdx: number,
  softness: number
) {
  const i = prefix[lineIdx] + wordIdx; // global word index
  const n = Math.max(1, totalWords - 1);
  const base = i / n; // 0..1 across whole text
  const spread = Math.max(2 / totalWords, softness / totalWords);

  const start = Math.max(0, base - spread);
  const mid = base;
  const end = Math.min(1, base + spread);

  // soft grey -> near-black as each word arrives
  return useTransform(scrollYProgress, [start, mid, end], ["#BFBFC3", "#0B0B10", "#0B0B10"]);
}

/**
 * Small component that renders one word. Putting the hook call inside this
 * component keeps hooks usage valid (hooks are always called in component order).
 */
function Word({
  word,
  li,
  wi,
  scrollYProgress,
  totalWords,
  prefix,
  softness,
}: {
  word: string;
  li: number;
  wi: number;
  scrollYProgress: MotionValue<number>;
  totalWords: number;
  prefix: number[];
  softness: number;
}) {
  const color = useColorFor(scrollYProgress, totalWords, prefix, li, wi, softness);
  return (
    <span className="inline-flex items-baseline">
      <motion.span style={{ color }} className="will-change-transform">
        {word}
      </motion.span>
      <span aria-hidden="true" className="inline-block mx-[0.28ch]"> </span>
    </span>
  );
}

export default function ScrollManifesto({
  text = ATTENDIFY_COPY,
  heightVh = 380,
  anchor = 0.30,
  softness = 0.20,
  // safer default tailwind sizes (keeps JIT/purge happy)
  className = "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // progress for this whole section (0 -> 1 through the full height)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ---------- split lines -> words so we can animate each word separately ---------- */
  const lines = useMemo(
    () =>
      text
        .trim()
        .split(/\n+/)
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => l.split(/\s+/)),
    [text]
  );

  // prefix sums to map words to a global index
  const { totalWords, prefix } = useMemo(() => {
    const counts = lines.map((l) => l.length);
    const pref: number[] = [0];
    for (let i = 0; i < counts.length; i++) pref[i + 1] = pref[i] + counts[i];
    return { totalWords: pref[pref.length - 1], prefix: pref };
  }, [lines]);

  /* -------------------------- progress gate (locks scrolling while reading) --------------------------- */
  const [locked, setLocked] = useState(false);
  const released = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (released.current) return;
        setLocked(entry.isIntersecting && entry.intersectionRatio > 0.55);
      },
      { threshold: [0, 0.55, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (!released.current && v >= 0.999) {
        released.current = true;
        setLocked(false);
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

  // tiny scroll lock that preserves position while locked
  useEffect(() => {
    if (!locked) return;
    const savedY = window.scrollY;

    // typed handlers (no 'any' casts)
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const blockKeys = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(e.key)) e.preventDefault();
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${savedY}px`;
    document.body.style.width = "100%";
    document.body.style.touchAction = "none";
    document.body.style.overscrollBehavior = "none";

    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", blockKeys, { passive: false });

    return () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", blockKeys);

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";

      window.scrollTo({ top: savedY });
    };
  }, [locked]);

  /* ------------------------------- small visual tweaks ------------------------------ */
  const bgShift = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.22, 0.32]);

  /* ------------------------------- render ------------------------------------ */
  return (
    <section
      ref={sectionRef}
      style={{ height: `${heightVh}vh` }}
      className="relative"
      aria-label="Scroll manifesto"
    >
      {/* ambient backdrop that moves slightly with scroll */}
      <motion.div aria-hidden style={{ translateY: bgShift }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-neutral-50" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-10%,rgba(99,102,241,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_110%,rgba(16,185,129,0.08),transparent_60%)]" />
        <motion.div
          style={{ opacity: gridOpacity }}
          className="absolute inset-6 rounded-3xl
            [background-image:linear-gradient(rgba(2,6,23,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(2,6,23,0.04)_1px,transparent_1px)]
            [background-size:22px_22px]"
        />
      </motion.div>

      <div className="sticky w-full" style={{ top: `${anchor * 100}vh` }}>
        <div className="mx-auto px-4" style={{ maxWidth: "min(1100px, calc(100vw - 200px))" }}>
          <div className="rounded-3xl bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-[0_20px_80px_rgba(2,6,23,0.06)]">
            <div className="px-5 py-10 sm:px-10 sm:py-14">
              <div className="mb-3 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-indigo-600">
                  ATTENDIFY MANIFESTO
                </span>
              </div>

              {/* Animated headline (words color animated based on scroll)
                  NOTE: inline `style` gives a reliable responsive cap while the Tailwind
                  classes provide sane defaults and keep Purge/JIT happy. Caller can override via `className`. */}
              <div
                className={["text-center leading-[1.06] tracking-[-0.01em] font-semibold", className].join(" ")}
                style={{ fontSize: "min(3.2rem, 6.4vw)" }}
              >
                {lines.map((words, li) => (
                  <p key={`l-${li}`} className="m-0">
                    {words.map((w, wi) => (
                      <Word
                        key={`w-${li}-${wi}`}
                        word={w}
                        li={li}
                        wi={wi}
                        scrollYProgress={scrollYProgress}
                        totalWords={totalWords}
                        prefix={prefix}
                        softness={softness}
                      />
                    ))}
                  </p>
                ))}
              </div>

              {/* Attendify subtext — distinct and complementary product description */}
              <p className="mx-auto mt-5 max-w-[820px] text-center text-[15px] leading-7 text-neutral-600">
                Attendify captures multi-signal evidence (GPS, network, motion and device attestation) to produce an immutable event record.
                That record feeds automated timecards and reconciled payroll runs, surfaces exceptions to supervisors in real time,
                and preserves a searchable audit trail for compliance and dispute resolution.
              </p>

              {/* Feature chips — unique items that complement the rest of the site copy */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {[
                  "Immutable audit logs",
                  "Realtime exception alerts",
                  "Policy-driven approvals",
                  "Device attestation",
                  "Export-ready timecards",
                  "Manager mobile approvals",
                ].map((t) => (
                  <span key={t} className="rounded-full bg-white px-3 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* gentle masks */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 -bottom-24 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>
    </section>
  );
}