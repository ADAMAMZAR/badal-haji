import { CheckCircle, MessageCircleQuestionMark } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/types/content";

export function Pricing({ content }: { content: SiteContent }) {
  const { pricing, contact } = content;
  const waLink = (msg: string) =>
    `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  const colClass =
    pricing.packages.length === 1
      ? "max-w-md mx-auto"
      : pricing.packages.length === 2
        ? "grid sm:grid-cols-2 gap-7"
        : "grid sm:grid-cols-2 lg:grid-cols-3 gap-7";

  return (
    <section id="pakej" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} />
          <p className="mt-3.5 text-balance leading-relaxed text-[#6b7a6d]">
            {pricing.description}
          </p>
        </Reveal>

        <div className={`mx-auto mt-12 max-w-5xl items-stretch ${colClass}`}>
          {pricing.packages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 100}>
              {pkg.highlight ? (
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gold bg-ink-dark p-9 text-cream shadow-2xl shadow-ink-dark/25 sm:p-10">
                  <span className="absolute right-5 top-5 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-dark">
                    Pilihan Terbaik
                  </span>
                  <div className="text-[13px] uppercase tracking-[0.15em] text-gold">
                    {pkg.name}
                  </div>
                  <div className="mt-3.5 flex items-baseline gap-1.5">
                    <span className="text-lg font-semibold text-cream">RM</span>
                    <span className="font-display text-[54px] font-bold leading-none text-cream">
                      {pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-6 mt-1 text-sm text-cream/65">{pkg.tagline}</div>
                  <div className="mb-6 h-px bg-gold/30" />
                  <div className="mb-8 flex flex-col gap-3.5">
                    {pkg.items.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span className="text-cream/85">{item}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={waLink(contact.packageMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[15px] font-bold text-ink-dark transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircleQuestionMark className="h-5 w-5" />
                    {pkg.ctaText}
                  </a>
                </div>
              ) : (
                <div className="flex h-full flex-col rounded-xl border border-ink/10 bg-cream-card p-9 sm:p-10">
                  <div className="text-[13px] uppercase tracking-[0.15em] text-[#9a7d3f]">
                    {pkg.name}
                  </div>
                  <div className="mt-3.5 flex items-baseline gap-1.5">
                    <span className="text-lg font-semibold text-ink">RM</span>
                    <span className="font-display text-[54px] font-bold leading-none text-ink">
                      {pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-6 mt-1 text-sm text-[#6b7a6d]">{pkg.tagline}</div>
                  <div className="mb-6 h-px bg-ink/10" />
                  <div className="mb-8 flex flex-col gap-3.5">
                    {pkg.items.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#1f8a5b]" />
                        <span className="text-[#3c4d40]">{item}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={waLink(contact.packageMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-cream transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircleQuestionMark className="h-5 w-5" />
                    {pkg.ctaText}
                  </a>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] italic text-[#9b8a68]">
          Ingin berbincang dahulu?{" "}
          <a
            href={waLink(contact.generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#9a7d3f] underline"
          >
            WhatsApp kami
          </a>{" "}
          untuk pertanyaan lanjut.
        </p>
      </div>
    </section>
  );
}
