import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/types/content";

export function Process({ content }: { content: SiteContent }) {
  const { process } = content;

  return (
    <section id="proses" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow={process.eyebrow} title={process.title} />
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {process.steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 120}>
              <div className="h-full rounded-2xl border border-emerald-900/10 bg-slate-50 p-7">
                <span className="font-display text-4xl font-medium text-emerald-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-medium text-emerald-950">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
