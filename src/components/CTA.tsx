"use client";

// import Image from "next/image"; // ❌ remove this, not used

export default function CTA() {
  return (
    <section className="relative bg-neutral-50 py-20">
      <div className="mx-auto w-[min(1200px,92vw)] text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          Ready to make attendance provable?
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-neutral-600">
          Start verifying presence with Attendify today — connect your people, places, and devices in minutes.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#pricing"
            className="inline-flex items-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,6,23,0.18)] transition hover:opacity-90"
          >
            View Pricing
          </a>
          <a
            href="#demo"
            className="inline-flex items-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:border-neutral-300"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}