import { metrics } from "@/lib/data";
import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";

export default function Metrics() {
  return (
    <section className="relative bg-bone py-24 text-bone-ink sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-5">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.08} className="text-center md:text-left">
              <div className="headline text-5xl font-semibold sm:text-6xl">
                <Counter
                  value={metric.value}
                  prefix={"prefix" in metric ? (metric.prefix as string) : ""}
                  suffix={metric.suffix}
                />
              </div>
              <p className="mt-3 text-sm text-bone-ink/55">{metric.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
