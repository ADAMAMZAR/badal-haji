"use client";

import { useEffect, useState } from "react";
import { MessageCircleQuestionMark, Menu, X } from "lucide-react";
import { ArabicEmblem } from "@/components/ui/ArabicEmblem";
import type { SiteContent } from "@/types/content";

const navLinks = [
  { label: "Tentang", href: "#tentang", id: "tentang" },
  { label: "Cara Kerja", href: "#proses", id: "proses" },
  { label: "Pakej", href: "#pakej", id: "pakej" },
  { label: "Testimoni", href: "#testimoni", id: "testimoni" },
];

const NAV_OFFSET = 110;

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    let frame = 0;
    const update = () => {
      let current: string | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top - NAV_OFFSET <= 0) {
          current = el.id;
        }
      }
      setActiveId(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return activeId;
}

export function Nav({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(navLinks.map((l) => l.id));
  const waLink = `https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(content.contact.generalMessage)}`;

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-3.5 sm:px-10 lg:px-16 xl:px-20">
        <a href="#" className="flex items-center gap-3">
          <ArabicEmblem className="h-9 w-9" />
          <div className="leading-tight">
            <div className="font-display text-[19px] font-bold tracking-tight text-ink">
              Amanah Haji
            </div>
            <div className="text-[9.5px] uppercase tracking-[0.25em] text-[#8a7a5e]">
              Taiping · Perak
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-full px-4 py-2 text-[16px] font-semibold transition-colors ${
                activeId === link.id
                  ? "bg-ink text-gold"
                  : "text-[#42523f] hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-cream transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-[#5fd07a] shadow-[0_0_0_3px_rgba(95,208,122,0.25)]" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/5 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink/10 bg-cream md:hidden">
          <nav className="flex flex-col px-6 py-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-ink/5 py-3 text-base font-semibold last:border-0 ${
                  activeId === link.id ? "text-gold" : "text-ink/80 hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-cream"
            >
              <MessageCircleQuestionMark className="h-4 w-4" />
              Hubungi Kami di WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
