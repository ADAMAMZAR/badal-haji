import type { SiteContent } from "@/types/content";
import { Input, Textarea } from "../FormControls";

type Props = {
  value: SiteContent["footer"];
  onChange: (v: SiteContent["footer"]) => void;
};

export function FooterForm({ value, onChange }: Props) {
  const set = (key: keyof typeof value) => (val: string) =>
    onChange({ ...value, [key]: val });

  return (
    <div className="space-y-5">
      <Input label="Legal Entity Name" value={value.legalName} onChange={set("legalName")} />
      <Textarea
        label="Footer Description"
        value={value.description}
        onChange={set("description")}
        rows={3}
      />
      <Input
        label="Contact Email"
        hint="Leave blank to hide the email link in the footer"
        value={value.email}
        onChange={set("email")}
      />
      <Input
        label="Address"
        hint="Leave blank to hide the address in the footer"
        value={value.address}
        onChange={set("address")}
      />
    </div>
  );
}
