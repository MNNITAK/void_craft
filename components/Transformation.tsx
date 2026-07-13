"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  easeInOut,
  MotionValue,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const MONO = "var(--font-mono), monospace";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const toPath = (pts: number[][]) =>
  "M" + pts.map((pt) => pt.map((n) => n.toFixed(1)).join(" ")).join(" L");

/* ---------------- diagram data (viewBox 1000 x 520) ---------------- */

/* Wires: `a` = tangled points, `b` = clean pipeline points (same count). */
const WIRES: { a: number[][]; b: number[][]; dash?: boolean; fade?: boolean }[] = [
  {
    a: [[230, 77], [500, 300], [700, 62], [850, 257]],
    b: [[220, 137], [330, 137], [390, 215], [430, 225]],
  },
  {
    a: [[275, 317], [460, 187], [690, 430], [810, 120]],
    b: [[195, 257], [300, 257], [390, 252], [430, 250]],
    dash: true,
  },
  {
    a: [[200, 120], [360, 420], [560, 187], [742, 417]],
    b: [[190, 377], [330, 377], [390, 285], [430, 275]],
  },
  {
    a: [[430, 447], [300, 200], [767, 62], [850, 257]],
    b: [[650, 250], [740, 250], [820, 250], [895, 250]],
  },
  {
    a: [[150, 200], [600, 350], [750, 150], [880, 400]],
    b: [[530, 250], [530, 250], [530, 250], [530, 250]],
    dash: true,
    fade: true,
  },
];

/* Real-world inputs — survive the transformation, slide into the left rail. */
const INPUTS = [
  { label: "LEADS INBOX", w: 150, ax: 80, ay: 60, bx: 70, by: 120 },
  { label: "WHATSAPP", w: 125, ax: 150, ay: 300, bx: 70, by: 240 },
  { label: "INVOICES", w: 120, ax: 430, ay: 430, bx: 70, by: 360 },
];

/* Duct-tape tools — get absorbed into the system node and disappear. */
const TOOLS = [
  { label: "SPREADSHEETS", w: 155, x: 690, y: 45 },
  { label: "CRM", w: 80, x: 810, y: 240 },
  { label: "MANUAL REPORTS", w: 185, x: 650, y: 400 },
  { label: "OWNER'S MEMORY", w: 185, x: 370, y: 170 },
];
const ABSORB = { x: 530, y: 250 }; // where tools get sucked into

const CROSSES = [
  { x: 250, y: 210 },
  { x: 600, y: 300 },
  { x: 320, y: 360 },
];

const PAINS = [
  "Leads answered next day",
  "Data re-typed five times",
  "Reports built by hand",
  "Knowledge in one person's head",
];
const WINS = [
  "Every lead answered in seconds",
  "Data entered once, everywhere",
  "Reports that write themselves",
  "Knowledge built into the system",
];

/* ---------------- morphing pieces ---------------- */

function MorphWire({
  p,
  a,
  b,
  dash,
  fade,
}: {
  p: MotionValue<number>;
  a: number[][];
  b: number[][];
  dash?: boolean;
  fade?: boolean;
}) {
  const d = useTransform(p, (v) => {
    const t = easeInOut(clamp01((v - 0.25) / 0.45));
    return toPath(a.map((pt, i) => [pt[0] + (b[i][0] - pt[0]) * t, pt[1] + (b[i][1] - pt[1]) * t]));
  });
  const stroke = useTransform(
    p,
    [0.3, 0.7],
    ["rgba(242,240,232,0.18)", "rgba(255,255,255,0.85)"]
  );
  const fadeOp = useTransform(p, [0.4, 0.6], [1, 0]);

  return (
    <motion.path
      d={d}
      style={{ stroke, opacity: fade ? fadeOp : 1 }}
      strokeWidth="1.3"
      strokeDasharray={dash ? "5 6" : undefined}
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    />
  );
}

