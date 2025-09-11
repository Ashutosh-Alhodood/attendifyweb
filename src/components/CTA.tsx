"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-white">
      {/* top soft edge like the screenshot */}
      <div className="pointer-events-none sticky top-0 z-0 h-6 w-full rounded-b-[24px] bg-neutral-100 shadow-[0_6px_18px_rgba(2,6,23,0.06)]" />

      {/* content container */}
      <div className="relative z-10 mx-auto w-[min(1200px,92vw)] py-8">
        {/* row: agency badge (left) + copyright (right) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* small square icon like in the shot – swap for your logo if you wish */}
            <span className="grid h-7 w-7 place-items-center rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 shadow-sm">
              ⬢
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-[13px] font-medium text-neutral-700 shadow-sm">
              by Alhodood
            </span>
          </div>

        
        </div>

        {/* giant word behind, clipped exactly like the reference */}
        <div className="select-none overflow-hidden pb-10 pt-8">
          <h1
            className="
              mx-auto w-full text-center
              font-black leading-[0.85]
              tracking-[-0.02em] text-neutral-900
              text-[22vw] md:text-[18vw] lg:text-[16vw]
            "
            style={{ letterSpacing: "-0.02em" }}
          >
            Attendify
          </h1>
        </div>
      </div>

 
    </footer>
  );
}