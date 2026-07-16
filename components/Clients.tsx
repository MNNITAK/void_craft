import { clients } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";

export default function Clients() {
  return (
    <section className="relative border-t border-bone/5 bg-void py-14">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <Reveal>
          <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-micro text-mist/70">
            100+ businesses automated across India — in these industries
          </p>
        </Reveal>
      </div>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-16 pr-16">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={`${client}-${i}`}
              className="font-display text-xl font-semibold tracking-tight text-bone/25 transition-colors duration-300 hover:text-bone/60"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
