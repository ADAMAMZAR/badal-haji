import type { SiteContent } from "@/types/content";
import { Textarea } from "../FormControls";

type Props = {
  value: SiteContent["footer"];
  onChange: (v: SiteContent["footer"]) => void;
};

export function FooterForm({ value, onChange }: Props) {
  return (
    <div className="space-y-5">
      <Textarea
        label="Perihalan Footer"
        value={value.description}
        onChange={(v) => onChange({ ...value, description: v })}
        rows={3}
      />
    </div>
  );
}
