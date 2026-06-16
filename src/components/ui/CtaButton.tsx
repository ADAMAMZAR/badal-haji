import type { ReactNode } from "react";

const variants = {
  primary: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
  secondary:
    "border border-emerald-400/30 text-emerald-50 hover:border-emerald-400/60 hover:bg-white/5",
};

export function CtaButton({
  href,
  external = false,
  variant = "primary",
  children,
}: {
  href: string;
  external?: boolean;
  variant?: keyof typeof variants;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold transition-colors ${variants[variant]}`}
    >
      {children}
    </a>
  );
}
