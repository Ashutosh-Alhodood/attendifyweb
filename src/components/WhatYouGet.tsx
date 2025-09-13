// components/WhatYouGet.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";

/* ------------------------------ Content ------------------------------- */
type Item = {
  id: number;
  title: string;
  body: string;
  side?: "left" | "right";
};

const ITEMS: Item[] = [
  {
    id: 1,
    title: "Verified Check-ins",
    body:
      "Capture a tamper-resistant record for every clock-in: timestamp, device fingerprint and location are recorded together so the event is auditable and reliable.",
    side: "left",
  },
  {
    id: 2,
    title: "Trusted Device Enrollment",
    body:
      "Quickly register phones or kiosks and scope them to employees or roles. Enrolled devices reduce unauthorized clock-ins and simplify on-floor operations.",
    side: "right",
  },
  {
    id: 3,
    title: "Spoof Detection",
    body:
      "Automatically surface suspicious activity — sudden GPS jumps, emulator signals, or impossible motion patterns — and flag events for supervisor review.",
    side: "left",
  },
  {
    id: 4,
    title: "Location Policies",
    body:
      "Create geofence zones and time windows (site boundaries, allowed hours). Violations can be blocked, annotated, or routed for manager approval automatically.",
    side: "right",
  },
  {
    id: 5,
    title: "Rosters & Shift Rules",
    body:
      "Define shift templates and publish rosters. The system resolves breaks, overtime and exceptions so exported timecards are payroll-ready.",
    side: "left",
  },
  {
    id: 6,
    title: "Payroll & HRMS Sync",
    body:
      "Push validated attendance events to payroll and HR systems via CSV, SFTP or API connectors — fewer disputes, faster payroll cycles.",
    side: "right",
  },
  {
    id: 7,
    title: "Live Assist & Support",
    body:
      "When issues arise on the floor, start a secure remote session to guide staff, share device context, and capture an audited troubleshooting log.",
    side: "left",
  },
  {
    id: 8,
    title: "Smart Leaves & Approvals",
    body:
      "Request time off with up-to-date balances, policy-aware suggestions and routed approvals so managers can act from web or mobile quickly.",
    side: "right",
  },
  {
    id: 9,
    title: "Profiles & Document Vault",
    body:
      "Store employee records, IDs and certifications in an encrypted, searchable vault with role-based access for audit and compliance needs.",
    side: "left",
  },
  {
    id: 10,
    title: "Analytics & Alerts",
    body:
      "Real-time dashboards, exportable trend reports, and configurable alerts (late check-ins, geo-violations) to surface operational issues fast.",
    side: "right",
  },
];

/* Tuning for the stacked deck animation */
const CARD_H = 140; // visual height (approx) used for spacing

/* ----------------------- Helper: stable windows computation ---------------------- */
function computeItemWindows() {
  const topInset = 6;
  const bottomInset = 6;
  const usable = 100 - topInset - bottomInset;
  return ITEMS.map((_, idx) => {
    const frac = (idx + 1) / (ITEMS.length + 1);
    const start = Math.max(0, frac - 0.06);
    const mid = frac;
    const end = Math.min(1, frac + 0.06);
    const topPercent = topInset + frac * usable;
    const topPx = idx * (CARD_H + 12);
    const side = ITEMS[idx].side ?? "left";
    return { start, mid, end, topPercent, topPx, side: side as "left" | "right" };
  });
}

/* ----------------------- Component (hooks are top-level and explicit) ----------------------- */

