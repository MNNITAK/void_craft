"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  easeInOut,
  MotionValue,
} from "framer-motion";
import { services } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Icon from "@/components/ui/Icon";

/* ------------------------------------------------------------------ */
/* Card art — alternating volt gradients and dark mint-accented cards  */
/* ------------------------------------------------------------------ */

const cardSkins = [
  "bg-gradient-to-br from-[#0B4FFF] to-[#06277F]",
  "bg-gradient-to-b from-[#101014] to-[#1A1A22] border border-mint/25",
  "bg-gradient-to-br from-[#5C86FF] to-[#0E1D55]",
  "bg-gradient-to-b from-[#101014] to-[#1A1A22] border border-volt/30",
  "bg-gradient-to-br from-[#3D2BB8] to-[#120A4A]",
  "bg-gradient-to-b from-[#101014] to-[#1A1A22] border border-mint/25",
  "bg-gradient-to-br from-[#0B4FFF] via-[#3D2BB8] to-[#06277F]",
  "bg-gradient-to-b from-[#101014] to-[#1A1A22] border border-volt/30",
];

const blurbs: Record<string, string> = {
  "ai-automation": "Work that does itself.",
  "voice-agents": "Every call answered.",
  "custom-agents": "Agents on your payroll.",
  "web-mobile": "Products people love.",
  "internal-tools": "Your business, one OS.",
  saas: "Idea to subscribers.",
  "data-dashboards": "One screen of truth.",
  "cloud-integrations": "A stack that just works.",
};

/* ------------------------------------------------------------------ */
/* The scroll carousel (desktop) — cards orbit a vertical 3D axis      */
/* ------------------------------------------------------------------ */

const RADIUS = 410;
const STEP = 360 / services.length;

