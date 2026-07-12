export default function SectionLabel({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light" | "volt";
}) {
  const tones = {
    dark: "text-mist border-bone/10",
    light: "text-bone-ink/50 border-bone-ink/15",
    volt: "text-white/80 border-white/25",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-micro ${tones[tone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse-soft" />
      {children}
    </span>
  );
}
