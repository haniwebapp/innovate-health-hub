
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight, FileText, Shield, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

export default function PolicyFramework() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const frameworks = [
    {
      id: 1,
      title: isRTL ? "إطار عمل الابتكارات الرقمية" : "Digital Innovations Framework",
      description: isRTL ? "معايير وإرشادات للابتكارات الرقمية والتكنولوجيا الصحية" : "Standards and guidelines for digital innovations and health technology",
      icon: <Shield className="h-5 w-5 text-moh-green" />,
      url: "/policy/frameworks/digital"
    },
    {
      id: 2,
      title: isRTL ? "إطار عمل تقييم الفعالية السريرية" : "Clinical Efficacy Evaluation Framework",
      description: isRTL ? "معايير لتقييم الآثار السريرية وفعالية الابتكارات الصحية" : "Standards for evaluating clinical impacts and effectiveness of healthcare innovations",
      icon: <CheckCircle className="h-5 w-5 text-moh-green" />,
      url: "/policy/frameworks/clinical"
    },
    {
      id: 3,
      title: isRTL ? "إطار عمل تقييم أثر الابتكار" : "Innovation Impact Assessment Framework",
      description: isRTL ? "منهجية لقياس الأثر الاقتصادي والصحي للابتكارات في الرعاية الصحية" : "Methodology for measuring economic and health impacts of innovations in healthcare",
      icon: <FileText className="h-5 w-5 text-moh-green" />,
      url: "/policy/frameworks/impact"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-moh-darkGreen mb-4">
            {isRTL ? "أطر عمل سياسات الابتكار" : "Innovation Policy Frameworks"}
          </h2>
          <p className="text-gray-600">
            {isRTL ? 
              "تحدد أطر عمل السياسات المعايير والإرشادات لتطوير وتقييم وتقديم ابتكارات الرعاية الصحية بما يتماشى مع الأولويات الوطنية." : 
              "Policy frameworks define standards and guidelines for developing, evaluating, and delivering healthcare innovations aligned with national priorities."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frameworks.map((framework, index) => (
            <ScrollFadeIn key={framework.id} delay={index * 0.1}>
              <Card className="h-full hover:shadow-md transition-shadow border-gray-200">
                <CardHeader>
                  <div className="bg-moh-lightGreen/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {framework.icon}
                  </div>
                  <CardTitle className="text-lg text-moh-darkGreen">
                    {framework.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {framework.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-moh-green/40 text-moh-green" asChild>
                    <Link to={framework.url} className="flex items-center justify-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{isRTL ? "عرض الإطار" : "View Framework"}</span>
                      <ChevronRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollFadeIn>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button className="bg-moh-green hover:bg-moh-darkGreen text-white" asChild>
            <Link to="/policy/frameworks">
              {isRTL ? "استكشاف جميع الأطر" : "Explore All Frameworks"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
