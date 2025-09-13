// src/components/BenefitsDeckMobile.tsx
"use client";

import React from "react";

type Benefit = {
  id: number;
  title: string;
  body: string;
  icon: string;
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

export default function BenefitsDeckMobile() {
  return (
    <section aria-label="Benefits (mobile)" className="sm:hidden bg-neutral-50 py-8">
      <div className="mx-auto max-w-[720px] px-4">
        <header className="text-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-100">
            ✚ WHY TEAMS CHOOSE ATTENDIFY
          </span>

          <h2 className="mt-4 text-xl font-semibold text-neutral-900">
            Prove presence. Automate the busywork.
          </h2>

          <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto">
            Attendify verifies every check-in with device binding, anti-spoofing, and geo-fencing — then syncs clean data to payroll and HRMS.
          </p>
        </header>

        <div className="space-y-4">
          {BENEFITS.map((b, idx) => (
            <article
              key={b.id}
              className="rounded-2xl bg-white/90 ring-1 ring-black/5 p-4 shadow-sm"
              aria-label={b.title}
            >
              <div className="flex items-start gap-3">
                {/* numeric badge */}
                <div className="flex-none grid h-10 w-10 place-items-center rounded-lg bg-neutral-900 text-white font-semibold text-sm">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="flex-1">
                  <h3 className="text-[15px] font-semibold text-neutral-900">{b.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{b.body}</p>

                  {/* optional micro-benefits / small CTA row */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-800">
                      Learn more
                    </span>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-800">
                      See demo
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* small CTA */}
        <div className="mt-6 text-center">
          <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow">
            Request a demo
          </button>
        </div>
      </div>
    </section>
  );
}