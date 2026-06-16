export type Package = {
  id: string;
  name: string;
  price: number;
  priceSuffix: string;
  items: string[];
  ctaText: string;
  highlight: boolean;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type TrustIndicator = {
  id: string;
  iconName: "ShieldCheck" | "Video" | "CheckCircle" | "Wallet" | "Star" | "Heart";
  title: string;
  description: string;
  highlight: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export type SiteContent = {
  contact: {
    whatsappNumber: string;
    generalMessage: string;
    packageMessage: string;
  };
  images: {
    hero: string;
    quran: string;
    madinah: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    tagline: string;
    description: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    checklist: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: ProcessStep[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    packages: Package[];
  };
  trust: {
    eyebrow: string;
    title: string;
    indicators: TrustIndicator[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: Testimonial[];
    disclaimer: string;
  };
  cta: {
    title: string;
    description: string;
    primaryText: string;
    secondaryText: string;
  };
  footer: {
    description: string;
  };
};
