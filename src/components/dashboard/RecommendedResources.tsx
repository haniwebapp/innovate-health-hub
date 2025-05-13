
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function RecommendedResources() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const resources = [
    {
      id: 1,
      title: isRTL ? "دليل المبتدئين لتقييم الابتكارات الصحية" : "Beginner's Guide to Healthcare Innovation Evaluation",
      type: "guide",
      url: "/knowledge-hub/guides/innovation-evaluation"
    },
    {
      id: 2,
      title: isRTL ? "استراتيجيات التسويق للابتكارات الصحية" : "Marketing Strategies for Healthcare Innovations",
      type: "webinar",
      url: "/knowledge-hub/webinars/marketing-healthcare"
    },
    {
      id: 3,
      title: isRTL ? "إعداد عرض تقديمي ناجح للمستثمرين" : "Preparing a Successful Investor Pitch",
      type: "course",
      url: "/knowledge-hub/courses/investor-pitch"
    }
  ];

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-moh-darkGreen flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-moh-green" />
          {isRTL ? "مصادر موصى بها" : "Recommended Resources"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resources.map((resource) => (
            <Link 
              key={resource.id} 
              to={resource.url}
              className="block p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-900">{resource.title}</h4>
                <ExternalLink className="h-3 w-3 text-gray-400" />
              </div>
              
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <span className="capitalize">{resource.type}</span>
              </div>
            </Link>
          ))}
        </div>
        
        <Button variant="link" className="text-moh-green p-0 h-auto mt-3 w-full justify-end" asChild>
          <Link to="/dashboard/knowledge" className="flex items-center text-xs">
            <span>{isRTL ? "استكشاف مركز المعرفة" : "Explore Knowledge Hub"}</span>
            <ChevronRight className={`ml-1 h-3 w-3 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
