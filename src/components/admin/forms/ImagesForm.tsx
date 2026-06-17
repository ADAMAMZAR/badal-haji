"use client";

import { useRef, useState } from "react";
import type { SiteContent } from "@/types/content";
import { Field } from "../FormControls";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

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
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploadError(null);
    if (file.size > MAX_FILE_SIZE) {
      setUploadError("File exceeds 5 MB limit.");
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("File type not supported. Use JPEG, PNG, WebP, GIF, or AVIF.");
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (res.ok) {
        const { url } = await res.json();
        onUploaded(url);
      } else {
        const data = await res.json().catch(() => null);
        setUploadError(data?.error ?? "Upload failed. Check that Vercel Blob is configured.");
      }
    } catch {
      setUploadError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
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
            placeholder="Image URL"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {uploadError && (
          <p className="text-xs text-red-500">{uploadError}</p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
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
        Upload an image or paste a URL from Unsplash / CDN. Max 5 MB per file.
      </p>
      <ImageUploader
        label="Hero Image"
        currentUrl={value.hero}
        onUploaded={(url) => onChange({ ...value, hero: url })}
      />
      <ImageUploader
        label="Quran Image (Testimonials section)"
        currentUrl={value.quran}
        onUploaded={(url) => onChange({ ...value, quran: url })}
      />
      <ImageUploader
        label="Madinah Image (CTA section)"
        currentUrl={value.madinah}
        onUploaded={(url) => onChange({ ...value, madinah: url })}
      />
    </div>
  );
}
