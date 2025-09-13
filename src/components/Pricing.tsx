// app/pricing/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

/* ----------------------------- Data / Types ------------------------------ */
type Plan = {
  id: string;
  tag?: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  timespan?: string;
  priceLabel?: string;
  priceBig?: string;
};

/* Personal (small-team) plans — short, practical options */
const PERSONAL: Plan[] = [
  {
    id: "starter",
    tag: "Starter",
    title: "Starter",
    subtitle: "For small teams that want verifiable time without heavy ops.",
    bullets: [
      "Mobile clock-ins with basic device checks",
      "Simple geofence setup for 1–3 sites",
      "Daily exports in CSV for payroll",
      "Email support and knowledge base",
      "Fast setup (self-serve)",
    ],
    timespan: "Live in days",
    priceLabel: "from",
    priceBig: "₹499",
  },
  {
    id: "team",
    tag: "Team",
    title: "Team",
    subtitle: "A step up — roster automation and deeper verification rules.",
    bullets: [
      "Automated shift rules & overtime handling",
      "Device binding for secure enrollments",
      "Mock-location detection and alerts",
      "Integrations: export to common HRMS",
      "Priority email support",
    ],
    timespan: "Fast onboarding",
    priceLabel: "from",
    priceBig: "₹1,499",
  },
];

/* Business (larger customers) plans — richer features and services */
const BUSINESS: Plan[] = [
  {
    id: "business",
    tag: "Business",
    title: "Business",
    subtitle: "Designed for multi-site operations and HR integrations.",
    bullets: [
      "Role-based admin & tenant controls",
      "Continuous payroll sync (API or SFTP)",
      "Custom device policies & kiosk mode",
      "SLA-backed response windows",
      "Quarterly onboarding check-ins",
    ],
    timespan: "2–4 weeks",
    priceLabel: "custom",
    priceBig: "Contact",
  },
  {
    id: "enterprise",
    tag: "Enterprise",
    title: "Enterprise",
    subtitle: "Full platform, advanced integrations, and dedicated support.",
    bullets: [
      "White-labeling & single-tenant options",
      "Dedicated account manager and onboarding",
      "Custom SLAs, security reviews & audits",
      "Advanced reporting and data retention controls",
      "On-prem or VPC deployment options available",
    ],
    timespan: "Custom",
    priceLabel: "enterprise",
    priceBig: "Contact Sales",
  },
];

/* ------------------------------- Helpers -------------------------------- */
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path d="M5 12h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 5l6 7-6 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------ PriceCard --------------------------------
   KEEP this desktop-optimized card untouched. We'll reuse it in desktop view.
--------------------------------------------------------------------------- */
function PriceCard({ plan, mode }: { plan: Plan; mode: "personal" | "business" }) {
  const isFeatureTier = plan.id === "team" || plan.id === "business" || plan.id === "enterprise";
  const ctaClass = isFeatureTier ? "bg-green-400 text-black hover:bg-green-500" : "bg-white text-black hover:bg-neutral-100";

  const cardBg =
    mode === "business"
      ? "linear-gradient(180deg, rgba(8,10,18,0.98), rgba(14,14,20,0.96))"
      : "linear-gradient(180deg, rgba(12,12,12,0.98), rgba(17,17,17,0.96))";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 240, damping: 28 }}
      className="relative rounded-2xl overflow-hidden w-full min-h-[520px]"
      style={{
        background: cardBg,
        border: "1px solid rgba(255,255,255,0.03)",
        boxShadow: "0 40px 100px rgba(2,6,23,0.65), inset 0 1px 0 rgba(255,255,255,0.02)",
      }}
    >
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.08, background: "radial-gradient(600px 200px at 90% 10%, rgba(255,255,255,0.01), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.01), transparent 30%)" }} />

      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3">
            <div className="rounded-full px-3 py-1 text-sm bg-neutral-900/60 ring-1 ring-white/6 text-white/80">• {plan.tag}</div>
          </div>
          {plan.timespan && <div className="text-sm font-medium text-green-400">{plan.timespan}</div>}
        </div>

        <div className="mt-6">
          <h3 className="text-4xl font-medium text-white tracking-tight">{plan.title}</h3>
          {plan.subtitle && <p className="mt-3 text-sm text-neutral-300 max-w-xl">{plan.subtitle}</p>}
        </div>

        <div className="my-6 border-t border-white/6" />

        <ul className="space-y-3 text-neutral-300 text-sm pl-2">
          {plan.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-neutral-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Sales CTA — full width pill */}
      <div className="absolute left-6 right-6 bottom-6 z-20">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className={[
            "w-full rounded-full px-6 py-4 flex items-center justify-center text-lg font-semibold transition",
            ctaClass,
            "shadow-[0_18px_44px_rgba(8,20,44,0.45)]",
          ].join(" ")}
        >
          Contact Sales
          <span className="ml-3">
            <IconArrow />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* --------------------------- Mobile Price Card ---------------------------
   A mobile-first premium-styled card: big legible title, subtle gradient,
   stacked info and a prominent CTA. No desktop changes here.
