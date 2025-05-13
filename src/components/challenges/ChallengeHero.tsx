
import { motion } from "framer-motion";
import { BackgroundParticles } from "@/components/home/hero/animations/BackgroundParticles";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientOrbs } from "@/components/home/hero/animations/GradientOrbs";
import { Award, ChevronRight, Filter, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ChallengeHero() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <section className="pt-28 pb-16 relative overflow-hidden bg-gradient-to-b from-moh-lightGreen/30 to-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundParticles />
        <GradientOrbs />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="bg-moh-lightGreen/70 rounded-lg p-2 inline-flex items-center">
                <Award className="text-moh-darkGreen mr-2 h-5 w-5" />
                <span className="text-moh-darkGreen font-medium">
                  {isRTL ? "تحديات الابتكار" : "Innovation Challenges"}
                </span>
              </div>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-moh-darkGreen leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isRTL ? 
                "مواجهة تحديات الرعاية الصحية من خلال الابتكار" : 
                "Tackle Healthcare Challenges Through Innovation"}
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {isRTL ? 
                "استكشف تحديات الرعاية الصحية التي تطرحها وزارة الصحة والمستشفيات والمؤسسات الأكاديمية. قدم حلولك المبتكرة واحصل على الفرصة للحصول على التمويل والدعم لتحويل فكرتك إلى واقع." : 
                "Explore healthcare challenges posed by the Ministry of Health, hospitals, and academic institutions. Submit your innovative solutions and gain the opportunity to receive funding and support to turn your idea into reality."}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                className="bg-moh-green hover:bg-moh-darkGreen text-white"
                size="lg"
                asChild
              >
                <Link to="/challenges/submit" className="group">
                  {isRTL ? "تقديم حل" : "Submit a Solution"}
                  <ChevronRight className={`ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen/20"
                size="lg"
                asChild
              >
                <Link to="/challenges/propose">
                  {isRTL ? "اقتراح تحدي جديد" : "Propose a Challenge"}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Stats - Right Side */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-moh-darkGreen mb-4">
                {isRTL ? "إحصائيات التحديات" : "Challenge Statistics"}
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-moh-lightGreen/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-moh-darkGreen mb-1">42</div>
                  <div className="text-sm text-gray-600">
                    {isRTL ? "تحديات نشطة" : "Active Challenges"}
                  </div>
                </div>
                
                <div className="bg-moh-lightGold/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-moh-darkGold mb-1">156</div>
                  <div className="text-sm text-gray-600">
                    {isRTL ? "حلول مقدمة" : "Solutions Submitted"}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">18</div>
                  <div className="text-sm text-gray-600">
                    {isRTL ? "مشاريع ممولة" : "Funded Projects"}
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">5.2M</div>
                  <div className="text-sm text-gray-600">
                    {isRTL ? "إجمالي التمويل" : "Total Funding (SAR)"}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder={isRTL ? "ابحث عن التحديات..." : "Search challenges..."}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-moh-green/30 text-sm"
                  />
                </div>
                
                <Button variant="outline" size="sm" className="gap-2 border-gray-200">
                  <Filter className="h-4 w-4" />
                  <span>{isRTL ? "تصفية" : "Filter"}</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
