"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Process() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative bg-void py-28 sm:py-36">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="mb-20 max-w-2xl">
          <Reveal>
            <SectionLabel>How we work</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="headline mt-6 text-4xl font-semibold text-bone sm:text-6xl">
              A straight line from
              <br />
              idea to running system.
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-mist">
              No mystery phases, no vanishing act between kickoff and delivery.
              Six steps, each with something real at the end of it.
            </p>
          </Reveal>
        </div>

        <div ref={lineRef} className="relative">
          {/* spine */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-0 h-full w-px bg-bone/10 sm:left-1/2"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute left-[19px] top-0 h-full w-px origin-top bg-gradient-to-b from-volt via-volt-soft to-volt shadow-[0_0_18px_0_rgba(11,79,255,0.7)] sm:left-1/2"
          />

          <ol className="space-y-16 sm:space-y-24">
            {processSteps.map((step, i) => {
              const even = i % 2 === 0;
              return (
                <li key={step.id} className="relative">
                  {/* node */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-[19px] top-1 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-volt/50 bg-void font-mono text-[11px] text-volt-soft sm:left-1/2"
                  >
                    {step.id}
                  </motion.span>

                  <div
                    className={`pl-16 sm:w-1/2 sm:pl-0 ${
                      even
                        ? "sm:pr-16 sm:text-right"
                        : "sm:ml-auto sm:pl-16"
                    }`}
                  >
                    <Reveal y={26}>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-bone">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-mist">
                        {step.description}
                      </p>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
