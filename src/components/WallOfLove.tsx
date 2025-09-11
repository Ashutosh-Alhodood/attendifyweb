"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const cards = [
  { name: "Alex — Sales Executive", text: "The online meeting functionality transformed our client demos. Interactive, engaging, and remote-friendly." },
  { name: "Sarah — HR", text: "Payroll closes faster now. Verified presence data finally ends the back-and-forth." },
  { name: "John — IT", text: "Device binding killed buddy punching. Integrity by default." },
];

export default function WallOfLove() {
  const ref = useRef<HTMLDivElement>(null);

  // Section progress (0 when enters viewport bottom, 1 when leaves top)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const t = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.6 });

  // Title ink (gray → black across early range)
  const titleColor = useTransform(t, [0.05, 0.25], ["#D4D4D4", "#111111"]);
  const titleY = useTransform(t, [0, 0.25], [14, 0]);

  // Card stack transforms
  const rotate0 = useTransform(t, [0, 1], [-12, 0]);
  const rotate1 = useTransform(t, [0, 1], [8, 0]);
  const rotate2 = useTransform(t, [0, 1], [-5, 0]);
  const yAll = useTransform(t, [0, 1], [40, -4]);
  const opacityAll = useTransform(t, [0, 0.15, 1], [0, 1, 1]);

  return (
    <section ref={ref} className="relative bg-neutral-50 py-24">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <motion.h2
          style={{ color: titleColor, y: titleY }}
          className="text-center text-[40px] sm:text-[52px] md:text-[64px] font-semibold leading-[1.05]"
        >
          Wall of love
        </motion.h2>

        <div className="relative mt-12 h-[360px]">
          {/* back card */}
          <motion.div
            style={{ rotate: rotate2, y: yAll, opacity: opacityAll }}
            className="absolute inset-0 mx-auto w-full max-w-xl rounded-[28px] bg-white ring-1 ring-black/5 shadow-[0_20px_60px_rgba(2,6,23,0.08)] p-6"
          >
            <div className="font-semibold text-neutral-900">{cards[2].name}</div>
            <p className="mt-2 text-neutral-700">“{cards[2].text}”</p>
          </motion.div>

          {/* middle card */}
          <motion.div
            style={{ rotate: rotate1, y: yAll, opacity: opacityAll }}
            className="absolute inset-0 mx-auto w-full max-w-xl rounded-[28px] bg-white ring-1 ring-black/5 shadow-[0_20px_60px_rgba(2,6,23,0.12)] p-6"
          >
            <div className="font-semibold text-neutral-900">{cards[1].name}</div>
            <p className="mt-2 text-neutral-700">“{cards[1].text}”</p>
          </motion.div>

          {/* front card */}
          <motion.div
            style={{ rotate: rotate0, y: yAll, opacity: opacityAll }}
            className="absolute inset-0 mx-auto w-full max-w-xl rounded-[28px] bg-white ring-1 ring-black/5 shadow-[0_24px_70px_rgba(2,6,23,0.14)] p-6"
          >
            <div className="font-semibold text-neutral-900">{cards[0].name}</div>
            <p className="mt-2 text-neutral-700">“{cards[0].text}”</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}