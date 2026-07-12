"use client";

import { motion } from "framer-motion";

const columns = [
  {
    heading: "Company",
    links: [
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "hello@voidcraft.agency", href: "mailto:hello@voidcraft.agency" },
      { label: "Start a project", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void pt-20">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="grid gap-12 pb-20 md:grid-cols-[1.2fr_repeat(3,0.6fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-volt font-mono text-sm text-white">
                ▚
              </span>
              <span className="font-display text-[15px] font-semibold tracking-tight text-bone">
                VOID&nbsp;CRAFT
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
              Building intelligent businesses. AI, software, and automation —
              engineered as one system.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="mb-4 font-mono text-[10px] uppercase tracking-micro text-mist/60">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-bone/70 transition-colors duration-200 hover:text-volt-soft"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-bone/[0.07] py-7 font-mono text-[10px] uppercase tracking-micro text-mist/50 sm:flex-row">
          <span>© 2026 Void Craft. All rights reserved.</span>
          <span>Building intelligent businesses</span>
        </div>
      </div>

      {/* giant wordmark — rises as you reach the end */}
      <div className="relative mx-auto max-w-shell overflow-hidden px-2">
        <motion.p
          aria-hidden="true"
          initial={{ y: "42%", opacity: 0.6 }}
          whileInView={{ y: "12%", opacity: 1 }}
          viewport={{ margin: "0px 0px -60px 0px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="headline select-none whitespace-nowrap text-center text-[17.5vw] font-semibold leading-none tracking-tight text-bone/[0.06] lg:text-[15.2rem]"
        >
          voidcraft
        </motion.p>
      </div>
    </footer>
  );
}
