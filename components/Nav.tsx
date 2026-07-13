"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/motion/Magnetic";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`nav-enter fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-white/[0.08] bg-void/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-shell items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <a
          href="#top"
          className="group relative z-10 flex items-center gap-2.5"
          aria-label="Void Craft home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-volt font-mono text-sm font-medium text-white transition-transform duration-300 group-hover:rotate-90">
            ▚
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-bone">
            VOID&nbsp;CRAFT
          </span>
        </a>

        {/* desktop */}
        <nav
          className="hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex"
          aria-label="Primary"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-mist transition-colors duration-200 hover:bg-bone/5 hover:text-bone"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Magnetic strength={0.3}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-bone-ink transition-colors duration-300 hover:bg-volt hover:text-white"
            >
              Start a project
            </a>
          </Magnetic>
        </div>

        {/* mobile toggle */}
        <button
          className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-bone/15 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-bone transition-transform duration-300 ${
                open ? "top-1/2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-full bg-bone transition-transform duration-300 ${
                open ? "bottom-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-dark mx-4 rounded-2xl p-4 md:hidden"
            aria-label="Mobile"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base text-bone hover:bg-bone/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-volt px-4 py-3 text-center font-medium text-white"
            >
              Start a project
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
