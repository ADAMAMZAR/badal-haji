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
import type { SiteContent, TrustIndicator } from "@/types/content";
import { Input, Textarea } from "../FormControls";

const ICON_OPTIONS: TrustIndicator["iconName"][] = [
  "ShieldCheck",
  "Video",
  "CheckCircle",
  "Wallet",
  "Star",
  "Heart",
];

function newIndicator(): TrustIndicator {
  return {
    id: `trust-${Date.now()}`,
    iconName: "ShieldCheck",
    title: "",
    description: "",
    highlight: false,
  };
}

function SortableCard({
  item,
  open,
  onToggle,
  onRemove,
  onUpdate,
}: {
  item: TrustIndicator;
  open: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onUpdate: (patch: Partial<TrustIndicator>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
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
          <p className="truncate text-sm font-medium text-slate-800">{item.title || "New card"}</p>
          <p className="text-xs text-slate-400">
            {item.iconName}
            {item.highlight && (
              <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700">
                Highlighted
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => { if (confirm("Delete this card?")) onRemove(); }}
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
        <div className="space-y-3 border-t border-slate-100 px-4 py-4">
          <Input
            label="Card Title"
            value={item.title}
            onChange={(v) => onUpdate({ title: v })}
          />
          <Textarea
            label="Description"
            value={item.description}
            onChange={(v) => onUpdate({ description: v })}
            rows={2}
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Icon</label>
            <select
              value={item.iconName}
              onChange={(e) => onUpdate({ iconName: e.target.value as TrustIndicator["iconName"] })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
            >
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={item.highlight}
              onChange={(e) => onUpdate({ highlight: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600"
            />
            Highlighted card (dark background)
          </label>
        </div>
      )}
    </div>
  );
}

type Props = {
  value: SiteContent["trust"];
  onChange: (v: SiteContent["trust"]) => void;
};

export function TrustForm({ value, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const update = (id: string, patch: Partial<TrustIndicator>) =>
    onChange({
      ...value,
      indicators: value.indicators.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });

  const remove = (id: string) =>
    onChange({ ...value, indicators: value.indicators.filter((t) => t.id !== id) });

  const add = () => {
    const item = newIndicator();
    onChange({ ...value, indicators: [...value.indicators, item] });
    setOpen(item.id);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = value.indicators.findIndex((t) => t.id === active.id);
      const newIndex = value.indicators.findIndex((t) => t.id === over.id);
      onChange({ ...value, indicators: arrayMove(value.indicators, oldIndex, newIndex) });
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
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Trust Cards ({value.indicators.length})
        </p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={value.indicators.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {value.indicators.map((item) => (
                <SortableCard
                  key={item.id}
                  item={item}
                  open={open === item.id}
                  onToggle={() => setOpen(open === item.id ? null : item.id)}
                  onRemove={() => remove(item.id)}
                  onUpdate={(patch) => update(item.id, patch)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <button
          type="button"
          onClick={add}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 hover:border-emerald-400 hover:text-emerald-600"
        >
          <Plus className="h-4 w-4" />
          Add Card
        </button>
      </div>
    </div>
  );
}
