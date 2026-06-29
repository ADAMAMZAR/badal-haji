export type Package = {
  id: string;
  name: string;
  price: number;
  priceSuffix: string;
  tagline: string;
  items: string[];
  ctaText: string;
  highlight: boolean;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type AboutValue = {
  id: string;
  icon: string;
  title: string;
  desc: string;
};

export type HeroStat = {
  id: string;
  value: string;
  label: string;
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
    stats: HeroStat[];
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    badgeValue: string;
    badgeLabel: string;
    values: AboutValue[];
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
  testimonials: {
    eyebrow: string;
    title: string;
    items: Testimonial[];
    disclaimer: string;
  };
  footer: {
    legalName: string;
    description: string;
    email: string;
    address: string;
  };
};
