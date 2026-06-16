export function SectionBackgroundImage({
  src,
  overlayClassName,
}: {
  src: string;
  overlayClassName: string;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className={`absolute inset-0 -z-10 ${overlayClassName}`} />
    </>
  );
}
