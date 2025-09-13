// components/FeatureMobile.tsx
"use client";

import React, { useState } from "react";

export type FeatureItem = {
  id: number;
  badge: string;
  title: string;
  body: string;
  img?: string; // optional (we won't render images by default on mobile)
  imgAlt?: string;
};

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: 1,
    badge: "01",
    title: "Presence Sync",
    body:
      "Instantly associate a person, their trusted device, and the exact location of the check-in. Combine device binding with multi-signal anti-spoofing so every attendance record is provable and auditable.",
  },
  {
    id: 2,
    badge: "02",
    title: "Shifts & Records",
    body:
      "Clear, time-stamped shift timelines and auto-calculated balances remove manual reconciliation. Export-ready reports and one-click payroll sync ensure HR and payroll systems always agree.",
  },
  {
    id: 3,
    badge: "03",
    title: "Live Assist",
    body:
      "Secure remote assist for frontline teams — initiate a verified support session, view device context, and capture audit logs. Ideal for troubleshooting in the field while preserving compliance trails.",
  },
  {
    id: 4,
    badge: "04",
    title: "Smart Leaves",
    body:
      "Policy-aware time-off planning with live balances and intelligent suggestions. Managers approve in a tap; the system recalculates accruals and feeds the results into payroll automatically.",
  },
  {
    id: 5,
    badge: "05",
    title: "Profiles, Docs & IoT",
    body:
      "Secure employee profiles and document storage combined with optional IoT device integration. Use mobile apps or edge devices to verify presence, collect sensor telemetry, and tie it to an employee profile for audits.",
  },
];

/**
 * FeatureMobile
 *
 * Mobile-first, image-free feature list component with premium styling.
 * - Accepts optional `features` prop.
 * - No heavy animations; small expand/collapse state per card.
 *
 * Usage:
 * <div className="sm:hidden">
 *   <FeatureMobile />
 * </div>
 */
export default function FeatureMobile({ features }: { features?: FeatureItem[] }) {
  const list = features ?? DEFAULT_FEATURES;
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpanded((curr) => (curr === id ? null : id));
  };

  return (
    <div className="sm:hidden bg-neutral-50">
      <div className="mx-auto px-5 pt-8 pb-12">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/60 px-3 py-1 text-[11px] font-semibold tracking-widest text-indigo-600">
            ✚ FEATURES
          </div>

          <h2 className="mt-3 text-2xl font-extrabold text-neutral-900 leading-tight">Built for reliable attendance</h2>

          <p className="mt-2 text-sm text-neutral-700 max-w-[56ch] mx-auto">
            Core capabilities tailored for frontline teams — quick to adopt, secure, and payroll-ready.
          </p>
        </div>

        {/* Feature list */}
        <div className="space-y-4">
          {list.map((f) => {
            const isOpen = expanded === f.id;
            return (
              <article
                key={f.id}
                className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-[0_12px_32px_rgba(2,6,23,0.06)]"
                aria-labelledby={`feature-${f.id}-title`}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    {/* Badge / icon */}
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-400 grid place-items-center text-white font-semibold">
                        {f.badge}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3 id={`feature-${f.id}-title`} className="text-base font-semibold text-neutral-900 truncate">
                          {f.title}
                        </h3>

                        <div className="text-xs text-neutral-500 whitespace-nowrap">Feature {f.badge}</div>
                      </div>

                      {/* Description (truncated when closed, full when open) */}
                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          isOpen ? "text-neutral-800" : "text-neutral-700 line-clamp-3"
                        }`}
                      >
                        {f.body}
                      </p>

                      {/* Chips */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {f.id === 1 &&
                          ["Trusted device", "Multi-signal", "Audit logs"].map((c) => (
                            <span
                              key={c}
                              className="rounded-full bg-neutral-50 px-2 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200"
                            >
                              {c}
                            </span>
                          ))}
                        {f.id === 2 &&
                          ["Shift timelines", "Auto accruals", "CSV"].map((c) => (
                            <span
                              key={c}
                              className="rounded-full bg-neutral-50 px-2 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200"
                            >
                              {c}
                            </span>
                          ))}
                        {f.id === 3 &&
                          ["Remote assist", "Session logs"].map((c) => (
                            <span
                              key={c}
                              className="rounded-full bg-neutral-50 px-2 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200"
                            >
                              {c}
                            </span>
                          ))}
                        {f.id === 4 &&
                          ["Policy-aware", "One-tap"].map((c) => (
                            <span
                              key={c}
                              className="rounded-full bg-neutral-50 px-2 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200"
                            >
                              {c}
                            </span>
                          ))}
                        {f.id === 5 &&
                          ["Encrypted docs", "IoT pairing"].map((c) => (
                            <span
                              key={c}
                              className="rounded-full bg-neutral-50 px-2 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200"
                            >
                              {c}
                            </span>
                          ))}
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-3">
                        <button
                          className="flex-1 rounded-md bg-indigo-600 text-white py-2 text-sm font-semibold shadow-sm hover:opacity-95 transition"
                          onClick={() => {
                            // placeholder — wire to real action if needed
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Learn more
                        </button>

                        <button
                          className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                          onClick={() => {
                            // placeholder demo action
                            window.alert("Requesting demo — demo flow placeholder");
                          }}
                        >
                          Demo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* expand toggle (chevron) */}
                  <div className="mt-3 flex justify-end">
                    <button
                      aria-expanded={isOpen}
                      aria-controls={`feature-${f.id}-desc`}
                      onClick={() => toggle(f.id)}
                      className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-50 transition"
                    >
                      <span>{isOpen ? "Show less" : "Read more"}</span>
                      <svg
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path d="M5 8.5L10 13.5L15 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 text-center text-xs text-neutral-500">Scroll to see all features</div>
      </div>
    </div>
  );
}