
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActivityLog, fetchUserActivity, getActivityCount } from "@/utils/activityUtils";
import ActivityList from "@/components/activity/ActivityList";
import ActivityDateFilter from "@/components/activity/ActivityDateFilter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ActivityHistoryPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [counts, setCounts] = useState({
    all: 0,
    innovation: 0,
    challenge: 0,
    investment: 0
  });
  
  const handleDateChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  const loadActivityCounts = async () => {
    const allCount = await getActivityCount();
    const innovationCount = await getActivityCount('innovation');
    const challengeCount = await getActivityCount('challenge');
    const investmentCount = await getActivityCount('investment');
    
    setCounts({
      all: allCount,
      innovation: innovationCount,
      challenge: challengeCount, 
      investment: investmentCount
    });
  };
  
  const loadActivities = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const filter = activeTab === 'all' ? undefined : activeTab;
      const data = await fetchUserActivity(filter, startDate, endDate);
      setActivities(data);
    } catch (err: any) {
      console.error("Error loading activities:", err);
      setError(err.message || "Failed to load activities");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadActivityCounts();
  }, []);
  
  useEffect(() => {
    loadActivities();
  }, [activeTab, startDate, endDate]);
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold font-playfair text-moh-darkGreen tracking-tight">
          Activity History
        </h1>
        <p className="text-muted-foreground">
          View your recent activity and track your interactions on the platform.
        </p>
      </motion.div>
      
      <div className="flex items-center justify-between">
        <ActivityDateFilter 
          startDate={startDate} 
          endDate={endDate} 
          onDateChange={handleDateChange} 
        />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={loadActivities}
          className="text-moh-green hover:text-moh-darkGreen"
        >
          Refresh
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all" className="relative">
            All Activity
            {counts.all > 0 && (
              <Badge className="ml-2 bg-moh-green text-white">{counts.all}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="innovation">
            Innovations
            {counts.innovation > 0 && (
              <Badge className="ml-2 bg-moh-lightGreen text-moh-darkGreen">{counts.innovation}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="challenge">
            Challenges
            {counts.challenge > 0 && (
              <Badge className="ml-2 bg-amber-100 text-amber-800">{counts.challenge}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="investment">
            Investment
            {counts.investment > 0 && (
              <Badge className="ml-2 bg-blue-100 text-blue-800">{counts.investment}</Badge>
            )}
          </TabsTrigger>
        </TabsList>
      
        <TabsContent value={activeTab} className="pt-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-playfair text-moh-darkGreen">
                {activeTab === 'all' ? 'All Activity' : 
                 activeTab === 'innovation' ? 'Innovation Activity' :
                 activeTab === 'challenge' ? 'Challenge Activity' : 'Investment Activity'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
                  <p className="text-muted-foreground">{error}</p>
                  <Button 
                    onClick={loadActivities}
                    variant="outline"
                    className="mt-4"
                  >
                    Try Again
                  </Button>
                </div>
              ) : activities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <p className="text-muted-foreground">No activity found</p>
                  {(startDate || endDate) && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Try adjusting your date filter
                    </p>
                  )}
                </div>
              ) : (
                <ActivityList activities={activities} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
