// components/ScrollManifestoMobile.tsx
"use client";

import React from "react";

type Props = {
  text?: string;
  className?: string;
};

const DEFAULT_COPY = [
  "Attendance you can trust.",
  "Actionable presence data for operations.",
].join("\n");

export default function ScrollManifestoMobile({ text = DEFAULT_COPY }: Props) {
  const lines = text
    .trim()
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <section aria-label="Scroll manifesto (mobile)" className="sm:hidden px-4 py-6 bg-neutral-50">
      <div className="mx-auto max-w-[820px]">
        <div className="rounded-2xl bg-white p-5 shadow-[0_16px_40px_rgba(2,6,23,0.06)] border border-black/5">
          <div className="mb-3 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-indigo-600">
              ATTENDIFY MANIFESTO
            </span>
          </div>

          <div className="space-y-3">
            {lines.map((line, idx) => (
              <h2
                key={idx}
                className="m-0 text-center font-extrabold text-lg leading-tight"
                style={{ color: "#0B0B10" }}
              >
                {line}
              </h2>
            ))}

            <p className="mt-1 text-center text-sm text-neutral-600 leading-relaxed">
              Attendify captures multi-signal evidence (GPS, network, motion and device attestation)
              to produce an immutable event record. That record feeds automated timecards and reconciled payroll runs,
              surfaces exceptions to supervisors in real time, and preserves a searchable audit trail for compliance.
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                "Immutable audit logs",
                "Realtime exception alerts",
                "Policy-driven approvals",
                "Device attestation",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3 rounded-lg bg-neutral-100 px-3 py-2">
                  <div className="h-8 w-8 rounded-lg grid place-items-center bg-white/70 text-indigo-600 font-semibold shadow-sm">
                    ✓
                  </div>
                  <div className="text-xs text-neutral-800 font-medium">{t}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3 justify-center">
              <a
                href="#learn"
                className="rounded-full bg-indigo-600 text-white px-5 py-2 text-sm font-semibold shadow-lg inline-block"
                role="button"
              >
                Learn more
              </a>
              <a
                href="#contact"
                className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold inline-block"
                role="button"
              >
                Contact sales
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-neutral-500">
          Built for frontline teams • Audit-ready events • Payroll-ready exports
        </div>
      </div>
    </section>
  );
}