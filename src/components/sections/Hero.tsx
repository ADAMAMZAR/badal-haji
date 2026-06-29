import { MessageCircleQuestionMark, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/types/content";

export function Hero({ content }: { content: SiteContent }) {
  const { hero, testimonials, images } = content;
  const waLink = `https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(content.contact.generalMessage)}`;
  const quote = testimonials.items[0];

  return (
    <section className="relative isolate overflow-hidden bg-ink-dark text-cream">
      <div
        className="pattern-girih-lines pointer-events-none absolute inset-0 text-gold/[0.07]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(196,154,74,0.18), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1800px] gap-14 px-6 py-32 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-16 lg:py-36 xl:px-20">
        <Reveal>
          <p className="mb-5 font-arabic text-2xl text-gold sm:text-3xl" dir="rtl">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم
          </p>
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold/40 px-4 py-1.5 text-[11.5px] uppercase tracking-[0.2em] text-[#d9c79e]">
            <span className="h-[5px] w-[5px] rotate-45 bg-gold" />
            {hero.eyebrow}
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-cream">{hero.titleLine1}</span>
            <span className="block italic text-gold">{hero.titleLine2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-cream/80 sm:text-lg">
            {hero.description}
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#pakej"
              className="inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-4 text-[15px] font-bold text-ink-dark transition-transform hover:-translate-y-0.5"
            >
              {hero.primaryCtaText}
              <ArrowDown className="h-[18px] w-[18px]" />
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/35 px-7 py-4 text-[15px] font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              <MessageCircleQuestionMark className="h-4 w-4" />
              {hero.secondaryCtaText}
            </a>
          </div>
          <div className="mt-12 flex gap-10 border-t border-cream/10 pt-7">
            {hero.stats.map((stat) => (
              <div key={stat.id}>
                <div className="font-display text-[34px] font-bold leading-none text-gold">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-cream/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="relative overflow-hidden rounded-lg border border-gold/35 shadow-2xl shadow-black/35">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.hero}
              alt=""
              aria-hidden="true"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          {quote && (
            <div className="absolute -bottom-6 -left-6 max-w-[230px] rounded-md bg-cream px-5 py-4 text-ink shadow-2xl shadow-black/25 sm:-bottom-7 sm:-left-7">
              <div className="mb-1.5 flex gap-0.5 text-gold" aria-hidden="true">
                ★★★★★
              </div>
              <p className="line-clamp-4 text-[13px] font-medium leading-snug">
                &ldquo;{quote.quote}&rdquo;
              </p>
              <p className="mt-1.5 text-[11px] text-[#8a7a5e]">— {quote.name}</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
