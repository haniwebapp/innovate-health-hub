
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Target, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

export default function Vision2030Section() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const goals = [
    {
      icon: <TrendingUp className="h-6 w-6 text-moh-green" />,
      title: isRTL ? "تطوير بيئة صحية مبتكرة" : "Developing an Innovative Healthcare Environment",
      description: isRTL ? "دعم تطوير وتنفيذ الابتكارات المحلية في مجال الرعاية الصحية" : "Supporting the development and implementation of local healthcare innovations"
    },
    {
      icon: <Users className="h-6 w-6 text-moh-green" />,
      title: isRTL ? "تحسين جودة ونطاق الخدمات الصحية" : "Improving Quality and Scope of Health Services",
      description: isRTL ? "توسيع الوصول إلى الخدمات الصحية المبتكرة وتحسين النتائج للمرضى" : "Expanding access to innovative health services and improving patient outcomes"
    },
    {
      icon: <Target className="h-6 w-6 text-moh-green" />,
      title: isRTL ? "تحقيق الاستدامة والكفاءة" : "Achieving Sustainability and Efficiency",
      description: isRTL ? "تبني ابتكارات تعزز الاستدامة وتحسن الكفاءة في تقديم الرعاية الصحية" : "Adopting innovations that enhance sustainability and improve efficiency in healthcare delivery"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-moh-lightGreen/10 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="vision-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L40 20 M20 0 L20 40" stroke="#00814A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vision-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image - Left Side */}
          <div className="md:w-2/5">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-moh-green/20 to-moh-gold/20 blur-xl"></div>
              <img 
                src="/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png" 
                alt="Vision 2030" 
                className="rounded-xl shadow-lg relative z-10"
              />
            </div>
          </div>
          
          {/* Content - Right Side */}
          <div className="md:w-3/5">
            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="inline-flex items-center bg-moh-lightGold/30 px-3 py-1 rounded-full text-moh-darkGold text-sm font-medium mb-4">
                <img 
                  src="/lovable-uploads/8b61ff0c-8ac1-4567-a8c2-24b34ecda18b.png" 
                  alt="Vision 2030 Logo" 
                  className="h-5 w-5 mr-2"
                />
                {isRTL ? "متوافق مع رؤية 2030" : "Vision 2030 Aligned"}
              </div>
              
              <h2 className="text-3xl font-bold text-moh-darkGreen mb-4">
                {isRTL ? "مواءمة السياسات مع رؤية 2030" : "Policy Alignment with Vision 2030"}
              </h2>
              
              <p className="text-gray-700 mb-6">
                {isRTL ? 
                  "تم تصميم أطر عمل السياسات والإرشادات التنظيمية لدينا لدعم أهداف رؤية المملكة العربية السعودية 2030 لتحويل قطاع الرعاية الصحية من خلال الابتكار والتحول الرقمي والاستدامة." : 
                  "Our policy frameworks and regulatory guidelines are designed to support Saudi Arabia's Vision 2030 goals of transforming the healthcare sector through innovation, digital transformation, and sustainability."}
              </p>
              
              <div className="space-y-4 mb-6">
                {goals.map((goal, index) => (
                  <ScrollFadeIn key={index} delay={index * 0.1}>
                    <div className="flex items-start">
                      <div className="bg-moh-lightGreen/30 rounded-lg p-2 mr-4">
                        {goal.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-moh-darkGreen">{goal.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                      </div>
                    </div>
                  </ScrollFadeIn>
                ))}
              </div>
              
              <Button className="bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white" asChild>
                <Link to="/policy/vision-2030-alignment" className="flex items-center group">
                  <span>{isRTL ? "أداة تقييم مواءمة رؤية 2030" : "Vision 2030 Alignment Assessment Tool"}</span>
                  <ChevronRight className={`ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
