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
      <Input label="Eyebrow (small label)" value={value.eyebrow} onChange={set("eyebrow")} />
      <Input label="Title Line 1" value={value.titleLine1} onChange={set("titleLine1")} />
      <Input label="Title Line 2" value={value.titleLine2} onChange={set("titleLine2")} />
      <Input label="Tagline (italic)" value={value.tagline} onChange={set("tagline")} />
      <Textarea
        label="Description"
        value={value.description}
        onChange={set("description")}
        rows={4}
      />
      <Input
        label="Primary Button Text (WhatsApp)"
        value={value.primaryCtaText}
        onChange={set("primaryCtaText")}
      />
      <Input
        label="Secondary Button Text"
        value={value.secondaryCtaText}
        onChange={set("secondaryCtaText")}
      />
    </div>
  );
}
