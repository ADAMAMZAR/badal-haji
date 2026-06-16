import type { SiteContent } from "@/types/content";
import { Input, Textarea } from "../FormControls";

type Props = {
  value: SiteContent["contact"];
  onChange: (v: SiteContent["contact"]) => void;
};

export function ContactForm({ value, onChange }: Props) {
  const set = (key: keyof typeof value) => (val: string) =>
    onChange({ ...value, [key]: val });

  return (
    <div className="space-y-5">
      <Input
        label="Nombor WhatsApp"
        hint="Contoh: 60194585814 (tanpa + atau sengkang)"
        value={value.whatsappNumber}
        onChange={set("whatsappNumber")}
      />
      <Textarea
        label="Mesej Pertanyaan Am"
        value={value.generalMessage}
        onChange={set("generalMessage")}
      />
      <Textarea
        label="Mesej Tempahan Pakej"
        value={value.packageMessage}
        onChange={set("packageMessage")}
      />
    </div>
  );
}
