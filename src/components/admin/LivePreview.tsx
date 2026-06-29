"use client";

import { useEffect, useRef } from "react";
import { Smartphone, Monitor } from "lucide-react";
import type { SiteContent } from "@/types/content";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { Footer } from "@/components/sections/Footer";

const TAB_TO_SECTION: Record<string, string> = {
  hero: "hero",
  images: "hero",
  about: "about",
  process: "process",
  pricing: "pricing",
  testimonials: "testimonials",
  contact: "footer",
  footer: "footer",
};

type Props = {
  content: SiteContent;
  activeTab: string;
  previewMode: "desktop" | "mobile";
  onPreviewModeChange: (mode: "desktop" | "mobile") => void;
};

export function LivePreview({ content, activeTab, previewMode, onPreviewModeChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const refSetters = useRef<Record<string, (el: HTMLDivElement | null) => void>>(
    Object.fromEntries(
      [...new Set(Object.values(TAB_TO_SECTION))].map((key) => [
        key,
        (el: HTMLDivElement | null) => { sectionRefs.current[key] = el; },
      ])
    )
  );

  useEffect(() => {
    const sectionKey = TAB_TO_SECTION[activeTab];
    const el = sectionRefs.current[sectionKey];
    if (el && containerRef.current) {
      containerRef.current.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <div className="flex h-full flex-col border-l border-slate-200 bg-slate-50">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-2 flex-1 rounded bg-slate-100 px-3 py-1 text-center text-xs text-slate-400">
          badal-haji.vercel.app
        </span>
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-0.5">
          <button
            type="button"
            onClick={() => onPreviewModeChange("desktop")}
            title="Desktop preview"
            className={`rounded p-1 transition-colors ${
              previewMode === "desktop"
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onPreviewModeChange("mobile")}
            title="Mobile preview"
            className={`rounded p-1 transition-colors ${
              previewMode === "mobile"
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`flex-1 overflow-y-auto ${previewMode === "mobile" ? "bg-slate-200 p-4" : ""}`}
      >
        <div
          className={
            previewMode === "mobile"
              ? "mx-auto w-[390px] overflow-hidden rounded-xl shadow-xl"
              : ""
          }
        >
          <div ref={refSetters.current["hero"]}>
            <Hero content={content} />
          </div>
          <div ref={refSetters.current["about"]}>
            <About content={content} />
          </div>
          <div ref={refSetters.current["process"]}>
            <Process content={content} />
          </div>
          <div ref={refSetters.current["pricing"]}>
            <Pricing content={content} />
          </div>
          <div ref={refSetters.current["testimonials"]}>
            <TestimonialSection content={content} />
          </div>
          <div ref={refSetters.current["footer"]}>
            <Footer content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
