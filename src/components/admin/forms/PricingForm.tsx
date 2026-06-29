"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SiteContent, Package } from "@/types/content";
import { Input, Textarea } from "../FormControls";
import { ListEditor } from "../ListEditor";

function newPackage(): Package {
  return {
    id: `pkg-${Date.now()}`,
    name: "",
    price: 0,
    priceSuffix: "/ orang",
    tagline: "",
    items: [],
    ctaText: "Book This Package via WhatsApp",
    highlight: false,
  };
}

function SortablePackage({
  pkg,
  open,
  onToggle,
  onRemove,
  onUpdate,
}: {
  pkg: Package;
  open: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onUpdate: (patch: Partial<Package>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: pkg.id,
  });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 px-3 py-3">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none p-1 text-slate-300 hover:text-slate-500 active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-800">
            {pkg.name || "New package"}
          </p>
          <p className="text-xs text-slate-400">
            RM {pkg.price.toLocaleString()} {pkg.priceSuffix}
            {pkg.highlight && (
              <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700">
                Featured
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => { if (confirm("Delete this package?")) onRemove(); }}
          className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="rounded p-1.5 text-slate-400 hover:text-slate-600"
        >
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="space-y-4 border-t border-slate-100 px-4 py-4">
          <Input
            label="Package Name"
            value={pkg.name}
            onChange={(v) => onUpdate({ name: v })}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Price (RM)"
              type="number"
              value={pkg.price}
              onChange={(v) => onUpdate({ price: Number(v) })}
            />
            <Input
              label="Price Suffix"
              value={pkg.priceSuffix}
              onChange={(v) => onUpdate({ priceSuffix: v })}
            />
          </div>
          <Input
            label="Tagline"
            value={pkg.tagline}
            onChange={(v) => onUpdate({ tagline: v })}
          />
          <Input
            label="CTA Button Text"
            value={pkg.ctaText}
            onChange={(v) => onUpdate({ ctaText: v })}
          />
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={pkg.highlight}
              onChange={(e) => onUpdate({ highlight: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            Featured package (dark card)
          </label>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">Package Items</p>
            <ListEditor
              items={pkg.items}
              onChange={(items) => onUpdate({ items })}
              placeholder="Add package item..."
            />
          </div>
        </div>
      )}
    </div>
  );
}

type Props = {
  value: SiteContent["pricing"];
  onChange: (v: SiteContent["pricing"]) => void;
};

export function PricingForm({ value, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(value.packages[0]?.id ?? null);
  const sensors = useSensors(useSensor(PointerSensor));

  const updatePkg = (id: string, patch: Partial<Package>) =>
    onChange({
      ...value,
      packages: value.packages.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });

  const removePkg = (id: string) =>
    onChange({ ...value, packages: value.packages.filter((p) => p.id !== id) });

  const addPkg = () => {
    const pkg = newPackage();
    onChange({ ...value, packages: [...value.packages, pkg] });
    setOpen(pkg.id);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = value.packages.findIndex((p) => p.id === active.id);
      const newIndex = value.packages.findIndex((p) => p.id === over.id);
      onChange({ ...value, packages: arrayMove(value.packages, oldIndex, newIndex) });
    }
  }

  return (
    <div className="space-y-5">
      <Input
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(v) => onChange({ ...value, eyebrow: v })}
      />
      <Input
        label="Title"
        value={value.title}
        onChange={(v) => onChange({ ...value, title: v })}
      />
      <Textarea
        label="Description"
        value={value.description}
        onChange={(v) => onChange({ ...value, description: v })}
      />
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Packages ({value.packages.length})
        </p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={value.packages.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {value.packages.map((pkg) => (
                <SortablePackage
                  key={pkg.id}
                  pkg={pkg}
                  open={open === pkg.id}
                  onToggle={() => setOpen(open === pkg.id ? null : pkg.id)}
                  onRemove={() => removePkg(pkg.id)}
                  onUpdate={(patch) => updatePkg(pkg.id, patch)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <button
          type="button"
          onClick={addPkg}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 hover:border-emerald-400 hover:text-emerald-600"
        >
          <Plus className="h-4 w-4" />
          Add New Package
        </button>
      </div>
    </div>
  );
}
