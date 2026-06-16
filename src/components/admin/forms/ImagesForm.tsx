"use client";

import { useRef, useState } from "react";
import type { SiteContent } from "@/types/content";
import { Field } from "../FormControls";

type Props = {
  value: SiteContent["images"];
  onChange: (v: SiteContent["images"]) => void;
};

function ImageUploader({
  label,
  currentUrl,
  onUploaded,
}: {
  label: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (res.ok) {
      const { url } = await res.json();
      onUploaded(url);
    } else {
      alert("Muat naik gagal. Pastikan Vercel Blob telah dikonfigurasi.");
    }
    setUploading(false);
  }

  return (
    <Field label={label}>
      <div className="space-y-2">
        {currentUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentUrl}
            alt={label}
            className="h-32 w-full rounded-lg object-cover"
          />
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => onUploaded(e.target.value)}
            placeholder="URL gambar"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {uploading ? "Muat naik..." : "Muat Naik"}
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    </Field>
  );
}

export function ImagesForm({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Muat naik gambar atau tampal URL dari Unsplash / CDN.
      </p>
      <ImageUploader
        label="Gambar Hero"
        currentUrl={value.hero}
        onUploaded={(url) => onChange({ ...value, hero: url })}
      />
      <ImageUploader
        label="Gambar Al-Quran (Bahagian Testimoni)"
        currentUrl={value.quran}
        onUploaded={(url) => onChange({ ...value, quran: url })}
      />
      <ImageUploader
        label="Gambar Madinah (Bahagian CTA)"
        currentUrl={value.madinah}
        onUploaded={(url) => onChange({ ...value, madinah: url })}
      />
    </div>
  );
}
