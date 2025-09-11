// components/Features.tsx
"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";
import { useRef, useEffect } from "react";

/* ───────────────────────────── Data ───────────────────────────── */

type Feature = {
  id: number;
  badge: string;
  title: string;
  body: string;
  img: string;
  imgAlt: string;
};

const FEATURES: Feature[] = [
  {
    id: 1,
    badge: "01",
    title: "Presence Sync",
    body:
      "Instantly associate a person, their trusted device, and the exact location of the check-in. Combine device binding with multi-signal anti-spoofing so every attendance record is provable and auditable.",
    img: "/home.png",
    imgAlt: "Attendify presence sync",
  },
  {
    id: 2,
    badge: "02",
    title: "Shifts & Records",
    body:
      "Clear, time-stamped shift timelines and auto-calculated balances remove manual reconciliation. Export-ready reports and one-click payroll sync ensure HR and payroll systems always agree.",
    img: "/history.png",
    imgAlt: "Attendify shifts & records",
  },
  {
    id: 3,
    badge: "03",
    title: "Live Assist",
    body:
      "Secure remote assist for frontline teams — initiate a verified support session, view device context, and capture audit logs. Ideal for troubleshooting in the field while preserving compliance trails.",
    img: "/profile.png",
    imgAlt: "Attendify live assist",
  },
  {
    id: 4,
    badge: "04",
    title: "Smart Leaves",
    body:
      "Policy-aware time-off planning with live balances and intelligent suggestions. Managers approve in a tap; the system recalculates accruals and feeds the results into payroll automatically.",
    img: "/personal.png",
    imgAlt: "Attendify smart leaves",
  },
  {
    id: 5,
    badge: "05",
    title: "Profiles, Docs & IoT",
    body:
      "Secure employee profiles and document storage combined with optional IoT device integration. Use mobile apps or edge devices to verify presence, collect sensor telemetry, and tie it to an employee profile for audits.",
    img: "/leaves.png",
    imgAlt: "Attendify profiles, documents and IoT integration",
  },
];

/* Tuning for the stacked deck animation */
const CARD_H = 420;
const STACK_GAP = 22;
const EXTRA_LIFT = 80;
const LIFT = -(CARD_H + STACK_GAP + EXTRA_LIFT);

