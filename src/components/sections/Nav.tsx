"use client";

import { MessageCircle } from "lucide-react";
import { StarMark } from "@/components/ui/StarMark";
import type { SiteContent } from "@/types/content";

const navLinks = [
  { label: "Utama", href: "#" },
  { label: "Proses", href: "#proses" },
  { label: "Pakej & Harga", href: "#pakej" },
  { label: "Testimoni", href: "#testimoni" },
];

export function Nav({ content }: { content: SiteContent }) {
  const waLink = `https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(content.contact.generalMessage)}`;

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-slate-50/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5">
          <StarMark className="h-6 w-6 text-emerald-700" />
          <span className="font-display text-lg font-semibold tracking-tight text-emerald-950">
            AmanahHaji
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-emerald-900/70 transition-colors hover:text-emerald-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:border-emerald-700/40 hover:bg-emerald-50"
        >
          <MessageCircle className="h-4 w-4" />
          Hubungi Kami
        </a>
      </div>
    </header>
  );
}
