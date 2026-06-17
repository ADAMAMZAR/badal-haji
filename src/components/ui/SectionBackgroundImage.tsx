export function SectionBackgroundImage({
  src,
  overlayClassName,
  priority = false,
}: {
  src: string;
  overlayClassName: string;
  priority?: boolean;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      <div className={`absolute inset-0 -z-10 ${overlayClassName}`} />
    </>
  );
}
