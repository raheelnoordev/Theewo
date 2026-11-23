interface Logo {
  featuredLogoId: number;
  name: string;
  imageUrl: string;
}

interface Props {
  logos: Logo[];
}

export default function ClientLogoMarquee({ logos }: Props) {
  if (!logos.length) return null;

  const row = [...logos, ...logos];

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-200 overflow-hidden">
      <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-brand-600 mb-10">
        Trusted by leading organizations
      </p>

      {/* Row 1 — scroll left (slower) */}
      <div className="relative mb-8 mask-fade-x">
        <div className="flex animate-marquee gap-16 md:gap-24 items-center w-max">
          {row.map((l, i) => (
            <div key={`a-${l.featuredLogoId}-${i}`} className="flex-shrink-0 px-5">
              <img
                src={l.imageUrl}
                alt={l.name}
                title={l.name}
                className="h-14 md:h-20 w-auto max-w-[200px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scroll right (reverse) */}
      <div className="relative mask-fade-x">
        <div className="flex animate-marquee-reverse gap-16 md:gap-24 items-center w-max">
          {[...row].reverse().map((l, i) => (
            <div key={`b-${l.featuredLogoId}-${i}`} className="flex-shrink-0 px-5">
              <img
                src={l.imageUrl}
                alt={l.name}
                title={l.name}
                className="h-14 md:h-20 w-auto max-w-[200px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