export default function WhatYouGet() {
  const ref = useRef<HTMLElement | null>(null);

  // smooth programmatic scrolling while mounted
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "smooth";
    return () => {
      html.style.scrollBehavior = prev || "";
    };
  }, []);

  // progress 0 -> 1 across this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const t = useSpring(scrollYProgress, { stiffness: 50, damping: 28, mass: 1.2 });

  // top-level transforms (these are not per-item loops)
  const topInset = 6; // percent from top
  const bottomInset = 6;
  const usable = 100 - topInset - bottomInset;

  const fillPct = useTransform(t, (v) => `${v * usable}%`);
  const fillTop = `${topInset}%`;

  const topPctValue = useTransform(t, (v) => topInset + usable * v);
  const indicatorTop = useMotionTemplate`${topPctValue}%`;

  const glowAlpha = useTransform(t, [0, 0.9, 1], [0.06, 0.26, 0.5]);
  const glowSize = useTransform(t, [0, 0.7, 1], [18, 28, 44]);
  const endPulseSource = useTransform(t, [0.96, 0.985, 1], [1, 1.12, 1.18]);
  const endPulse = useSpring(endPulseSource, { stiffness: 320, damping: 12, mass: 0.9 });

  const vignette = useMotionTemplate`radial-gradient(600px 220px at 50% 12%, rgba(99,102,241,${useTransform(
    t,
    (v) => 0.08 + v * 0.025
  )}), transparent 38%)`;

  // compute item windows (pure)
  const itemWindows = computeItemWindows();
  const totalStackHeightPx = Math.max(520, ITEMS.length * (CARD_H + 12));

  /* -----------------------
     IMPORTANT: call per-item transforms in a fixed, explicit order (no loops)
     This avoids the linter complaining about hooks-in-loops.
     We create hooks for indices 0..9 (10 items) because ITEMS is length 10.
     If you add more items, add more explicit hook calls.
     ------------------------ */

  // i = 0
  const w0 = itemWindows[0];
  const opacity0 = useTransform(t, [w0.start, w0.mid, w0.end], [0, 1, 1]);
  const slideX0 = useTransform(t, [w0.start, w0.end], ITEMS[0].side === "left" ? ["-34px", "0px"] : ["34px", "0px"]);
  const cardScale0 = useTransform(t, [w0.start, w0.mid, w0.end], [0.985, 1.02, 1]);
  const badgeScale0 = useTransform(t, [w0.start, w0.mid, w0.end], [0.92, 1.18, 1.02]);
  const badgeGlow0 = useTransform(t, [w0.start, w0.mid, w0.end], [0, 0.85, 0.4]);
  const badgeBoxShadow0 = useMotionTemplate`inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px rgba(99,102,241,${badgeGlow0})`;
  const connectorOpacity0 = useTransform(t, [w0.start, w0.mid], [0, 1]);

  // i = 1
  const w1 = itemWindows[1];
  const opacity1 = useTransform(t, [w1.start, w1.mid, w1.end], [0, 1, 1]);
  const slideX1 = useTransform(t, [w1.start, w1.end], ITEMS[1].side === "left" ? ["-34px", "0px"] : ["34px", "0px"]);
  const cardScale1 = useTransform(t, [w1.start, w1.mid, w1.end], [0.985, 1.02, 1]);
  const badgeScale1 = useTransform(t, [w1.start, w1.mid, w1.end], [0.92, 1.18, 1.02]);
  const badgeGlow1 = useTransform(t, [w1.start, w1.mid, w1.end], [0, 0.85, 0.4]);
  const badgeBoxShadow1 = useMotionTemplate`inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px rgba(99,102,241,${badgeGlow1})`;
  const connectorOpacity1 = useTransform(t, [w1.start, w1.mid], [0, 1]);

  // i = 2
  const w2 = itemWindows[2];
  const opacity2 = useTransform(t, [w2.start, w2.mid, w2.end], [0, 1, 1]);
  const slideX2 = useTransform(t, [w2.start, w2.end], ITEMS[2].side === "left" ? ["-34px", "0px"] : ["34px", "0px"]);
  const cardScale2 = useTransform(t, [w2.start, w2.mid, w2.end], [0.985, 1.02, 1]);
  const badgeScale2 = useTransform(t, [w2.start, w2.mid, w2.end], [0.92, 1.18, 1.02]);
  const badgeGlow2 = useTransform(t, [w2.start, w2.mid, w2.end], [0, 0.85, 0.4]);
  const badgeBoxShadow2 = useMotionTemplate`inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px rgba(99,102,241,${badgeGlow2})`;
  const connectorOpacity2 = useTransform(t, [w2.start, w2.mid], [0, 1]);

  // i = 3
  const w3 = itemWindows[3];
  const opacity3 = useTransform(t, [w3.start, w3.mid, w3.end], [0, 1, 1]);
  const slideX3 = useTransform(t, [w3.start, w3.end], ITEMS[3].side === "left" ? ["-34px", "0px"] : ["34px", "0px"]);
  const cardScale3 = useTransform(t, [w3.start, w3.mid, w3.end], [0.985, 1.02, 1]);
  const badgeScale3 = useTransform(t, [w3.start, w3.mid, w3.end], [0.92, 1.18, 1.02]);
  const badgeGlow3 = useTransform(t, [w3.start, w3.mid, w3.end], [0, 0.85, 0.4]);
  const badgeBoxShadow3 = useMotionTemplate`inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px rgba(99,102,241,${badgeGlow3})`;
  const connectorOpacity3 = useTransform(t, [w3.start, w3.mid], [0, 1]);

  // i = 4
  const w4 = itemWindows[4];
  const opacity4 = useTransform(t, [w4.start, w4.mid, w4.end], [0, 1, 1]);
  const slideX4 = useTransform(t, [w4.start, w4.end], ITEMS[4].side === "left" ? ["-34px", "0px"] : ["34px", "0px"]);
  const cardScale4 = useTransform(t, [w4.start, w4.mid, w4.end], [0.985, 1.02, 1]);
  const badgeScale4 = useTransform(t, [w4.start, w4.mid, w4.end], [0.92, 1.18, 1.02]);
  const badgeGlow4 = useTransform(t, [w4.start, w4.mid, w4.end], [0, 0.85, 0.4]);
  const badgeBoxShadow4 = useMotionTemplate`inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px rgba(99,102,241,${badgeGlow4})`;
  const connectorOpacity4 = useTransform(t, [w4.start, w4.mid], [0, 1]);

  // i = 5
  const w5 = itemWindows[5];
  const opacity5 = useTransform(t, [w5.start, w5.mid, w5.end], [0, 1, 1]);
  const slideX5 = useTransform(t, [w5.start, w5.end], ITEMS[5].side === "left" ? ["-34px", "0px"] : ["34px", "0px"]);
  const cardScale5 = useTransform(t, [w5.start, w5.mid, w5.end], [0.985, 1.02, 1]);
  const badgeScale5 = useTransform(t, [w5.start, w5.mid, w5.end], [0.92, 1.18, 1.02]);
  const badgeGlow5 = useTransform(t, [w5.start, w5.mid, w5.end], [0, 0.85, 0.4]);
  const badgeBoxShadow5 = useMotionTemplate`inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px rgba(99,102,241,${badgeGlow5})`;
  const connectorOpacity5 = useTransform(t, [w5.start, w5.mid], [0, 1]);

  // i = 6
  const w6 = itemWindows[6];
  const opacity6 = useTransform(t, [w6.start, w6.mid, w6.end], [0, 1, 1]);
  const slideX6 = useTransform(t, [w6.start, w6.end], ITEMS[6].side === "left" ? ["-34px", "0px"] : ["34px", "0px"]);
  const cardScale6 = useTransform(t, [w6.start, w6.mid, w6.end], [0.985, 1.02, 1]);
  const badgeScale6 = useTransform(t, [w6.start, w6.mid, w6.end], [0.92, 1.18, 1.02]);
  const badgeGlow6 = useTransform(t, [w6.start, w6.mid, w6.end], [0, 0.85, 0.4]);
  const badgeBoxShadow6 = useMotionTemplate`inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px rgba(99,102,241,${badgeGlow6})`;
  const connectorOpacity6 = useTransform(t, [w6.start, w6.mid], [0, 1]);

  // i = 7
  const w7 = itemWindows[7];
  const opacity7 = useTransform(t, [w7.start, w7.mid, w7.end], [0, 1, 1]);
  const slideX7 = useTransform(t, [w7.start, w7.end], ITEMS[7].side === "left" ? ["-34px", "0px"] : ["34px", "0px"]);
  const cardScale7 = useTransform(t, [w7.start, w7.mid, w7.end], [0.985, 1.02, 1]);
  const badgeScale7 = useTransform(t, [w7.start, w7.mid, w7.end], [0.92, 1.18, 1.02]);
  const badgeGlow7 = useTransform(t, [w7.start, w7.mid, w7.end], [0, 0.85, 0.4]);
  const badgeBoxShadow7 = useMotionTemplate`inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px rgba(99,102,241,${badgeGlow7})`;
  const connectorOpacity7 = useTransform(t, [w7.start, w7.mid], [0, 1]);

  // i = 8
  const w8 = itemWindows[8];
  const opacity8 = useTransform(t, [w8.start, w8.mid, w8.end], [0, 1, 1]);
  const slideX8 = useTransform(t, [w8.start, w8.end], ITEMS[8].side === "left" ? ["-34px", "0px"] : ["34px", "0px"]);
  const cardScale8 = useTransform(t, [w8.start, w8.mid, w8.end], [0.985, 1.02, 1]);
  const badgeScale8 = useTransform(t, [w8.start, w8.mid, w8.end], [0.92, 1.18, 1.02]);
  const badgeGlow8 = useTransform(t, [w8.start, w8.mid, w8.end], [0, 0.85, 0.4]);
  const badgeBoxShadow8 = useMotionTemplate`inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px rgba(99,102,241,${badgeGlow8})`;
  const connectorOpacity8 = useTransform(t, [w8.start, w8.mid], [0, 1]);

  // i = 9
  const w9 = itemWindows[9];
  const opacity9 = useTransform(t, [w9.start, w9.mid, w9.end], [0, 1, 1]);
  const slideX9 = useTransform(t, [w9.start, w9.end], ITEMS[9].side === "left" ? ["-34px", "0px"] : ["34px", "0px"]);
  const cardScale9 = useTransform(t, [w9.start, w9.mid, w9.end], [0.985, 1.02, 1]);
  const badgeScale9 = useTransform(t, [w9.start, w9.mid, w9.end], [0.92, 1.18, 1.02]);
  const badgeGlow9 = useTransform(t, [w9.start, w9.mid, w9.end], [0, 0.85, 0.4]);
  const badgeBoxShadow9 = useMotionTemplate`inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px rgba(99,102,241,${badgeGlow9})`;
  const connectorOpacity9 = useTransform(t, [w9.start, w9.mid], [0, 1]);

  /* -----------------------
     Pack the per-index MotionValues into arrays (slice to ITEMS.length)
     ------------------------ */
  const opacities: MotionValue<number>[] = [
    opacity0,
    opacity1,
    opacity2,
    opacity3,
    opacity4,
    opacity5,
    opacity6,
    opacity7,
    opacity8,
    opacity9,
  ].slice(0, ITEMS.length);

  const slideXs: MotionValue<string>[] = [
    slideX0,
    slideX1,
    slideX2,
    slideX3,
    slideX4,
    slideX5,
    slideX6,
    slideX7,
    slideX8,
    slideX9,
  ].slice(0, ITEMS.length);

  const cardScales: MotionValue<number>[] = [
    cardScale0,
    cardScale1,
    cardScale2,
    cardScale3,
    cardScale4,
    cardScale5,
    cardScale6,
    cardScale7,
    cardScale8,
    cardScale9,
  ].slice(0, ITEMS.length);

  const badgeScales: MotionValue<number>[] = [
    badgeScale0,
    badgeScale1,
    badgeScale2,
    badgeScale3,
    badgeScale4,
    badgeScale5,
    badgeScale6,
    badgeScale7,
    badgeScale8,
    badgeScale9,
  ].slice(0, ITEMS.length);

  const badgeBoxShadows: MotionValue<string>[] = [
    badgeBoxShadow0,
    badgeBoxShadow1,
    badgeBoxShadow2,
    badgeBoxShadow3,
    badgeBoxShadow4,
    badgeBoxShadow5,
    badgeBoxShadow6,
    badgeBoxShadow7,
    badgeBoxShadow8,
    badgeBoxShadow9,
  ].slice(0, ITEMS.length);

  const connectorOpacities: MotionValue<number>[] = [
    connectorOpacity0,
    connectorOpacity1,
    connectorOpacity2,
    connectorOpacity3,
    connectorOpacity4,
    connectorOpacity5,
    connectorOpacity6,
    connectorOpacity7,
    connectorOpacity8,
    connectorOpacity9,
  ].slice(0, ITEMS.length);

  /* ----------------------- DOT PULSE: explicit, typed transform -> spring ----------------------- */
  // create a MotionValue<number> source for the dot scale, then spring it.
  const dotScaleSource = useTransform<number, number>(t, (v) => (v > 0.98 ? 1.06 : 1));
  const dotScale = useSpring(dotScaleSource, { stiffness: 260, damping: 18 });

  /* ----------------------- MOBILE: simple list (no animations, no images) ----------------------- */
  const MobileList = () => (
    <div className="sm:hidden bg-neutral-50 px-4 pt-8 pb-8">
      <div className="max-w-[720px] mx-auto">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            + WHAT YOU GET
          </span>

          <h2 className="mt-4 text-2xl font-extrabold text-neutral-900">
            Everything Attendify provides — from verified check-ins to payroll-ready exports
          </h2>

          <p className="mt-2 mx-auto max-w-[44ch] text-sm text-neutral-600">
            Attendify removes doubt and manual work. Below is a clear list of capabilities you get — verification,
            automation, support and insights.
          </p>
        </div>

        <div className="space-y-4">
          {ITEMS.map((it, idx) => (
            <article
              key={it.id}
              className="rounded-2xl bg-white shadow-lg border border-transparent p-4"
              aria-label={it.title}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-400 grid place-items-center text-white font-semibold shadow">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-neutral-900">{it.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{it.body}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* small contextual chips — intentionally minimal */}
                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700">Enterprise-ready</span>
                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700">Audit-safe</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow">
            Get a demo
          </button>
        </div>
      </div>
    </div>
  );

  /* ----------------------- RENDER ----------------------- */
  return (
    <section ref={ref} aria-label="What you get" className="relative bg-neutral-50">
      {/* Mobile list (no animation, no images) */}
      <MobileList />

      {/* Desktop / Tablet: original animated timeline (unchanged) */}
      <div className="hidden sm:block" style={{ paddingTop: 120, paddingBottom: 140 }}>
        {/* ambient vignette */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: vignette }} />

        <div className="mx-auto w-[min(1200px,92vw)] px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              + WHAT YOU GET
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 leading-tight">
              Everything Attendify provides — from verified check-ins to payroll-ready exports
            </h2>

            <p className="mt-3 mx-auto max-w-3xl text-neutral-600">
              Attendify is built to remove doubt and manual work. Below is a step-by-step view of the product capabilities you get when you adopt Attendify — verification, automation, support and insights.
            </p>
          </div>

          <div className="relative mx-auto max-w-[980px]">
            <div className="relative" style={{ height: `${totalStackHeightPx}px` }}>
              {/* track background */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[6%] bottom-[6%] w-[12px] rounded-full bg-gradient-to-b from-white via-neutral-200 to-white/80"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)" }}
              />

              {/* animated fill */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-[12px] rounded-full"
                style={{
                  top: fillTop,
                  height: fillPct,
                  background:
                    "linear-gradient(180deg, rgba(99,102,241,0.95) 0%, rgba(96,165,250,0.92) 42%, rgba(16,185,129,0.95) 100%)",
                  boxShadow: "0 24px 60px rgba(99,102,241,0.12), inset 0 -6px 18px rgba(16,185,129,0.06)",
                  zIndex: 20,
                }}
              />

              {/* highlight edge */}
              <motion.div
                style={{ top: fillTop, height: fillPct }}
                className="absolute left-1/2 -translate-x-1/2 w-[12px] rounded-full pointer-events-none"
                aria-hidden
              >
                <div style={{ height: "100%", width: "100%", borderRadius: 9999, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)", opacity: 0.8 }} />
              </motion.div>

              {/* traveling glow */}
              <motion.div style={{ top: indicatorTop, opacity: glowAlpha, scale: endPulse }} className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <motion.div
                  style={{
                    height: glowSize,
                    width: glowSize,
                    borderRadius: 9999,
                    background: "radial-gradient(circle at center, rgba(99,102,241,0.25), rgba(99,102,241,0.06) 35%, transparent 60%)",
                    filter: "blur(18px)",
                  }}
                  className="rounded-full"
                  aria-hidden
                />
              </motion.div>

              {/* indicator (dot) */}
              <motion.div style={{ top: indicatorTop }} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                <div className="relative grid place-items-center">
                  <motion.div style={{ scale: dotScale }} className="h-10 w-10 rounded-full bg-white grid place-items-center shadow-sm">
                    <div style={{ border: "2px solid rgba(99,102,241,0.12)" }} />
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#4f46e5" }} />
                  </motion.div>

                  <motion.div aria-hidden className="absolute block rounded-full border border-indigo-200/40" style={{ width: 56, height: 56, opacity: useTransform(t, [0.96, 1], [0, 0.9]), scale: useTransform(t, [0.96, 1], [0.9, 1.16]), zIndex: -1 }} />
                </div>
              </motion.div>

              {/* render items */}
              {ITEMS.map((it, idx) => {
                const w = itemWindows[idx];
                const isLeft = w.side === "left";
                const cardSideClass = isLeft ? "left-0 -translate-x-12" : "right-0 translate-x-12";

                // pick the corresponding MotionValues from our arrays
                const opacity = opacities[idx];
                const slideX = slideXs[idx];
                const cScale = cardScales[idx];
                const bScale = badgeScales[idx];
                const bBox = badgeBoxShadows[idx];
                const connOpacity = connectorOpacities[idx];

                return (
                  <div key={it.id}>
                    <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{ top: `${w.topPercent}%` }} aria-hidden>
                      <div className="h-3.5 w-3.5 rounded-full bg-white" style={{ boxShadow: "0 6px 20px rgba(16,24,40,0.06)", border: "2px solid rgba(99,102,241,0.12)" }} />
                    </div>

                    <motion.div style={{ opacity: connOpacity }} className="absolute z-25" aria-hidden>
                      {isLeft ? (
                        <div style={{ top: `calc(${w.topPercent}% - 7px)`, left: "50%", width: "32%", transform: "translateX(-100%)" }} className="h-1 rounded-full">
                          <div className="h-1 w-full rounded-full" style={{ background: "linear-gradient(90deg,#60a5fa,#6366f1)", boxShadow: "0 10px 24px rgba(99,102,241,0.08)", filter: "blur(0.6px)" }} />
                        </div>
                      ) : (
                        <div style={{ top: `calc(${w.topPercent}% - 7px)`, left: "50%", width: "32%", transform: "translateX(0)" }} className="h-1 rounded-full">
                          <div className="h-1 w-full rounded-full" style={{ background: "linear-gradient(90deg,#6366f1,#60a5fa)", boxShadow: "0 10px 24px rgba(99,102,241,0.08)", filter: "blur(0.6px)" }} />
                        </div>
                      )}
                    </motion.div>

                    <motion.div style={{ top: w.topPx, opacity: opacity, x: slideX, scale: cScale }} className={`absolute w-[46%] transform -translate-y-1/2 ${cardSideClass}`}>
                      <div className="relative group rounded-2xl bg-white/95 backdrop-blur-md p-6" style={{ border: "1px solid rgba(13,21,38,0.05)", boxShadow: "0 22px 60px rgba(13,21,38,0.06)", minHeight: `${CARD_H}px` }}>
                        <div className="flex items-start gap-4">
                          <motion.div style={{ scale: bScale }} className="relative flex h-12 w-12 items-center justify-center rounded-lg">
                            <div className="absolute inset-0 rounded-lg" style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.12), rgba(96,165,250,0.06))", boxShadow: bBox as unknown as string, filter: "drop-shadow(0 6px 18px rgba(99,102,241,0.12))" }} />
                            <div className="relative z-10 h-9 w-9 grid place-items-center rounded-md bg-white text-indigo-700 font-semibold">
                              <span className="text-sm">0{idx + 1}</span>
                            </div>
                          </motion.div>

                          <div>
                            <h3 className="text-lg font-semibold text-neutral-900">{it.title}</h3>
                            <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{it.body}</p>
                          </div>
                        </div>

                        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.02), rgba(99,102,241,0.01))" }} />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {["Verified events", "Device enrollment", "Geo policies", "IoT-ready", "Payroll exports"].map((t) => (
              <span key={t} className="rounded-full bg-white px-3 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}