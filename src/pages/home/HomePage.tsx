
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { InnovationGallery } from "@/components/home/InnovationGallery";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { ProcessFlowSection } from "@/components/home/ProcessFlowSection";
import { ChallengesSection } from "@/components/home/ChallengesSection";
import { RegulatorySandboxSection } from "@/components/home/RegulatorySandboxSection";
import { PlatformHighlights } from "@/components/home/PlatformHighlights";
import { AIDrivenSection } from "@/components/home/AIDrivenSection";
import { EventsSection } from "@/components/home/EventsSection";
import { InnovationJourney } from "@/components/home/InnovationJourney";
import { GuidedPathwaysSection } from "@/components/home/GuidedPathwaysSection";
import { FundingOpportunitiesSection } from "@/components/home/FundingOpportunitiesSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <InnovationGallery />
      <FeaturedSection />
      <ProcessFlowSection />
      <ChallengesSection />
      <RegulatorySandboxSection />
      <PlatformHighlights />
      <AIDrivenSection />
      <EventsSection />
      <InnovationJourney />
      <GuidedPathwaysSection />
      <FundingOpportunitiesSection />
      <Footer />
    </div>
  );
}