function RingCard({
  service,
  index,
  progress,
  ringRotate,
}: {
  service: (typeof services)[number];
  index: number;
  progress: MotionValue<number>;
  ringRotate: MotionValue<number>;
}) {
  const base = index * STEP;
  const dark = index % 2 === 1;

  // ring blossoms open from the center, then orbits
  const z = useTransform(progress, [0.03, 0.16], [30, RADIUS], {
    ease: easeInOut,
  });
  // NOTE: interpolate the constant angle as a string — useMotionTemplate
  // drops a raw numeric 0, emitting invalid "rotateY(deg)"
  const baseAngle = `${base}deg`;
  const transform = useMotionTemplate`translate(-50%, -50%) rotateY(${baseAngle}) translateZ(${z}px)`;

  // cards facing the viewer are bright; cards swinging behind dim out
  const opacity = useTransform(
    [ringRotate, progress] as [MotionValue<number>, MotionValue<number>],
    (values: number[]) => {
      const [rot, p] = values;
      const facing = (Math.cos(((base + rot) * Math.PI) / 180) + 1) / 2;
      const entry = Math.min(1, Math.max(0, (p - 0.02) / 0.14));
      return (0.35 + 0.65 * facing) * (0.1 + 0.9 * entry);
    }
  );

  return (
    <motion.div
      style={{ transform, transformStyle: "preserve-3d" }}
      className="absolute left-0 top-0 h-[340px] w-[236px] will-change-transform"
    >
      {/* front face — opacity lives on the faces, not the wrapper:
          opacity < 1 on the wrapper would force transform-style:flat
          and break backface culling + 3D depth sorting */}
      <motion.div
        style={{ opacity }}
        className={`absolute inset-0 flex flex-col overflow-hidden rounded-[1.4rem] p-5 shadow-[0_28px_60px_-24px_rgba(10,10,12,0.5)] [backface-visibility:hidden] ${cardSkins[index % cardSkins.length]}`}
      >
        <div aria-hidden="true" className="dot-grid-volt absolute inset-0 opacity-60" />

        <div className="relative flex items-start justify-between">
          <div
            className={`grid h-11 w-11 place-items-center rounded-xl backdrop-blur-sm ${
              dark ? "bg-white/10 text-mint" : "bg-white/15 text-white"
            }`}
          >
            <Icon name={service.icon} className="h-5 w-5" />
          </div>
          <span className="font-mono text-[10px] tracking-micro text-white/50">
            0{index + 1}
          </span>
        </div>

        <div className="relative mt-auto">
          <p
            className={`font-mono text-[9px] uppercase tracking-micro ${
              dark ? "text-mint/80" : "text-white/60"
            }`}
          >
            {blurbs[service.id]}
          </p>
          <h3 className="headline mt-2 text-[1.55rem] font-semibold leading-[1.05] text-white">
            {service.title}
          </h3>
        </div>
      </motion.div>

      {/* back face — branded card back for cards orbiting behind */}
      <motion.div
        style={{ opacity, transform: "rotateY(180deg)" }}
        className="absolute inset-0 overflow-hidden rounded-[1.4rem] border border-bone/10 bg-[#101014] [backface-visibility:hidden]"
        aria-hidden="true"
      >
        <div className="dot-grid-volt absolute inset-0 opacity-40" />
        <div className="grid h-full place-items-center">
          <div className="text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-volt font-mono text-base text-white">
              ▚
            </span>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-micro text-white/50">
              VOID CRAFT
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServicesRing() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef });

  // one full revolution around the vertical axis across the pinned scroll
  const ringRotate = useTransform(scrollYProgress, [0.14, 0.97], [0, -360]);

  const line1X = useTransform(scrollYProgress, [0, 1], ["5%", "-24%"]);
  const line2X = useTransform(scrollYProgress, [0, 1], ["-16%", "7%"]);
  const hintOpacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

  return (
    <div ref={trackRef} className="relative hidden lg:block" style={{ height: "340vh" }}>
      <div className="dot-grid-light sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="z-30 flex justify-center pt-24">
          <Reveal>
            <SectionLabel tone="light">What we build</SectionLabel>
          </Reveal>
        </div>

        {/* giant drifting headline behind the carousel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col justify-center"
        >
          <motion.p
            style={{ x: line1X }}
            className="headline whitespace-nowrap text-[8vw] font-semibold text-bone-ink"
          >
            Everything a modern business — Everything a modern business —
          </motion.p>
          <motion.p
            style={{ x: line2X }}
            className="headline mt-[10vh] whitespace-nowrap text-[8vw] font-semibold text-bone-ink"
          >
            runs on intelligence. runs on intelligence. runs on
          </motion.p>
        </div>

        {/* accessible heading for screen readers */}
        <h2 className="sr-only">Everything a modern business runs on</h2>

        {/* the orbit */}
        <div className="relative z-20 flex-1" style={{ perspective: 1500 }}>
          <motion.div
            className="absolute left-1/2 top-[44%]"
            style={{ transformStyle: "preserve-3d", rotateY: ringRotate }}
          >
            {services.map((service, i) => (
              <RingCard
                key={service.id}
                service={service}
                index={i}
                progress={scrollYProgress}
                ringRotate={ringRotate}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="z-30 flex justify-center pb-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-micro text-bone-ink/40">
            Scroll — eight systems in orbit
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grid fallback (mobile + reduced motion)                             */
/* ------------------------------------------------------------------ */

function SpotlightCard({ service }: { service: (typeof services)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseLeave={() => setPos({ x: -400, y: -400 })}
      className="group relative h-full overflow-hidden rounded-2xl border border-bone/[0.07] bg-void-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-volt/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, rgba(11,79,255,0.16), transparent 65%)`,
        }}
      />
      <div className="relative">
        <div className="mb-6 inline-grid h-12 w-12 place-items-center rounded-xl border border-bone/10 bg-void text-volt-soft">
          <Icon name={service.icon} />
        </div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-bone">
          {service.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-mist">
          {service.description}
        </p>
      </div>
    </div>
  );
}

function ServicesGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`px-5 py-24 sm:px-8 ${className}`}>
      <div className="mx-auto max-w-shell">
        <Reveal>
          <SectionLabel tone="light">What we build</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="headline mt-6 text-4xl font-semibold text-bone-ink sm:text-5xl">
            Everything a modern
            <br />
            business runs on.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 2) * 0.08} y={30}>
              <SpotlightCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function Services() {
  const reduced = useReducedMotion();

  return (
    <section id="services" className="relative bg-bone text-bone-ink">
      {reduced ? (
        <ServicesGrid />
      ) : (
        <>
          <ServicesRing />
          <ServicesGrid className="lg:hidden" />
        </>
      )}
    </section>
  );
}
