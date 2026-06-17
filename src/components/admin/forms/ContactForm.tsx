"use client";

import { useState } from "react";
import type { SiteContent } from "@/types/content";
import { Input, Textarea } from "../FormControls";

type Props = {
  value: SiteContent["contact"];
  onChange: (v: SiteContent["contact"]) => void;
};

function validateWhatsApp(num: string): string | null {
  if (!num) return "WhatsApp number is required.";
  if (!/^\d{8,15}$/.test(num)) return "Enter digits only, 8–15 characters (e.g. 60194585814).";
  return null;
}

export function ContactForm({ value, onChange }: Props) {
  const [waError, setWaError] = useState<string | null>(null);

  const set = (key: keyof typeof value) => (val: string) => {
    if (key === "whatsappNumber") {
      setWaError(validateWhatsApp(val));
    }
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="space-y-5">
      <div>
        <Input
          label="WhatsApp Number"
          hint="Digits only, no + or dashes (e.g. 60194585814)"
          value={value.whatsappNumber}
          onChange={set("whatsappNumber")}
        />
        {waError && <p className="mt-1 text-xs text-red-500">{waError}</p>}
      </div>
      <Textarea
        label="General Enquiry Message"
        value={value.generalMessage}
        onChange={set("generalMessage")}
      />
      <Textarea
        label="Package Booking Message"
        value={value.packageMessage}
        onChange={set("packageMessage")}
      />
    </div>
  );
}
