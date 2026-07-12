"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

/* Tangled paths — operations before Void Craft. */
function ChaosPanel() {
  const chaosPaths = [
    "M30 60 L120 95 L200 40 L290 110 L370 70 L450 120",
    "M30 110 L110 45 L210 120 L300 60 L400 100 L450 50",
    "M30 85 L140 130 L230 75 L330 125 L420 85",
  ];
  const crosses = [
    { x: 200, y: 40 },
    { x: 300, y: 60 },
    { x: 330, y: 125 },
  ];

  return (
    <div className="dot-grid-dark relative overflow-hidden rounded-3xl border border-bone/[0.07] bg-void-card p-7 sm:p-9">
      <p className="font-mono text-[11px] uppercase tracking-micro text-mist">
        Your operations today —{" "}
        <span className="text-signal">held together by heroics</span>
      </p>
      <svg viewBox="0 0 480 160" fill="none" className="mt-6 w-full" aria-hidden="true">
        {chaosPaths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="rgba(242,240,232,0.25)"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, delay: i * 0.25, ease: "easeInOut" }}
          />
        ))}
        {crosses.map((c, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 + i * 0.2, duration: 0.35 }}
          >
            <path
              d={`M${c.x - 5} ${c.y - 5} l10 10 M${c.x + 5} ${c.y - 5} l-10 10`}
              stroke="#FF4D2E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
        ))}
      </svg>
      <ul className="mt-6 grid gap-2 font-mono text-[11px] uppercase tracking-wider text-mist/70 sm:grid-cols-2">
        <li>· Leads answered next day</li>
        <li>· Data re-typed five times</li>
        <li>· Reports built by hand</li>
        <li>· Knowledge in one person&apos;s head</li>
      </ul>
    </div>
  );
}

/* Clean converging paths — operations as one system. */
function SystemPanel() {
  const cleanPaths = [
    "M30 45 H180 L240 80 H450",
    "M30 80 H450",
    "M30 115 H180 L240 80",
  ];

  return (
    <div className="dot-grid-volt relative overflow-hidden rounded-3xl bg-volt p-7 sm:p-9">
      <p className="font-mono text-[11px] uppercase tracking-micro text-white/80">
        Your operations on Void Craft —{" "}
        <span className="text-white">one intelligent system</span>
      </p>
      <svg viewBox="0 0 480 160" fill="none" className="mt-6 w-full" aria-hidden="true">
        {cleanPaths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.2, ease: "easeInOut" }}
          />
        ))}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.7, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <circle cx="450" cy="80" r="14" fill="#3DDC97" />
          <path
            d="M444 80 l4 4 8-8"
            stroke="#0A0A0C"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>
      </svg>
      <ul className="mt-6 grid gap-2 font-mono text-[11px] uppercase tracking-wider text-white/85 sm:grid-cols-2">
        <li>· Every lead answered in seconds</li>
        <li>· Data entered once, everywhere</li>
        <li>· Reports that write themselves</li>
        <li>· Knowledge built into the system</li>
      </ul>
    </div>
  );
}

export default function Transformation() {
  return (
    <section className="relative bg-void py-28 sm:py-36">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <SectionLabel>The shift</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="headline mt-6 text-4xl font-semibold sm:text-6xl">
              <span className="text-mist/50">Your business didn&apos;t get complicated.</span>{" "}
              <span className="text-bone">It got manual.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist">
              Growth quietly turns every process into a person doing the same
              thing twice. We replace the duct tape with systems that decide,
              act, and improve on their own.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5">
          <Reveal y={40}>
            <ChaosPanel />
          </Reveal>
          <Reveal y={40} delay={0.12}>
            <SystemPanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
