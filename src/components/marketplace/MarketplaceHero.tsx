
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundParticles } from "@/components/home/hero/animations/BackgroundParticles";
import { ChevronRight, Search, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MarketplaceHero() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <section className="pt-28 pb-16 relative overflow-hidden bg-gradient-to-b from-moh-lightGreen/20 to-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundParticles />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Hero Content - Left */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="bg-moh-lightGold/70 rounded-lg p-2 inline-flex items-center">
                <ShoppingBag className="text-moh-darkGold mr-2 h-5 w-5" />
                <span className="text-moh-darkGold font-medium">
                  {isRTL ? "سوق الابتكار" : "Innovation Marketplace"}
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-moh-darkGreen leading-tight">
              {isRTL ? 
                "اكتشف وترخيص ابتكارات الرعاية الصحية" : 
                "Discover & License Healthcare Innovations"}
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
              {isRTL ? 
                "استكشف أكبر سوق للابتكارات الصحية في المملكة العربية السعودية. اكتشف حلولاً مبتكرة، وترخيص تقنيات جديدة، وتواصل مع المبتكرين لتعزيز مؤسستك الصحية." : 
                "Explore Saudi Arabia's largest marketplace for healthcare innovations. Discover innovative solutions, license new technologies, and connect with innovators to enhance your healthcare organization."}
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto lg:mx-0 mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={isRTL ? "ابحث عن ابتكارات، تقنيات، أو مبتكرين..." : "Search for innovations, technologies, or innovators..."}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-moh-green/30 shadow-sm"
              />
              <Button className="absolute right-1 top-1 bg-moh-green hover:bg-moh-darkGreen">
                <span>{isRTL ? "بحث" : "Search"}</span>
              </Button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button 
                className="bg-moh-green hover:bg-moh-darkGreen text-white group"
                size="lg"
                asChild
              >
                <Link to="/marketplace/browse" className="flex items-center">
                  <span>{isRTL ? "تصفح الابتكارات" : "Browse Innovations"}</span>
                  <ChevronRight className={`ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen/20"
                size="lg"
                asChild
              >
                <Link to="/innovations/submit">
                  {isRTL ? "عرض الابتكار الخاص بك" : "List Your Innovation"}
                </Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Innovation Showcase - Right */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-moh-darkGreen mb-4">
                {isRTL ? "الابتكارات المميزة" : "Featured Innovations"}
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Featured Innovation Card */}
                <div className="group relative rounded-lg overflow-hidden border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex">
                    <div className="w-1/3 h-32">
                      <img 
                        src="/lovable-uploads/8740809b-3739-46bc-927a-4787dc7ca177.png" 
                        alt="AI Diagnostic Tool" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">Medical Device</span>
                      <h4 className="font-semibold mt-2 text-moh-darkGreen group-hover:text-moh-green transition-colors">AI-Powered Diagnostic Tool</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">Advanced AI solution for early detection of chronic diseases with 95% accuracy.</p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-moh-gold font-medium">Licensing Available</span>
                        <Button variant="ghost" size="sm" className="text-moh-green p-0 h-auto">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Second Featured Innovation */}
                <div className="group relative rounded-lg overflow-hidden border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex">
                    <div className="w-1/3 h-32">
                      <img 
                        src="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png" 
                        alt="Smart Patient Monitoring" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">Connected Health</span>
                      <h4 className="font-semibold mt-2 text-moh-darkGreen group-hover:text-moh-green transition-colors">Smart Patient Monitoring</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">Wearable technology for continuous remote monitoring of vital signs and early intervention.</p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-moh-gold font-medium">Partnership Opportunity</span>
                        <Button variant="ghost" size="sm" className="text-moh-green p-0 h-auto">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="link" className="text-moh-green" asChild>
                  <Link to="/marketplace/featured">
                    {isRTL ? "عرض المزيد من الابتكارات المميزة" : "View more featured innovations"}
                    <ChevronRight className={`ml-1 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
