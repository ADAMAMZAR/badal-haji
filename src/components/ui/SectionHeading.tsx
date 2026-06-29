import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  eyebrowClassName = "text-[#9a7d3f]",
  titleClassName = "text-ink",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  eyebrowClassName?: string;
  titleClassName?: string;
}) {
  return (
    <>
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${eyebrowClassName}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl ${titleClassName}`}
      >
        {title}
      </h2>
    </>
  );
}
