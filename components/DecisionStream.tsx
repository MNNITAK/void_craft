"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { streamEvents } from "@/lib/data";

function StreamRow({
  trigger,
  action,
}: {
  trigger: string;
  action: string;
}) {
  return (
    <div className="flex items-center gap-5 py-[13px]">
      <span className="w-56 shrink-0 font-mono text-[11px] uppercase tracking-wider text-mist/45 sm:w-72">
        {trigger}
      </span>
      <span
        aria-hidden="true"
        className="h-px flex-1 border-t border-dashed border-bone/[0.08]"
      />
      <span className="shrink-0 rounded-md border border-volt/40 bg-volt/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-volt-soft">
        <span aria-hidden="true" className="mr-1.5 text-volt-soft">
          ◆
        </span>
        {action}
      </span>
    </div>
  );
}

/**
 * The decision stream — business events flow past endlessly while the
 * headline stat sharpens out of a blur as you scroll into it.
 */
export default function DecisionStream() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.15"],
  });

  const blur = useTransform(scrollYProgress, [0, 1], [26, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  const rows = [...streamEvents, ...streamEvents];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#101012] py-10"
      aria-label="Automated decisions served"
    >
      <div className="relative mx-auto h-[130vh] min-h-[720px] max-w-shell px-5 sm:px-8">
        {/* streaming rows */}
        <div
          aria-hidden="true"
          className="absolute inset-x-5 inset-y-0 overflow-hidden sm:inset-x-8"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          }}
        >
          <div className="animate-stream-y">
            {rows.map((event, i) => (
              <StreamRow
                key={i}
                trigger={event.trigger}
                action={event.action}
              />
            ))}
          </div>
        </div>

        {/* dark vignette behind the stat so it stays readable */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[840px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#101012]/80 blur-3xl"
        />

        {/* the stat */}
        <motion.div
          style={{ filter, opacity, scale }}
          className="relative flex h-full flex-col items-center justify-center text-center will-change-[filter]"
        >
          <span className="headline block text-[19vw] font-semibold leading-none text-volt sm:text-[9.5rem]">
            2.4 million
          </span>
          <span className="headline mt-2 block text-3xl font-medium text-bone sm:text-5xl">
            decisions automated and counting
          </span>
          <span className="mt-6 font-mono text-[11px] uppercase tracking-micro text-mist/60">
            Across every system Void Craft has in production
          </span>
        </motion.div>
      </div>
    </section>
  );
}
