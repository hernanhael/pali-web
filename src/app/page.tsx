import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CredentialsSection } from "@/components/home/CredentialsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { GoldDivider } from "@/components/ui/GoldDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GoldDivider className="mx-6 md:mx-16" />
      <AboutSection />
      <GoldDivider className="mx-6 md:mx-16" />
      <CredentialsSection />
      <GoldDivider className="mx-6 md:mx-16" />
      <TestimonialsSection />
    </>
  );
}
