import { MessageCircle } from "lucide-react";
import { SectionBackgroundImage } from "@/components/ui/SectionBackgroundImage";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/types/content";

export function CtaSection({ content }: { content: SiteContent }) {
  const { cta, contact, images } = content;
  const generalWa = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.generalMessage)}`;
  const packageWa = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.packageMessage)}`;

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24">
      <SectionBackgroundImage src={images.madinah} overlayClassName="bg-emerald-950/85" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance leading-relaxed text-emerald-100/80">
            {cta.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href={generalWa} external variant="primary">
              <MessageCircle className="h-5 w-5" />
              {cta.primaryText}
            </CtaButton>
            <CtaButton href={packageWa} external variant="secondary">
              {cta.secondaryText}
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
