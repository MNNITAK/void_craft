"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { caseStudies, type CaseStudy } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectVisual from "@/components/visuals/ProjectVisual";

/* Short mono captions that sit on each connector line, Auxia-style. */
const wireLabels = [
  "ANSWERING EVERY CALL",
  "CHASING EVERY LEAD",
  "WATCHING THE WHOLE OPERATION",
  "TAKING EVERY ORDER",
  "SCREENING EVERY CV",
];

/**
 * Blue elbow connector that draws itself as it scrolls into view.
 * Runs from the previous block (top center) down to the next pill,
 * with a mono caption sitting on the horizontal run.
 */
function Connector({
  side,
  label,
}: {
  side: "left" | "right";
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.45"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);

  const d =
    side === "left"
      ? "M600 0 V50 Q600 74 576 74 H184 Q160 74 160 98 V140"
      : "M600 0 V50 Q600 74 624 74 H1016 Q1040 74 1040 98 V140";

  return (
    <div ref={ref} className="relative hidden h-36 lg:block" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d={d}
          stroke="#0B4FFF"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
      <motion.span
        style={{ opacity: labelOpacity }}
        className="absolute left-1/2 top-[74px] -translate-x-1/2 -translate-y-1/2 bg-bone px-4 font-mono text-[10px] uppercase tracking-micro text-bone-ink/45"
      >
        {label}
      </motion.span>
    </div>
  );
}

/** The volt step pill with its hook line underneath. */
function StepPill({
  study,
  index,
  side,
}: {
  study: CaseStudy;
  index: number;
  side: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-col gap-4 lg:max-w-xs ${
        side === "right" ? "lg:ml-auto lg:items-end lg:text-right" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2.5 self-start rounded-full bg-volt px-6 py-3.5 text-sm font-medium text-white shadow-[0_16px_48px_-16px_rgba(11,79,255,0.7)] data-[side=right]:self-end"
        data-side={side}
      >
        <span aria-hidden="true">✦</span>
        {study.tag}
      </motion.div>
      <Reveal delay={0.15} y={18}>
        <p className="text-sm leading-relaxed text-bone-ink/60">{study.hook}</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-micro text-bone-ink/40">
          {study.client}
        </p>
      </Reveal>
    </div>
  );
}

/**
 * Compact showcase panel — media and story side by side so the whole
 * project fits in one viewport. Each project gets its own live visual.
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
      <article className="overflow-hidden rounded-3xl bg-void-card shadow-[0_48px_120px_-48px_rgba(10,10,12,0.6)] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
        {/* media slot — bespoke animation now, real screenshot via study.image later */}
        <div
          className={`relative min-h-[300px] sm:min-h-[340px] lg:min-h-[440px] ${
            side === "right" ? "lg:order-2" : ""
          }`}
        >
          <div
            className={`absolute inset-2.5 overflow-hidden rounded-2xl lg:inset-3 ${
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

        {/* story */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-9">
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
        <div className="mt-6">
          {caseStudies.map((study, i) => {
            const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
            return (
              <div key={study.id}>
                <Connector side={side} label={wireLabels[i] ?? study.tag} />
                {/* mobile spacer keeps rhythm where connectors are hidden */}
                <div className="h-12 lg:hidden" aria-hidden="true" />
                <div className="space-y-7">
                  <StepPill study={study} index={i} side={side} />
                  <ShowcasePanel study={study} side={side} />
                </div>
              </div>
            );
          })}
        </div>

        {/* journey end — the reserved slot */}
        <EndStop />
      </div>
    </section>
  );
}

function EndStop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="text-center">
      <div ref={ref} className="relative mx-auto hidden h-28 w-px lg:block" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 2 112" fill="none">
          <motion.path
            d="M1 0 V112"
            stroke="#0B4FFF"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
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
