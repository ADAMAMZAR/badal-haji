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
import type { SiteContent, ProcessStep } from "@/types/content";
import { Input, Textarea } from "../FormControls";

function newStep(): ProcessStep {
  return { id: `step-${Date.now()}`, title: "", description: "" };
}

function SortableStep({
  step,
  index,
  open,
  onToggle,
  onRemove,
  onUpdate,
}: {
  step: ProcessStep;
  index: number;
  open: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onUpdate: (key: keyof ProcessStep, val: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: step.id,
  });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="rounded-xl border border-slate-200 bg-white">
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
        <span className="text-sm font-medium text-slate-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 truncate text-sm font-medium text-slate-700">
          {step.title || "New step"}
        </span>
        <button
          type="button"
          onClick={() => {
            if (confirm("Delete this step?")) onRemove();
          }}
          className="rounded p-1 text-slate-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="rounded p-1 text-slate-400 hover:text-slate-600"
        >
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="space-y-3 border-t border-slate-100 px-4 py-4">
          <Input
            label="Step Title"
            value={step.title}
            onChange={(v) => onUpdate("title", v)}
          />
          <Textarea
            label="Description"
            value={step.description}
            onChange={(v) => onUpdate("description", v)}
            rows={2}
          />
        </div>
      )}
    </div>
  );
}

type Props = {
  value: SiteContent["process"];
  onChange: (v: SiteContent["process"]) => void;
};

export function ProcessForm({ value, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const updateStep = (id: string, key: keyof ProcessStep, val: string) =>
    onChange({
      ...value,
      steps: value.steps.map((s) => (s.id === id ? { ...s, [key]: val } : s)),
    });

  const removeStep = (id: string) =>
    onChange({ ...value, steps: value.steps.filter((s) => s.id !== id) });

  const addStep = () => {
    const step = newStep();
    onChange({ ...value, steps: [...value.steps, step] });
    setOpen(step.id);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = value.steps.findIndex((s) => s.id === active.id);
      const newIndex = value.steps.findIndex((s) => s.id === over.id);
      onChange({ ...value, steps: arrayMove(value.steps, oldIndex, newIndex) });
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
        <p className="mb-2 text-sm font-medium text-slate-700">Steps ({value.steps.length})</p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={value.steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {value.steps.map((step, index) => (
                <SortableStep
                  key={step.id}
                  step={step}
                  index={index}
                  open={open === step.id}
                  onToggle={() => setOpen(open === step.id ? null : step.id)}
                  onRemove={() => removeStep(step.id)}
                  onUpdate={(key, val) => updateStep(step.id, key, val)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <button
          type="button"
          onClick={addStep}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 hover:border-emerald-400 hover:text-emerald-600"
        >
          <Plus className="h-4 w-4" />
          Add Step
        </button>
      </div>
    </div>
  );
}
