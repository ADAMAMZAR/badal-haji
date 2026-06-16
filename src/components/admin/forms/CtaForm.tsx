import type { SiteContent } from "@/types/content";
import { Input, Textarea } from "../FormControls";

type Props = {
  value: SiteContent["cta"];
  onChange: (v: SiteContent["cta"]) => void;
};

export function CtaForm({ value, onChange }: Props) {
  const set = (key: keyof typeof value) => (val: string) =>
    onChange({ ...value, [key]: val });

  return (
    <div className="space-y-5">
      <Input label="Tajuk" value={value.title} onChange={set("title")} />
      <Textarea label="Perihalan" value={value.description} onChange={set("description")} />
      <Input label="Teks Butang Utama" value={value.primaryText} onChange={set("primaryText")} />
      <Input label="Teks Butang Kedua" value={value.secondaryText} onChange={set("secondaryText")} />
    </div>
  );
}
