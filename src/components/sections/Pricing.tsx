import { CheckCircle, MessageCircle } from "lucide-react";
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
        ? "grid sm:grid-cols-2 gap-6"
        : "grid sm:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <section id="pakej" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} />
          <p className="mt-4 text-balance leading-relaxed text-slate-600">
            {pricing.description}
          </p>
        </Reveal>

        <div className={`mt-12 ${colClass}`}>
          {pricing.packages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 100}>
              {pkg.highlight ? (
                <div className="relative overflow-hidden rounded-3xl bg-emerald-950 p-8 text-emerald-50 shadow-2xl shadow-emerald-950/30 sm:p-10">
                  <div
                    className="pattern-girih-lines pointer-events-none absolute inset-0 text-emerald-300/[0.05]"
                    aria-hidden="true"
                  />
                  <div className="relative flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-6">
                    <h3 className="font-display text-2xl font-medium">{pkg.name}</h3>
                    <p className="text-right">
                      <span className="font-display text-4xl font-semibold text-emerald-400">
                        RM {pkg.price.toLocaleString()}
                      </span>
                      <span className="ml-1 text-sm text-emerald-100/60">{pkg.priceSuffix}</span>
                    </p>
                  </div>
                  <ul className="relative mt-6 space-y-3.5">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                        <span className="text-sm leading-relaxed text-emerald-50/90 sm:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(contact.packageMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-base font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {pkg.ctaText}
                  </a>
                </div>
              ) : (
                <div className="h-full rounded-2xl border border-emerald-900/10 bg-white p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-emerald-900/10 pb-6">
                    <h3 className="font-display text-2xl font-medium text-emerald-950">
                      {pkg.name}
                    </h3>
                    <p>
                      <span className="font-display text-4xl font-semibold text-emerald-700">
                        RM {pkg.price.toLocaleString()}
                      </span>
                      <span className="ml-1 text-sm text-slate-500">{pkg.priceSuffix}</span>
                    </p>
                  </div>
                  <ul className="mt-6 space-y-3.5">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <span className="text-sm leading-relaxed text-slate-600 sm:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(contact.packageMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-700/30 bg-emerald-50 px-6 py-4 text-base font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {pkg.ctaText}
                  </a>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
