
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function UpcomingEvents() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const events = [
    {
      id: 1,
      title: isRTL ? "ندوة الذكاء الاصطناعي في الرعاية الصحية" : "AI in Healthcare Webinar",
      date: "May 15, 2025",
      time: "10:00 AM",
      type: "webinar",
      status: "Registered"
    },
    {
      id: 2,
      title: isRTL ? "معرض الابتكار الصحي" : "Health Innovation Expo",
      date: "June 3-5, 2025",
      time: "All day",
      type: "conference",
      status: "Upcoming"
    },
    {
      id: 3,
      title: isRTL ? "يوم العرض التقديمي للمستثمرين" : "Investor Pitch Day",
      date: "May 22, 2025",
      time: "2:00 PM",
      type: "pitch",
      status: "Scheduled"
    }
  ];

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-moh-darkGreen flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-moh-green" />
          {isRTL ? "الفعاليات القادمة" : "Upcoming Events"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                <span className="text-xs px-2 py-0.5 bg-moh-lightGreen/30 text-moh-darkGreen rounded-full">
                  {event.status}
                </span>
              </div>
              
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{event.date}, {event.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="link" className="text-moh-green p-0 h-auto mt-3 w-full justify-end" asChild>
          <Link to="/dashboard/events" className="flex items-center text-xs">
            <span>{isRTL ? "عرض جميع الفعاليات" : "View all events"}</span>
            <ChevronRight className={`ml-1 h-3 w-3 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
