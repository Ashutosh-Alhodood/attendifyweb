// components/FAQ.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------ Attendify Q/A ------------------------------ */
const QA = [
  {
    q: "Will you help set up Attendify for our locations?",
    a: "Yes — our onboarding team configures sites, enrollment rules, and device policies with you. We can bulk-import staff records and wire up your HR/payroll connector so verified time flows into your downstream systems from day one.",
  },
  {
    q: "What makes a clock-in trusted?",
    a: "Attendify combines device signals and location checks with runtime integrity checks so clock-ins are supported by multiple independent indicators. Suspicious or inconsistent signals are marked for review rather than silently accepted.",
  },
  {
    q: "Is a mobile app required for workers?",
    a: "The mobile app gives the richest signal set, but you can also use web-based clock-ins or dedicated kiosks. Kiosks can be locked to a site and configured to only accept enrollments from authorized devices.",
  },
  {
    q: "How do you handle intermittent connectivity?",
    a: "When devices are offline, events are stored locally with cryptographic proof and synchronized automatically when connectivity returns. The timeline shows delayed items and the original device evidence so audits remain straightforward.",
  },
  {
    q: "Can Attendify feed time into our payroll system?",
    a: "Absolutely. Choose CSV exports, SFTP, or API integrations. Advanced plans include continuous sync, field mappings, and the option to apply company-specific shift rules before export.",
  },
  {
    q: "Who can access attendance records and how are they protected?",
    a: "Access is controlled via roles and permissions. Records are encrypted at rest and in transit, and all administrative actions are logged. You retain control over retention and export policies for compliance needs.",
  },
];

/* --------------------------------- ICONS ---------------------------------- */
function Plus({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-5 text-neutral-500" aria-hidden="true">
      <span
        className={[
          "absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rounded bg-current transition-opacity",
          open ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-1/2 top-1/2 h-5 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded bg-current transition-transform",
          open ? "rotate-90" : "rotate-0",
        ].join(" ")}
      />
    </div>
  );
}

/* --------------------------------- ITEM ----------------------------------- */
function FaqItem({
  q,
  a,
  defaultOpen = false,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li className="group/row border-b last:border-b-0 border-neutral-200/70">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-[17px] font-medium text-neutral-900 leading-6 group-hover/row:text-neutral-950">
          {q}
        </span>
        <Plus open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-8 text-[15px] leading-7 text-neutral-600">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* --------------------------------- FAQ ---------------------------------- */
export default function FAQ() {
  return (
    <section id="faq" className="relative py-20">
      {/* soft background like the reference mocks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 20% -10%, rgba(99,102,241,0.08), transparent 60%), radial-gradient(800px 480px at 90% 110%, rgba(16,185,129,0.07), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-[min(1200px,94vw)]">
        {/* rounded card container */}
        <div className="mx-auto rounded-[28px] bg-white shadow-[0_20px_60px_rgba(2,6,23,0.06)] ring-1 ring-black/5">
          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-[1.05fr_1.6fr] md:gap-6 md:p-12 lg:p-14">
            {/* Left column (title + sub + chips) */}
            <div className="flex items-start">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-indigo-600">FAQ</p>
                <h2 className="mt-2 text-3xl sm:text-[40px] font-semibold tracking-tight text-neutral-900">
                  Common questions about Attendify
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-neutral-600">
                  Practical answers about enrolling sites, device policies, data handling, and integration options.
                </p>

                {/* trust chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Mock-location guards", "Device lifecycle", "Site enrollment", "SSO & SAML", "Export formats"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-neutral-50 px-3 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column (accordion list) */}
            <ul className="divide-y divide-transparent">
              {QA.map((item, i) => (
                <FaqItem key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />
              ))}

              {/* CTA row */}
              <li className="pt-6">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 hover:border-neutral-300"
                >
                  Still curious? See plans & pricing
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 10h9m0 0-4-4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}