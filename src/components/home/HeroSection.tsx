import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    // Simple animation for the tagline
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.classList.add('animate-fade-in');
    }
  }, []);
  return <section className="pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 bg-hero-pattern relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Logo Placeholder */}
          <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full shadow-lg flex items-center justify-center animate-float">
            <div className="w-16 h-16 bg-moh-green rounded-full flex items-center justify-center">
              <img alt="MOH Innovation Logo" className="w-14 h-14 object-contain" src="/lovable-uploads/bba68330-974d-4c62-a240-517e2bbdf8f9.png" />
            </div>
          </div>
          
          <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 opacity-0">
            <span className="text-gradient">Empowering Health Innovation</span>
            <br />
            <span className="text-moh-darkGreen">for a Better Tomorrow</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in animation-delay-200">
            A one-stop platform connecting health innovators, investors, and regulators to 
            transform healthcare delivery across Saudi Arabia.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in animation-delay-300">
            <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen text-white">
              Explore Innovations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-moh-gold text-moh-darkGold hover:bg-moh-lightGold">
              Join a Challenge
            </Button>
            <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen">
              Access Investment
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
      <div className="hidden md:block absolute -bottom-10 -right-10 w-64 h-64 bg-moh-lightGreen rounded-full opacity-30"></div>
      <div className="hidden md:block absolute -top-10 -left-10 w-48 h-48 bg-moh-lightGold rounded-full opacity-30"></div>
    </section>;
}