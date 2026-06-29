import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { SiteContent } from "@/types/content";

export function About({ content }: { content: SiteContent }) {
  const { about, images } = content;

  return (
    <section id="tentang" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1800px] gap-14 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-16 xl:px-20">
        <Reveal className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.madinah}
            alt=""
            aria-hidden="true"
            className="aspect-[4/5] w-full rounded-lg border border-ink/10 object-cover"
          />
          <div className="absolute -bottom-6 -right-6 rounded-md bg-ink px-6 py-5 text-cream shadow-xl shadow-ink/25">
            <div className="font-display text-3xl font-bold leading-none text-gold">
              {about.badgeValue}
            </div>
            <div className="mt-1 text-xs text-cream/80">{about.badgeLabel}</div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          <p className="mt-5 leading-relaxed text-[#4a5a4d]">{about.description}</p>
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {about.values.map((v) => (
              <div key={v.id} className="flex gap-3">
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-[#eadfc6] text-[#9a7d3f]">
                  <DynamicIcon name={v.icon} className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-[14.5px] font-semibold text-ink">{v.title}</div>
                  <div className="mt-0.5 text-[12.5px] leading-snug text-[#6b7a6d]">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
