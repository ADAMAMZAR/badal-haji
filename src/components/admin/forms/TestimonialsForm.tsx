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
import type { SiteContent, Testimonial } from "@/types/content";
import { Input, Textarea } from "../FormControls";

function newTestimonial(): Testimonial {
  return { id: `test-${Date.now()}`, quote: "", name: "", role: "" };
}

function SortableTestimonial({
  item,
  open,
  onToggle,
  onRemove,
  onUpdate,
}: {
  item: Testimonial;
  open: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onUpdate: (patch: Partial<Testimonial>) => void;
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
        <p className="flex-1 truncate text-sm font-medium text-slate-800">
          {item.name || "New testimonial"}
        </p>
        <button
          type="button"
          onClick={() => { if (confirm("Delete this testimonial?")) onRemove(); }}
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
          <Textarea
            label="Quote"
            value={item.quote}
            onChange={(v) => onUpdate({ quote: v })}
            rows={3}
          />
          <Input
            label="Name"
            value={item.name}
            onChange={(v) => onUpdate({ name: v })}
          />
          <Input
            label="Role / Position"
            value={item.role}
            onChange={(v) => onUpdate({ role: v })}
          />
        </div>
      )}
    </div>
  );
}

type Props = {
  value: SiteContent["testimonials"];
  onChange: (v: SiteContent["testimonials"]) => void;
};

export function TestimonialsForm({ value, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const update = (id: string, patch: Partial<Testimonial>) =>
    onChange({
      ...value,
      items: value.items.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });

  const remove = (id: string) =>
    onChange({ ...value, items: value.items.filter((t) => t.id !== id) });

  const add = () => {
    const item = newTestimonial();
    onChange({ ...value, items: [...value.items, item] });
    setOpen(item.id);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = value.items.findIndex((t) => t.id === active.id);
      const newIndex = value.items.findIndex((t) => t.id === over.id);
      onChange({ ...value, items: arrayMove(value.items, oldIndex, newIndex) });
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
        label="Disclaimer"
        value={value.disclaimer}
        onChange={(v) => onChange({ ...value, disclaimer: v })}
        rows={2}
      />
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Testimonials ({value.items.length})
        </p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={value.items.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {value.items.map((item) => (
                <SortableTestimonial
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
          Add Testimonial
        </button>
      </div>
    </div>
  );
}
