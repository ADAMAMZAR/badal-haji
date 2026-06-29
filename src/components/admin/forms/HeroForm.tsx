import { Plus, Trash2 } from "lucide-react";
import type { SiteContent, HeroStat } from "@/types/content";
import { Input, Textarea } from "../FormControls";

type Props = {
  value: SiteContent["hero"];
  onChange: (v: SiteContent["hero"]) => void;
};

function newStat(): HeroStat {
  return { id: `stat-${Date.now()}`, value: "", label: "" };
}

export function HeroForm({ value, onChange }: Props) {
  const set = (key: keyof typeof value) => (val: string) =>
    onChange({ ...value, [key]: val });

  const updateStat = (id: string, patch: Partial<HeroStat>) =>
    onChange({
      ...value,
      stats: value.stats.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });

  const removeStat = (id: string) =>
    onChange({ ...value, stats: value.stats.filter((s) => s.id !== id) });

  const addStat = () => onChange({ ...value, stats: [...value.stats, newStat()] });

  return (
    <div className="space-y-5">
      <Input label="Eyebrow (small label)" value={value.eyebrow} onChange={set("eyebrow")} />
      <Input label="Title Line 1" value={value.titleLine1} onChange={set("titleLine1")} />
      <Input label="Title Line 2 (gold italic)" value={value.titleLine2} onChange={set("titleLine2")} />
      <Textarea
        label="Description"
        value={value.description}
        onChange={set("description")}
        rows={4}
      />
      <Input
        label="Primary Button Text"
        value={value.primaryCtaText}
        onChange={set("primaryCtaText")}
      />
      <Input
        label="Secondary Button Text (WhatsApp)"
        value={value.secondaryCtaText}
        onChange={set("secondaryCtaText")}
      />
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Stats ({value.stats.length})
        </p>
        <div className="space-y-2">
          {value.stats.map((stat) => (
            <div key={stat.id} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(stat.id, { value: e.target.value })}
                placeholder="Value (e.g. Sah)"
                className="w-28 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(stat.id, { label: e.target.value })}
                placeholder="Label (e.g. Mengikut syarak)"
                className="flex-1 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={() => removeStat(stat.id)}
                className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addStat}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-500 hover:border-emerald-400 hover:text-emerald-600"
        >
          <Plus className="h-4 w-4" />
          Add Stat
        </button>
      </div>
    </div>
  );
}
