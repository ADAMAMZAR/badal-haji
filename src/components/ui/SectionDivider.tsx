import { StarMark } from "./StarMark";

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4" aria-hidden="true">
      <span className="h-px w-full max-w-20 bg-emerald-900/15" />
      <StarMark className="h-4 w-4 shrink-0 rotate-[22.5deg] text-emerald-700/40" />
      <span className="h-px w-full max-w-20 bg-emerald-900/15" />
    </div>
  );
}
