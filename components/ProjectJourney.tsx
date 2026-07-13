"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { caseStudies, type CaseStudy } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectVisual from "@/components/visuals/ProjectVisual";

/**
 * The wire crossing the page between stops — the snake's turn.
 * Drops from one rail, runs across, and lands on the opposite rail.
 */
function SnakeConnector({ from }: { from: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.5"],
  });
  const d =
    from === "left"
      ? "M140 0 V46 Q140 72 166 72 H1034 Q1060 72 1060 98 V176"
      : "M1060 0 V46 Q1060 72 1034 72 H166 Q140 72 140 98 V176";

  return (
    <div ref={ref} className="relative hidden h-44 lg:block" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 176"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d={d}
          stroke="#0B4FFF"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
    </div>
  );
}

/**
 * One stop on the journey, Auxia-style: the wire runs down a side rail,
 * the volt pill sits on the wire with its hook underneath, and the
 * showcase card fills the rest. Rails alternate sides — the snake.
 */
function JourneyStep({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.4"],
  });
  const side: "left" | "right" = index % 2 === 0 ? "left" : "right";

  return (
    <div
      ref={ref}
      className={`relative pt-14 lg:grid lg:items-start lg:gap-12 lg:pt-0 ${
        side === "left"
          ? "lg:grid-cols-[280px_1fr]"
          : "lg:grid-cols-[1fr_280px]"
      }`}
    >
      {/* wire rail — grey track, volt fill drawn by scroll */}
      <div
        className={`relative mb-10 lg:mb-0 lg:self-stretch ${
          side === "right" ? "lg:order-2" : ""
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-bone-ink/10 lg:block"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: scrollYProgress }}
          className="absolute inset-y-0 left-1/2 hidden w-[2px] origin-top -translate-x-1/2 bg-volt lg:block"
        />

        <div className="relative flex flex-col items-center gap-5 text-center lg:pt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full bg-volt px-7 py-3.5 text-sm font-medium text-white shadow-[0_16px_48px_-16px_rgba(11,79,255,0.7)]"
          >
            <span aria-hidden="true">✦</span>
            {study.tag}
          </motion.div>
          <Reveal delay={0.15} y={18} className="bg-bone px-2 py-1">
            <p className="mx-auto max-w-[250px] text-sm leading-relaxed text-bone-ink/60">
              {study.hook}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-micro text-bone-ink/40">
              {study.client}
            </p>
          </Reveal>
        </div>
      </div>

      <ShowcasePanel study={study} side={side} />
    </div>
  );
}

/* Deterministic starfield — same sky on server and client. */
const STARS = Array.from({ length: 30 }, (_, i) => {
  const frac = (n: number) => n - Math.floor(n);
  const a = frac(Math.sin(i * 127.1 + 1) * 43758.5453);
  const b = frac(Math.sin(i * 269.5 + 7) * 24634.6345);
  return {
    ax: a * 100,
    ay: b * 100,
    r: 1 + frac(a * 9.7) * 1.6,
    o: 0.3 + frac(b * 5.3) * 0.55,
    d: frac(a * 3.1) * 3.2,
  };
});

/* Stars live in the "sky": the top band of the card plus the media half —
   never over the story text, where they'd read as dust. */
function Starfield({ side }: { side: "left" | "right" }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {STARS.map((s, i) => {
        const topBand = s.ay < 30;
        const x = topBand
          ? s.ax
          : side === "left"
            ? s.ax * 0.44
            : 56 + s.ax * 0.44;
        const y = topBand ? s.ay * 0.5 : 15 + (s.ay - 30) * 1.1;
        return (
          <span
            key={i}
            className="animate-pulse-soft absolute rounded-full bg-white"
            style={{
              left: `${x.toFixed(3)}%`,
              top: `${y.toFixed(3)}%`,
              width: `${s.r.toFixed(2)}px`,
              height: `${s.r.toFixed(2)}px`,
              opacity: Number(s.o.toFixed(2)),
              animationDelay: `${s.d.toFixed(2)}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Compact showcase panel — media and story side by side so the whole
 * project fits in one viewport. Each project gets its own live visual,
 * floating in a violet night sky with a pink bloom rising behind it.
 */
function ShowcasePanel({
  study,
  side,
}: {
  study: CaseStudy;
  side: "left" | "right";
}) {
  return (
    <Reveal y={48}>
      <article className="group relative overflow-hidden rounded-3xl bg-[#120E1A] bg-[linear-gradient(180deg,rgba(88,28,135,0.32),rgba(18,14,26,0)_58%)] shadow-[0_40px_90px_-44px_rgba(50,20,90,0.5)] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
        {/* night sky — pink bloom over the media side + twinkling stars */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className={`absolute -top-[34%] h-[72%] w-[84%] rounded-full opacity-80 blur-3xl transition-opacity duration-700 group-hover:opacity-100 ${
              side === "right" ? "left-[32%]" : "-left-[16%]"
            } bg-[radial-gradient(closest-side,rgba(253,230,255,0.95),rgba(240,171,252,0.6)_38%,rgba(168,85,247,0.32)_65%,transparent_85%)]`}
          />
          <Starfield side={side} />
        </div>

        {/* media slot — bespoke animation now, real screenshot via study.image later */}
        <div
          className={`relative min-h-[300px] sm:min-h-[340px] lg:min-h-[440px] ${
            side === "right" ? "lg:order-2" : ""
          }`}
        >
          {/* lavender rim light + upward glow, GitHub-hero style */}
          <div className="absolute inset-3 rounded-2xl bg-gradient-to-b from-fuchsia-100/50 via-purple-300/15 to-white/5 p-px shadow-[0_-30px_90px_-18px_rgba(216,180,254,0.5)] lg:inset-4">
            <div
              className={`relative h-full w-full overflow-hidden rounded-[15px] ${
                study.image ? "bg-void" : `bg-gradient-to-br ${study.hue}`
              }`}
            >
              {study.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={study.image}
                  alt={`${study.title} — product screenshot`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <div
                    aria-hidden="true"
                    className="dot-grid-volt absolute inset-0"
                  />
                  <ProjectVisual id={study.id} events={study.events} />
                  <span className="absolute bottom-4 right-5 font-mono text-[9px] uppercase tracking-micro text-white/50">
                    voidcraft / {study.id}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* story */}
        <div className="relative flex flex-col p-6 sm:p-8 lg:p-9">
          <h3 className="headline text-2xl font-semibold text-bone sm:text-3xl">
            {study.title}
          </h3>
          <div className="mt-5 space-y-4 text-sm leading-relaxed">
            <div>
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-micro text-signal">
                Problem
              </span>
              <p className="text-mist">{study.problem}</p>
            </div>
            <div>
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-micro text-volt-soft">
                Solution
              </span>
              <p className="text-mist">{study.solution}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-bone/10 px-2.5 py-0.5 text-[11px] text-mist"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-auto flex gap-10 border-t border-bone/[0.07] pt-5 [margin-top:1.5rem]">
            {study.impact.map((stat) => (
              <div key={stat.label}>
                <div className="headline text-3xl font-semibold text-volt-soft sm:text-4xl">
                  {stat.value}
                </div>
                <p className="mt-1 text-xs text-mist">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function ProjectJourney() {
  return (
    <section id="work" className="relative bg-bone py-28 text-bone-ink sm:py-36">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        {/* header */}
        <div className="text-center">
          <Reveal>
            <SectionLabel tone="light">Featured work</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="headline mx-auto mt-6 max-w-3xl text-4xl font-semibold sm:text-6xl">
              Systems we&apos;ve shipped.
              <br />
              Numbers they changed.
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-bone-ink/60">
              Follow the wire. Each stop is a real system running in a real
              business — judged by what it did to the bottom line.
            </p>
          </Reveal>
        </div>

        {/* the journey */}
        <div className="mt-8 lg:mt-20">
          {caseStudies.map((study, i) => (
            <div key={study.id}>
              <JourneyStep study={study} index={i} />
              {i < caseStudies.length - 1 && (
                <SnakeConnector from={i % 2 === 0 ? "left" : "right"} />
              )}
            </div>
          ))}
        </div>

        {/* journey end — the reserved slot */}
        <EndStop from={(caseStudies.length - 1) % 2 === 0 ? "left" : "right"} />
      </div>
    </section>
  );
}

function EndStop({ from }: { from: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.55"],
  });
  const d =
    from === "left"
      ? "M140 0 V52 Q140 76 164 76 H576 Q600 76 600 100 V128"
      : "M1060 0 V52 Q1060 76 1036 76 H624 Q600 76 600 100 V128";

  return (
    <div className="text-center">
      {/* the wire leaves the rail and elbows to the centre for the last stop */}
      <div
        ref={ref}
        className="relative mx-auto hidden h-32 lg:block"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 128"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d={d}
            stroke="#0B4FFF"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
      </div>
      <div className="h-10 lg:hidden" aria-hidden="true" />
      <Reveal>
        <a
          href="#contact"
          className="group inline-flex flex-col items-center gap-5 rounded-3xl bg-bone-ink px-12 py-10 text-bone transition-colors duration-500 hover:bg-volt"
        >
          <span className="font-mono text-[10px] uppercase tracking-micro text-bone/60 group-hover:text-white/70">
            Next stop
          </span>
          <span className="headline text-3xl font-semibold sm:text-4xl">
            Your system belongs here.
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            Start a project
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </a>
      </Reveal>
    </div>
  );
}
