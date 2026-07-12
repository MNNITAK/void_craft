"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import WordReveal from "@/components/motion/WordReveal";
import Button from "@/components/ui/Button";

/* Rotating "live system" feed — the original storytelling device:
   Void Craft systems quietly doing work while you read the headline. */
const feed = [
  { icon: "◉", label: "AI RECEPTIONIST", detail: "Inbound call answered · appointment booked", meta: "00:02s" },
  { icon: "⚙", label: "WORKFLOW #248", detail: "Invoice reconciled · synced to ERP", meta: "auto" },
  { icon: "◈", label: "LEAD ENGINE", detail: "New lead scored 94 · agent notified", meta: "90s SLA" },
  { icon: "▤", label: "OPS DASHBOARD", detail: "Anomaly flagged · capacity forecast updated", meta: "live" },
  { icon: "✦", label: "SUPPORT AGENT", detail: "Ticket triaged · draft reply ready for review", meta: "queue 0" },
];

function LiveFeedCard() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % feed.length), 2800);
    return () => clearInterval(t);
  }, [reduced]);

  const item = feed[index];

  return (
    <div className="glass-dark w-full max-w-md rounded-2xl p-1.5 shadow-[0_24px_80px_-24px_rgba(11,79,255,0.35)]">
      <div className="flex items-center justify-between rounded-t-xl px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-micro text-mist">
          voidcraft / live systems
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-micro text-mint">
          <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-soft" />
          operational
        </span>
      </div>
      <div className="relative h-[104px] overflow-hidden rounded-xl bg-void/70 px-4 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full flex-col justify-center gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-micro text-volt-soft">
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </span>
              <span className="font-mono text-[10px] text-mist">{item.meta}</span>
            </div>
            <p className="text-sm text-bone/90">{item.detail}</p>
            <div className="flex items-center gap-1.5">
              {feed.map((_, i) => (
                <span
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-6 bg-volt" : "w-2 bg-bone/15"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* A pipeline line that draws itself across the hero — systems connecting. */
function PipelinePath() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-[16%] hidden w-full lg:block"
      viewBox="0 0 1440 220"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M-20 160 H 320 Q 350 160 350 130 V 90 Q 350 60 380 60 H 660 Q 690 60 690 90 V 130 Q 690 160 720 160 H 1010 Q 1040 160 1040 130 V 80 Q 1040 50 1070 50 H 1460"
        stroke="url(#heroLine)"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: "easeInOut", delay: 0.8 }}
      />
      {[350, 690, 1040].map((x, i) => (
        <motion.circle
          key={x}
          cx={x === 350 ? 365 : x === 690 ? 705 : 1055}
          cy={x === 1040 ? 50 : 60}
          r="4"
          fill="#0B4FFF"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4 + i * 0.35, duration: 0.4 }}
        />
      ))}
      <defs>
        <linearGradient id="heroLine" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B4FFF" stopOpacity="0" />
          <stop offset="0.2" stopColor="#0B4FFF" stopOpacity="0.8" />
          <stop offset="0.8" stopColor="#5C86FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#5C86FF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="dot-grid-dark noise relative flex min-h-svh flex-col justify-center overflow-hidden pt-32 pb-20"
    >
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-volt/15 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[-10%] h-[420px] w-[520px] rounded-full bg-volt-deep/10 blur-[140px] animate-drift"
      />

      <PipelinePath />

      <div className="relative mx-auto grid w-full max-w-shell items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-bone/10 px-4 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse-soft" />
            <span className="font-mono text-[11px] uppercase tracking-micro text-mist">
              AI · Software · Automation
            </span>
          </motion.div>

          <WordReveal
            text="We build businesses that think."
            className="headline text-[13.5vw] font-semibold text-bone sm:text-7xl lg:text-[5.6rem]"
            delay={0.3}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-mist"
          >
            Void Craft is the AI and software agency behind intelligent
            businesses — the agents, automations, and products that let
            ambitious companies operate beyond their headcount.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="#contact" size="lg" variant="volt">
              Start a project
            </Button>
            <Button href="#work" size="lg" variant="ghost-dark">
              See the work
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <LiveFeedCard />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[10px] uppercase tracking-micro text-mist/70 md:flex"
      >
        <span className="block h-8 w-px overflow-hidden bg-bone/10">
          <motion.span
            className="block h-3 w-px bg-volt"
            animate={{ y: [0, 32] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        scroll
      </motion.div>
    </section>
  );
}
