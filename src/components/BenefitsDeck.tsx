// src/components/BenefitsDeck.tsx
"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

type Benefit = {
  id: number;
  title: string;
  body: string;
  icon: string; // image that becomes the in-device screen
};

const BENEFITS: Benefit[] = [
  {
    id: 1,
    title: "Verified Clock-ins",
    body:
      "Every clock-in is captured with multi-signal evidence (GPS, network and device attestation) so you have tamper-resistant events for auditing and dispute resolution.",
    icon: "/personal.png",
  },
  {
    id: 2,
    title: "Payroll-Ready Timecards",
    body:
      "Automatically aggregate shifts, breaks and overtime into exportable, reconciliation-ready timecards — cut payroll cycles and reduce manual corrections.",
    icon: "/history.png",
  },
  {
    id: 3,
    title: "Remote Support Sessions",
    body:
      "Supervisors can launch secure assist sessions (screen view, guided steps, temporary controls) to resolve field issues quickly while producing a compliance log.",
    icon: "/home.png",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function BenefitsDeck() {
  const sceneRef = useRef<HTMLDivElement>(null);

  // 0 → 1 across the whole scene
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });
  const t = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.6 });

  // Ambient stage effects
  const stageOpacity = useTransform(t, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.92]);
  const stageBlur = useTransform(t, [0, 1], [3, 8]);
  const blurFilter = useMotionTemplate`blur(${stageBlur}px)`;
  const stageScale = useTransform(t, [0, 0.5, 1], [0.985, 1, 0.995]);

  return (
    <section
      ref={sceneRef}
      aria-label="Benefits"
      className="relative overflow-hidden"
      /* Increased overall section height so the sticky stage has more scroll room */
      style={{ height: "130vh" }}
    >
      {/* Backplate */}
      <div className="absolute inset-0 bg-neutral-50" />

      {/* Ambient gradients + soft grid */}
      <motion.div
        style={{ opacity: stageOpacity, filter: blurFilter, scale: stageScale }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1000px_480px_at_50%_-10%,rgba(99,102,241,0.11),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_12%_110%,rgba(16,185,129,0.085),transparent_60%)]" />
        <div
          className="absolute inset-6 rounded-[28px] opacity-[0.26]
          [background-image:linear-gradient(rgba(2,6,23,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(2,6,23,0.05)_1px,transparent_1px)]
          [background-size:22px_22px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.04)_100%)]" />
      </motion.div>

      {/* Sticky stage */}
      <div className="sticky top-24 z-10">
        <div className="mx-auto w-[min(1200px,92vw)] px-4">
          {/* Heading */}
          <header className="text-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-indigo-600">
              ✚ WHY TEAMS CHOOSE ATTENDIFY
            </span>
            <h2 className="mt-3 text-[32px] sm:text-[38px] md:text-[48px] font-semibold tracking-tight text-neutral-900">
              Prove presence. Automate the busywork.
            </h2>
            <p className="mx-auto mt-3 max-w-[820px] text-[15px] leading-7 text-neutral-600">
              Attendify verifies every check-in with device binding, anti-spoofing, and geo-fencing—then
              syncs clean data to payroll and HRMS. Here’s how it feels in day-to-day work.
            </p>
          </header>

          {/* Deck area — one trio only */}
          {/* Increased deck container height to give the cards more vertical travel */}
          <div className="relative h-[900px] grid place-items-center">
            {/* Center glow */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="h-[260px] w-[260px] rounded-full bg-indigo-500/12 blur-2xl" />
            </div>
            {/* sparkle */}
            <motion.div
              className="pointer-events-none absolute -top-6 right-[18%] h-6 w-6 rounded-full bg-white/60"
              initial={{ opacity: 0, scale: 0.6, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />

            {BENEFITS.map((b, i) => (
              <DeckCard key={b.id} i={i} total={BENEFITS.length} t={t} benefit={b} />
            ))}

            {/* Ground glow */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 h-24 w-[70%] rounded-[50%] bg-indigo-500/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  DeckCard                                  */
/* -------------------------------------------------------------------------- */

function DeckCard({
  i,
  total,
  t,
  benefit,
}: {
  i: number;
  total: number;
  t: MotionValue<number>;
  benefit: Benefit;
}) {
  /**
   * 0.00 → 0.25 : fan out (left/middle/right)
   * 0.25 → 0.60 : stack to center
   * 0.60 → 1.00 : last card lifts/rotates/shrinks ; others dim slightly
   */
  const dir = i === 0 ? -1 : i === total - 1 ? 1 : 0;

  // Fan out
  const fanX = useTransform(t, [0, 0.25], [0, dir * 180]);
  const fanR = useTransform(t, [0, 0.25], [0, dir * 12]);
  const fanY = useTransform(t, [0, 0.25], [0, i === 1 ? -10 : 16]);

  // Stack back
  const stackX = useTransform(t, [0.25, 0.6], [dir * 180, 0]);
  const stackR = useTransform(t, [0.25, 0.6], [dir * 12, 0]);
  const stackY = useTransform(t, [0.25, 0.6], [i === 1 ? -10 : 16, 0]);

  // combine with explicit tuple typing so TS knows these are numbers
  const x = useTransform([fanX, stackX] as [MotionValue<number>, MotionValue<number>], (vals) => {
    const [a, b] = vals as [number, number];
    return a + b;
  });

  // combined vertical motion: fanY + stackY
  const combinedFanStackY = useTransform(
    [fanY, stackY] as [MotionValue<number>, MotionValue<number>],
    (vals) => {
      const [a, b] = vals as [number, number];
      return a + b;
    }
  );

  // Late phase
  const isLast = i === total - 1;
  const scale = useTransform(t, [0.6, 1], [1, isLast ? 0.2 : 0.95]);
  const lift = useTransform(t, [0.6, 1], [0, isLast ? -90 : 0]);
  const roll = useTransform(t, [0.6, 1], [0, isLast ? 24 : 0]);
  const fade = useTransform(t, [0.6, 0.85, 1], [1, isLast ? 1 : 0.6, isLast ? 0 : 0.1]);

  // Parallax
  const parallax = useTransform(t, [0, 1], [i === 1 ? -8 : -4 * dir, i === 1 ? 8 : 4 * dir]);

  // final vertical motion = fan+stack + lift + parallax
  const finalY = useTransform(
    [combinedFanStackY, lift, parallax] as [MotionValue<number>, MotionValue<number>, MotionValue<number>],
    (vals) => {
      const [baseY, l, p] = vals as [number, number, number];
      return baseY + l + p;
    }
  );

  const rotateZ = useTransform([fanR, stackR] as [MotionValue<number>, MotionValue<number>], (vals) => {
    const [a, b] = vals as [number, number];
    return a + b;
  });

  return (
    <motion.article
      initial={{ y: 30, opacity: 0 }} // ▼ spring-in from bottom (30px)
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      style={{
        x,
        y: finalY,
        translateY: parallax,
        rotate: roll,
        rotateZ,
        scale,
        opacity: fade,
        zIndex: 50 - i,
      }}
      className="absolute w-[min(350px,92vw)]"
      aria-label={benefit.title}
    >
      <DeviceCard title={benefit.title} body={benefit.body} img={benefit.icon} />
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 DeviceCard                                 */
/* -------------------------------------------------------------------------- */

function DeviceCard({ title, body, img }: { title: string; body: string; img: string }) {
  return (
    <div
      className="
        relative rounded-[30px] bg-white ring-1 ring-black/5
        shadow-[0_40px_140px_rgba(2,6,23,0.14)]
      "
    >
      {/* subtle metal rim */}
      <div className="absolute inset-0 rounded-[30px] bg-[linear-gradient(135deg,rgba(2,6,23,0.06),transparent)] pointer-events-none" />

      {/* Device frame */}
      <div className="relative mx-4 mt-4 rounded-[24px] overflow-hidden bg-black ring-1 ring-black/10">
        {/* notch */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-24 rounded-b-xl bg-black/70 z-10" />
        {/* inner sheen */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_35%,rgba(0,0,0,0.15)_100%)]" />

        {/* Screen (taller) */}
        <div className="relative w-full aspect-[9/18]">
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 420px, 460px"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* Blue glass caption (Attendify copy style) */}
        <div className="absolute left-1/2 bottom-3 -translate-x-1/2 w-[92%] rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 p-[1px]">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md px-4 py-3 text-white shadow-[0_10px_30px_rgba(30,41,59,0.35)]">
            <div className="text-[13px] font-semibold">{title}</div>
            <p className="mt-1 text-[12px] leading-5 text-indigo-50/90">{body}</p>
          </div>
        </div>
      </div>

      {/* bed shadow */}
      <div className="pointer-events-none absolute -bottom-6 left-10 right-10 h-9 rounded-[22px] bg-black/10 blur-2xl" />
    </div>
  );
}