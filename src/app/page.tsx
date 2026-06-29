import { getContent } from "@/lib/content";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { Footer } from "@/components/sections/Footer";

export const revalidate = 60;

export default async function Home() {
  const { content } = await getContent();

  return (
    <div className="min-h-screen bg-cream font-sans">
      <Nav content={content} />
      <Hero content={content} />
      <About content={content} />
      <Process content={content} />
      <Pricing content={content} />
      <TestimonialSection content={content} />
      <Footer content={content} />
    </div>
  );
}
