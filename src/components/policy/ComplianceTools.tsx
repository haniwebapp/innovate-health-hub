
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ClipboardCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

export default function ComplianceTools() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const tools = [
    {
      id: 1,
      title: isRTL ? "أداة التحقق من الامتثال" : "Compliance Checker Tool",
      description: isRTL ? "تقييم سريع لمشروعك لتحديد متطلبات الامتثال المطبقة" : "Quick assessment of your project to identify applicable compliance requirements",
      icon: <CheckCircle2 className="h-10 w-10 text-moh-green" />,
      url: "/policy/compliance-checker"
    },
    {
      id: 2,
      title: isRTL ? "قوائم التحقق من المعايير" : "Standards Checklists",
      description: isRTL ? "قوائم التحقق التفصيلية حسب نوع الابتكار والمجال" : "Detailed checklists by innovation type and domain",
      icon: <ClipboardCheck className="h-10 w-10 text-moh-green" />,
      url: "/policy/standards-checklists"
    },
    {
      id: 3,
      title: isRTL ? "أداة تقييم مواءمة رؤية 2030" : "Vision 2030 Alignment Evaluator",
      description: isRTL ? "تقييم كيفية مساهمة ابتكارك في أهداف رؤية 2030" : "Evaluate how your innovation contributes to Vision 2030 objectives",
      icon: <ExternalLink className="h-10 w-10 text-moh-green" />,
      url: "/policy/vision-alignment"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-moh-darkGreen mb-4">
            {isRTL ? "أدوات الامتثال والتقييم" : "Compliance & Evaluation Tools"}
          </h2>
          <p className="text-gray-600">
            {isRTL ? 
              "استخدم أدواتنا التفاعلية لتبسيط تقييم الامتثال وتسريع عملية المراجعة التنظيمية لابتكارات الرعاية الصحية الخاصة بك." : 
              "Use our interactive tools to streamline compliance assessment and accelerate the regulatory review process for your healthcare innovations."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {tools.map((tool, index) => (
            <ScrollFadeIn key={tool.id} delay={index * 0.1}>
              <Card className="text-center h-full hover:shadow-md transition-shadow border-gray-200">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {tool.icon}
                  </div>
                  <CardTitle className="text-xl text-moh-darkGreen">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white" asChild>
                    <Link to={tool.url}>
                      {isRTL ? "الوصول إلى الأداة" : "Access Tool"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollFadeIn>
          ))}
        </div>
        
        <div className="bg-moh-lightGreen/20 p-6 rounded-xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-moh-darkGreen mb-2">
                {isRTL ? "هل تحتاج إلى مساعدة في الامتثال؟" : "Need Help with Compliance?"}
              </h3>
              <p className="text-gray-700">
                {isRTL ?
                  "يمكن لفريق خبراء السياسات لدينا مساعدتك في التنقل في متطلبات الامتثال المعقدة." :
                  "Our policy experts team can help you navigate complex compliance requirements."}
              </p>
            </div>
            <Button className="bg-white text-moh-darkGreen hover:bg-gray-100 shadow-sm" asChild>
              <Link to="/policy/consultation">
                {isRTL ? "طلب استشارة" : "Request Consultation"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
