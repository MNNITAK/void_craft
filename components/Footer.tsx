"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* One letter of the giant wordmark — rises out of the floor, scrubbed by scroll. */
function WordmarkLetter({
  letter,
  index,
  total,
  p,
}: {
  letter: string;
  index: number;
  total: number;
  p: MotionValue<number>;
}) {
  const start = (index / total) * 0.5;
  const y = useTransform(p, [start, start + 0.5], ["112%", "0%"]);
  const rotate = useTransform(p, [start, start + 0.5], [12, 0]);
  const opacity = useTransform(p, [start, start + 0.25], [0, 1]);

  return (
    <motion.span
      style={{ y, rotate, opacity, animationDelay: `${index * 0.35}s` }}
      className="inline-block origin-bottom animate-[gradientDrift_9s_linear_infinite] bg-[linear-gradient(105deg,#16161A,#33333A,#8E8E98,#33333A,#16161A)] bg-[length:300%_100%] bg-clip-text text-transparent will-change-transform"
    >
      {letter}
    </motion.span>
  );
}

/* The giant aurora wordmark — assembles letter by letter at the page's end. */
function FooterWordmark({ p }: { p: MotionValue<number> }) {
  const letters = "VOIDCRAFT".split("");

  return (
    <div className="relative -mb-[1vw] overflow-hidden">
      <p
        aria-hidden="true"
        className="headline flex select-none justify-center whitespace-nowrap text-center text-[16.5vw] font-semibold leading-none tracking-[-0.05em] [filter:drop-shadow(0_0_40px_rgba(242,240,232,0.08))]"
      >
        {letters.map((l, i) => (
          <WordmarkLetter
            key={i}
            letter={l}
            index={i}
            total={letters.length}
            p={p}
          />
        ))}
      </p>
    </div>
  );
}

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
      { label: "X / Twitter", href: "https://x.com/VoidCraft06" },
      { label: "Reddit", href: "https://www.reddit.com/u/void_craft06/s/5vEo5p7aBR" },
      { label: "Gmail", href: "mailto:voidcraft.admin@gmail.com" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "voidcraft.admin@gmail.com", href: "mailto:voidcraft.admin@gmail.com" },
      { label: "Start a project", href: "#contact" },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start 0.95", "end 1"],
  });

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-void pt-20">
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
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
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

      {/* giant wordmark — assembles from the floor as you reach the end */}
      <FooterWordmark p={scrollYProgress} />
    </footer>
  );
}
