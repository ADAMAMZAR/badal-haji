"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { SiteContent, TrustIndicator } from "@/types/content";
import { Input, Textarea } from "../FormControls";

const ICON_OPTIONS: TrustIndicator["iconName"][] = [
  "ShieldCheck",
  "Video",
  "CheckCircle",
  "Wallet",
  "Star",
  "Heart",
];

function newIndicator(): TrustIndicator {
  return {
    id: `trust-${Date.now()}`,
    iconName: "ShieldCheck",
    title: "",
    description: "",
    highlight: false,
  };
}

type Props = {
  value: SiteContent["trust"];
  onChange: (v: SiteContent["trust"]) => void;
};

export function TrustForm({ value, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  const update = (id: string, patch: Partial<TrustIndicator>) =>
    onChange({
      ...value,
      indicators: value.indicators.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });

  const remove = (id: string) =>
    onChange({ ...value, indicators: value.indicators.filter((t) => t.id !== id) });

  const add = () => {
    const item = newIndicator();
    onChange({ ...value, indicators: [...value.indicators, item] });
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

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Kad Kepercayaan ({value.indicators.length})
        </p>
        <div className="space-y-2">
          {value.indicators.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {item.title || "Kad baru"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.iconName}
                    {item.highlight && (
                      <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700">
                        Highlighted
                      </span>
                    )}
                  </p>
                </div>
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
                  <Input
                    label="Tajuk Kad"
                    value={item.title}
                    onChange={(v) => update(item.id, { title: v })}
                  />
                  <Textarea
                    label="Perihalan"
                    value={item.description}
                    onChange={(v) => update(item.id, { description: v })}
                    rows={2}
                  />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ikon</label>
                    <select
                      value={item.iconName}
                      onChange={(e) =>
                        update(item.id, { iconName: e.target.value as TrustIndicator["iconName"] })
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
                    >
                      {ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={item.highlight}
                      onChange={(e) => update(item.id, { highlight: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                    />
                    Kad Highlighted (latar gelap)
                  </label>
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
            Tambah Kad
          </button>
        </div>
      </div>
    </div>
  );
}
