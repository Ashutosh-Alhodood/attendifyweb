"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* ------------------------------ Data ------------------------------ */

const CARDS = [
  { id: 1, title: "Exchange", body: "Increase efficiency in various scenarios like troubleshooting issues or delivering remote support.", img: "/home.png" },
  { id: 2, title: "Manage",   body: "Efficient file management with increased productivity in personal and professional settings.", img: "/history.png" },
  { id: 3, title: "Collaborate", body: "Seamless collaboration—communicate and interact in real time with verified presence.", img: "/profile.png" },
];

/* ------------------------------- UI ------------------------------- */

export default function Benefits() {
  return (
    <section aria-label="Benefits" className="relative">
      <div className="mx-auto w-[min(1200px,92vw)] px-4 py-12">
        <div className="grid place-items-center">
          <div className="relative w-full max-w-[1100px]">
            <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-3 md:gap-6">
              {CARDS.map((card, i) => {
                const baseRotate = i === 0 ? -10 : i === 1 ? 0 : 10;
                const baseY = i === 1 ? -12 : 0;
                const z = i === 1 ? 30 : i === 0 ? 20 : 10;

                return (
                  <motion.article
                    key={card.id}
                    initial={{ opacity: 0, y: 24, rotate: baseRotate * 0.8, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: baseY, rotate: baseRotate, scale: 1 }}
                    transition={{ type: "spring", stiffness: 160, damping: 20, mass: 0.6 }}
                    viewport={{ once: true, amount: 0.35 }}
                    whileHover={{ rotate: baseRotate * 0.6, y: baseY - 4, scale: 1.02 }}
                    className="relative will-change-transform"
                    style={{ zIndex: z }}
                  >
                    <DeviceCard title={card.title} body={card.body} img={card.img} />
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Device Card -------------------------- */

function DeviceCard({
  title,
  body,
  img,
}: {
  title: string;
  body: string;
  img: string;
}) {
  return (
    <div
      className="
        relative rounded-[28px] bg-white ring-1 ring-black/5
        shadow-[0_40px_120px_rgba(2,6,23,0.10)]
        w-[min(340px,30vw)] md:w-[min(340px,32vw)]
      "
    >
      {/* phone frame */}
      <div className="relative mx-4 mt-4 rounded-[22px] bg-black overflow-hidden ring-1 ring-black/10">
        <div className="relative w-full aspect-[9/19.5]">
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 300px, 340px"
            className="object-cover"
          />
        </div>

        {/* in-phone blue caption */}
        <div className="absolute left-1/2 bottom-3 -translate-x-1/2 w-[92%] rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 p-[1px]">
          <div className="rounded-2xl bg-white/5 backdrop-blur-md px-4 py-3 text-white shadow-[0_8px_30px_rgba(30,41,59,0.35)]">
            <div className="text-[13px] font-semibold">{title}</div>
            <p className="mt-1 text-[12px] leading-5 text-indigo-50/90">{body}</p>
          </div>
        </div>
      </div>

      {/* ground shadow */}
      <div className="pointer-events-none absolute -bottom-6 left-8 right-8 h-8 rounded-[20px] blur-2xl bg-black/10" />
    </div>
  );
}