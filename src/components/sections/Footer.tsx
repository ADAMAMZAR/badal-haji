import { MessageCircleQuestionMark, MapPin, Mail } from "lucide-react";
import { ArabicEmblem } from "@/components/ui/ArabicEmblem";
import type { SiteContent } from "@/types/content";

const navLinks = [
  { label: "Tentang", href: "#tentang" },
  { label: "Cara Kerja", href: "#proses" },
  { label: "Pakej", href: "#pakej" },
  { label: "Testimoni", href: "#testimoni" },
];

export function Footer({ content }: { content: SiteContent }) {
  const { footer, contact } = content;
  const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.generalMessage)}`;

  return (
    <footer className="relative overflow-hidden bg-ink-darker py-20 text-cream">
      <div
        className="pattern-girih-lines pointer-events-none absolute inset-0 text-gold/[0.045]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 border-b border-cream/10 pb-14 sm:grid-cols-3 sm:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <ArabicEmblem className="h-[42px] w-[42px]" letterClassName="text-2xl" />
              <div>
                <div className="font-display text-xl font-bold text-cream">Amanah Haji</div>
                <div className="text-[9.5px] uppercase tracking-[0.25em] text-[#9a8a68]">
                  {footer.legalName.replace("Amanah Haji ", "")}
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              {footer.description}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Pautan
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-cream/70 hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Hubungi
            </p>
            <div className="flex flex-col gap-3.5">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1f5a3e] px-4 py-2.5 text-[13.5px] font-semibold text-cream transition-transform hover:-translate-y-0.5"
              >
                <MessageCircleQuestionMark className="h-4 w-4" />
                WhatsApp Kami
              </a>
              {footer.address && (
                <p className="flex items-start gap-2 text-sm leading-relaxed text-cream/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {footer.address}
                </p>
              )}
              {footer.email && (
                <a
                  href={`mailto:${footer.email}`}
                  className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  {footer.email}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-7">
          <p className="text-[12.5px] text-cream/45">
            © {new Date().getFullYear()} {footer.legalName}. Hak cipta terpelihara.
          </p>
          <p className="font-arabic text-[15px] text-gold">وَللهِ عَلَى النَّاسِ حِجُّ الْبَيْت</p>
        </div>
      </div>
    </footer>
  );
}
