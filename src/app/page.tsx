import { HeroSection } from "../components/sections/hero-section";
import { FeatureSection } from "../components/sections/feature-section";
import { PopularCirclesSection } from "../components/sections/popular-circles-section";
import { FAQSection } from "../components/sections/faq-section";
import { CTASection } from "../components/sections/cta-section";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureSection />
      <PopularCirclesSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
