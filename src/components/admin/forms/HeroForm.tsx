import type { SiteContent } from "@/types/content";
import { Input, Textarea } from "../FormControls";

type Props = {
  value: SiteContent["hero"];
  onChange: (v: SiteContent["hero"]) => void;
};

export function HeroForm({ value, onChange }: Props) {
  const set = (key: keyof typeof value) => (val: string) =>
    onChange({ ...value, [key]: val });

  return (
    <div className="space-y-5">
      <Input label="Eyebrow (label kecil)" value={value.eyebrow} onChange={set("eyebrow")} />
      <Input label="Tajuk Baris 1" value={value.titleLine1} onChange={set("titleLine1")} />
      <Input label="Tajuk Baris 2" value={value.titleLine2} onChange={set("titleLine2")} />
      <Input label="Tagline (italic)" value={value.tagline} onChange={set("tagline")} />
      <Textarea
        label="Perihalan"
        value={value.description}
        onChange={set("description")}
        rows={4}
      />
      <Input
        label="Teks Butang Utama (WhatsApp)"
        value={value.primaryCtaText}
        onChange={set("primaryCtaText")}
      />
      <Input
        label="Teks Butang Kedua"
        value={value.secondaryCtaText}
        onChange={set("secondaryCtaText")}
      />
    </div>
  );
}
