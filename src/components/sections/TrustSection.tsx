import {
  ShieldCheck,
  Video,
  CheckCircle,
  Wallet,
  Star,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent, TrustIndicator } from "@/types/content";

const iconMap: Record<TrustIndicator["iconName"], LucideIcon> = {
  ShieldCheck,
  Video,
  CheckCircle,
  Wallet,
  Star,
  Heart,
};

const cardVariants = {
  default: {
    card: "border border-emerald-900/10 bg-slate-50",
    title: "text-emerald-950",
    description: "text-slate-600",
  },
  highlight: {
    card: "bg-emerald-950 text-emerald-50",
    title: "text-white",
    description: "text-emerald-100/75",
  },
};

export function TrustSection({ content }: { content: SiteContent }) {
  const { trust } = content;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow={trust.eyebrow} title={trust.title} />
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {trust.indicators.map(({ id, iconName, title, description, highlight }, index) => {
            const Icon = iconMap[iconName];
            const v = highlight ? cardVariants.highlight : cardVariants.default;
            return (
              <Reveal key={id} delay={index * 120}>
                <div className={`h-full rounded-2xl p-7 ${v.card}`}>
                  <IconBadge icon={Icon} highlight={highlight} />
                  <h3 className={`mt-5 font-display text-xl font-medium ${v.title}`}>{title}</h3>
                  <p className={`mt-2.5 text-sm leading-relaxed ${v.description}`}>
                    {description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