function InputChip({
  p,
  label,
  w,
  ax,
  ay,
  bx,
  by,
}: {
  p: MotionValue<number>;
  label: string;
  w: number;
  ax: number;
  ay: number;
  bx: number;
  by: number;
}) {
  const x = useTransform(p, [0.28, 0.68], [0, bx - ax], { ease: easeInOut });
  const y = useTransform(p, [0.28, 0.68], [0, by - ay], { ease: easeInOut });
  const fill = useTransform(p, [0.35, 0.7], ["#1B1B20", "rgba(255,255,255,0.14)"]);
  const strokeC = useTransform(
    p,
    [0.35, 0.7],
    ["rgba(242,240,232,0.14)", "rgba(255,255,255,0.45)"]
  );
  const textFill = useTransform(p, [0.35, 0.7], ["#A6A6B0", "#FFFFFF"]);

  return (
    <motion.g style={{ x, y }}>
      <motion.rect
        x={ax}
        y={ay}
        width={w}
        height={34}
        rx={17}
        style={{ fill, stroke: strokeC }}
      />
      <motion.text
        x={ax + w / 2}
        y={ay + 22}
        textAnchor="middle"
        fontSize="11"
        letterSpacing="0.1em"
        style={{ fill: textFill }}
        fontFamily={MONO}
      >
        {label}
      </motion.text>
    </motion.g>
  );
}

