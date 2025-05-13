
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, PlusCircle, FileQuestion, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function DashboardActions() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const actions = [
    {
      title: isRTL ? "تقديم ابتكار" : "Submit Innovation",
      description: isRTL ? "قم بتحميل ابتكارك الصحي الجديد" : "Upload your new healthcare innovation",
      icon: <FileUp className="h-5 w-5 text-white" />,
      bgColor: "bg-moh-green",
      link: "/innovations/submit"
    },
    {
      title: isRTL ? "انضم إلى تحدي" : "Join Challenge",
      description: isRTL ? "انضم إلى التحديات المفتوحة وقدم الحلول" : "Join open challenges and submit solutions",
      icon: <Award className="h-5 w-5 text-white" />,
      bgColor: "bg-moh-gold",
      link: "/challenges"
    },
    {
      title: isRTL ? "استكشف الفرص" : "Explore Opportunities",
      description: isRTL ? "اكتشف فرص التمويل والشراكة" : "Find funding and partnership opportunities",
      icon: <Lightbulb className="h-5 w-5 text-white" />,
      bgColor: "bg-blue-500",
      link: "/investment"
    },
    {
      title: isRTL ? "احصل على المساعدة" : "Get Help",
      description: isRTL ? "طرح الأسئلة والوصول إلى الدعم" : "Ask questions and access support",
      icon: <FileQuestion className="h-5 w-5 text-white" />,
      bgColor: "bg-purple-500",
      link: "/support"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className={`w-10 h-10 rounded-full ${action.bgColor} flex items-center justify-center mb-3`}>
              {action.icon}
            </div>
            <CardTitle className="text-base font-semibold">{action.title}</CardTitle>
            <CardDescription className="text-xs">{action.description}</CardDescription>
          </CardHeader>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="text-moh-green p-0 h-auto" asChild>
              <Link to={action.link} className="flex items-center text-xs font-medium">
                {isRTL ? "بدء" : "Get Started"}
                <ArrowRight className={`ml-1 h-3 w-3 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function Award(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function ChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}
