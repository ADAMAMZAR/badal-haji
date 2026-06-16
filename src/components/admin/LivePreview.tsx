"use client";

import { useEffect, useRef } from "react";
import type { SiteContent } from "@/types/content";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { TrustSection } from "@/components/sections/TrustSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Footer } from "@/components/sections/Footer";

const TAB_TO_SECTION: Record<string, string> = {
  hero: "hero",
  images: "hero",
  about: "about",
  process: "process",
  pricing: "pricing",
  trust: "trust",
  testimonials: "testimonials",
  cta: "cta",
  contact: "footer",
  footer: "footer",
};

type Props = {
  content: SiteContent;
  activeTab: string;
};

export function LivePreview({ content, activeTab }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const sectionKey = TAB_TO_SECTION[activeTab];
    const el = sectionRefs.current[sectionKey];
    if (el && containerRef.current) {
      containerRef.current.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  }, [activeTab]);

  const ref = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el;
  };

  return (
    <div className="flex h-full flex-col border-l border-slate-200 bg-slate-50">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-2 flex-1 rounded bg-slate-100 px-3 py-1 text-center text-xs text-slate-400">
          badal-haji.vercel.app
        </span>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto">
        <div ref={ref("hero")}>
          <Hero content={content} />
        </div>
        <div ref={ref("about")}>
          <About content={content} />
        </div>
        <div ref={ref("process")}>
          <Process content={content} />
        </div>
        <div ref={ref("pricing")}>
          <Pricing content={content} />
        </div>
        <div ref={ref("trust")}>
          <TrustSection content={content} />
        </div>
        <div ref={ref("testimonials")}>
          <TestimonialSection content={content} />
        </div>
        <div ref={ref("cta")}>
          <CtaSection content={content} />
        </div>
        <div ref={ref("footer")}>
          <Footer content={content} />
        </div>
      </div>
    </div>
  );
}
