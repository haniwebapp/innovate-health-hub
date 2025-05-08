import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Award } from "lucide-react";
export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.classList.add('animate-fade-in');
    }
  }, []);
  return <section className="pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Logo */}
          <div className="w-28 h-28 mx-auto mb-8 bg-white rounded-full shadow-xl flex items-center justify-center animate-float">
            <div className="w-20 h-20 bg-gradient-to-r from-moh-green to-moh-darkGreen rounded-full flex items-center justify-center">
              <img alt="MOH Innovation Logo" className="w-18 h-18 object-contain" src="/lovable-uploads/bba68330-974d-4c62-a240-517e2bbdf8f9.png" />
            </div>
          </div>
          
          <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 opacity-0 tracking-tight">
            <span className="text-gradient">Empowering Health Innovation</span>
            <br />
            <span className="text-moh-darkGreen">for a Better Tomorrow</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in animation-delay-200 leading-relaxed">A one-stop-shop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in animation-delay-300">
            <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen text-white shadow-md">
              Explore Innovations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-moh-gold text-moh-darkGold hover:bg-moh-lightGold hover:text-moh-darkGold/90 shadow-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              Join a Challenge
            </Button>
            <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen shadow-sm">
              <Award className="mr-2 h-4 w-4" />
              Access Investment
            </Button>
          </div>
          
          {/* New Feature: Quick Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 opacity-0 animate-fade-in animation-delay-500">
            <div className="text-center">
              <div className="font-bold text-2xl text-moh-green">500+</div>
              <div className="text-sm text-gray-600">Innovators</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-moh-darkGold">250M+</div>
              <div className="text-sm text-gray-600">Investments (SAR)</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-moh-green">40+</div>
              <div className="text-sm text-gray-600">Active Challenges</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
      <div className="hidden md:block absolute -bottom-16 -right-16 w-64 h-64 bg-moh-lightGreen rounded-full opacity-30 blur-xl"></div>
      <div className="hidden md:block absolute -top-16 -left-16 w-48 h-48 bg-moh-lightGold rounded-full opacity-30 blur-xl"></div>
      <div className="hidden lg:block absolute top-1/4 right-16 w-24 h-24 bg-moh-gold rounded-full opacity-20 blur-md"></div>
      <div className="hidden lg:block absolute bottom-1/4 left-16 w-24 h-24 bg-moh-green rounded-full opacity-20 blur-md"></div>
    </section>;
}