/* ───────────────────────────── UI ───────────────────────────── */

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const t = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.6 });

  // Ambient stage (subtle motion so it feels alive)
  const stageOpacity = useTransform(t, [0, 1], [0.85, 1]);
  const stageShift = useTransform(t, [0, 1], ["0%", "8%"]);
  const stageBlur = useTransform(t, [0, 1], [2, 6]);
  const stageFilter = useMotionTemplate`blur(${stageBlur}px)`;

  // Glass “bed” that the cards sit on (fades right before auto-snap)
  const bedOpacity = useTransform(t, [0, 0.96, 0.985], [1, 1, 0]);
  const bedScale = useTransform(t, [0.96, 0.985], [1, 0.985]);

  // Auto-advance to the next section to avoid empty tail
  useEffect(() => {
    let done = false;
    const unsub = t.on("change", (v) => {
      if (!done && v >= 0.985) {
        done = true;
        const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
        requestAnimationFrame(() => next?.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    });
    return () => unsub();
  }, [t]);

  // Slightly tighter height so we finish as we snap
  const sectionHeightVh = FEATURES.length * 118;

  return (
    <section
      ref={sectionRef}
      style={{ height: `${sectionHeightVh}vh` }}
      aria-label="Key features"
      className="relative mt-[160px]"
    >
      {/* Ambient backdrop */}
      <motion.div
        aria-hidden
        style={{ opacity: stageOpacity, translateY: stageShift, filter: stageFilter }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-neutral-50" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-10%,rgba(99,102,241,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_110%,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.04)_100%)]" />
        {/* faint grid for a product-y feel */}
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(2,6,23,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(2,6,23,0.04)_1px,transparent_1px)] [background-size:20px_20px]" />
      </motion.div>

      <div className="sticky top-0">
        <div className="mx-auto w-[min(1200px,92vw)] pt-20 pb-10">
          {/* Header block with Attendify context */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-indigo-600">
              ✚ FEATURES
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-[44px] font-semibold leading-tight text-neutral-900">
              Built for reliable attendance and automated payroll
            </h2>
            <p className="mx-auto mt-3 max-w-[780px] text-[15px] leading-7 text-neutral-600">
              Attendify ties <span className="font-medium text-neutral-800">people, place, and device</span> to every check-in.
              Anti-spoofing, trusted device binding and geo-fencing prove presence while automation pushes verified events to payroll and HR systems.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {["Anti-spoofing", "Device binding", "Geo-fencing", "IoT + GPS", "HRMS/ERP sync"].map((t) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-full bg-white/80 px-3 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Card stack */}
          <div className="relative h-[560px] sm:h-[600px] flex items-end">
            <div className="relative h-[520px] w-full">
              {/* glass bed */}
              <motion.div
                style={{ opacity: bedOpacity, scale: bedScale }}
                className="absolute inset-0 rounded-[24px] bg-white/65 backdrop-blur-[2px] shadow-[0_18px_60px_rgba(2,6,23,0.06)] ring-1 ring-black/5 pointer-events-none"
              />

              {/* cards (zIndex puts 1st on top so it moves first) */}
              {FEATURES.map((f, i) => (
                <FeatureCard key={f.id} feature={f} index={i} count={FEATURES.length} progress={t} />
              ))}
            </div>
          </div>

          {/* tiny hint below */}
          <div className="mt-3 flex justify-center">
            <span className="text-xs text-neutral-500">Scroll to explore Attendify features</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Card ───────────────────────────── */

function FeatureCard({
  feature,
  index,
  count,
  progress,
}: {
  feature: Feature;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / count; // each card gets a segment of the scroll
  const start = index * seg;
  const end = Math.min(1, start + seg);

  // motion along its segment
  const y = useTransform(progress, [start, end], [0, LIFT], { clamp: true });
  const scale = useTransform(progress, [start, end], [1, 0.985], { clamp: true });
  const blurPx = useTransform(progress, [start, end], [0, 0.6], { clamp: true });
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const shadow = useTransform(
    progress,
    [start, end],
    ["0 28px 90px rgba(2,6,23,0.12)", "0 12px 36px rgba(2,6,23,0.06)"],
    { clamp: true }
  );
  const fade = useTransform(progress, [start, end], [1, 0.86]);

  return (
    <motion.article
      style={{
        top: index * 10,
        y,
        scale,
        filter,
        boxShadow: shadow,
        opacity: fade,
        zIndex: count - index,
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 20, mass: 0.6 }}
      className="absolute left-0 right-0 mx-6 sm:mx-8 md:mx-10 origin-top will-change-transform
                 rounded-[24px] bg-white ring-1 ring-black/5 p-6 sm:p-8"
      aria-label={feature.title}
    >
      {/* subtle gradient frame */}
      <div className="absolute -inset-px rounded-[24px] bg-[linear-gradient(135deg,rgba(99,102,241,0.12),transparent_40%,rgba(16,185,129,0.12))] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6 md:flex-row">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="mt-1 grid size-9 shrink-0 place-items-center rounded-xl bg-neutral-900 text-white text-xs font-semibold">
              {feature.badge}
            </div>
            <div>
              <h3 className="text-[22px] sm:text-[26px] font-semibold text-neutral-900">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-[48ch] text-[15px] leading-6 text-neutral-600">
                {feature.body}
              </p>

              {/* micro-benefits row */}
              <div className="mt-3 flex flex-wrap gap-2">
                {index === 0 &&
                  ["Trusted device binding", "Multi-signal checks", "Full audit logs"].map((t) => (
                    <Chip key={t} label={t} />
                  ))}
                {index === 1 &&
                  ["Shift timelines", "Auto accruals", "CSV / payroll exports"].map((t) => (
                    <Chip key={t} label={t} />
                  ))}
                {index === 2 &&
                  ["End-to-end sessions", "Remote device control", "Compliance traces"].map((t) => (
                    <Chip key={t} label={t} />
                  ))}
                {index === 3 &&
                  ["Policy-aware requests", "Live balance preview", "One-tap approvals"].map((t) => (
                    <Chip key={t} label={t} />
                  ))}
                {index === 4 &&
                  ["Role-based access", "Encrypted docs", "IoT device pairing"].map((t) => (
                    <Chip key={t} label={t} />
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <PhoneShot src={feature.img} alt={feature.imgAlt} />
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────── Small UI bits ─────────────────────────── */

function Chip({ label }: { label: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35 }}
      className="rounded-full bg-neutral-50 px-2.5 py-1 text-[11px] text-neutral-700 ring-1 ring-neutral-200"
    >
      {label}
    </motion.span>
  );
}

function PhoneShot({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      whileHover={{ rotate: -1.5, y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="relative w-[188px] sm:w-[208px]"
    >
      {/* glow */}
      <div className="absolute -inset-2 rounded-[30px] bg-indigo-500/10 blur-2xl" />
      {/* frame */}
      <div className="relative overflow-hidden rounded-[26px] bg-black ring-1 ring-black/40 shadow-[0_16px_40px_rgba(2,6,23,0.25)]">
        {/* notch */}
        <div className="absolute left-1/2 top-0 z-10 h-1.5 w-20 -translate-x-1/2 rounded-b-xl bg-black/70" />
        {/* screen */}
        <Image
          src={src}
          alt={alt}
          width={420}
          height={840}
          className="h-auto w-full object-cover"
          priority={false}
        />
        {/* caption glass */}
        <div className="absolute bottom-2 left-1/2 z-10 w-[92%] -translate-x-1/2 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 p-[1px]">
          <div className="rounded-2xl bg-white/10 px-3 py-2 text-[11px] text-white backdrop-blur-md">
            Attendify — Presence verified attendance
          </div>
        </div>
      </div>
    </motion.div>
  );
}