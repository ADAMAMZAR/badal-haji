import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/types/content";

export function Process({ content }: { content: SiteContent }) {
  const { process } = content;

  return (
    <section id="proses" className="relative overflow-hidden bg-ink-dark py-20 sm:py-28">
      <div
        className="pattern-girih-lines pointer-events-none absolute inset-0 text-gold/5"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <SectionHeading
            eyebrow={process.eyebrow}
            title={process.title}
            eyebrowClassName="text-[#d9c79e]"
            titleClassName="text-cream"
          />
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-3">
          {process.steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 120}>
              <div className="h-full rounded-[10px] border border-gold/20 bg-cream/[0.04] p-9 transition-colors hover:border-gold/50">
                <div className="font-display text-[54px] font-bold leading-none text-gold/35">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 font-display text-[25px] font-semibold text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
