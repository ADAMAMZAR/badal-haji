"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { MonitorSmartphone, Smartphone, Menu, X, RotateCcw, AlertTriangle } from "lucide-react";
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
import { LivePreview } from "./LivePreview";

const tabs = [
  { id: "contact", label: "Contact" },
  { id: "images", label: "Images" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Packages" },
  { id: "trust", label: "Trust" },
  { id: "testimonials", label: "Testimonials" },
  { id: "cta", label: "CTA" },
  { id: "footer", label: "Footer" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ContentEditor({
  initialContent,
  kvError,
}: {
  initialContent: SiteContent;
  kvError?: string;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [savedContent, setSavedContent] = useState<SiteContent>(initialContent);
  const [activeTab, setActiveTab] = useState<TabId>("contact");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasChanges = JSON.stringify(content) !== JSON.stringify(savedContent);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasChanges]);

  const update = <K extends keyof SiteContent>(section: K, value: SiteContent[K]) => {
    setContent((prev) => ({ ...prev, [section]: value }));
  };

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Save failed");
      }
      setSavedContent(content);
      setSaved(true);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      clearTimeout(timeoutId);
      const msg =
        e instanceof DOMException && e.name === "AbortError"
          ? "Request timed out. Please try again."
          : e instanceof Error
          ? e.message
          : "Failed to save. Please try again.";
      setSaveError(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleRestore() {
    if (!confirm("Restore the previous save? Your current unsaved changes will be lost.")) return;
    setRestoring(true);
    try {
      const res = await fetch("/api/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore-prev" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Restore failed");
      setContent(data.content);
      setSavedContent(data.content);
      setSaved(true);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Restore failed.");
    } finally {
      setRestoring(false);
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="border-b border-slate-200 px-5 py-4">
          <p className="font-display text-base font-semibold text-emerald-900">AmanahHaji</p>
          <p className="text-xs text-slate-500">Admin Panel</p>
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
        <div className="space-y-2 border-t border-slate-200 p-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            View Website ↗
          </a>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:text-red-600"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* KV error banner */}
        {kvError && (
          <div className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            <span>
              <strong>Warning:</strong> Could not load content from storage ({kvError}). Displayed
              content may not be current. Saving now may overwrite real data.
            </span>
          </div>
        )}

        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-8 md:py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
              aria-label="Navigation menu"
            >
              {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <h1 className="text-sm font-semibold text-slate-700">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={handleRestore}
              disabled={restoring || saving}
              title="Restore previous save"
              className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {restoring ? "Restoring..." : "Restore"}
            </button>
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              title={showPreview ? "Hide preview" : "Show preview"}
              className={`hidden items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors lg:flex ${
                showPreview
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <MonitorSmartphone className="h-3.5 w-3.5" />
              Preview
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed md:px-5 md:text-sm ${
                saved
                  ? "bg-emerald-100 text-emerald-700"
                  : hasChanges
                  ? "bg-emerald-600 text-white hover:bg-emerald-500"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {saving ? "Saving..." : saved ? "Saved ✓" : "Save"}
            </button>
          </div>
        </div>

        {/* Inline save error */}
        {saveError && (
          <div className="flex items-center gap-2 border-b border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700 md:px-8">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            {saveError}
            <button
              type="button"
              onClick={() => setSaveError(null)}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Mobile nav dropdown */}
        {mobileNavOpen && (
          <div className="border-b border-slate-200 bg-white md:hidden">
            <nav className="py-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            <div className="flex gap-2 border-t border-slate-100 p-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-medium text-slate-600"
              >
                View Website ↗
              </a>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="flex-1 rounded-lg px-3 py-2 text-xs font-medium text-red-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Editor + Preview split */}
        <div className="flex flex-1 overflow-hidden">
          {/* Form area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="space-y-4">
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

          {/* Live preview panel — desktop only */}
          {showPreview && (
            <div className="hidden w-[50vw] shrink-0 overflow-hidden lg:block">
              <LivePreview
                content={content}
                activeTab={activeTab}
                previewMode={previewMode}
                onPreviewModeChange={setPreviewMode}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
