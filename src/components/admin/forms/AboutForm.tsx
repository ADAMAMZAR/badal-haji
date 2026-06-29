import { Plus, Trash2 } from "lucide-react";
import type { SiteContent, AboutValue } from "@/types/content";
import { Input, Textarea } from "../FormControls";

type Props = {
  value: SiteContent["about"];
  onChange: (v: SiteContent["about"]) => void;
};

function newValue(): AboutValue {
  return { id: `value-${Date.now()}`, icon: "CircleCheck", title: "", desc: "" };
}

export function AboutForm({ value, onChange }: Props) {
  const set = (key: keyof typeof value) => (val: string) =>
    onChange({ ...value, [key]: val });

  const updateValue = (id: string, patch: Partial<AboutValue>) =>
    onChange({
      ...value,
      values: value.values.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    });

  const removeValue = (id: string) =>
    onChange({ ...value, values: value.values.filter((v) => v.id !== id) });

  const addValue = () => onChange({ ...value, values: [...value.values, newValue()] });

  return (
    <div className="space-y-5">
      <Input label="Eyebrow" value={value.eyebrow} onChange={set("eyebrow")} />
      <Input label="Title" value={value.title} onChange={set("title")} />
      <Textarea label="Description" value={value.description} onChange={set("description")} rows={4} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Badge Value (e.g. 100%)" value={value.badgeValue} onChange={set("badgeValue")} />
        <Input label="Badge Label" value={value.badgeLabel} onChange={set("badgeLabel")} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Value Cards ({value.values.length})
        </p>
        <p className="mb-2 text-xs text-slate-400">
          Icon = exact name from{" "}
          <a
            href="https://lucide.dev/icons"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600"
          >
            lucide.dev/icons
          </a>{" "}
          (e.g. HandHeart, FileCheck2, Video, Droplet)
        </p>
        <div className="space-y-2">
          {value.values.map((v) => (
            <div key={v.id} className="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={v.icon}
                  onChange={(e) => updateValue(v.id, { icon: e.target.value })}
                  placeholder="CircleCheck"
                  className="w-28 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                />
                <input
                  type="text"
                  value={v.title}
                  onChange={(e) => updateValue(v.id, { title: e.target.value })}
                  placeholder="Title"
                  className="flex-1 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeValue(v.id)}
                  className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                value={v.desc}
                onChange={(e) => updateValue(v.id, { desc: e.target.value })}
                placeholder="Description"
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addValue}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-500 hover:border-emerald-400 hover:text-emerald-600"
        >
          <Plus className="h-4 w-4" />
          Add Value Card
        </button>
      </div>
    </div>
  );
}
