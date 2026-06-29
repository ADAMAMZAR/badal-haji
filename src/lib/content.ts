import type { SiteContent } from "@/types/content";

export const DEFAULT_CONTENT: SiteContent = {
  contact: {
    whatsappNumber: "60194585814",
    generalMessage:
      "Assalamualaikum, saya ingin bertanya mengenai perkhidmatan Badal Haji.",
    packageMessage:
      "Assalamualaikum, saya ingin menempah Pakej Lengkap Badal Haji (RM2,500). Mohon maklumkan langkah seterusnya.",
  },
  images: {
    hero: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1800&auto=format&fit=crop",
    quran:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1600&auto=format&fit=crop",
    madinah:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1800&auto=format&fit=crop",
  },
  hero: {
    eyebrow: "Khidmat Badal Haji Bertauliah",
    titleLine1: "Menyempurnakan rukun haji,",
    titleLine2: "bagi pihak insan tersayang.",
    tagline: "Telus & Bertauliah",
    description:
      "Untuk arwah yang telah pergi, atau mereka yang uzur dan tidak berdaya menunaikannya sendiri — kami laksanakan setiap rukun dengan niat khusus, penuh amanah dan ketelusan.",
    primaryCtaText: "Lihat Pakej & Harga",
    secondaryCtaText: "Hubungi Kami",
    stats: [
      { id: "stat-1", value: "Sah", label: "Mengikut syarak" },
      { id: "stat-2", value: "Telus", label: "Video & sijil rasmi" },
      { id: "stat-3", value: "Taiping", label: "Perak, Malaysia" },
    ],
  },
  about: {
    eyebrow: "Tentang Kami",
    title: "Amanah Haji Sdn Bhd — amanah yang dijaga rapi.",
    description:
      "Berpangkalan di Taiping, Perak, Amanah Haji Sdn Bhd menyediakan khidmat Badal Haji yang sah mengikut syarak. Setiap ibadah dilaksanakan oleh wakil berpengalaman yang telah menunaikan haji untuk diri sendiri terlebih dahulu — syarat penting bagi seorang yang melakukan badal. Kami memahami betapa berharganya niat keluarga untuk menyempurnakan rukun Islam kelima bagi insan tersayang. Justeru, setiap proses kami iringi dengan bukti, ketelusan dan doa.",
    badgeValue: "100%",
    badgeLabel: "Amanah & Telus",
    values: [
      {
        id: "value-1",
        icon: "CircleCheck",
        title: "Wakil Berpengalaman",
        desc: "Telah menunaikan haji untuk diri sendiri.",
      },
      {
        id: "value-2",
        icon: "CircleCheck",
        title: "Sijil Rasmi",
        desc: "Bukti pelaksanaan yang sah.",
      },
      {
        id: "value-3",
        icon: "CircleCheck",
        title: "Rakaman Video",
        desc: "Saksikan setiap rukun dilaksanakan.",
      },
      {
        id: "value-4",
        icon: "CircleCheck",
        title: "Air Zam-zam",
        desc: "Dihantar terus kepada keluarga.",
      },
    ],
  },
  process: {
    eyebrow: "Cara Kerja",
    title: "Tiga langkah mudah, sepenuhnya telus.",
    steps: [
      {
        id: "step-1",
        title: "Tempahan & Pengesahan Nama",
        description:
          "Keluarga menghubungi kami dan mengesahkan nama penuh si penerima Badal Haji.",
      },
      {
        id: "step-2",
        title: "Pelaksanaan Mengikut Rukun",
        description:
          "Wakil kami melaksanakan setiap rukun haji dengan niat khusus atas nama tersebut, mengikut tertib yang sah.",
      },
      {
        id: "step-3",
        title: "Bukti & Sijil Dihantar",
        description:
          "Rakaman video, sijil rasmi dan air Zam-zam dihantar kepada keluarga selepas pelaksanaan selesai.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pakej & Harga",
    title: "Pilih pakej yang sesuai",
    description:
      "Harga termasuk pelaksanaan rukun, sijil rasmi, rakaman video & air Zam-zam.",
    packages: [
      {
        id: "pkg-1",
        name: "Standard",
        price: 2500,
        priceSuffix: "/ orang",
        tagline: "Pelaksanaan Badal Haji yang lengkap & sah.",
        items: [
          "Pelaksanaan semua rukun haji",
          "Niat khusus atas nama penerima",
          "Sijil pelaksanaan rasmi",
          "Air Zam-zam (1 botol)",
          "Laporan ringkas selepas selesai",
        ],
        ctaText: "Tempah Pakej Ini",
        highlight: false,
      },
      {
        id: "pkg-2",
        name: "Premium",
        price: 3000,
        priceSuffix: "/ orang",
        tagline: "Pengalaman penuh dengan bukti terperinci.",
        items: [
          "Semua yang ada dalam Standard",
          "Rakaman video penuh setiap rukun",
          "Sijil rasmi berbingkai",
          "Air Zam-zam (set istimewa)",
          "Doa khusus & laporan terperinci",
          "Keutamaan jadual pelaksanaan",
        ],
        ctaText: "Tempah Pakej Ini",
        highlight: true,
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimoni Keluarga",
    title: "Apa Kata Keluarga Yang Telah Kami Bantu",
    items: [
      {
        id: "test-1",
        quote:
          "Kami bersyukur dapat melaksanakan amanah Badal Haji untuk arwah ibu kami. Seluruh proses direkodkan dan sijil rasmi diterima sebagai bukti pelaksanaan — ia memberi ketenangan kepada seluruh keluarga.",
        name: "Keluarga Pelanggan",
        role: "Penerima Perkhidmatan Badal Haji",
      },
      {
        id: "test-2",
        quote:
          "Proses tempahan mudah dan pasukan sentiasa memberi maklum balas melalui WhatsApp pada setiap peringkat. Kami sentiasa tahu status pelaksanaan amanah ini.",
        name: "Keluarga Pelanggan",
        role: "Penerima Perkhidmatan Badal Haji",
      },
      {
        id: "test-3",
        quote:
          "Sijil dan rakaman video diterima dengan kemas selepas pelaksanaan, lengkap dengan air Zam-zam dan sejadah. Segalanya seperti yang dijanjikan.",
        name: "Keluarga Pelanggan",
        role: "Penerima Perkhidmatan Badal Haji",
      },
    ],
    disclaimer:
      "* Testimoni di atas adalah contoh paparan. Akan dikemas kini dengan testimoni sebenar daripada keluarga yang telah menerima perkhidmatan.",
  },
  footer: {
    legalName: "Amanah Haji Sdn Bhd",
    description:
      "Khidmat Badal Haji yang sah dan amanah, dilaksanakan dengan niat khusus bagi pihak insan tersayang. Berpangkalan di Taiping, Perak.",
    email: "salam@amanahhaji.my",
    address: "Taiping, Perak, Darul Ridzuan, Malaysia",
  },
};

const KV_KEY = "site:content";
const KV_PREV_KEY = "site:content:prev";
const KV_TIMEOUT_MS = 2000;

export type ContentResult =
  | { ok: true; content: SiteContent }
  | { ok: false; content: SiteContent; error: string };

/**
 * Backfills content saved under an older schema (e.g. missing hero.stats,
 * about.values, footer.legalName, or the now-removed trust/cta sections)
 * so previously stored KV data doesn't crash the new design.
 */
function normalizeContent(raw: unknown): SiteContent {
  const r = (raw ?? {}) as Partial<Record<keyof SiteContent, Record<string, unknown>>>;
  const rHero = r.hero ?? {};
  const rAbout = r.about ?? {};
  const rProcess = r.process ?? {};
  const rPricing = r.pricing ?? {};
  const rTestimonials = r.testimonials ?? {};

  return {
    contact: { ...DEFAULT_CONTENT.contact, ...r.contact },
    images: { ...DEFAULT_CONTENT.images, ...r.images },
    hero: {
      ...DEFAULT_CONTENT.hero,
      ...rHero,
      stats: Array.isArray(rHero.stats) && rHero.stats.length
        ? (rHero.stats as SiteContent["hero"]["stats"])
        : DEFAULT_CONTENT.hero.stats,
    },
    about: {
      ...DEFAULT_CONTENT.about,
      ...rAbout,
      values: Array.isArray(rAbout.values) && rAbout.values.length
        ? (rAbout.values as SiteContent["about"]["values"])
        : DEFAULT_CONTENT.about.values,
    },
    process: {
      ...DEFAULT_CONTENT.process,
      ...rProcess,
      steps: Array.isArray(rProcess.steps) && rProcess.steps.length
        ? (rProcess.steps as SiteContent["process"]["steps"])
        : DEFAULT_CONTENT.process.steps,
    },
    pricing: {
      ...DEFAULT_CONTENT.pricing,
      ...rPricing,
      packages: Array.isArray(rPricing.packages) && rPricing.packages.length
        ? (rPricing.packages as Array<Record<string, unknown>>).map((p) => ({
            tagline: "",
            ...p,
          })) as SiteContent["pricing"]["packages"]
        : DEFAULT_CONTENT.pricing.packages,
    },
    testimonials: {
      ...DEFAULT_CONTENT.testimonials,
      ...rTestimonials,
      items: Array.isArray(rTestimonials.items) && rTestimonials.items.length
        ? (rTestimonials.items as SiteContent["testimonials"]["items"])
        : DEFAULT_CONTENT.testimonials.items,
    },
    footer: { ...DEFAULT_CONTENT.footer, ...r.footer },
  };
}

async function kvWithTimeout<T>(promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("KV timeout")), KV_TIMEOUT_MS)
    ),
  ]);
}

export async function getContent(): Promise<ContentResult> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return { ok: false, content: DEFAULT_CONTENT, error: "KV storage is not configured" };
  }
  try {
    const { kv } = await import("@vercel/kv");
    const content = await kvWithTimeout(kv.get<SiteContent>(KV_KEY));
    return { ok: true, content: content ? normalizeContent(content) : DEFAULT_CONTENT };
  } catch (e) {
    return {
      ok: false,
      content: DEFAULT_CONTENT,
      error: e instanceof Error ? e.message : "Failed to load content from KV",
    };
  }
}

export async function getPrevContent(): Promise<SiteContent | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  try {
    const { kv } = await import("@vercel/kv");
    const prev = await kvWithTimeout(kv.get<SiteContent>(KV_PREV_KEY));
    return prev ? normalizeContent(prev) : null;
  } catch {
    return null;
  }
}

export async function setContent(content: SiteContent): Promise<void> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    throw new Error("KV storage is not configured");
  }
  const { kv } = await import("@vercel/kv");
  const existing = await kvWithTimeout(kv.get<SiteContent>(KV_KEY));
  if (existing) {
    await kv.set(KV_PREV_KEY, existing);
  }
  await kv.set(KV_KEY, content);
}
