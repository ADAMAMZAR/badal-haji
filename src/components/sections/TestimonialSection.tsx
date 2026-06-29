import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/types/content";

export function TestimonialSection({ content }: { content: SiteContent }) {
  const { testimonials } = content;

  if (testimonials.items.length === 0) return null;

  return (
    <section id="testimoni" className="bg-cream-soft py-20 sm:py-28">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="font-arabic mb-3 text-4xl leading-none text-gold">❝</p>
          <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {testimonials.items.map((t, index) => (
            <Reveal key={t.id} delay={index * 120}>
              <div className="flex h-full flex-col rounded-[10px] border border-ink/10 bg-cream-card p-7 transition-transform hover:-translate-y-1">
                <div className="mb-4 flex gap-0.5 text-gold" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="flex-1 text-[15px] leading-relaxed text-[#3c4d40]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-4">
                  <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg font-bold text-gold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">{t.name}</div>
                    <div className="text-xs text-[#8a7a5e]">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {testimonials.disclaimer && (
          <p className="mt-8 text-center text-xs italic text-[#9b8a68]">
            {testimonials.disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}
