"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import type { SiteContent } from "@/types/content";
import { ContactForm } from "./forms/ContactForm";
import { ImagesForm } from "./forms/ImagesForm";
import { HeroForm } from "./forms/HeroForm";
import { AboutForm } from "./forms/AboutForm";
import { ProcessForm } from "./forms/ProcessForm";
import { PricingForm } from "./forms/PricingForm";
import { TrustForm } from "./forms/TrustForm";
import { TestimonialsForm } from "./forms/TestimonialsForm";
import { CtaForm } from "./forms/CtaForm";
import { FooterForm } from "./forms/FooterForm";

const tabs = [
  { id: "contact", label: "Hubungi Kami" },
  { id: "images", label: "Gambar" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "Tentang" },
  { id: "process", label: "Proses" },
  { id: "pricing", label: "Pakej" },
  { id: "trust", label: "Kepercayaan" },
  { id: "testimonials", label: "Testimoni" },
  { id: "cta", label: "CTA" },
  { id: "footer", label: "Footer" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ContentEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [activeTab, setActiveTab] = useState<TabId>("contact");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof SiteContent>(section: K, value: SiteContent[K]) => {
    setContent((prev) => ({ ...prev, [section]: value }));
    setSaved(false);
  };

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Gagal menyimpan. Sila cuba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <p className="font-display text-base font-semibold text-emerald-900">AmanahHaji</p>
          <p className="text-xs text-slate-500">Panel Pentadbir</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full px-5 py-2.5 text-left text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-4 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            Lihat Laman Web ↗
          </a>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:text-red-600"
          >
            Log Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <h1 className="text-sm font-semibold text-slate-700">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors disabled:opacity-60 ${
              saved
                ? "bg-emerald-100 text-emerald-700"
                : "bg-emerald-600 text-white hover:bg-emerald-500"
            }`}
          >
            {saving ? "Menyimpan..." : saved ? "Tersimpan ✓" : "Simpan"}
          </button>
        </div>

        {/* Form area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-2xl space-y-6">
            {activeTab === "contact" && (
              <ContactForm value={content.contact} onChange={(v) => update("contact", v)} />
            )}
            {activeTab === "images" && (
              <ImagesForm value={content.images} onChange={(v) => update("images", v)} />
            )}
            {activeTab === "hero" && (
              <HeroForm value={content.hero} onChange={(v) => update("hero", v)} />
            )}
            {activeTab === "about" && (
              <AboutForm value={content.about} onChange={(v) => update("about", v)} />
            )}
            {activeTab === "process" && (
              <ProcessForm value={content.process} onChange={(v) => update("process", v)} />
            )}
            {activeTab === "pricing" && (
              <PricingForm value={content.pricing} onChange={(v) => update("pricing", v)} />
            )}
            {activeTab === "trust" && (
              <TrustForm value={content.trust} onChange={(v) => update("trust", v)} />
            )}
            {activeTab === "testimonials" && (
              <TestimonialsForm
                value={content.testimonials}
                onChange={(v) => update("testimonials", v)}
              />
            )}
            {activeTab === "cta" && (
              <CtaForm value={content.cta} onChange={(v) => update("cta", v)} />
            )}
            {activeTab === "footer" && (
              <FooterForm value={content.footer} onChange={(v) => update("footer", v)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
