"use client";

import { motion } from "framer-motion";
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

/* Each character sharpens out of a heavy blur, one after another. */
const charParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};
const charChild = {
  hidden: { opacity: 0, y: 44, scale: 1.06, filter: "blur(20px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function BlurRevealStat({ text }: { text: string }) {
  return (
    <motion.span
      variants={charParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
      className="headline block text-[19vw] font-semibold leading-none sm:text-[9.5rem]"
      aria-label={text}
    >
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          variants={charChild}
          aria-hidden="true"
          className="inline-block animate-[gradientDrift_6s_linear_infinite] bg-[linear-gradient(100deg,#0B4FFF,#5C86FF,#9DB9FF,#5C86FF,#0B4FFF)] bg-[length:220%_100%] bg-clip-text text-transparent will-change-[filter]"
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * The decision stream — business events flow past endlessly while the
 * headline stat sharpens out of a blur, character by character.
 */
export default function DecisionStream() {
  const rows = [...streamEvents, ...streamEvents];

  return (
    <section
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
        <div className="relative flex h-full flex-col items-center justify-center text-center">
          <BlurRevealStat text="2.4 million" />
          <motion.span
            initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="headline mt-2 block text-3xl font-medium text-bone sm:text-5xl"
          >
            decisions automated and counting
          </motion.span>
          <motion.span
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="mt-6 font-mono text-[11px] uppercase tracking-micro text-mist/60"
          >
            Across every system Void Craft has in production
          </motion.span>
        </div>
      </div>
    </section>
  );
}
