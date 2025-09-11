// components/ShowcaseDeck.tsx
"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ───────────────── Scroll lock that preserves scroll position ───────────────── */
function useScrollLock(locked: boolean) {
  const savedY = useRef(0);

  useEffect(() => {
    if (!locked) return;

    savedY.current = window.scrollY;

    // typed event handlers
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      // returning false is not necessary for add/removeEventListener but kept for parity
      return false;
    };
    const blockKeys = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(e.key)) e.preventDefault();
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${savedY.current}px`;
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

      window.scrollTo({ top: savedY.current });
    };
  }, [locked]);
}

/* ─────────────── Pin while animating, then hold for `holdMs`, then release ─────────────── */
/* NOTE: accept a RefObject that may contain null so callers using useRef<HTMLDivElement>(null)
   are compatible without casting. */
function useProgressGate(
  sectionRef: React.RefObject<HTMLElement | null>,
  progress: MotionValue<number>,
  holdMs = 10000
) {
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);
  const released = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (released.current) return;
        setLocked(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      if (!finished && v >= 0.999) setFinished(true);
    });
    return () => unsub();
  }, [progress, finished]);

  useEffect(() => {
    if (!finished || released.current) return;
    const id = setTimeout(() => {
      released.current = true;
      setLocked(false);

      const current = sectionRef.current;
      const next = current?.nextElementSibling as HTMLElement | null;
      if (!next) return;
      const y = window.scrollY + next.getBoundingClientRect().top;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, holdMs);

    return () => clearTimeout(id);
  }, [finished, holdMs, sectionRef]);

  useScrollLock(locked);
}

/* ───────────────────────────────────────────────────────────────────────────── */

export default function ShowcaseDeck() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const t = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.6 });

  // Hold & release scroll
  useProgressGate(sectionRef, t, 10000);

  /* ────── Text first, then device ────── */
  // Text appears early, holds, then fades out before device shows
  const textOpacity = useTransform(t, [0.0, 0.18, 0.35, 0.45], [0, 1, 1, 0]);
  const textY = useTransform(t, [0.0, 0.18], [12, 0]);

  // Device waits for text to start leaving, then fades/scales in
  const deviceOpacity = useTransform(t, [0.0, 0.33, 0.50], [0, 0, 1]);
  const deviceY = useTransform(t, [0.35, 0.70, 1], [40, -2, -8]);
  const deviceScale = useTransform(t, [0.35, 0.70, 1], [0.96, 0.995, 1]);

  /* Device wrapper height grows by up to 50px */
  const deviceExtra = useTransform(t, [0, 0.6, 1], [0, 30, 50]); // px
  const deviceHeight = useMotionTemplate`calc(80vh + ${deviceExtra}px)`;

  /* Screen insets */
  const screenBottomInset = 26; // px

  /* Layout breathing room */
  const widgetsBottom = useTransform(t, [0, 0.6, 1], ["18%", "14%", "9%"]);
  const verticalGap = useTransform(t, [0, 0.6, 1], [8, 18, 28]);
  const widgetsBottomWithGap = useMotionTemplate`calc(${widgetsBottom} + 35px)`; // +35px buffer

  /* Shadows for KPI cards */
  const shadowAlpha = useTransform(t, [0, 1], [0.08, 0.22]);
  const softShadow = useMotionTemplate`0 30px 80px rgba(2 6 23 / ${shadowAlpha})`;

  /* Card trajectories — scattered → aligned */
  const tl_x = useTransform(t, [0, 1], ["-22vw", "0vw"]);
  const tl_y = useTransform(t, [0, 1], ["-6vh", "0vh"]);
  const tl_r = useTransform(t, [0, 0.6, 1], [-9, -3, 0]);

  const tr_x = useTransform(t, [0, 1], ["22vw", "0vw"]);
  const tr_y = useTransform(t, [0, 1], ["-5vh", "0vh"]);
  const tr_r = useTransform(t, [0, 0.6, 1], [9, 3, 0]);

  const bl_x = useTransform(t, [0, 1], ["-18vw", "0vw"]);
  const bl_y = useTransform(t, [0, 1], ["14vh", "0vh"]);
  const bl_r = useTransform(t, [0, 0.6, 1], [6, 2, 0]);

  const br_x = useTransform(t, [0, 1], ["18vw", "0vw"]);
  const br_y = useTransform(t, [0, 1], ["15vh", "0vh"]);
  const br_r = useTransform(t, [0, 0.6, 1], [-5, -2, 0]);

  /* Subtle moving sheen on the screen */
  const sweepX = useTransform(t, [0, 1], ["-40%", "140%"]);
  const sweep = useMotionTemplate`radial-gradient(120px 200px at ${sweepX} 30%, rgba(255 255 255 / 0.18), transparent 60%)`;

  return (
    <section ref={sectionRef} className="relative overflow-visible -mt-28 sm:-mt-36 h-[260vh]">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="relative mx-auto w-[min(1100px,92vw)] rounded-[28px]">

          {/* ───── Attendify headline & chips (appears first) ───── */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="pointer-events-none absolute -top-0 left-0 right-0 z-[15]"
          >
            <div className="pointer-events-auto flex flex-col items-center text-center px-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-indigo-600">
                ATTENDIFY LIVE
              </span>

              <h2 className="mt-3 max-w-3xl text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-neutral-900">
                Live insights that prove who was where — and when.
              </h2>

              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-neutral-600">
                Attendify continuously validates check-ins using device binding, multi-signal anti-spoofing, and
                proximity verification. Verified events are tagged, timestamped, and delivered to your payroll or HR stack.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {[
                  "Audit-ready records",
                  "Device & user binding",
                  "Geo-fence enforcement",
                  "Edge-first offline sync",
                  "Payroll & HR integrations",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/80 px-3 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Device wrapper with animated height */}
          <motion.div style={{ height: deviceHeight }} className="relative rounded-[28px]">
            {/* Device housing (hidden until text fades) */}
            <motion.div
              style={{ y: deviceY, scale: deviceScale, opacity: deviceOpacity }}
              className="absolute inset-0 rounded-[28px]"
            >
              <div className="relative h-full w-full rounded-[28px] bg-neutral-900 shadow-[0_40px_120px_rgba(2,6,23,0.25)]">
                {/* top bar */}
                <div className="absolute left-[18px] right-[18px] top-[14px] h-[12px] rounded-[8px] bg-neutral-800/90 ring-1 ring-black/50" />
                {/* bezel layers */}
                <div className="absolute inset-[10px] rounded-[24px] bg-neutral-800" />
                <div className="absolute inset-[18px] rounded-[20px] bg-neutral-700/40 backdrop-blur-[1px] ring-1 ring-black/40" />
                {/* screen */}
                <div
                  style={{ top: 26, left: 26, right: 26, bottom: screenBottomInset }}
                  className="absolute rounded-[16px] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,#1f2226,#181a1e_50%,#14161a)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(91,123,255,0.12),transparent_30%,transparent_70%,rgba(255,136,178,0.12))]" />
                  <div className="absolute inset-0 rounded-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_0_80px_rgba(0,0,0,0.35)]" />
                  <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.08),transparent)] blur-3xl" />
                  <div className="absolute -right-28 bottom-10 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)] blur-3xl" />
                  <motion.div style={{ backgroundImage: sweep }} className="absolute inset-0" />
                  <div className="absolute right-6 top-5 h-8 w-28 rounded-xl bg-white/70 ring-1 ring-black/10" />
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/50" />
              </div>
            </motion.div>

            {/* Middle widgets — lifted by 35px via calc(); hidden until device shows */}
            <motion.div
              style={{ bottom: widgetsBottomWithGap, opacity: deviceOpacity }}
              className="absolute left-[7%] right-[7%] top-[29%] z-[5]"
            >
              <motion.div style={{ gap: verticalGap }} className="grid grid-cols-12">
                <div className="col-span-7">
                  <WidgetShell title="Live roster">
                    <UserRow name="Priya Singh"   role="Shift Lead" site="Plant A"      status="Present" />
                    <UserRow name="Marco Alvarez" role="Loader"     site="Warehouse 3" status="Present" />
                    <UserRow name="Sunita Rao"    role="Picker"     site="Dock 1"      status="Late" />
                    <UserRow name="Daniel Park"   role="Driver"     site="Route 11"    status="On Site" />
                    <UserRow name="Nadia Hussein" role="Operator"   site="Packing"     status="Absent" />
                  </WidgetShell>
                </div>

                <motion.div style={{ gap: verticalGap }} className="col-span-5 grid grid-rows-2">
                  <WidgetShell title="Verification trends">
                    <TrendStub />
                  </WidgetShell>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* KPI cards — also gated by deviceOpacity */}
            <motion.div
              style={{ x: tl_x, y: tl_y, rotate: tl_r, boxShadow: softShadow, opacity: deviceOpacity }}
              className="absolute left-[7%] top-[8%] w-[42%] max-w-[520px] min-h-[150px] z-10"
            >
              <KpiCard
                title="Active Devices"
                value="128"
                delta="—2.1%"
                gradient="from-[#2B2E4A] via-[#2B2E4A] to-[#3B2C59]"
                icon="📱"
              />
            </motion.div>

            <motion.div
              style={{ x: tr_x, y: tr_y, rotate: tr_r, boxShadow: softShadow, opacity: deviceOpacity }}
              className="absolute right-[7%] top-[8%] w-[42%] max-w-[520px] min-h-[150px] z-10"
            >
              <KpiCard
                title="Present Today"
                value="312"
                delta="+1.8%"
                gradient="from-[#145D56] via-[#1B6E63] to-[#1E7B6D]"
                icon="🕒"
              />
            </motion.div>

            <motion.div
              style={{ x: bl_x, y: bl_y, rotate: bl_r, boxShadow: softShadow, opacity: deviceOpacity }}
              className="absolute left-[7%] bottom-[6%] w-[41%] max-w-[500px] min-h-[150px] z-10"
            >
              <KpiCard
                title="Late arrivals"
                value="14"
                delta="+0.5%"
                gradient="from-[#4B166A] via-[#5A1D75] to-[#6A2390]"
                icon="⚠️"
              />
            </motion.div>

            <motion.div
              style={{ x: br_x, y: br_y, rotate: br_r, boxShadow: softShadow, opacity: deviceOpacity }}
              className="absolute right-[7%] bottom-[6%] w-[42%] max-w-[520px] min-h-[150px] z-10"
            >
              <KpiCard
                title="On Break"
                value="8"
                delta="—0.4%"
                gradient="from-[#143E7F] via-[#154A93] to-[#1858AC]"
                icon="☕"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Components ─────────────────────────── */

function KpiCard({
  title,
  value,
  delta,
  icon,
  gradient,
}: {
  title: string;
  value: string;
  delta: string;
  icon: string;
  gradient: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl p-4 text-white",
        "border border-white/10 ring-1 ring-black/10",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_34px_rgba(2,6,23,0.28)]",
        "min-h-[150px]",
        `bg-gradient-to-br ${gradient}`,
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div className="text-[13px] opacity-85">{title}</div>
        <div className="grid size-7 place-items-center rounded-lg bg-white/10">{icon}</div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-300 ring-1 ring-emerald-400/30">
          {delta}
        </span>
      </div>

      <div className="mt-4 h-6 w-full rounded-xl bg-white/10 ring-1 ring-white/10" />
    </div>
  );
}

function WidgetShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="h-full w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white/90 ring-1 ring-black/40 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_24px_rgba(0,0,0,0.25)]">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[12px] font-medium tracking-wide text-white/80">{title}</div>
        <div className="h-6 w-16 rounded-full bg-white/10" />
      </div>
      <div className="h-[calc(100%-28px)]">{children}</div>
    </div>
  );
}

function UserRow({
  name,
  role,
  site,
  status,
}: {
  name: string;
  role: string;
  site: string;
  status: "Present" | "Late" | "Break" | "Absent" | "On Site";
}) {
  const color =
    status === "Present"
      ? "bg-emerald-500/20 text-emerald-300 ring-emerald-400/30"
      : status === "Late"
      ? "bg-amber-500/20 text-amber-300 ring-amber-400/30"
      : status === "Break"
      ? "bg-sky-500/20 text-sky-300 ring-sky-400/30"
      : status === "On Site"
      ? "bg-sky-400/20 text-sky-200 ring-sky-300/30"
      : "bg-rose-500/20 text-rose-300 ring-rose-400/30";

  return (
    <div className="flex items-center justify-between rounded-xl px-2 py-2 hover:bg-white/5">
      <div className="flex items-center gap-3">
        <div className="grid size-8 place-items-center rounded-lg bg-white/10 text-[12px]">
          {name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </div>
        <div>
          <div className="text-[13px]">{name}</div>
          <div className="text-[11px] text-white/60">
            {role} • {site}
          </div>
        </div>
      </div>
      <span className={`rounded-full px-2 py-0.5 text-[11px] ring-1 ${color}`}>{status}</span>
    </div>
  );
}

function TrendStub() {
  return (
    <svg className="h-full w-full" viewBox="0 0 400 120">
      <defs>
        <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(91,123,255,0.45)" />
          <stop offset="100%" stopColor="rgba(91,123,255,0.00)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="120" rx="12" fill="rgba(255,255,255,0.03)" />
      <polyline
        points="0,80 40,78 80,74 120,70 160,65 200,68 240,55 280,60 320,48 360,54 400,46"
        fill="none"
        stroke="rgba(160,175,255,0.9)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon
        points="0,120 0,80 40,78 80,74 120,70 160,65 200,68 240,55 280,60 320,48 360,54 400,46 400,120"
        fill="url(#fill)"
      />
    </svg>
  );
}