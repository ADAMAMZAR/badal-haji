export function ArabicEmblem({
  className = "",
  letterClassName = "text-xl",
}: {
  className?: string;
  letterClassName?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border-[1.5px] border-gold bg-ink ${className}`}
      aria-hidden="true"
    >
      <span className={`font-arabic leading-none text-gold ${letterClassName}`}>ح</span>
    </div>
  );
}
