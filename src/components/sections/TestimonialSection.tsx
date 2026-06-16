"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionBackgroundImage } from "@/components/ui/SectionBackgroundImage";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/types/content";

export function TestimonialSection({ content }: { content: SiteContent }) {
  const { testimonials, images } = content;
  const [active, setActive] = useState(0);
  const count = testimonials.items.length;

  if (count === 0) return null;

  const prev = () => setActive((i) => (i - 1 + count) % count);
  const next = () => setActive((i) => (i + 1) % count);
  const current = testimonials.items[active];

  return (
    <section id="testimoni" className="relative isolate overflow-hidden py-20 sm:py-28">
      <SectionBackgroundImage src={images.quran} overlayClassName="bg-emerald-950/80" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <SectionHeading
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            eyebrowClassName="text-emerald-300"
            titleClassName="text-white"
          />
        </Reveal>

        <Reveal
          delay={150}
          className="mt-12 rounded-3xl bg-white p-8 text-left shadow-2xl shadow-emerald-950/40 sm:p-10"
        >
          <div className="flex gap-1 text-emerald-600" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-5 min-h-32 text-balance font-display text-lg leading-relaxed text-emerald-950 sm:min-h-28 sm:text-xl">
            &ldquo;{current.quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-emerald-900/10 pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-display text-lg font-semibold text-emerald-700">
                {current.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-emerald-950">{current.name}</p>
                <p className="text-sm text-slate-500">{current.role}</p>
              </div>
            </div>
            {count > 1 && (
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Testimoni sebelumnya"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-900/10 text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Testimoni seterusnya"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-900/10 text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {testimonials.disclaimer && (
          <p className="mt-4 text-center text-xs text-emerald-100/60">
            {testimonials.disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}
