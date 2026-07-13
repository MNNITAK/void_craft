"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { processSteps } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

/**
 * One stop on the pipeline. Driven by its own scroll progress:
 * the node ignites as the comet reaches it, a stub wire draws out
 * to the copy, and once the comet passes, the number becomes a check.
 */
function ProcessStep({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start 0.72", "start 0.3"],
  });
  const even = index % 2 === 0;

  /* ignition */
  const nodeBg = useTransform(p, [0.15, 0.45], ["#0A0A0C", "#0B4FFF"]);
  const nodeBorder = useTransform(
    p,
    [0.15, 0.45],
    ["rgba(242,240,232,0.18)", "rgba(92,134,255,1)"]
  );
  const nodeShadow = useTransform(
    p,
    [0.15, 0.45],
    ["0 0 0px 0px rgba(11,79,255,0)", "0 0 26px 2px rgba(11,79,255,0.65)"]
  );
  const ringOpacity = useTransform(p, [0.3, 0.5], [0, 1]);

  /* number → check once the signal has passed */
  const numOpacity = useTransform(p, [0.6, 0.85], [1, 0]);
  const numY = useTransform(p, [0.6, 0.85], [0, -10]);
  const checkOpacity = useTransform(p, [0.6, 0.85], [0, 1]);
  const checkY = useTransform(p, [0.6, 0.85], [10, 0]);

  /* stub wire from spine to copy */
  const stubScale = useTransform(p, [0.2, 0.55], [0, 1]);

  /* copy slides in toward the spine */
  const contentX = useTransform(p, [0, 0.5], [even ? -44 : 44, 0]);
  const contentOpacity = useTransform(p, [0.02, 0.45], [0, 1]);

  return (
    <li ref={ref} className="relative">
      {/* node */}
      <motion.span
        style={{
          backgroundColor: nodeBg,
          borderColor: nodeBorder,
          boxShadow: nodeShadow,
        }}
        className="absolute left-[19px] top-1 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border sm:left-1/2"
      >
        <motion.span
          aria-hidden="true"
          style={{ opacity: ringOpacity }}
          className="absolute inset-0 animate-ping rounded-full border border-volt/60 [animation-duration:2.4s]"
        />
        <motion.span
          style={{ opacity: numOpacity, y: numY }}
          className="col-start-1 row-start-1 font-mono text-[11px] text-bone"
        >
          {step.id}
        </motion.span>
        <motion.svg
          style={{ opacity: checkOpacity, y: checkY }}
          className="col-start-1 row-start-1"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 7.5l3 3 6-7"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.span>

      {/* stub wire out to the copy */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: stubScale }}
        className={`absolute top-[21px] hidden h-px w-14 border-t border-dashed border-volt/60 sm:block ${
          even
            ? "right-1/2 mr-6 origin-right"
            : "left-1/2 ml-6 origin-left"
        }`}
      />

      <motion.div
        style={{ x: contentX, opacity: contentOpacity }}
        className={`pl-16 sm:w-1/2 sm:pl-0 ${
          even ? "sm:pr-24 sm:text-right" : "sm:ml-auto sm:pl-24"
        }`}
      >
        <h3 className="font-display text-2xl font-semibold tracking-tight text-bone">
          {step.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-mist">
          {step.description}
        </p>
      </motion.div>
    </li>
  );
}

export default function Process() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.72", "end 0.35"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });
  const cometTop = useTransform(progress, (v) => `${v * 100}%`);

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
          {/* spine track */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-0 h-full w-px bg-bone/10 sm:left-1/2"
          />
          {/* lit trail behind the comet */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute left-[19px] top-0 h-full w-px origin-top bg-gradient-to-b from-volt/40 via-volt to-volt-soft sm:left-1/2"
          />
          {/* the comet — a signal travelling down the pipeline */}
          <motion.div
            aria-hidden="true"
            style={{ top: cometTop }}
            className="absolute left-[19px] z-20 -translate-x-1/2 -translate-y-1/2 sm:left-1/2"
          >
            <span className="relative block h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_28px_8px_rgba(11,79,255,0.85)]">
              <span className="absolute inset-0 animate-ping rounded-full bg-volt-soft/70 [animation-duration:1.6s]" />
            </span>
          </motion.div>

          <ol className="space-y-16 sm:space-y-24">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.id} step={step} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
