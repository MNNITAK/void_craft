"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Magnetic from "@/components/motion/Magnetic";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="dot-grid-volt noise relative overflow-hidden bg-volt py-32 sm:py-44"
    >
      {/* drawn circuit line */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-14 left-0 hidden w-full md:block"
        viewBox="0 0 1440 120"
        fill="none"
      >
        <motion.path
          d="M-20 90 H 420 Q 450 90 450 60 V 40 Q 450 10 480 10 H 760 Q 790 10 790 40 V 60 Q 790 90 820 90 H 1460"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="820"
          cy="90"
          r="5"
          fill="#fff"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 0.4 }}
        />
      </svg>

      <div className="relative mx-auto max-w-shell px-5 text-center sm:px-8">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-micro text-white/70">
            Next: your business
          </span>
        </Reveal>

        <WordReveal
          as="h2"
          text="Let's build what your competitors will copy."
          className="headline mx-auto mt-6 max-w-4xl text-5xl font-semibold text-white sm:text-7xl"
        />

        <Reveal delay={0.25}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/75">
            Tell us where your business loses time or money. We'll come back
            within 48 hours with the system that fixes it — and the numbers to
            prove it's worth building.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.3}>
              <a
                href="mailto:hello@voidcraft.agency"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-bone-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                Start a project
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <a
              href="mailto:hello@voidcraft.agency"
              className="rounded-full border border-white/30 px-8 py-4 text-base text-white transition-colors duration-300 hover:border-white/70 hover:bg-white/10"
            >
              hello@voidcraft.agency
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="mt-9 font-mono text-[10px] uppercase tracking-micro text-white/50">
            Response within 48h · No discovery-call maze · NDA on request
          </p>
        </Reveal>
      </div>
    </section>
  );
}
