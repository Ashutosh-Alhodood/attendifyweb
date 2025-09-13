"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Rotating words tuned for Attendify: short, action-driven, and meaningful
  when read in the headline: "instantly <word> your operations."
*/
const WORDS = [
  { text: "validate", bg: "rgba(16,185,129,0.28)" },   // trust / verification
  { text: "streamline", bg: "rgba(99,102,241,0.28)" }, // product flow / efficiency
  { text: "secure", bg: "rgba(245,158,11,0.28)" },     // attention / safety
];

function AnimatedWord() {
  const [idx, setIdx] = useState(0);
  const measurerRef = useRef<HTMLSpanElement>(null);

  const current = WORDS[idx % WORDS.length];

  // Rotate words every 1.8s
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-flex items-center justify-center align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={current.text}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative z-10 px-3 py-0.5 rounded-lg font-semibold"
          style={{
            background: current.bg,
            fontSize: "inherit",
            lineHeight: "1.1",
          }}
        >
          {current.text}
        </motion.span>
      </AnimatePresence>

      {/* hidden measurer */}
      <span ref={measurerRef} className="invisible absolute" aria-hidden>
        {current.text}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[96px] sm:pt-[110px] md:pt-[160px] pb-12 sm:pb-16 md:pb-20"
      aria-label="Attendify hero section"
    >
      {/* Ambient stage gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-neutral-50" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-10%,rgba(99,102,241,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_10%_110%,rgba(16,185,129,0.09),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-[980px] px-4">
        {/* container that centers and gives a card-like feel on mobile */}
        <div className="mx-auto w-full text-center">
          {/* kicker */}
          <div className="mx-auto mb-4 grid place-items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-indigo-600">
              ATTENDIFY · PRESENCE PLATFORM
            </span>
          </div>

          {/* headline - responsive */}
          <h1 className="mx-auto font-semibold tracking-[-0.02em] text-neutral-900 max-w-[900px]"
              style={{ lineHeight: 1.12 }}
          >
            <span className="text-[28px] leading-[1.08] sm:text-[36px] sm:leading-[1.08] md:text-[64px] md:leading-[1.15] block">
              Make every check-in provable
            </span>

            <span className="block mt-2 text-[34px] sm:text-[40px] md:text-[64px] font-semibold leading-[1.02]">
              instantly{" "}
              <span className="inline-block align-middle">
                <AnimatedWord />
              </span>{" "}
              your operations.
            </span>
          </h1>

          {/* lead paragraph — adjusts on mobile for readability */}
          <p className="mx-auto mt-4 max-w-[780px] text-[15px] sm:text-[16px] md:text-[18px] text-neutral-600">
            Attendify links people, place, and device into a single verified event. Multi-signal anti-spoofing
            (GPS, network, motion), device binding and geofencing make attendance auditable. Automate approvals
            and push verified records straight into payroll, HRMS, or ERP.
          </p>

          {/* value badges - stacked compact on mobile */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { t: "Real-time alerts", i: "⚡" },
              { t: "Policy auto-enforce", i: "🧭" },
              { t: "Complete audit logs", i: "📑" },
              { t: "Offline resilient", i: "📶" },
              { t: "SSO & SAML", i: "🔐" },
            ].map((b) => (
              <span
                key={b.t}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-3 py-1 text-[13px] text-neutral-700 shadow-[0_8px_20px_rgba(2,6,23,0.05)]"
              >
                <span aria-hidden>{b.i}</span>
                {b.t}
              </span>
            ))}
          </div>

          {/* CTAs - stacked full width on mobile, side-by-side on sm+ */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="#cta"
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,6,23,0.18)] transition hover:opacity-90"
            >
              Get a personalized demo
            </a>

            <a
              href="#benefits"
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:border-neutral-300"
            >
              Explore features
            </a>
          </div>

          {/* social proof / quick stats aligned with your project */}
          <div className="mt-5 flex flex-col sm:flex-row items-center sm:justify-center gap-3 text-xs text-neutral-500">
            <span className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-neutral-200">Trusted across 200+ sites</span>
            <span className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-neutral-200">Cuts admin time by ~6 hours / week</span>
            <span className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-neutral-200">Enterprise-ready compliance</span>
          </div>
        </div>
      </div>
    </section>
  );
}