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

  // mobile menu state
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const left  = useMemo(() => items.slice(0, 3), []);
  const right = useMemo(() => items.slice(3),   []);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route/resize/escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // click outside to close mobile menu
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      const el = menuRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

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
    // if mobile, close menu after selection
    setOpen(false);
  };

  return (
    <>
      {/* fixed to top: stays above content always */}
      <header
        aria-label="Primary navigation"
        className="fixed left-0 right-0 top-0 z-50 flex justify-center"
        style={{ pointerEvents: "auto" }}
      >
        {/* -------------------- Desktop nav (unchanged) -------------------- */}
        <nav
          className={[
            "hidden sm:flex items-center justify-center",
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

        {/* -------------------- Mobile nav bar (updated) -------------------- */}
        <nav
          aria-hidden={false}
          className={[
            "sm:hidden fixed left-4 right-4 top-4 z-[60] flex items-center justify-between",
            "rounded-[18px] px-3 py-2",
            solid ? "bg-white/92 backdrop-blur shadow-md" : "bg-white/80 backdrop-blur-sm",
          ].join(" ")}
          style={{ pointerEvents: "auto" }}
        >
          {/* LEFT: Logo + "Attendify" text */}
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Attendify home" className="flex items-center gap-3">
              <div className="h-10 w-10 grid place-items-center rounded-md bg-black">
                <Image src="/logo.png" alt="Attendify" width={18} height={18} className="object-contain" />
              </div>
             <div className="hidden -mt-0.5 text-sm font-semibold text-black sm:block">
               
                Attendify
              </div>
            </Link>
          </div>

          {/* RIGHT: hamburger */}
          <button
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((s) => !s)}
            title={open ? "Close menu" : "Open menu"}
            className="grid place-items-center h-10 w-10 rounded-lg ring-1 ring-black/6 bg-white/90 shadow-sm"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <XIcon className="h-5 w-5 text-ink/80" /> : <MenuIcon className="h-5 w-5 text-ink/80" />}
          </button>
        </nav>
      </header>

      {/* -------------------- Mobile menu overlay (unchanged behavior) -------------------- */}
      <div
        id="mobile-nav"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-title"
        className={[
          "sm:hidden fixed inset-0 z-50 flex items-start justify-center px-4 pt-24 pb-8 transition-all duration-300",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* backdrop */}
        <div
          aria-hidden
          className={`absolute inset-0 transition-opacity ${open ? "opacity-60" : "opacity-0"} bg-black`}
          style={{ backdropFilter: "blur(6px)" }}
          onClick={() => setOpen(false)}
        />

        {/* panel */}
        <div
          className={[
            "relative w-full max-w-[720px] rounded-2xl overflow-hidden transform transition-transform duration-300",
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,252,0.98))",
            boxShadow: "0 24px 60px rgba(2,6,23,0.18)",
            border: "1px solid rgba(2,6,23,0.04)",
          }}
        >
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 grid place-items-center rounded-md bg-black">
                  <Image src="/logo.png" alt="Attendify" width={18} height={18} className="object-contain" />
                </div>
                <div>
                  <div id="mobile-nav-title" className="text-base font-semibold text-ink">
                    Attendify
                  </div>
                  <div className="text-xs text-ink/60">Live insights & verified check-ins</div>
                </div>
              </div>

              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="h-9 w-9 grid place-items-center rounded-md bg-white/90 ring-1 ring-black/6 shadow-sm"
              >
                <XIcon className="h-5 w-5 text-ink/80" />
              </button>
            </div>
          </div>

          <div className="px-6 pb-6">
            <nav>
              <ul className="grid gap-3">
                {items.map((it) => {
                  const isActive = active === it.href;
                  return (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        onClick={handleClick}
                        className={[
                          "flex items-center justify-between w-full rounded-xl px-4 py-3 text-left text-lg transition",
                          isActive
                            ? "bg-indigo-50 ring-1 ring-indigo-100 text-indigo-700 font-semibold shadow-inner"
                            : "hover:bg-neutral-50",
                        ].join(" ")}
                      >
                        <span>{it.label}</span>
                        <span className="text-sm text-ink/60">{isActive ? "Active" : ""}</span>
                      </Link>
                    </li>
                  );
                })}

                <li>
                  <div className="mt-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 p-[1px]">
                    <div className="rounded-xl bg-white/6 px-4 py-3 text-center text-white/95 backdrop-blur-sm">
                      <div className="text-sm font-semibold">Get started with Attendify</div>
                      <div className="text-xs text-white/80 mt-1">Request demo • Payroll-ready exports</div>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Small inline icon components (you can replace them with your icon set)     */
/* -------------------------------------------------------------------------- */

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "h-5 w-5"}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "h-5 w-5"}>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}