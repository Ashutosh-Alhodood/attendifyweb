// components/Security.tsx
"use client";

import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/** Simple inline icons so you don’t need extra deps */
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 3l7 3v6c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3Z" strokeWidth="1.5" />
      <path d="M9.5 12.5l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GpsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="3.5" strokeWidth="1.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="8" strokeWidth="1.2" />
    </svg>
  );
}
function DeviceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="4" y="3" width="16" height="12" rx="2" strokeWidth="1.5" />
      <rect x="7" y="16" width="10" height="5" rx="1.5" strokeWidth="1.5" />
    </svg>
  );
}
function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="5" y="10" width="14" height="10" rx="2" strokeWidth="1.5" />
      <path d="M8 10V8a4 4 0 118 0v2" strokeWidth="1.5" />
      <circle cx="12" cy="15" r="1.5" />
    </svg>
  );
}
function FaceIdIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M4 7V5a1 1 0 011-1h2M20 7V5a1 1 0 00-1-1h-2M4 17v2a1 1 0 001 1h2M20 17v2a1 1 0 01-1 1h-2" strokeWidth="1.5" />
      <path d="M9 10h.01M15 10h.01M9 14c1 .8 2 .8 3 .8s2 0 3-.8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Security() {
  // Updated Attendify-focused copy — all lines are new and distinct
  const items = [
    {
      t: "Mock-location detection",
      d: "Identify impossible GPS jumps and spoofing patterns so only legitimate check-ins advance to timesheets.",
      Icon: GpsIcon,
    },
    {
      t: "Trusted-device enrollment",
      d: "Register and manage permitted devices per user or role — instantly revoke access for lost or compromised phones.",
      Icon: DeviceIcon,
    },
    {
      t: "Data protection & keys",
      d: "Strong encryption and tenant-specific keying keep attendance records confidential and tamper-evident.",
      Icon: LockIcon,
    },
    {
      t: "Optional biometric MFA",
      d: "Enable biometric verification for high-security sites — fast, privacy-respecting, and optional per policy.",
      Icon: FaceIdIcon,
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.6 });

  // progress-driven ring & glow
  const ring = useTransform(p, [0, 1], ["0", "100"]);
  const glow = useTransform(p, [0, 1], [0.25, 0.55]);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { margin: "-20% 0px -20% 0px", once: true });

  return (
    <section id="security" ref={sectionRef} className="relative overflow-hidden py-20">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-neutral-50" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_460px_at_82%_-10%,rgba(99,102,241,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_110%,rgba(34,197,94,0.09),transparent)]" />
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="h-full w-full bg-[linear-gradient(#eceef3_1px,transparent_1px),linear-gradient(90deg,#eceef3_1px,transparent_1px)] bg-[size:28px_28px]" />
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: ["0% 0%", "120% 50%", "0% 0%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent)",
            backgroundSize: "250% 250%",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* header + animated shield */}
        <div className="relative grid place-items-center">
          <div ref={headerRef} className="text-center">
            <motion.p
              className="text-[11px] font-semibold tracking-[0.18em] text-indigo-600"
              initial={{ opacity: 0, y: 6 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              RISK REDUCTION
            </motion.p>

            <motion.h2
              className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900"
              initial={{ opacity: 0, y: 8 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Security that fits frontline operations
            </motion.h2>

            <motion.p
              className="mx-auto mt-3 max-w-2xl text-neutral-600"
              initial={{ opacity: 0, y: 8 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Practical controls for on-site teams: verify location signals, secure the devices in use, and keep a tamper-evident record of every event.
            </motion.p>
          </div>

          {/* animated shield badge */}
          <div className="relative mt-10 mb-6 h-28 w-28">
            <motion.div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl" style={{ opacity: glow }} />
            <svg viewBox="0 0 120 120" className="absolute inset-0">
              <defs>
                <linearGradient id="secRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="52" stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                stroke="url(#secRing)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="327"
                strokeDashoffset={useTransform(ring, (v) => 327 - (Number(v) / 100) * 327)}
              />
            </svg>

            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-full bg-white shadow-[0_10px_30px_rgba(2,6,23,0.10)] p-3">
                <ShieldIcon className="h-10 w-10 text-neutral-900" />
              </div>
            </div>
          </div>
        </div>

        {/* capability chips — new unique labels */}
        <motion.div
          className="mt-2 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {["Site-safe policies", "Mock-location guards", "Device lifecycle controls", "Key rotation", "Audit-ready logs"].map((t) => (
            <span key={t} className="rounded-full bg-white px-3 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200">
              {t}
            </span>
          ))}
        </motion.div>

        {/* feature cards — fresh, not repeated copy */}
        <motion.div
          className="mt-8 grid gap-5 md:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map(({ t, d, Icon }, idx) => (
            <motion.div
              key={t}
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 220, damping: 18 } },
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(2,6,23,0.06)]"
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -top-px -left-px h-24 w-24 rounded-tl-2xl"
                initial={{ opacity: 0.0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  background: "radial-gradient(22px 22px at 22px 22px, rgba(99,102,241,0.35), transparent 60%)",
                }}
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -bottom-px -right-px h-24 w-24 rounded-br-2xl"
                initial={{ opacity: 0.0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  background: "radial-gradient(22px 22px at calc(100% - 22px) calc(100% - 22px), rgba(34,197,94,0.30), transparent 60%)",
                }}
              />

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-neutral-900 text-white p-2 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{t}</h3>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">{d}</p>
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 h-[3px] w-full rounded-b-2xl"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                style={{ originX: 0, background: "linear-gradient(90deg,#6366f1,#22c55e)" }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* compliance & assurances — reworded to avoid duplication */}
        <motion.div
          className="mt-8 grid gap-3 sm:grid-cols-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-xl border bg-white p-4 text-sm text-neutral-700 ring-1 ring-neutral-200">
            <span className="font-semibold text-neutral-900">Regional data controls</span>
            <div className="mt-1">Pick storage region for regulatory compliance and limit exports per tenant.</div>
          </div>
          <div className="rounded-xl border bg-white p-4 text-sm text-neutral-700 ring-1 ring-neutral-200">
            <span className="font-semibold text-neutral-900">Scoped access</span>
            <div className="mt-1">Permission scopes, admin tiers and short-lived tokens minimize blast radius.</div>
          </div>
          <div className="rounded-xl border bg-white p-4 text-sm text-neutral-700 ring-1 ring-neutral-200">
            <span className="font-semibold text-neutral-900">Resilience</span>
            <div className="mt-1">Automated backups and multi-zone failover to keep operations running during incidents.</div>
          </div>
        </motion.div>

        {/* bottom policy strip — fresh sentence */}
        <motion.div
          className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 p-[1px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex flex-col items-center justify-between gap-3 rounded-2xl bg-white/85 px-5 py-4 text-center sm:flex-row sm:text-left">
            <div className="text-sm text-neutral-700">
              <span className="font-semibold text-neutral-900">Security summary:</span>{" "}
              combine signal verification with device controls to create a reliable, auditable attendance stream.
            </div>
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
            >
              Read security docs
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}