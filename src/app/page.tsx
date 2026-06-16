import { getContent } from "@/lib/content";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Pricing } from "@/components/sections/Pricing";
import { TrustSection } from "@/components/sections/TrustSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Footer } from "@/components/sections/Footer";

export const revalidate = 60;

export default async function Home() {
  const content = await getContent();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700">
      <Nav content={content} />
      <Hero content={content} />
      <About content={content} />
      <Process content={content} />
      <div className="bg-white pb-4">
        <SectionDivider />
      </div>
      <Pricing content={content} />
      <TrustSection content={content} />
      <TestimonialSection content={content} />
      <CtaSection content={content} />
      <Footer content={content} />
    </div>
  );
}
