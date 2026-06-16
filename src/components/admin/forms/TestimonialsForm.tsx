"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { SiteContent, Testimonial } from "@/types/content";
import { Input, Textarea } from "../FormControls";

function newTestimonial(): Testimonial {
  return { id: `test-${Date.now()}`, quote: "", name: "", role: "" };
}

type Props = {
  value: SiteContent["testimonials"];
  onChange: (v: SiteContent["testimonials"]) => void;
};

export function TestimonialsForm({ value, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  const update = (id: string, patch: Partial<Testimonial>) =>
    onChange({
      ...value,
      items: value.items.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });

  const remove = (id: string) =>
    onChange({ ...value, items: value.items.filter((t) => t.id !== id) });

  const add = () => {
    const item = newTestimonial();
    onChange({ ...value, items: [...value.items, item] });
    setOpen(item.id);
  };

  return (
    <div className="space-y-5">
      <Input
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(v) => onChange({ ...value, eyebrow: v })}
      />
      <Input
        label="Tajuk"
        value={value.title}
        onChange={(v) => onChange({ ...value, title: v })}
      />
      <Textarea
        label="Notis Penafian (disclaimer)"
        value={value.disclaimer}
        onChange={(v) => onChange({ ...value, disclaimer: v })}
        rows={2}
      />

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Testimoni ({value.items.length})
        </p>
        <div className="space-y-2">
          {value.items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 px-4 py-3">
                <p className="flex-1 truncate text-sm font-medium text-slate-800">
                  {item.name || "Testimoni baru"}
                </p>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(open === item.id ? null : item.id)}
                  className="rounded p-1.5 text-slate-400 hover:text-slate-600"
                >
                  {open === item.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>
              {open === item.id && (
                <div className="border-t border-slate-100 px-4 py-4 space-y-3">
                  <Textarea
                    label="Petikan (Quote)"
                    value={item.quote}
                    onChange={(v) => update(item.id, { quote: v })}
                    rows={3}
                  />
                  <Input
                    label="Nama"
                    value={item.name}
                    onChange={(v) => update(item.id, { name: v })}
                  />
                  <Input
                    label="Peranan / Jawatan"
                    value={item.role}
                    onChange={(v) => update(item.id, { role: v })}
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={add}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 hover:border-emerald-400 hover:text-emerald-600"
          >
            <Plus className="h-4 w-4" />
            Tambah Testimoni
          </button>
        </div>
      </div>
    </div>
  );
}