--------------------------------------------------------------------------- */
function PriceCardMobile({ plan }: { plan: Plan }) {
  return (
    <article className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white to-neutral-100 border border-neutral-200 p-5 shadow-md">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-neutral-900 text-white p-3 shadow-sm flex items-center justify-center w-12 h-12">
          <span className="font-semibold text-sm">{plan.tag?.slice(0,1)}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-neutral-900">{plan.title}</h4>
            {plan.timespan && <div className="text-xs font-medium text-neutral-500">{plan.timespan}</div>}
          </div>
          {plan.subtitle && <p className="mt-1 text-sm text-neutral-600">{plan.subtitle}</p>}
        </div>
      </div>

      <div className="mt-4 border-t pt-4 space-y-2">
        {plan.bullets.map((b) => (
          <div key={b} className="flex items-start gap-3">
            <div className="mt-1 inline-block h-2 w-2 rounded-full bg-neutral-400" />
            <div className="text-sm text-neutral-700 flex-1">{b}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <button className="flex-1 rounded-full bg-indigo-600 text-white py-3 font-semibold shadow">Get started</button>
        <button className="w-12 rounded-full bg-white border border-neutral-200 grid place-items-center">
          <IconArrow />
        </button>
      </div>
    </article>
  );
}

/* ------------------------------ LeftColumn ------------------------------ */
function LeftColumn({ plan }: { plan: Plan }) {
  return (
    <div className="px-6 md:px-12 lg:px-16">
      <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-neutral-100/60 px-3 py-1 text-sm text-neutral-800">
        <span className="h-2 w-2 rounded-full bg-black inline-block" /> {plan.tag}
      </div>

      <h1 className="text-[48px] md:text-[80px] lg:text-[96px] leading-[0.9] font-extrabold tracking-tight text-black/95">
        {plan.title}
      </h1>

      <p className="mt-6 max-w-xl text-neutral-600">{plan.subtitle}</p>

      <ul className="mt-8 space-y-3 text-neutral-600">
        {plan.bullets.slice(0, 5).map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-neutral-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Left Contact Sales pill (black) */}
      <div className="mt-12 w-full md:w-3/4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-full px-6 py-4 flex items-center gap-6 text-lg font-semibold text-white bg-black hover:bg-neutral-900 transition shadow-[0_20px_60px_rgba(2,6,23,0.55)]"
        >
          <div className="text-sm text-neutral-300 mr-2">Get in touch</div>
          <div className="text-4xl font-extrabold tracking-tight">Contact Sales</div>

          <div className="ml-auto h-12 w-12 rounded-full bg-white grid place-items-center text-black">
            <IconArrow />
          </div>
        </motion.button>
      </div>
    </div>
  );
}

/* ------------------------------- Page Component -------------------------- */
export default function PricingPage() {
  const [mode, setMode] = useState<"personal" | "business">("personal");

  const plans = mode === "personal" ? PERSONAL : BUSINESS;
  const leftPlan = plans[0];
  const rightPlan = plans[1];

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="pt-20 pb-12" />

      <div className="mx-auto max-w-7xl px-6">
        {/* ---------- MOBILE FIRST SECTION ---------- */}
        <div className="sm:hidden">
          {/* Mobile header */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Plans & Pricing</h2>
                <p className="mt-1 text-sm text-neutral-600 max-w-xs">Choose a plan that fits how you run operations.</p>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900/95 px-3 py-1 text-white text-sm">
                  <span className="text-xs opacity-80">Trusted</span>
                </div>
              </div>
            </div>

            {/* mobile mode toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMode("personal")}
                className={[
                  "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition",
                  mode === "personal" ? "bg-indigo-600 text-white" : "bg-white/80 text-neutral-700",
                ].join(" ")}
              >
                Small teams
              </button>
              <button
                onClick={() => setMode("business")}
                className={[
                  "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition",
                  mode === "business" ? "bg-indigo-600 text-white" : "bg-white/80 text-neutral-700",
                ].join(" ")}
              >
                Business
              </button>
            </div>
          </div>

          {/* Mobile stacked card list */}
          <div className="space-y-4">
            <PriceCardMobile plan={plans[0]} />
            <PriceCardMobile plan={plans[1]} />
          </div>

          {/* Mobile details summary */}
          <div className="mt-6 rounded-2xl bg-white/95 p-4 shadow-sm border border-neutral-200">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-indigo-600 text-white p-2">✓</div>
              <div>
                <div className="font-semibold text-neutral-900">Need help choosing?</div>
                <div className="mt-1 text-sm text-neutral-600">Contact our sales team for a quick recommendation based on your sites and headcount.</div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <a href="#contact" className="flex-1 rounded-full bg-black text-white py-3 text-center font-semibold">Contact sales</a>
              <a href="#demo" className="flex-1 rounded-full border border-neutral-200 py-3 text-center font-semibold">Request demo</a>
            </div>
          </div>
        </div>

        {/* ---------- DESKTOP / TABLET (UNCHANGED, wrapped) ---------- */}
        <div className="hidden sm:block">
          {/* top heading row */}
          <div className="mb-12 flex items-start justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-6xl font-bold tracking-tight">Plans & Pricing</h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                Choose the plan that matches how you run operations — from lightweight site setups to enterprise-grade deployments with integrations and SLAs.
              </p>
            </div>

            {/* toggle */}
            <div className="flex-none">
              <div className="inline-flex items-center gap-2 rounded-full bg-black text-white p-1.5">
                <button
                  onClick={() => setMode("personal")}
                  className={[
                    "px-4 py-2 rounded-full transition",
                    mode === "personal" ? "bg-white text-black" : "bg-transparent text-white/90",
                  ].join(" ")}
                >
                  Small teams
                </button>
                <button
                  onClick={() => setMode("business")}
                  className={[
                    "px-4 py-2 rounded-full transition",
                    mode === "business" ? "bg-white text-black" : "bg-transparent text-white/90",
                  ].join(" ")}
                >
                  Business & Enterprise
                </button>
              </div>
            </div>
          </div>

          {/* main two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6">
              <LeftColumn plan={leftPlan} />
            </div>

            <div className="md:col-span-6">
              <div className="pl-6 md:pl-12">
                <PriceCard plan={rightPlan} mode={mode} />
              </div>
            </div>
          </div>

          {/* second row (swapped) */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6 order-2 md:order-1">
              <div className="pr-6 md:pr-12">
                <PriceCard plan={leftPlan} mode={mode} />
              </div>
            </div>

            <div className="md:col-span-6 order-1 md:order-2">
              <div className="px-6 md:px-12 lg:px-16">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-neutral-100/60 px-3 py-1 text-sm text-neutral-800">
                  <span className="h-2 w-2 rounded-full bg-black inline-block" /> Our approach
                </div>

                <h3 className="text-5xl font-semibold tracking-tight">Implementation & support</h3>
                <p className="mt-4 max-w-xl text-neutral-600">
                  We help you onboard sites, define policies, and map verified events into payroll and HR systems — whether you run a few locations or thousands.
                </p>

                <ul className="mt-8 space-y-3 text-neutral-600">
                  <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-neutral-400" /> Dedicated onboarding plan</li>
                  <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-neutral-400" /> Policy templates for common industries</li>
                  <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-neutral-400" /> Pre-built HRMS/Payroll mappings</li>
                  <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-neutral-400" /> On-demand training for admins & managers</li>
                  <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-neutral-400" /> Optional on-site review for complex deployments</li>
                </ul>

                <div className="mt-12">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full px-6 py-4 flex items-center gap-6 w-full md:w-3/4 text-lg font-semibold text-white bg-black hover:bg-neutral-900 transition shadow-[0_20px_60px_rgba(2,6,23,0.55)]"
                  >
                    <div className="text-sm text-neutral-300 mr-2">Discuss</div>
                    <div className="text-4xl font-extrabold tracking-tight">Contact Sales</div>

                    <div className="ml-auto h-12 w-12 rounded-full bg-white grid place-items-center text-black">
                      <IconArrow />
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <div className="py-24" />
        </div>
      </div>
    </main>
  );
}