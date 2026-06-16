import { MessageCircle } from "lucide-react";
import { StarMark } from "@/components/ui/StarMark";
import type { SiteContent } from "@/types/content";

const navLinks = [
  { label: "Utama", href: "#" },
  { label: "Proses", href: "#proses" },
  { label: "Pakej & Harga", href: "#pakej" },
  { label: "Testimoni", href: "#testimoni" },
];

export function Footer({ content }: { content: SiteContent }) {
  const { footer, contact } = content;
  const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.generalMessage)}`;

  return (
    <footer className="bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <StarMark className="h-5 w-5 text-emerald-600" />
            <span className="font-display text-base font-semibold text-slate-100">AmanahHaji</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{footer.description}</p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-slate-200">
            Pautan Pantas
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-emerald-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-slate-200">
            Hubungi Kami
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Sebarang pertanyaan mengenai perkhidmatan Badal Haji boleh diajukan terus melalui
            WhatsApp.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400"
          >
            <MessageCircle className="h-4 w-4" />
            Hubungi Kami di WhatsApp
          </a>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} AmanahHaji. Hak cipta terpelihara.
      </p>
    </footer>
  );
}
