import type { SiteContent } from "@/types/content";
import { Input, Textarea } from "../FormControls";
import { ListEditor } from "../ListEditor";

type Props = {
  value: SiteContent["about"];
  onChange: (v: SiteContent["about"]) => void;
};

export function AboutForm({ value, onChange }: Props) {
  const set = (key: keyof typeof value) => (val: string) =>
    onChange({ ...value, [key]: val });

  return (
    <div className="space-y-5">
      <Input label="Eyebrow" value={value.eyebrow} onChange={set("eyebrow")} />
      <Input label="Tajuk" value={value.title} onChange={set("title")} />
      <Textarea label="Perihalan" value={value.description} onChange={set("description")} rows={4} />
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Senarai Semak (Checklist)</p>
        <ListEditor
          items={value.checklist}
          onChange={(items) => onChange({ ...value, checklist: items })}
          placeholder="Tambah perkara..."
        />
      </div>
    </div>
  );
}
