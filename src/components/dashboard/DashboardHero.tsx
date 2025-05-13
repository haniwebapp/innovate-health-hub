
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FileUp, Bell, Calendar, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function DashboardHero() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  // Get current time to show appropriate greeting
  const currentHour = new Date().getHours();
  
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }
  
  // Arabic greetings
  let arGreeting = "صباح الخير";
  if (currentHour >= 12 && currentHour < 17) {
    arGreeting = "مساء الخير";
  } else if (currentHour >= 17) {
    arGreeting = "مساء الخير";
  }
  
  // Get current date
  const currentDate = new Date().toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="bg-gradient-to-br from-moh-lightGreen/40 to-moh-lightGold/20 rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background pattern elements */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute opacity-10">
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-moh-green" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
        
        {/* Background orbs */}
        <motion.div 
          className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-tl from-moh-lightGreen via-moh-green to-moh-darkGreen rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.1, 0.15, 0.1],
            x: [0, -10, 0],
            y: [0, 10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <motion.div 
          className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-moh-lightGold via-moh-gold to-moh-darkGold rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1], 
            opacity: [0.1, 0.15, 0.1],
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
      
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Greeting & Info */}
          <div>
            <div className="flex items-center text-sm text-moh-darkGreen/70 mb-1">
              <Clock className="h-4 w-4 mr-1" />
              <span>{currentDate}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-moh-darkGreen mb-2">
              {isRTL ? `${arGreeting}, ${user?.first_name || user?.email?.split('@')[0] || 'المستخدم'}` : 
                `${greeting}, ${user?.first_name || user?.email?.split('@')[0] || 'User'}`}
            </h1>
            
            <p className="text-gray-600 max-w-xl mb-6">
              {isRTL ? 
                "مرحبًا بك في لوحة تحكم الابتكار الصحي. اكتشف أحدث التحديثات وتتبع تقدم الابتكارات الخاصة بك وابقَ على اطلاع بالمبادرات الجديدة." : 
                "Welcome to your Healthcare Innovation Dashboard. Discover the latest updates, track your innovation progress, and stay informed about new initiatives."}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-moh-green hover:bg-moh-darkGreen text-white shadow-sm hover:shadow group"
                asChild
              >
                <Link to="/innovations/submit" className="flex items-center">
                  <FileUp className="mr-2 h-4 w-4" />
                  <span>{isRTL ? "تقديم ابتكار" : "Submit Innovation"}</span>
                  <ChevronRight className={`ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              
              <Button variant="outline" className="border-moh-green/30 text-moh-darkGreen hover:bg-moh-lightGreen/20" asChild>
                <Link to="/challenges">
                  {isRTL ? "استكشاف التحديات" : "Explore Challenges"}
                </Link>
              </Button>
              
              <Button variant="outline" className="border-moh-green/30 text-moh-darkGreen hover:bg-moh-lightGreen/20" asChild>
                <Link to="/dashboard/notifications">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>{isRTL ? "الإشعارات" : "Notifications"}</span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Quick Status */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm p-4 min-w-[240px]">
            <h3 className="font-medium text-moh-darkGreen mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {isRTL ? "حالة النشاط" : "Activity Status"}
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{isRTL ? "الابتكارات" : "Innovations"}</span>
                <span className="font-medium text-moh-darkGreen">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{isRTL ? "مشاركات التحديات" : "Challenge Entries"}</span>
                <span className="font-medium text-moh-darkGreen">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{isRTL ? "المشاريع النشطة" : "Active Projects"}</span>
                <span className="font-medium text-moh-darkGreen">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{isRTL ? "الإشعارات غير المقروءة" : "Unread Notifications"}</span>
                <span className="bg-moh-green text-white text-xs px-2 py-0.5 rounded-full">5</span>
              </div>
              
              <Button variant="link" className="text-moh-green p-0 h-auto mt-2" asChild>
                <Link to="/dashboard/activity" className="flex items-center">
                  <span>{isRTL ? "عرض كل النشاطات" : "View all activities"}</span>
                  <ChevronRight className={`ml-1 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
