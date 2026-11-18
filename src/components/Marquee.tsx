import { marqueeItems } from "@/data/profile";

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div
      aria-hidden="true"
      className="relative mt-16 overflow-hidden border-y border-fg/10 bg-white/50 py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:mt-24"
    >
      <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={t + i} className="flex items-center gap-12 font-grotesk text-lg font-semibold text-fg/40">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
