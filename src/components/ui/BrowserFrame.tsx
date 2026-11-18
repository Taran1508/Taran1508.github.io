import Image from "next/image";

// Screenshot inside a minimal browser window. Zooms slightly on parent `group` hover.
export default function BrowserFrame({ src, alt, label }: { src: string; alt: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-fg/10 bg-white shadow-[0_1px_2px_rgba(11,18,32,0.05)]">
      <div className="flex items-center gap-1.5 border-b border-fg/10 bg-fg/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        {label && <span className="ml-3 truncate font-mono text-[10px] text-fg/40">{label}</span>}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-fg/5">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 520px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>
    </div>
  );
}
