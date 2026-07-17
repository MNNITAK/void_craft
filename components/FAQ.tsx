"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

function FaqItem({
  faq,
  open,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[number];
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors duration-400 ${
        open
          ? "border-volt/40 bg-void-card"
          : "border-bone/[0.07] bg-transparent hover:border-bone/20"
      }`}
    >
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-mono text-[11px] text-mist/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-lg font-medium tracking-tight text-bone">
            {faq.q}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-lg leading-none ${
            open ? "border-volt/50 text-volt-soft" : "border-bone/15 text-mist"
          }`}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-7 pb-7 pl-[4.4rem] text-[15px] leading-relaxed text-mist">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-void py-28 sm:py-36">
      <div className="mx-auto grid max-w-shell gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="headline mt-6 text-4xl font-semibold text-bone sm:text-5xl">
              The questions
              <br />
              founders actually ask.
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-mist">
              Anything else? Ask a human —{" "}
              <a
                href="mailto:voidcraft.admin@gmail.com"
                className="text-bone underline decoration-volt/60 underline-offset-4 transition-colors hover:text-volt-soft"
              >
                voidcraft.admin@gmail.com
              </a>
            </p>
          </Reveal>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.06} y={22}>
              <FaqItem
                faq={faq}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
