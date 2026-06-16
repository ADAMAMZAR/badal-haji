import { CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/types/content";

export function About({ content }: { content: SiteContent }) {
  const { about, images } = content;

  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Mobile: single image */}
        <Reveal className="lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.hero}
            alt=""
            aria-hidden="true"
            className="h-56 w-full rounded-2xl object-cover sm:h-72"
          />
        </Reveal>

        {/* Desktop: 2×2 image grid */}
        <Reveal className="hidden h-[420px] grid-cols-2 grid-rows-2 gap-4 lg:grid">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.hero}
            alt=""
            aria-hidden="true"
            className="row-span-2 h-full w-full rounded-2xl object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.madinah}
            alt=""
            aria-hidden="true"
            className="h-full w-full rounded-2xl object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.quran}
            alt=""
            aria-hidden="true"
            className="h-full w-full rounded-2xl object-cover"
          />
        </Reveal>

        <Reveal delay={150}>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          <p className="mt-4 leading-relaxed text-slate-600">{about.description}</p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {about.checklist.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
