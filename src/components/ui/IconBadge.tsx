import type { LucideIcon } from "lucide-react";

export function IconBadge({
  icon: Icon,
  highlight = false,
}: {
  icon: LucideIcon;
  highlight?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl p-3 ${
        highlight ? "bg-emerald-900/60 text-emerald-300" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}