function ToolChip({
  p,
  label,
  w,
  x,
  y,
}: {
  p: MotionValue<number>;
  label: string;
  w: number;
  x: number;
  y: number;
}) {
  const dx = useTransform(p, [0.35, 0.62], [0, ABSORB.x - (x + w / 2)], { ease: easeInOut });
  const dy = useTransform(p, [0.35, 0.62], [0, ABSORB.y - (y + 17)], { ease: easeInOut });
  const opacity = useTransform(p, [0.42, 0.6], [1, 0]);
  const scale = useTransform(p, [0.35, 0.62], [1, 0.4]);

  return (
    <motion.g
      style={{
        x: dx,
        y: dy,
        scale,
        opacity,
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={34}
        rx={17}
        fill="#1B1B20"
        stroke="rgba(242,240,232,0.14)"
      />
      <text
        x={x + w / 2}
        y={y + 22}
        textAnchor="middle"
        fontSize="11"
        letterSpacing="0.1em"
        fill="#A6A6B0"
        fontFamily={MONO}
      >
        {label}
      </text>
    </motion.g>
  );
}

/* ---------------- the pinned morph stage (desktop) ---------------- */

function MorphStage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  /* stage surface */
  const bg = useTransform(p, [0.3, 0.7], ["#17171B", "#0B4FFF"]);
  const borderC = useTransform(
    p,
    [0.3, 0.7],
    ["rgba(242,240,232,0.08)", "rgba(255,255,255,0)"]
  );
  const darkDots = useTransform(p, [0.35, 0.6], [1, 0]);
  const voltDots = useTransform(p, [0.45, 0.7], [0, 1]);

  /* header + lists crossfade */
  const beforeOp = useTransform(p, [0.4, 0.55], [1, 0]);
  const afterOp = useTransform(p, [0.5, 0.65], [0, 1]);
  const listBorder = useTransform(
    p,
    [0.3, 0.7],
    ["rgba(242,240,232,0.08)", "rgba(255,255,255,0.25)"]
  );

  /* meter */
  const meter = useTransform(p, (v) => easeInOut(clamp01((v - 0.2) / 0.55)));
  const meterPct = useTransform(meter, (v) => `${Math.round(v * 100)}%`);
  const meterFill = useTransform(meter, [0, 1], ["#FF4D2E", "#3DDC97"]);
  const meterScale = useTransform(meter, (v) => Math.max(0.02, v));
  const meterTextC = useTransform(p, [0.4, 0.65], ["#9C9CA6", "#FFFFFF"]);

  /* markers */
  const crossOp = useTransform(p, [0.28, 0.45], [1, 0]);
  const nodeOp = useTransform(p, [0.55, 0.72], [0, 1]);
  const nodeScale = useTransform(p, [0.55, 0.75], [0.6, 1], { ease: easeInOut });
  const checkOp = useTransform(p, [0.8, 0.92], [0, 1]);
  const checkScale = useTransform(p, [0.8, 0.94], [0.3, 1], { ease: easeInOut });
  const pulseGate = useTransform(p, [0.88, 0.96], [0, 1]);
  const hintOp = useTransform(p, [0.02, 0.12], [1, 0]);

  return (
    <div ref={trackRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center">
        <motion.div
          style={{ backgroundColor: bg, borderColor: borderC }}
          className="relative flex h-[min(82vh,760px)] flex-col overflow-hidden rounded-3xl border"
        >
          <motion.div style={{ opacity: darkDots }} className="dot-grid-dark absolute inset-0" />
          <motion.div style={{ opacity: voltDots }} className="dot-grid-volt absolute inset-0" />

          <div className="relative flex h-full flex-col p-8 sm:p-10">
            {/* header row */}
            <div className="flex items-start justify-between gap-6">
              <div className="relative flex-1">
                <motion.p
                  style={{ opacity: beforeOp }}
                  className="font-mono text-[11px] uppercase tracking-micro text-mist"
                >
                  Your operations today —{" "}
                  <span className="text-signal">held together by heroics</span>
                </motion.p>
                <motion.p
                  style={{ opacity: afterOp }}
                  className="absolute inset-0 font-mono text-[11px] uppercase tracking-micro text-white/85"
                >
                  Your operations on Void Craft —{" "}
                  <span className="font-bold text-white">one intelligent system</span>
                </motion.p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <motion.span
                  style={{ color: meterTextC }}
                  className="font-mono text-[10px] uppercase tracking-micro"
                >
                  system
                </motion.span>
                <div className="h-[5px] w-28 overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    style={{ scaleX: meterScale, backgroundColor: meterFill }}
                    className="h-full w-full origin-left rounded-full"
                  />
                </div>
                <motion.span
                  style={{ color: meterTextC }}
                  className="w-10 text-right font-mono text-[11px] tabular-nums"
                >
                  {meterPct}
                </motion.span>
              </div>
            </div>

            {/* the diagram */}
            <div className="relative min-h-0 flex-1 py-4">
              <svg
                viewBox="0 0 1000 520"
                fill="none"
                className="h-full w-full"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                {WIRES.map((w, i) => (
                  <MorphWire key={i} p={p} {...w} />
                ))}

                {TOOLS.map((t) => (
                  <ToolChip key={t.label} p={p} {...t} />
                ))}
                {INPUTS.map((c) => (
                  <InputChip key={c.label} p={p} {...c} />
                ))}

                {/* failure markers — dissolve as things untangle */}
                {CROSSES.map((c, i) => (
                  <motion.g key={i} style={{ opacity: crossOp }}>
                    <circle cx={c.x} cy={c.y} r="11" fill="#17171B" stroke="rgba(255,77,46,0.4)" />
                    <path
                      d={`M${c.x - 4} ${c.y - 4} l8 8 M${c.x + 4} ${c.y - 4} l-8 8`}
                      stroke="#FF4D2E"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </motion.g>
                ))}

                {/* the system node — materialises mid-morph */}
                <motion.g
                  style={{
                    opacity: nodeOp,
                    scale: nodeScale,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                >
                  <rect x="430" y="200" width="220" height="100" rx="22" fill="#FFFFFF" />
                  <text
                    x="540"
                    y="243"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    letterSpacing="0.12em"
                    fill="#0B4FFF"
                    fontFamily={MONO}
                  >
                    VOID CRAFT
                  </text>
                  <text
                    x="540"
                    y="266"
                    textAnchor="middle"
                    fontSize="10"
                    letterSpacing="0.2em"
                    fill="rgba(11,79,255,0.55)"
                    fontFamily={MONO}
                  >
                    ONE SYSTEM
                  </text>
                </motion.g>

                {/* pulse on the output line once the system is live */}
                <motion.g style={{ opacity: pulseGate }}>
                  <motion.circle
                    cy={250}
                    r={4}
                    fill="#FFFFFF"
                    animate={{ cx: [655, 890], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.4,
                      ease: "linear",
                    }}
                  />
                </motion.g>

                {/* done */}
                <motion.g
                  style={{
                    opacity: checkOp,
                    scale: checkScale,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                >
                  <circle cx="925" cy="250" r="22" fill="#3DDC97" />
                  <path
                    d="M915 250 l7 7 13-13"
                    stroke="#0A0A0C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </motion.g>
              </svg>
            </div>

            {/* bottom lists crossfade */}
            <motion.div
              style={{ borderTopColor: listBorder }}
              className="relative border-t pt-6"
            >
              <motion.ul
                style={{ opacity: beforeOp }}
                className="grid gap-2.5 font-mono text-[11px] uppercase tracking-wider text-mist/80 sm:grid-cols-2"
              >
                {PAINS.map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
                      <path
                        d="M2 2l6 6M8 2l-6 6"
                        stroke="#FF4D2E"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    {t}
                  </li>
                ))}
              </motion.ul>
              <motion.ul
                style={{ opacity: afterOp }}
                className="absolute inset-x-0 top-6 grid gap-2.5 font-mono text-[11px] uppercase tracking-wider text-white sm:grid-cols-2"
              >
                {WINS.map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
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
                    {t}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          style={{ opacity: hintOp }}
          className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-micro text-mist/60"
        >
          Scroll — watch it untangle
        </motion.p>
      </div>
    </div>
  );
}

/* ---------------- static fallback (mobile / reduced motion) ---------------- */

function StaticPanels() {
  return (
    <div className="grid gap-5">
      <div className="relative overflow-hidden rounded-3xl border border-bone/[0.07] bg-void-card">
        <div className="dot-grid-dark absolute inset-0" aria-hidden="true" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-micro text-mist">
              Your operations today
            </p>
            <span className="rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-micro text-signal">
              Before
            </span>
          </div>
          <svg viewBox="0 0 1000 520" fill="none" className="my-4 w-full" aria-hidden="true">
            {WIRES.map((w, i) => (
              <path
                key={i}
                d={toPath(w.a)}
                stroke="rgba(242,240,232,0.18)"
                strokeWidth="1.3"
                strokeDasharray={w.dash ? "5 6" : undefined}
              />
            ))}
            {[...INPUTS.map(({ label, w, ax, ay }) => ({ label, w, x: ax, y: ay })), ...TOOLS].map(
              (c) => (
                <g key={c.label}>
                  <rect
                    x={c.x}
                    y={c.y}
                    width={c.w}
                    height={34}
                    rx={17}
                    fill="#1B1B20"
                    stroke="rgba(242,240,232,0.14)"
                  />
                  <text
                    x={c.x + c.w / 2}
                    y={c.y + 22}
                    textAnchor="middle"
                    fontSize="13"
                    letterSpacing="0.1em"
                    fill="#A6A6B0"
                    fontFamily={MONO}
                  >
                    {c.label}
                  </text>
                </g>
              )
            )}
            {CROSSES.map((c, i) => (
              <g key={i}>
                <circle cx={c.x} cy={c.y} r="11" fill="#17171B" stroke="rgba(255,77,46,0.4)" />
                <path
                  d={`M${c.x - 4} ${c.y - 4} l8 8 M${c.x + 4} ${c.y - 4} l-8 8`}
                  stroke="#FF4D2E"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </svg>
          <ul className="grid gap-2.5 border-t border-bone/[0.07] pt-5 font-mono text-[11px] uppercase tracking-wider text-mist/80 sm:grid-cols-2">
            {PAINS.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
                  <path
                    d="M2 2l6 6M8 2l-6 6"
                    stroke="#FF4D2E"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-volt">
        <div className="dot-grid-volt absolute inset-0" aria-hidden="true" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-micro text-white/85">
              Your operations on Void Craft
            </p>
            <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-micro text-white">
              After
            </span>
          </div>
          <svg viewBox="0 0 1000 520" fill="none" className="my-4 w-full" aria-hidden="true">
            {WIRES.filter((w) => !w.fade).map((w, i) => (
              <path
                key={i}
                d={toPath(w.b)}
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.3"
                strokeDasharray={w.dash ? "5 6" : undefined}
              />
            ))}
            {INPUTS.map((c) => (
              <g key={c.label}>
                <rect
                  x={c.bx}
                  y={c.by}
                  width={c.w}
                  height={34}
                  rx={17}
                  fill="rgba(255,255,255,0.14)"
                  stroke="rgba(255,255,255,0.45)"
                />
                <text
                  x={c.bx + c.w / 2}
                  y={c.by + 22}
                  textAnchor="middle"
                  fontSize="13"
                  letterSpacing="0.1em"
                  fill="#FFFFFF"
                  fontFamily={MONO}
                >
                  {c.label}
                </text>
              </g>
            ))}
            <rect x="430" y="200" width="220" height="100" rx="22" fill="#FFFFFF" />
            <text
              x="540"
              y="243"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              letterSpacing="0.12em"
              fill="#0B4FFF"
              fontFamily={MONO}
            >
              VOID CRAFT
            </text>
            <text
              x="540"
              y="266"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="0.2em"
              fill="rgba(11,79,255,0.55)"
              fontFamily={MONO}
            >
              ONE SYSTEM
            </text>
            <circle cx="925" cy="250" r="22" fill="#3DDC97" />
            <path
              d="M915 250 l7 7 13-13"
              stroke="#0A0A0C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <ul className="grid gap-2.5 border-t border-white/20 pt-5 font-mono text-[11px] uppercase tracking-wider text-white sm:grid-cols-2">
            {WINS.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
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
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------- section ---------------- */

export default function Transformation() {
  const reduced = useReducedMotion();

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
              act, and improve on their own. Scroll — watch it happen.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-shell px-5 sm:px-8">
        {reduced ? (
          <StaticPanels />
        ) : (
          <>
            <div className="hidden lg:block">
              <MorphStage />
            </div>
            <div className="lg:hidden">
              <StaticPanels />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
