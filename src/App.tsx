import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  MessageCircle,
  ShieldCheck,
  Video,
  CheckCircle,
  ArrowRight,
  Star,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const WHATSAPP_NUMBER = "60194585814";

const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const GENERAL_MESSAGE =
  "Assalamualaikum, saya ingin bertanya mengenai perkhidmatan Badal Haji.";

const PACKAGE_MESSAGE =
  "Assalamualaikum, saya ingin menempah Pakej Lengkap Badal Haji (RM2,500). Mohon maklumkan langkah seterusnya.";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1800&auto=format&fit=crop";
const QURAN_IMAGE =
  "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1600&auto=format&fit=crop";
const MADINAH_IMAGE =
  "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1800&auto=format&fit=crop";

/* Eight-pointed star (rub el hizb) — brand mark and recurring divider motif. */
function StarMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <rect x="4" y="4" width="16" height="16" rx="1" transform="rotate(45 12 12)" />
    </svg>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4" aria-hidden="true">
      <span className="h-px w-full max-w-20 bg-emerald-900/15" />
      <StarMark className="h-4 w-4 shrink-0 rotate-[22.5deg] text-emerald-700/40" />
      <span className="h-px w-full max-w-20 bg-emerald-900/15" />
    </div>
  );
}

/* Full-bleed photo + colour overlay used behind hero/testimonial/CTA sections. */
function SectionBackgroundImage({
  src,
  overlayClassName,
}: {
  src: string;
  overlayClassName: string;
}) {
  return (
    <>
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

/* Eyebrow + title pair used to introduce each major section. */
function SectionHeading({
  eyebrow,
  title,
  eyebrowClassName = "text-emerald-700",
  titleClassName = "text-emerald-950",
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  eyebrowClassName?: string;
  titleClassName?: string;
}) {
  return (
    <>
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${eyebrowClassName}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl ${titleClassName}`}>
        {title}
      </h2>
    </>
  );
}

/* WhatsApp / anchor call-to-action button shared by the hero and final CTA. */
function CtaButton({
  href,
  external = false,
  variant = "primary",
  children,
}: {
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) {
  const variants = {
    primary: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
    secondary:
      "border border-emerald-400/30 text-emerald-50 hover:border-emerald-400/60 hover:bg-white/5",
  };

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

/* Rounded icon badge used on pricing side panels and trust cards. */
function IconBadge({
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

/* Reveal-on-scroll wrapper — one consistent fade/rise treatment. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const navLinks = [
  { label: "Utama", href: "#" },
  { label: "Proses", href: "#proses" },
  { label: "Pakej & Harga", href: "#pakej" },
  { label: "Testimoni", href: "#testimoni" },
];

const aboutChecklist = [
  "Wakil Berpengalaman",
  "Proses Mengikut Syarak",
  "Rakaman & Sijil Rasmi",
  "Harga Tetap, Tiada Tambahan",
  "Komunikasi Sepanjang Proses",
  "Susulan Selepas Selesai",
];

const processSteps = [
  {
    title: "Tempahan & Pengesahan Nama",
    description:
      "Keluarga menghubungi kami dan mengesahkan nama penuh si penerima Badal Haji.",
  },
  {
    title: "Pelaksanaan Mengikut Rukun",
    description:
      "Wakil kami melaksanakan setiap rukun haji dengan niat khusus atas nama tersebut, mengikut tertib yang sah.",
  },
  {
    title: "Bukti & Sijil Dihantar",
    description:
      "Rakaman video, sijil rasmi dan air Zam-zam dihantar kepada keluarga selepas pelaksanaan selesai.",
  },
];

const packageItems = [
  "Sijil Perlaksanaan",
  "Sejadah",
  "Minyak Wangi / Attar",
  "Air Zam Zam",
  "Kurma",
];

const trustIndicators = [
  {
    icon: ShieldCheck,
    title: "Pelaksana Bertauliah",
    description:
      "Setiap pelaksanaan Badal Haji dijalankan oleh wakil yang sah dan berpengalaman, mengikut syarat dan rukun yang ditetapkan oleh syarak.",
    highlight: false,
  },
  {
    icon: Video,
    title: "Bukti Rakaman Penuh",
    description:
      "Setiap rukun — daripada niat sehingga tahallul — dirakam secara video dan dihantar terus kepada keluarga sebagai bukti pelaksanaan.",
    highlight: false,
  },
  {
    icon: Wallet,
    title: "Harga Tetap & Telus",
    description:
      "Yuran RM 2,500 ditetapkan sejak awal dan bersifat muktamad — tanpa caj tambahan atau kos tersembunyi sepanjang proses pelaksanaan.",
    highlight: false,
  },
  {
    icon: CheckCircle,
    title: "Sijil Pelaksanaan",
    description:
      "Selepas selesai, satu sijil rasmi pelaksanaan Badal Haji dikeluarkan atas nama si penerima sebagai rekod dan ketenangan hati keluarga.",
    highlight: true,
  },
];

const trustCardVariants = {
  default: {
    card: "border border-emerald-900/10 bg-slate-50 text-slate-700",
    title: "text-emerald-950",
    description: "text-slate-600",
  },
  highlight: {
    card: "bg-emerald-950 text-emerald-50",
    title: "text-white",
    description: "text-emerald-100/75",
  },
};

const testimonials = [
  {
    quote:
      "Kami bersyukur dapat melaksanakan amanah Badal Haji untuk arwah ibu kami. Seluruh proses direkodkan dan sijil rasmi diterima sebagai bukti pelaksanaan — ia memberi ketenangan kepada seluruh keluarga.",
    name: "Keluarga Pelanggan",
    role: "Penerima Perkhidmatan Badal Haji",
  },
  {
    quote:
      "Proses tempahan mudah dan pasukan sentiasa memberi maklum balas melalui WhatsApp pada setiap peringkat. Kami sentiasa tahu status pelaksanaan amanah ini.",
    name: "Keluarga Pelanggan",
    role: "Penerima Perkhidmatan Badal Haji",
  },
  {
    quote:
      "Sijil dan rakaman video diterima dengan kemas selepas pelaksanaan, lengkap dengan air Zam-zam dan sejadah. Segalanya seperti yang dijanjikan.",
    name: "Keluarga Pelanggan",
    role: "Penerima Perkhidmatan Badal Haji",
  },
];

function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialCount = testimonials.length;
  const showPrevTestimonial = () =>
    setActiveTestimonial((i) => (i - 1 + testimonialCount) % testimonialCount);
  const showNextTestimonial = () =>
    setActiveTestimonial((i) => (i + 1) % testimonialCount);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-slate-50/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5">
            <StarMark className="h-6 w-6 text-emerald-700" />
            <span className="font-display text-lg font-semibold tracking-tight text-emerald-950">
              AmanahHaji
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-emerald-900/70 transition-colors hover:text-emerald-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={waLink(GENERAL_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:border-emerald-700/40 hover:bg-emerald-50"
          >
            <MessageCircle className="h-4 w-4" />
            Hubungi Kami
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden text-emerald-50">
        <SectionBackgroundImage
          src={HERO_IMAGE}
          overlayClassName="bg-gradient-to-b from-emerald-950/85 via-emerald-950/80 to-emerald-950"
        />
        <div
          className="pattern-girih-lines pointer-events-none absolute inset-0 -z-10 text-emerald-300/[0.06]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
          <Reveal>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Perkhidmatan Badal Haji
            </p>
            <h1 className="font-display text-5xl font-medium uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              <span className="block text-white">Pelaksanaan</span>
              <span className="block text-emerald-400">Badal Haji</span>
            </h1>
            <p className="mt-5 font-display text-xl italic text-emerald-100/90 sm:text-2xl">
              Telus &amp; Bertauliah
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-emerald-100/80 sm:text-lg">
              Kami melaksanakan ibadah haji bagi pihak ahli keluarga yang
              telah kembali ke rahmatullah atau tidak berdaya secara fizikal —
              dilaksanakan mengikut rukun yang sah, direkodkan sepenuhnya, dan
              disertakan sijil pengesahan rasmi untuk ketenangan hati anda.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <CtaButton href={waLink(GENERAL_MESSAGE)} external variant="primary">
                <MessageCircle className="h-5 w-5" />
                Hubungi Kami di WhatsApp
              </CtaButton>
              <CtaButton href="#pakej" variant="secondary">
                Lihat Pakej &amp; Harga
                <ArrowRight className="h-4 w-4" />
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="grid grid-cols-2 grid-rows-2 gap-4">
            <img
              src={HERO_IMAGE}
              alt=""
              aria-hidden="true"
              className="row-span-2 h-full w-full rounded-2xl object-cover"
            />
            <img
              src={MADINAH_IMAGE}
              alt=""
              aria-hidden="true"
              className="h-full w-full rounded-2xl object-cover"
            />
            <img
              src={QURAN_IMAGE}
              alt=""
              aria-hidden="true"
              className="h-full w-full rounded-2xl object-cover"
            />
          </Reveal>

          <Reveal delay={150}>
            <SectionHeading eyebrow="Tentang Kami" title="Tentang AmanahHaji" />
            <p className="mt-4 leading-relaxed text-slate-600">
              AmanahHaji ditubuhkan untuk membantu keluarga melaksanakan
              tanggungjawab Badal Haji bagi ahli keluarga yang telah kembali
              ke rahmatullah atau tidak berdaya secara fizikal untuk
              menyempurnakan ibadah haji sendiri. Setiap pelaksanaan
              diuruskan dengan penuh amanah, direkodkan, dan disahkan melalui
              sijil rasmi.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {aboutChecklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section id="proses" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading
              eyebrow="Proses Pelaksanaan"
              title="Bagaimana Kami Melaksanakan Amanah Anda"
            />
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 120}>
                <div className="h-full rounded-2xl border border-emerald-900/10 bg-slate-50 p-7">
                  <span className="font-display text-4xl font-medium text-emerald-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-medium text-emerald-950">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white pb-4">
        <SectionDivider />
      </div>

      {/* Pricing */}
      <section id="pakej" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading eyebrow="Pakej & Harga" title="Satu Pakej, Tanpa Caj Tersembunyi" />
            <p className="mt-4 text-balance leading-relaxed text-slate-600">
              Harga yang ditetapkan sudah merangkumi keseluruhan perkhidmatan
              dari permulaan niat sehingga sijil pelaksanaan dihantar kepada
              keluarga.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:items-center lg:gap-6">
            <Reveal delay={100} className="lg:order-1">
              <div className="h-full rounded-2xl border border-emerald-900/10 bg-white p-6">
                <IconBadge icon={Wallet} />
                <h3 className="mt-4 font-display text-lg font-medium text-emerald-950">
                  Harga Tetap
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  RM 2,500 sahaja, tanpa caj tambahan atau kos tersembunyi.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150} className="lg:order-2">
              <div className="relative overflow-hidden rounded-3xl bg-emerald-950 p-8 text-emerald-50 shadow-2xl shadow-emerald-950/30 sm:p-10">
                <div
                  className="pattern-girih-lines pointer-events-none absolute inset-0 text-emerald-300/[0.05]"
                  aria-hidden="true"
                />
                <div className="relative flex items-baseline justify-between gap-4 border-b border-white/10 pb-6">
                  <h3 className="font-display text-2xl font-medium">
                    Pakej Lengkap
                  </h3>
                  <p className="text-right">
                    <span className="font-display text-4xl font-semibold text-emerald-400">
                      RM 2,500
                    </span>
                    <span className="ml-1 text-sm text-emerald-100/60">
                      / orang
                    </span>
                  </p>
                </div>

                <ul className="relative mt-6 space-y-3.5">
                  {packageItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span className="text-sm leading-relaxed text-emerald-50/90 sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(PACKAGE_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-base font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
                >
                  <MessageCircle className="h-5 w-5" />
                  Tempah Pakej Ini di WhatsApp
                </a>
                <p className="relative mt-4 text-center text-xs leading-relaxed text-emerald-100/60">
                  Sebarang pertanyaan lanjut mengenai pelaksanaan boleh
                  diajukan terus kepada kami melalui WhatsApp.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} className="lg:order-3">
              <div className="h-full rounded-2xl border border-emerald-900/10 bg-white p-6">
                <IconBadge icon={CheckCircle} />
                <h3 className="mt-4 font-display text-lg font-medium text-emerald-950">
                  Penghantaran
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Air Zam-Zam, sejadah dan sijil dihantar terus ke alamat
                  anda selepas pelaksanaan selesai.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Us / Trust indicators */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading
              eyebrow="Ketelusan Adalah Asas"
              title="Kenapa Keluarga Mempercayakan Amanah Ini Kepada Kami"
            />
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {trustIndicators.map(({ icon: Icon, title, description, highlight }, index) => {
              const variant = highlight ? trustCardVariants.highlight : trustCardVariants.default;
              return (
                <Reveal key={title} delay={index * 120}>
                  <div className={`h-full rounded-2xl p-7 ${variant.card}`}>
                    <IconBadge icon={Icon} highlight={highlight} />
                    <h3 className={`mt-5 font-display text-xl font-medium ${variant.title}`}>
                      {title}
                    </h3>
                    <p className={`mt-2.5 text-sm leading-relaxed ${variant.description}`}>
                      {description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimoni" className="relative isolate overflow-hidden py-20 sm:py-28">
        <SectionBackgroundImage src={QURAN_IMAGE} overlayClassName="bg-emerald-950/80" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Testimoni Keluarga"
              title="Apa Kata Keluarga Yang Telah Kami Bantu"
              eyebrowClassName="text-emerald-300"
              titleClassName="text-white"
            />
          </Reveal>

          <Reveal delay={150} className="mt-12 rounded-3xl bg-white p-8 text-left shadow-2xl shadow-emerald-950/40 sm:p-10">
            <div className="flex gap-1 text-emerald-600" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-5 min-h-32 text-balance font-display text-lg leading-relaxed text-emerald-950 sm:text-xl sm:min-h-28">
              "{testimonials[activeTestimonial].quote}"
            </p>
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-emerald-900/10 pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-display text-lg font-semibold text-emerald-700">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-emerald-950">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={showPrevTestimonial}
                  aria-label="Testimoni sebelumnya"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-900/10 text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={showNextTestimonial}
                  aria-label="Testimoni seterusnya"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-900/10 text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
          <p className="mt-4 text-center text-xs text-emerald-100/60">
            * Testimoni di atas adalah contoh paparan. Akan dikemas kini
            dengan testimoni sebenar daripada keluarga yang telah menerima
            perkhidmatan.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden py-20 sm:py-24">
        <SectionBackgroundImage src={MADINAH_IMAGE} overlayClassName="bg-emerald-950/85" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="text-balance font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Bersedia Melaksanakan Amanah Ini?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance leading-relaxed text-emerald-100/80">
              Hubungi kami untuk mendapatkan penjelasan lanjut mengenai
              proses, harga dan tempahan Badal Haji bagi pihak ahli keluarga
              anda.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CtaButton href={waLink(GENERAL_MESSAGE)} external variant="primary">
                <MessageCircle className="h-5 w-5" />
                Hubungi Kami di WhatsApp
              </CtaButton>
              <CtaButton href={waLink(PACKAGE_MESSAGE)} external variant="secondary">
                Tempah Pakej Sekarang
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 text-slate-400">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <StarMark className="h-5 w-5 text-emerald-600" />
              <span className="font-display text-base font-semibold text-slate-100">
                AmanahHaji
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Beroperasi dengan penuh ketelusan dan tanggungjawab dalam
              melaksanakan amanah ibadah keluarga anda.
            </p>
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
              Sebarang pertanyaan mengenai perkhidmatan Badal Haji boleh
              diajukan terus melalui WhatsApp.
            </p>
            <a
              href={waLink(GENERAL_MESSAGE)}
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
    </div>
  );
}

export default App;
