"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const chip =
  "rounded-md bg-black/35 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white backdrop-blur-sm";

/* ------------------------------------------------------------------ */
/* 01 · AI Receptionist — live call: rings, waveform, booking status   */
/* ------------------------------------------------------------------ */

function ReceptionistVisual() {
  const bars = [6, 11, 16, 9, 14, 18, 8, 13, 17, 7, 12, 15, 9, 16, 10, 13];
  const states = ["Listening…", "Checking calendar…", "Slot booked ✓"];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6">
      <motion.div
        className={`${chip} flex items-center gap-2`}
        animate={{ opacity: [0, 1, 1, 1, 0], y: [10, 0, 0, 0, -8] }}
        transition={{ duration: 9, times: [0, 0.06, 0.5, 0.92, 1], repeat: Infinity }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        Incoming call · Riverside Dental
      </motion.div>

      <div className="relative grid place-items-center">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute h-20 w-20 rounded-full border border-white/40"
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
          />
        ))}
        <div className="grid h-20 w-20 place-items-center rounded-full bg-white/15 text-2xl text-white backdrop-blur-sm">
          ◉
        </div>
      </div>

      <div className="flex h-10 items-center gap-[5px]">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-white/85"
            style={{ height: h * 2 }}
            animate={{ scaleY: [0.35, 1, 0.5, 0.9, 0.35] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.07,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative h-8 w-52">
        {states.map((state, i) => {
          const start = i / 3;
          return (
            <motion.span
              key={state}
              className={`absolute inset-0 grid place-items-center rounded-md font-mono text-[10px] tracking-wider backdrop-blur-sm ${
                i === 2 ? "bg-mint/25 text-mint" : "bg-black/35 text-white"
              }`}
              animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
              transition={{
                duration: 9,
                times: [0, start, start + 0.03, start + 0.30, start + 0.333, 1],
                repeat: Infinity,
              }}
            >
              {state}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · Lead engine — leads travel capture → score → route             */
/* ------------------------------------------------------------------ */

function LeadEngineVisual() {
  const stations = ["CAPTURED", "SCORED", "ROUTED"];
  const leads = [
    { name: "LEAD · PORTAL A", score: "94 · HOT" },
    { name: "LEAD · WEBSITE", score: "88 · HOT" },
    { name: "LEAD · PORTAL C", score: "91 · HOT" },
  ];

  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-10 px-8 sm:px-12">
      {/* track */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-white/25" />
        <div className="relative flex justify-between">
          {stations.map((station) => (
            <div key={station} className="flex flex-col items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/80 ring-4 ring-white/15" />
              <span className="font-mono text-[9px] tracking-micro text-white/70">
                {station}
              </span>
            </div>
          ))}
        </div>

        {/* travelling leads */}
        {leads.map((lead, i) => (
          <motion.div
            key={lead.name}
            className={`${chip} absolute -top-12 left-0 flex items-center gap-2`}
            animate={{
              x: ["0%", "0%", "160%", "160%", "330%", "330%"],
              opacity: [0, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: 6.9,
              times: [0, 0.08, 0.32, 0.52, 0.82, 1],
              repeat: Infinity,
              delay: i * 2.3,
              ease: "easeInOut",
            }}
          >
            {lead.name}
            <span className="rounded bg-white/20 px-1.5 py-0.5 text-[9px] text-white">
              {lead.score}
            </span>
          </motion.div>
        ))}
      </div>

      {/* SLA readout */}
      <div className="flex items-center justify-between">
        <motion.span
          className={chip}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          ⏱ FIRST RESPONSE: 90s
        </motion.span>
        <motion.span
          className="rounded-md bg-mint/25 px-2.5 py-1 font-mono text-[10px] tracking-wider text-mint backdrop-blur-sm"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
        >
          AGENT ON THE PHONE ✓
        </motion.span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · Healthcare — mini ops dashboard drawing itself                 */
/* ------------------------------------------------------------------ */

function HealthcareVisual() {
  const kpis = [
    { label: "ICU LOAD", value: "82%", alert: true },
    { label: "WAIT TIME", value: "-27%", alert: false },
    { label: "BEDS FREE", value: "14", alert: false },
  ];

  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-6 sm:p-8">
      <div className="grid grid-cols-3 gap-2.5">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            className="rounded-lg bg-black/30 px-3 py-2.5 backdrop-blur-sm"
            animate={
              kpi.alert
                ? { boxShadow: ["0 0 0 0 rgba(255,176,32,0)", "0 0 0 3px rgba(255,176,32,0.35)", "0 0 0 0 rgba(255,176,32,0)"] }
                : {}
            }
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            <div className="font-mono text-[8px] tracking-micro text-white/60">
              {kpi.label}
            </div>
            <div
              className={`font-display text-lg font-semibold ${
                kpi.alert ? "text-[#FFB020]" : "text-white"
              }`}
            >
              {kpi.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden rounded-lg bg-black/30 p-3 backdrop-blur-sm">
        <span className="font-mono text-[8px] tracking-micro text-white/60">
          CAPACITY FORECAST · NEXT 72H
        </span>
        <svg
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
          className="mt-1 h-[calc(100%-18px)] w-full"
          fill="none"
        >
          {[25, 50, 75].map((y) => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.08)" />
          ))}
          <motion.path
            d="M0 78 C30 70 45 84 70 66 S120 42 150 52 S210 24 240 34 S280 20 300 26"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
          />
          <motion.circle
            cx="240"
            cy="34"
            r="4"
            fill="#FFB020"
            animate={{ opacity: [0, 0, 1, 1], scale: [0, 0, 1.4, 1] }}
            transition={{ duration: 4.8, times: [0, 0.55, 0.65, 1], repeat: Infinity }}
          />
        </svg>
        <motion.span
          className="absolute right-3 top-3 rounded bg-[#FFB020]/20 px-2 py-0.5 font-mono text-[9px] tracking-wider text-[#FFB020]"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 4.8, times: [0, 0.6, 0.68, 0.94, 1], repeat: Infinity }}
        >
          +12 ADMITS FORECAST · ALERT ROUTED
        </motion.span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · Restaurant — a POS ticket typing itself, then stamped          */
/* ------------------------------------------------------------------ */

function RestaurantVisual() {
  const items = [
    ["2× Smash Burger", "18.00"],
    ["Loaded Fries", "6.50"],
    ["+ Extra Patty · upsell", "3.00"],
    ["2× Iced Tea", "5.00"],
  ];
  const CYCLE = 8;

  return (
    <div className="absolute inset-0 grid place-items-center p-6">
      <div className="relative">
        <div className="w-64 -rotate-2 rounded-lg bg-[#FFFDF5] p-4 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between border-b border-dashed border-neutral-300 pb-2 font-mono text-[9px] tracking-wider text-neutral-500">
            <span>VOIDCRAFT POS</span>
            <span>TICKET #113</span>
          </div>
          <div className="mt-2 space-y-1.5">
            {items.map(([name, price], i) => {
              const start = 0.06 + i * 0.09;
              return (
                <motion.div
                  key={name}
                  className={`flex justify-between font-mono text-[10px] ${
                    name.includes("upsell") ? "text-[#0B4FFF]" : "text-neutral-800"
                  }`}
                  animate={{ opacity: [0, 0, 1, 1] }}
                  transition={{
                    duration: CYCLE,
                    times: [0, start, start + 0.04, 1],
                    repeat: Infinity,
                  }}
                >
                  <span>{name}</span>
                  <span>{price}</span>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            className="mt-2 flex justify-between border-t border-dashed border-neutral-300 pt-2 font-mono text-[11px] font-bold text-neutral-900"
            animate={{ opacity: [0, 0, 1, 1] }}
            transition={{ duration: CYCLE, times: [0, 0.5, 0.56, 1], repeat: Infinity }}
          >
            <span>TOTAL</span>
            <span>32.50</span>
          </motion.div>
        </div>

        <motion.div
          className="absolute -right-8 top-1/2 rotate-6 rounded-md border-2 border-mint px-3 py-1.5 font-mono text-[11px] font-bold tracking-wider text-mint"
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.5, 0.5, 1, 1, 1] }}
          transition={{
            duration: CYCLE,
            times: [0, 0.62, 0.68, 0.95, 1],
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          SENT TO POS ✓
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 · Recruitment — CVs sorted into the shortlist                    */
/* ------------------------------------------------------------------ */

function RecruitmentVisual() {
  const CYCLE = 9;
  const cards = [
    { match: "92%", good: true, start: 0.05 },
    { match: "41%", good: false, start: 0.38 },
    { match: "88%", good: true, start: 0.7 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-12 p-6 sm:gap-20">
      {/* incoming stack */}
      <div className="relative h-36 w-36">
        <span className="absolute -top-7 left-0 font-mono text-[9px] tracking-micro text-white/60">
          APPLICANTS · 4,000
        </span>
        {cards.map((card, i) => {
          const s = card.start;
          const exit = card.good
            ? { x: [0, 0, 130, 130, 0, 0], y: [0, 0, 0, 0, 0, 0] }
            : { x: [0, 0, -34, -34, 0, 0], y: [0, 0, 44, 44, 0, 0] };
          return (
            <motion.div
              key={i}
              className="absolute inset-x-0 rounded-lg bg-white/95 p-3 shadow-lg"
              style={{ top: i * 10, zIndex: 3 - i }}
              animate={{
                ...exit,
                opacity: [1, 1, 1, 0, 0, 1],
                rotate: [i * 2 - 2, i * 2 - 2, card.good ? 4 : -8, card.good ? 4 : -8, 0, i * 2 - 2],
              }}
              transition={{
                duration: CYCLE,
                times: [0, s, s + 0.1, s + 0.18, s + 0.22, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="mb-2 h-1.5 w-16 rounded bg-neutral-300" />
              <div className="mb-1 h-1 w-24 rounded bg-neutral-200" />
              <div className="h-1 w-20 rounded bg-neutral-200" />
              <span
                className={`mt-2 inline-block rounded px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-wider ${
                  card.good ? "bg-mint/20 text-[#0E7A52]" : "bg-signal/15 text-signal"
                }`}
              >
                MATCH {card.match}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* shortlist drop-zone */}
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="grid h-36 w-32 place-items-center rounded-xl border-2 border-dashed border-white/40"
          animate={{ borderColor: ["rgba(255,255,255,0.4)", "rgba(61,220,151,0.9)", "rgba(255,255,255,0.4)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-center">
            <div className="text-2xl text-mint">✓</div>
            <div className="mt-1 font-mono text-[9px] tracking-micro text-white/80">
              SHORTLIST
            </div>
          </div>
        </motion.div>
        <motion.span
          className={chip}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          INTERVIEWS AUTO-SCHEDULED
        </motion.span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Static fallback (reduced motion) — the event chips, no animation    */
/* ------------------------------------------------------------------ */

function StaticVisual({ events }: { events: readonly string[] }) {
  return (
    <div className="absolute left-6 top-6 flex flex-col items-start gap-2.5">
      {events.map((event, i) => (
        <span key={event} className={chip} style={{ marginLeft: i * 22 }}>
          {event}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dispatcher                                                          */
/* ------------------------------------------------------------------ */

const visuals: Record<string, () => React.ReactElement> = {
  "ai-receptionist": ReceptionistVisual,
  "lead-engine": LeadEngineVisual,
  "healthcare-dashboard": HealthcareVisual,
  "restaurant-ordering": RestaurantVisual,
  "recruitment-automation": RecruitmentVisual,
};

export default function ProjectVisual({
  id,
  events,
}: {
  id: string;
  events: readonly string[];
}) {
  const reduced = useReducedMotion();
  if (reduced) return <StaticVisual events={events} />;
  const Visual = visuals[id];
  return Visual ? <Visual /> : <StaticVisual events={events} />;
}
