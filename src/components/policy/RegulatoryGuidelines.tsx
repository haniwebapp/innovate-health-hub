
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Download, ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RegulatoryGuidelines() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const guidelines = [
    {
      id: 1,
      title: isRTL ? "إرشادات الأجهزة الطبية المبتكرة" : "Innovative Medical Devices Guidelines",
      organization: "Saudi FDA",
      date: "2024",
      url: "/documents/medical-device-guidelines-2024.pdf"
    },
    {
      id: 2,
      title: isRTL ? "سياسة تطبيقات الصحة الرقمية" : "Digital Health Applications Policy",
      organization: "Ministry of Health",
      date: "2023",
      url: "/documents/digital-health-policy-2023.pdf"
    },
    {
      id: 3,
      title: isRTL ? "إطار عمل تقييم التكنولوجيا الصحية" : "Health Technology Assessment Framework",
      organization: "National Health Regulatory Authority",
      date: "2024",
      url: "/documents/hta-framework-2024.pdf"
    }
  ];
  
  const keyPoints = [
    isRTL ? "توفير نهج منظم للابتكار مع ضمان سلامة المرضى" : "Providing a structured approach to innovation while ensuring patient safety",
    isRTL ? "تحديد المعايير لإجراء الدراسات السريرية والتقييمات" : "Defining criteria for conducting clinical studies and evaluations",
    isRTL ? "دعم الامتثال التنظيمي من خلال مسارات واضحة وفعالة" : "Supporting regulatory compliance through clear, efficient pathways",
    isRTL ? "مواءمة الابتكارات مع أولويات الصحة الوطنية ورؤية 2030" : "Aligning innovations with national health priorities and Vision 2030"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left column - Key points */}
          <div className="lg:w-1/2">
            <div className="flex items-center mb-6">
              <div className="bg-moh-lightGreen/50 p-2 rounded-md mr-3">
                <ShieldCheck className="h-6 w-6 text-moh-darkGreen" />
              </div>
              <h2 className="text-3xl font-bold text-moh-darkGreen">
                {isRTL ? "الإرشادات التنظيمية" : "Regulatory Guidelines"}
              </h2>
            </div>
            
            <p className="text-gray-600 mb-8">
              {isRTL ? 
                "توفر الإرشادات التنظيمية مسارات واضحة لتطوير وتقييم واعتماد الابتكارات الصحية، مما يضمن الامتثال للمعايير المحلية والدولية مع تعزيز الابتكار." : 
                "Regulatory guidelines provide clear pathways for developing, evaluating, and approving healthcare innovations, ensuring compliance with local and international standards while fostering innovation."}
            </p>
            
            <div className="space-y-4 mb-8">
              {keyPoints.map((point, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-moh-lightGreen/30 rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-moh-darkGreen" />
                  </div>
                  <p className="text-gray-700">{point}</p>
                </motion.div>
              ))}
            </div>
            
            <Button className="bg-moh-green hover:bg-moh-darkGreen text-white" asChild>
              <Link to="/policy/regulatory-support" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                <span>{isRTL ? "استكشاف خدمات الدعم التنظيمي" : "Explore Regulatory Support Services"}</span>
              </Link>
            </Button>
          </div>
          
          {/* Right column - Guidelines documents */}
          <div className="lg:w-1/2">
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-moh-darkGreen mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-moh-green" />
                  {isRTL ? "وثائق إرشادية رئيسية" : "Key Guideline Documents"}
                </h3>
                
                <div className="space-y-4">
                  {guidelines.map((guideline) => (
                    <div 
                      key={guideline.id}
                      className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all"
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-moh-darkGreen">{guideline.title}</h4>
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link to={guideline.url}>
                            <Download className="h-4 w-4 text-moh-green" />
                          </Link>
                        </Button>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>{guideline.organization}</span>
                        <span>{guideline.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-moh-green/40 text-moh-darkGreen w-full" asChild>
                    <Link to="/policy/guidelines">
                      {isRTL ? "عرض جميع الإرشادات التنظيمية" : "View All Regulatory Guidelines"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
