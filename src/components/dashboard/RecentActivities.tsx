
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Award, Clock, User, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function RecentActivities() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const activities = [
    {
      id: 1,
      type: "submission",
      title: isRTL ? "تم تقديم الابتكار" : "Innovation Submitted",
      description: isRTL ? "تم تقديم AI الطبي للتشخيص المبكر للسكري بنجاح." : "Medical AI for Early Diabetes Diagnosis was successfully submitted.",
      time: "2 hours ago",
      icon: <FileText className="h-4 w-4 text-moh-green" />
    },
    {
      id: 2,
      type: "review",
      title: isRTL ? "تمت المراجعة" : "Review Received",
      description: isRTL ? "تلقى تطبيق Remote Patient Monitoring تقييمًا جديدًا." : "Remote Patient Monitoring App received a new evaluation.",
      time: "Yesterday",
      icon: <MessageSquare className="h-4 w-4 text-blue-500" />
    },
    {
      id: 3,
      type: "challenge",
      title: isRTL ? "تم الانضمام إلى التحدي" : "Challenge Joined",
      description: isRTL ? "انضممت إلى تحدي ابتكار الرعاية الصحية عن بعد." : "You joined the Remote Healthcare Innovation Challenge.",
      time: "2 days ago",
      icon: <Award className="h-4 w-4 text-moh-gold" />
    },
    {
      id: 4,
      type: "meeting",
      title: isRTL ? "اجتماع مجدول" : "Meeting Scheduled",
      description: isRTL ? "تم تأكيد اجتماعك مع المستثمرين للمشروع التجريبي." : "Your meeting with investors for the pilot project is confirmed.",
      time: "Next week",
      icon: <Calendar className="h-4 w-4 text-purple-500" />
    },
    {
      id: 5,
      type: "connection",
      title: isRTL ? "تم إنشاء اتصال جديد" : "New Connection Made",
      description: isRTL ? "قبل د. أحمد حسن (مستشار طبي) طلب الاتصال الخاص بك." : "Dr. Ahmad Hassan (Medical Advisor) accepted your connection request.",
      time: "3 days ago",
      icon: <User className="h-4 w-4 text-indigo-500" />
    }
  ];

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-moh-darkGreen flex items-center">
          <Clock className="mr-2 h-5 w-5 text-moh-green" />
          {isRTL ? "النشاطات الحديثة" : "Recent Activities"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="mr-3 mt-0.5">
                <div className="p-2 rounded-full bg-gray-100">{activity.icon}</div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                <span className="text-xs text-gray-500 mt-1 block">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
