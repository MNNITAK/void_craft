"use client";

import Reveal from "@/components/motion/Reveal";
import ScrollFillText from "@/components/motion/ScrollFillText";
import SectionLabel from "@/components/ui/SectionLabel";

const pillars = [
  {
    title: "Senior only",
    description:
      "No account-manager relay, no junior bench learning on your budget. You work directly with the engineers shipping your system.",
  },
  {
    title: "AI-native, not AI-added",
    description:
      "We don't sprinkle a chatbot on legacy thinking. Intelligence is designed into the architecture from the first diagram.",
  },
  {
    title: "Speed without debt",
    description:
      "Prototypes in weeks, production in a quarter — on foundations your next three years of growth won't outgrow.",
  },
  {
    title: "Priced against outcomes",
    description:
      "Every proposal is anchored to a business case. If the system can't credibly pay for itself, we'll tell you not to build it.",
  },
];

export default function Why() {
  return (
    <section className="dot-grid-dark noise relative bg-void-soft py-28 sm:py-36">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionLabel>Why Void Craft</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-6 text-4xl font-semibold sm:text-6xl">
                <span className="text-mist/50">Most agencies ship code.</span>
                <br />
                <span className="text-bone">We ship outcomes.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:pt-24">
            <ScrollFillText
              text="Software is easy to buy and hard to benefit from. The difference is an agency that starts from your P&L instead of its portfolio — building the system your business actually needs, then staying until it performs."
              className="text-xl leading-relaxed sm:text-2xl"
              dimClass="text-mist/25"
              brightClass="text-bone"
            />
          </div>
        </div>

        <div className="mt-24 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="relative border-l border-bone/10 pl-6">
                <span
                  aria-hidden="true"
                  className="absolute -left-px top-0 h-10 w-px bg-volt shadow-[0_0_14px_0_rgba(11,79,255,0.9)]"
                />
                <span className="font-mono text-[11px] uppercase tracking-micro text-mist/60">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-bone">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
