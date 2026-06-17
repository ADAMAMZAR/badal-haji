import { MessageCircle, ArrowRight } from "lucide-react";
import { SectionBackgroundImage } from "@/components/ui/SectionBackgroundImage";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/types/content";

export function Hero({ content }: { content: SiteContent }) {
  const waLink = `https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(content.contact.generalMessage)}`;

  return (
    <section className="relative isolate overflow-hidden text-emerald-50">
      <SectionBackgroundImage
        src={content.images.hero}
        overlayClassName="bg-gradient-to-b from-emerald-950/85 via-emerald-950/80 to-emerald-950"
        priority
      />
      <div
        className="pattern-girih-lines pointer-events-none absolute inset-0 -z-10 text-emerald-300/[0.06]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-16 text-center sm:py-24 md:py-32">
        <Reveal>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300 sm:text-sm">
            {content.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-medium uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-white">{content.hero.titleLine1}</span>
            <span className="block text-emerald-400">{content.hero.titleLine2}</span>
          </h1>
          <p className="mt-4 font-display text-lg italic text-emerald-100/90 sm:mt-5 sm:text-xl md:text-2xl">
            {content.hero.tagline}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-relaxed text-emerald-100/80 sm:mt-6 sm:text-base md:text-lg">
            {content.hero.description}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CtaButton href={waLink} external variant="primary">
              <MessageCircle className="h-5 w-5" />
              {content.hero.primaryCtaText}
            </CtaButton>
            <CtaButton href="#pakej" variant="secondary">
              {content.hero.secondaryCtaText}
              <ArrowRight className="h-4 w-4" />
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
