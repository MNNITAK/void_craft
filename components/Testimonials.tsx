"use client";

import { testimonials } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Testimonials() {
  return (
    <section className="dot-grid-dark noise relative bg-void-soft py-28 sm:py-36">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <SectionLabel>What clients say</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="headline mt-6 text-4xl font-semibold text-bone sm:text-6xl">
              Judged by the people
              <br />
              paying the invoices.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.1} y={34}>
              <figure className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-1 hover:border-volt/40">
                <span
                  aria-hidden="true"
                  className="headline pointer-events-none absolute -right-2 -top-7 text-[7rem] font-semibold text-volt/10 transition-colors duration-500 group-hover:text-volt/20"
                >
                  ”
                </span>
                <blockquote className="relative text-lg leading-relaxed text-bone/90">
                  {t.quote}
                </blockquote>
                <figcaption className="relative mt-7 flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-volt/15 font-display text-sm font-semibold text-volt-soft">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-bone">{t.name}</div>
                    <div className="text-xs text-mist">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
