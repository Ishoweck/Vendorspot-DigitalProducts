import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import CTASection from "@/components/home/CTASection";
import SectionWrapper from "@/components/layout/SectionWrapper";

export default function DigitalProductsPage() {
  return (
    <div className="bg-[#F8F8F8]">
      <div className="min-h-screen">
        <SectionWrapper className="pt-8">
          <HeroSection />
        </SectionWrapper>
        <SectionWrapper>
          <FeaturesSection />
        </SectionWrapper>
        <SectionWrapper>
          <CategoriesSection />
        </SectionWrapper>
        <SectionWrapper>
          <FeaturedProductsSection />
        </SectionWrapper>
        <SectionWrapper>
          <CTASection />
        </SectionWrapper>
      </div>
    </div>
  );
}
