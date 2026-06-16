"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { SiteContent, Package } from "@/types/content";
import { Input, Textarea } from "../FormControls";
import { ListEditor } from "../ListEditor";

function newPackage(): Package {
  return {
    id: `pkg-${Date.now()}`,
    name: "",
    price: 0,
    priceSuffix: "/ orang",
    items: [],
    ctaText: "Tempah Pakej Ini di WhatsApp",
    highlight: false,
  };
}

type Props = {
  value: SiteContent["pricing"];
  onChange: (v: SiteContent["pricing"]) => void;
};

export function PricingForm({ value, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(value.packages[0]?.id ?? null);

  const updatePkg = (id: string, patch: Partial<Package>) => {
    onChange({
      ...value,
      packages: value.packages.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  };

  const removePkg = (id: string) => {
    onChange({ ...value, packages: value.packages.filter((p) => p.id !== id) });
  };

  const addPkg = () => {
    const pkg = newPackage();
    onChange({ ...value, packages: [...value.packages, pkg] });
    setOpen(pkg.id);
  };

  return (
    <div className="space-y-5">
      <Input
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(v) => onChange({ ...value, eyebrow: v })}
      />
      <Input
        label="Tajuk"
        value={value.title}
        onChange={(v) => onChange({ ...value, title: v })}
      />
      <Textarea
        label="Perihalan"
        value={value.description}
        onChange={(v) => onChange({ ...value, description: v })}
      />

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Senarai Pakej ({value.packages.length})
        </p>

        <div className="space-y-3">
          {value.packages.map((pkg) => (
            <div key={pkg.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              {/* Package header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {pkg.name || "Pakej baru"}
                  </p>
                  <p className="text-xs text-slate-400">
                    RM {pkg.price.toLocaleString()} {pkg.priceSuffix}
                    {pkg.highlight && (
                      <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700">
                        Pilihan Utama
                      </span>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removePkg(pkg.id)}
                  className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(open === pkg.id ? null : pkg.id)}
                  className="rounded p-1.5 text-slate-400 hover:text-slate-600"
                >
                  {open === pkg.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Package fields */}
              {open === pkg.id && (
                <div className="border-t border-slate-100 px-4 py-4 space-y-4">
                  <Input
                    label="Nama Pakej"
                    value={pkg.name}
                    onChange={(v) => updatePkg(pkg.id, { name: v })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Harga (RM)"
                      type="number"
                      value={pkg.price}
                      onChange={(v) => updatePkg(pkg.id, { price: Number(v) })}
                    />
                    <Input
                      label="Sufiks Harga"
                      value={pkg.priceSuffix}
                      onChange={(v) => updatePkg(pkg.id, { priceSuffix: v })}
                    />
                  </div>
                  <Input
                    label="Teks Butang CTA"
                    value={pkg.ctaText}
                    onChange={(v) => updatePkg(pkg.id, { ctaText: v })}
                  />

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={pkg.highlight}
                        onChange={(e) => updatePkg(pkg.id, { highlight: e.target.checked })}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      Pakej Pilihan Utama (kad gelap / featured)
                    </label>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-700">
                      Kandungan Pakej (items)
                    </p>
                    <ListEditor
                      items={pkg.items}
                      onChange={(items) => updatePkg(pkg.id, { items })}
                      placeholder="Tambah item pakej..."
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addPkg}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 hover:border-emerald-400 hover:text-emerald-600"
          >
            <Plus className="h-4 w-4" />
            Tambah Pakej Baru
          </button>
        </div>
      </div>
    </div>
  );
}
