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
    eyebrow: "Perkhidmatan Badal Haji",
    titleLine1: "Pelaksanaan",
    titleLine2: "Badal Haji",
    tagline: "Telus & Bertauliah",
    description:
      "Kami melaksanakan ibadah haji bagi pihak ahli keluarga yang telah kembali ke rahmatullah atau tidak berdaya secara fizikal — dilaksanakan mengikut rukun yang sah, direkodkan sepenuhnya, dan disertakan sijil pengesahan rasmi untuk ketenangan hati anda.",
    primaryCtaText: "Hubungi Kami di WhatsApp",
    secondaryCtaText: "Lihat Pakej & Harga",
  },
  about: {
    eyebrow: "Tentang Kami",
    title: "Tentang AmanahHaji",
    description:
      "AmanahHaji ditubuhkan untuk membantu keluarga melaksanakan tanggungjawab Badal Haji bagi ahli keluarga yang telah kembali ke rahmatullah atau tidak berdaya secara fizikal untuk menyempurnakan ibadah haji sendiri. Setiap pelaksanaan diuruskan dengan penuh amanah, direkodkan, dan disahkan melalui sijil rasmi.",
    checklist: [
      "Wakil Berpengalaman",
      "Proses Mengikut Syarak",
      "Rakaman & Sijil Rasmi",
      "Harga Tetap, Tiada Tambahan",
      "Komunikasi Sepanjang Proses",
      "Susulan Selepas Selesai",
    ],
  },
  process: {
    eyebrow: "Proses Pelaksanaan",
    title: "Bagaimana Kami Melaksanakan Amanah Anda",
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
    title: "Pakej Kami",
    description:
      "Harga yang ditetapkan sudah merangkumi keseluruhan perkhidmatan dari permulaan niat sehingga sijil pelaksanaan dihantar kepada keluarga.",
    packages: [
      {
        id: "pkg-1",
        name: "Pakej Lengkap",
        price: 2500,
        priceSuffix: "/ orang",
        items: [
          "Sijil Perlaksanaan",
          "Sejadah",
          "Minyak Wangi / Attar",
          "Air Zam Zam",
          "Kurma",
        ],
        ctaText: "Tempah Pakej Ini di WhatsApp",
        highlight: true,
      },
    ],
  },
  trust: {
    eyebrow: "Ketelusan Adalah Asas",
    title: "Kenapa Keluarga Mempercayakan Amanah Ini Kepada Kami",
    indicators: [
      {
        id: "trust-1",
        iconName: "ShieldCheck",
        title: "Pelaksana Bertauliah",
        description:
          "Setiap pelaksanaan Badal Haji dijalankan oleh wakil yang sah dan berpengalaman, mengikut syarat dan rukun yang ditetapkan oleh syarak.",
        highlight: false,
      },
      {
        id: "trust-2",
        iconName: "Video",
        title: "Bukti Rakaman Penuh",
        description:
          "Setiap rukun — daripada niat sehingga tahallul — dirakam secara video dan dihantar terus kepada keluarga sebagai bukti pelaksanaan.",
        highlight: false,
      },
      {
        id: "trust-3",
        iconName: "Wallet",
        title: "Harga Tetap & Telus",
        description:
          "Yuran ditetapkan sejak awal dan bersifat muktamad — tanpa caj tambahan atau kos tersembunyi sepanjang proses pelaksanaan.",
        highlight: false,
      },
      {
        id: "trust-4",
        iconName: "CheckCircle",
        title: "Sijil Pelaksanaan",
        description:
          "Selepas selesai, satu sijil rasmi pelaksanaan Badal Haji dikeluarkan atas nama si penerima sebagai rekod dan ketenangan hati keluarga.",
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
  cta: {
    title: "Bersedia Melaksanakan Amanah Ini?",
    description:
      "Hubungi kami untuk mendapatkan penjelasan lanjut mengenai proses, harga dan tempahan Badal Haji bagi pihak ahli keluarga anda.",
    primaryText: "Hubungi Kami di WhatsApp",
    secondaryText: "Tempah Pakej Sekarang",
  },
  footer: {
    description:
      "Beroperasi dengan penuh ketelusan dan tanggungjawab dalam melaksanakan amanah ibadah keluarga anda.",
  },
};

const KV_KEY = "site:content";

export async function getContent(): Promise<SiteContent> {
  try {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return DEFAULT_CONTENT;
    }
    const { kv } = await import("@vercel/kv");
    const content = await kv.get<SiteContent>(KV_KEY);
    return content ?? DEFAULT_CONTENT;
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function setContent(content: SiteContent): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set(KV_KEY, content);
}
