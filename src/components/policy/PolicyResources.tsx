
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ExternalLink, PlayCircle, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PolicyResources() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const resources = {
    documents: [
      {
        id: 1,
        title: isRTL ? "دليل الامتثال للابتكار الصحي 2024" : "Healthcare Innovation Compliance Guide 2024",
        type: "guide",
        format: "PDF",
        size: "4.2 MB",
        url: "/documents/compliance-guide-2024.pdf"
      },
      {
        id: 2,
        title: isRTL ? "إطار خارطة طريق رؤية 2030 للابتكار الصحي" : "Vision 2030 Roadmap Framework for Health Innovation",
        type: "strategy",
        format: "PDF",
        size: "2.8 MB",
        url: "/documents/vision2030-innovation-roadmap.pdf"
      },
      {
        id: 3,
        title: isRTL ? "معايير تقييم ابتكارات الصحة الرقمية" : "Digital Health Innovation Evaluation Standards",
        type: "standards",
        format: "PDF",
        size: "3.5 MB",
        url: "/documents/digital-health-standards.pdf"
      }
    ],
    training: [
      {
        id: 1,
        title: isRTL ? "التنقل في عملية الموافقة التنظيمية" : "Navigating the Regulatory Approval Process",
        duration: "45 mins",
        level: "Beginner",
        url: "/training/regulatory-approval-process"
      },
      {
        id: 2,
        title: isRTL ? "ضمان الامتثال لمعايير حماية البيانات الصحية" : "Ensuring Compliance with Health Data Protection Standards",
        duration: "60 mins",
        level: "Intermediate",
        url: "/training/health-data-protection"
      },
      {
        id: 3,
        title: isRTL ? "مواءمة ابتكارك مع أهداف رؤية 2030" : "Aligning Your Innovation with Vision 2030 Goals",
        duration: "30 mins",
        level: "All Levels",
        url: "/training/vision-2030-alignment"
      }
    ],
    consultations: [
      {
        id: 1,
        title: isRTL ? "استشارة الابتكارات الصحية" : "Healthcare Innovation Consultation",
        description: isRTL ? "استشارة فردية مع خبراء التنظيم الصحي" : "One-on-one consultation with healthcare regulatory experts",
        duration: "60 mins",
        url: "/consultations/healthcare-innovation"
      },
      {
        id: 2,
        title: isRTL ? "تقييم توافق المنتج" : "Product Compliance Assessment",
        description: isRTL ? "تقييم شامل للامتثال لمتطلبات المنتج والسوق" : "Comprehensive assessment of product and market requirements compliance",
        duration: "90 mins",
        url: "/consultations/product-compliance"
      },
      {
        id: 3,
        title: isRTL ? "مراجعة الاستراتيجية التنظيمية" : "Regulatory Strategy Review",
        description: isRTL ? "مراجعة وتحسين استراتيجيتك التنظيمية" : "Review and optimization of your regulatory strategy",
        duration: "45 mins",
        url: "/consultations/regulatory-strategy"
      }
    ]
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold text-moh-darkGreen mb-4">
            {isRTL ? "موارد السياسات والامتثال" : "Policy & Compliance Resources"}
          </h2>
          <p className="text-gray-600">
            {isRTL ? 
              "استكشف مجموعتنا الشاملة من الموارد لمساعدتك في فهم وتنفيذ متطلبات السياسات والامتثال." : 
              "Explore our comprehensive collection of resources to help you understand and implement policy and compliance requirements."}
          </p>
        </div>
        
        <Card className="border-gray-200 mb-10">
          <CardContent className="pt-6 pb-6">
            <Tabs defaultValue="documents">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{isRTL ? "الوثائق" : "Documents"}</span>
                </TabsTrigger>
                <TabsTrigger value="training" className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4" />
                  <span>{isRTL ? "التدريب" : "Training"}</span>
                </TabsTrigger>
                <TabsTrigger value="consultations" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{isRTL ? "الاستشارات" : "Consultations"}</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents">
                <div className="space-y-4">
                  {resources.documents.map((document) => (
                    <div 
                      key={document.id}
                      className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-moh-darkGreen">{document.title}</h4>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                          <span>{document.type}</span>
                          <span>{document.format}, {document.size}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-moh-green/40 text-moh-green" asChild>
                        <Link to={document.url} className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          <span>{isRTL ? "تحميل" : "Download"}</span>
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="training">
                <div className="space-y-4">
                  {resources.training.map((training) => (
                    <div 
                      key={training.id}
                      className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-moh-darkGreen">{training.title}</h4>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                          <span>{training.duration}</span>
                          <span>{training.level}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-moh-green/40 text-moh-green" asChild>
                        <Link to={training.url} className="flex items-center gap-2">
                          <PlayCircle className="h-4 w-4" />
                          <span>{isRTL ? "بدء التدريب" : "Start Training"}</span>
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="consultations">
                <div className="space-y-4">
                  {resources.consultations.map((consultation) => (
                    <div 
                      key={consultation.id}
                      className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-moh-darkGreen">{consultation.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{consultation.description}</p>
                        <div className="text-sm text-gray-500 mt-1">
                          <span>{consultation.duration}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-moh-green/40 text-moh-green" asChild>
                        <Link to={consultation.url} className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{isRTL ? "حجز" : "Book"}</span>
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button className="bg-moh-green hover:bg-moh-darkGreen text-white" asChild>
            <Link to="/policy/resources" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <span>{isRTL ? "استكشاف جميع الموارد" : "Explore All Resources"}</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
