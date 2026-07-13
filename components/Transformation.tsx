"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const MONO = "var(--font-mono), monospace";

/* A labelled tool node inside the chaos diagram. */
function ChaosChip({
  x,
  y,
  w,
  label,
  delay,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={26}
        rx={13}
        fill="#1B1B20"
        stroke="rgba(242,240,232,0.14)"
      />
      <text
        x={x + w / 2}
        y={y + 17}
        textAnchor="middle"
        fontSize="9"
        letterSpacing="0.1em"
        fill="#A6A6B0"
        fontFamily={MONO}
      >
        {label}
      </text>
    </motion.g>
  );
}

/* Tangled tool sprawl — operations before Void Craft. */
function ChaosPanel() {
  const edges = [
    { d: "M80 47 L403 39", dash: false },
    { d: "M80 47 L426 145", dash: true },
    { d: "M88 161 L249 129", dash: false },
    { d: "M88 161 L232 253", dash: true },
    { d: "M88 161 L403 39", dash: false },
    { d: "M249 129 L413 257", dash: true },
    { d: "M249 129 L426 145", dash: false },
    { d: "M232 253 L403 39", dash: true },
    { d: "M232 253 L413 257", dash: false },
  ];
  const chips = [
    { x: 36, y: 34, w: 88, label: "LEADS INBOX" },
    { x: 356, y: 26, w: 94, label: "SPREADSHEETS" },
    { x: 52, y: 148, w: 72, label: "WHATSAPP" },
    { x: 404, y: 132, w: 44, label: "CRM" },
    { x: 196, y: 240, w: 72, label: "INVOICES" },
    { x: 360, y: 244, w: 106, label: "MANUAL REPORTS" },
    { x: 196, y: 116, w: 106, label: "OWNER'S MEMORY" },
  ];
  const crosses = [
    { x: 270, y: 96 },
    { x: 160, y: 207 },
    { x: 312, y: 168 },
  ];
  const pains = [
    "Leads answered next day",
    "Data re-typed five times",
    "Reports built by hand",
    "Knowledge in one person's head",
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-bone/[0.07] bg-void-card">
      <div className="dot-grid-dark absolute inset-0" aria-hidden="true" />
      <div className="relative flex h-full flex-col p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-micro text-mist">
            Your operations today
          </p>
          <span className="rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-micro text-signal">
            Before
          </span>
        </div>

        <svg
          viewBox="0 0 520 300"
          fill="none"
          className="my-auto w-full py-6"
          aria-hidden="true"
        >
          {edges.map((e, i) => (
            <motion.path
              key={i}
              d={e.d}
              stroke="rgba(242,240,232,0.16)"
              strokeWidth="1"
              strokeDasharray={e.dash ? "4 5" : undefined}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: "easeInOut" }}
            />
          ))}
          {chips.map((c, i) => (
            <ChaosChip key={c.label} {...c} delay={0.15 + i * 0.08} />
          ))}
          {crosses.map((c, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3 + i * 0.18, duration: 0.35 }}
            >
              <circle cx={c.x} cy={c.y} r="9" fill="#17171B" stroke="rgba(255,77,46,0.4)" />
              <path
                d={`M${c.x - 3.5} ${c.y - 3.5} l7 7 M${c.x + 3.5} ${c.y - 3.5} l-7 7`}
                stroke="#FF4D2E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </motion.g>
          ))}
        </svg>

        <ul className="grid gap-2.5 border-t border-bone/[0.07] pt-6 font-mono text-[11px] uppercase tracking-wider text-mist/80 sm:grid-cols-2">
          {pains.map((p) => (
            <li key={p} className="flex items-center gap-2.5">
              <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
                <path
                  d="M2 2l6 6M8 2l-6 6"
                  stroke="#FF4D2E"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* One clean pipeline — operations as a single system. */
function SystemPanel() {
  const inputs = [
    { x: 36, y: 58, w: 76, label: "LEADS" },
    { x: 36, y: 138, w: 84, label: "MESSAGES" },
    { x: 36, y: 218, w: 76, label: "INVOICES" },
  ];
  const lines = [
    "M112 71 H148 L196 138",
    "M120 151 H196",
    "M112 231 H148 L196 164",
  ];
  const wins = [
    "Every lead answered in seconds",
    "Data entered once, everywhere",
    "Reports that write themselves",
    "Knowledge built into the system",
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-volt">
      <div className="dot-grid-volt absolute inset-0" aria-hidden="true" />
      <div className="relative flex h-full flex-col p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-micro text-white/85">
            Your operations on Void Craft
          </p>
          <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-micro text-white">
            After
          </span>
        </div>

        <svg
          viewBox="0 0 520 300"
          fill="none"
          className="my-auto w-full py-6"
          aria-hidden="true"
        >
          {lines.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="1.4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: "easeInOut" }}
            />
          ))}
          <motion.path
            d="M348 151 H444"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 1.4, ease: "easeInOut" }}
          />

          {inputs.map((c, i) => (
            <motion.g
              key={c.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <rect
                x={c.x}
                y={c.y}
                width={c.w}
                height={26}
                rx={13}
                fill="rgba(255,255,255,0.12)"
                stroke="rgba(255,255,255,0.4)"
              />
              <text
                x={c.x + c.w / 2}
                y={c.y + 17}
                textAnchor="middle"
                fontSize="9"
                letterSpacing="0.1em"
                fill="#FFFFFF"
                fontFamily={MONO}
              >
                {c.label}
              </text>
            </motion.g>
          ))}

          <motion.g
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect x="196" y="118" width="152" height="64" rx="16" fill="#FFFFFF" />
            <text
              x="272"
              y="146"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.12em"
              fill="#0B4FFF"
              fontFamily={MONO}
            >
              VOID CRAFT
            </text>
            <text
              x="272"
              y="162"
              textAnchor="middle"
              fontSize="7.5"
              letterSpacing="0.18em"
              fill="rgba(11,79,255,0.55)"
              fontFamily={MONO}
            >
              ONE SYSTEM
            </text>
          </motion.g>

          {/* pulse travelling down the output line */}
          <motion.circle
            cy="151"
            r="3"
            fill="#FFFFFF"
            initial={{ cx: 350, opacity: 0 }}
            animate={{ cx: [350, 440], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, delay: 2.4, repeat: Infinity, repeatDelay: 0.6, ease: "linear" }}
          />

          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <circle cx="460" cy="151" r="16" fill="#3DDC97" />
            <path
              d="M453 151 l5 5 9-9"
              stroke="#0A0A0C"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </motion.g>
        </svg>

        <ul className="grid gap-2.5 border-t border-white/20 pt-6 font-mono text-[11px] uppercase tracking-wider text-white sm:grid-cols-2">
          {wins.map((w) => (
            <li key={w} className="flex items-center gap-2.5">
              <svg width="11" height="11" viewBox="0 0 11 11" className="shrink-0">
                <path
                  d="M2 5.8l2.5 2.5L9 3.2"
                  stroke="#3DDC97"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              {w}
            </li>
          ))}
        </ul>
      </div>
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

        <div className="relative grid gap-5 lg:grid-cols-2">
          <Reveal y={40} className="h-full">
            <ChaosPanel />
          </Reveal>
          <Reveal y={40} delay={0.12} className="h-full">
            <SystemPanel />
          </Reveal>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-bone text-void shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3 9h12m0 0l-5-5m5 5l-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
