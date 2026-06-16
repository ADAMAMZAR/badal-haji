"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { SiteContent, ProcessStep } from "@/types/content";
import { Input, Textarea } from "../FormControls";

function newStep(): ProcessStep {
  return { id: `step-${Date.now()}`, title: "", description: "" };
}

type Props = {
  value: SiteContent["process"];
  onChange: (v: SiteContent["process"]) => void;
};

export function ProcessForm({ value, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  const updateStep = (id: string, key: keyof ProcessStep, val: string) => {
    onChange({
      ...value,
      steps: value.steps.map((s) => (s.id === id ? { ...s, [key]: val } : s)),
    });
  };

  const removeStep = (id: string) => {
    onChange({ ...value, steps: value.steps.filter((s) => s.id !== id) });
  };

  const addStep = () => {
    const step = newStep();
    onChange({ ...value, steps: [...value.steps, step] });
    setOpen(step.id);
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

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Langkah-langkah ({value.steps.length})
        </p>
        <div className="space-y-2">
          {value.steps.map((step, index) => (
            <div key={step.id} className="rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="text-sm font-medium text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 truncate text-sm font-medium text-slate-700">
                  {step.title || "Langkah baru"}
                </span>
                <button
                  type="button"
                  onClick={() => removeStep(step.id)}
                  className="rounded p-1 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(open === step.id ? null : step.id)}
                  className="rounded p-1 text-slate-400 hover:text-slate-600"
                >
                  {open === step.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>
              {open === step.id && (
                <div className="border-t border-slate-100 px-4 py-4 space-y-3">
                  <Input
                    label="Tajuk Langkah"
                    value={step.title}
                    onChange={(v) => updateStep(step.id, "title", v)}
                  />
                  <Textarea
                    label="Perihalan"
                    value={step.description}
                    onChange={(v) => updateStep(step.id, "description", v)}
                    rows={2}
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addStep}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 hover:border-emerald-400 hover:text-emerald-600"
          >
            <Plus className="h-4 w-4" />
            Tambah Langkah
          </button>
        </div>
      </div>
    </div>
  );
}

