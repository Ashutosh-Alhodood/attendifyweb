// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = { href: `#${string}`; label: string };

const items: Item[] = [
  { href: "#features",  label: "Features" },
  { href: "#extension", label: "Extension" },
  { href: "#benefits",  label: "Benefits" },
  { href: "#security",  label: "Security" },
  { href: "#pricing",   label: "Pricing" },
  { href: "#faq",       label: "FAQ" },
];

export default function Navbar() {
  const [solid, setSolid]   = useState(false);
  const [active, setActive] = useState<string>(items[0].href);
  const ticking = useRef(false);

  const left  = useMemo(() => items.slice(0, 3), []);
  const right = useMemo(() => items.slice(3),   []);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section indicator
  useEffect(() => {
    const sections = items
      .map(i => document.querySelector<HTMLElement>(i.href))
      .filter(Boolean) as HTMLElement[];

    const measure = () => {
      const refLine = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= refLine && r.bottom >= refLine) {
          current = `#${el.id}`;
          break;
        }
      }
      if (current && current !== active) setActive(current);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [active]);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const href = (e.currentTarget.getAttribute("href") || "") as `#${string}`;
    if (!href.startsWith("#")) return;
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;

    e.preventDefault();
    // keep nav fixed — scroll the page but offset so the section isn't hidden behind the navbar
    const NAV_OFFSET = 88; // px — adjust to match the visual height of the navbar
    const y = window.scrollY + el.getBoundingClientRect().top - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    // fixed to top: stays above content always
    <header
      aria-label="Primary navigation"
      className="fixed left-0 right-0 top-0 z-50 flex justify-center"
      style={{ pointerEvents: "auto" }}
    >
      <nav
        className={[
          "flex items-center justify-center",
          "rounded-[28px] border border-line shadow-soft px-6 sm:px-8 py-3 mx-4 my-4",
          "transition-colors duration-300",
          solid ? "bg-white/90 backdrop-blur" : "bg-white/70 backdrop-blur-sm",
        ].join(" ")}
        style={{ width: "min(92vw, 980px)", maxWidth: 980 }}
      >
        <ul className="flex items-center text-[15px] text-ink/70">
          {left.map((it) => (
            <li key={it.href} className="relative px-4">
              <Link
                href={it.href}
                onClick={handleClick}
                className={`transition-colors ${active === it.href ? "text-ink font-semibold" : "hover:text-ink"}`}
              >
                {it.label}
              </Link>
              <span
                className={`absolute -bottom-2 left-0 h-[2px] w-full origin-left transition-transform ${
                  active === it.href ? "scale-x-100 bg-ink" : "scale-x-0 bg-ink/70"
                }`}
              />
            </li>
          ))}

          {/* Center logo — no extra gap */}
          <li className="px-6">
            <Link
              href="/"
              aria-label="Attendify"
              className="grid h-10 w-10 place-items-center rounded-[10px] bg-black shadow-soft"
            >
              <Image src="/logo.png" alt="Attendify" width={20} height={20} className="object-contain" priority />
            </Link>
          </li>

          {right.map((it) => (
            <li key={it.href} className="relative px-4">
              <Link
                href={it.href}
                onClick={handleClick}
                className={`transition-colors ${active === it.href ? "text-ink font-semibold" : "hover:text-ink"}`}
              >
                {it.label}
              </Link>
              <span
                className={`absolute -bottom-2 left-0 h-[2px] w-full origin-left transition-transform ${
                  active === it.href ? "scale-x-100 bg-ink" : "scale-x-0 bg-ink/70"
                }`}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}