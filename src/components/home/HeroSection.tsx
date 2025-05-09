
import { AnimatedLogo } from "./hero/AnimatedLogo";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroDescription } from "./hero/HeroDescription";
import { HeroButtons } from "./hero/HeroButtons";
import { HeroStats } from "./hero/HeroStats";
import { HeroDecorations } from "./hero/HeroDecorations";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedLogo />
          <HeroTitle />
          <HeroDescription />
          <HeroButtons />
          <HeroStats />
        </div>
      </div>
      
      <HeroDecorations />
    </section>
  );
}
