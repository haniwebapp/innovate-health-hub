
import { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ActivityType, fetchActivityCount } from "@/utils/activityUtils";
import ActivityList from "@/components/activity/ActivityList";
import ActivityDateFilter from "@/components/activity/ActivityDateFilter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DashboardActivityPage() {
  const [activeTab, setActiveTab] = useState<ActivityType>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [limit, setLimit] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [counts, setCounts] = useState({
    all: 0,
    innovation: 0,
    challenge: 0,
    investment: 0
  });
  const [isLoadingCounts, setIsLoadingCounts] = useState(true);
  
  // Fetch activity counts for badges
  useEffect(() => {
    const loadCounts = async () => {
      setIsLoadingCounts(true);
      try {
        const [allCount, innovationCount, challengeCount, investmentCount] = await Promise.all([
          fetchActivityCount('all'),
          fetchActivityCount('innovation'),
          fetchActivityCount('challenge'),
          fetchActivityCount('investment')
        ]);
        
        setCounts({
          all: allCount,
          innovation: innovationCount,
          challenge: challengeCount,
          investment: investmentCount
        });
      } catch (error) {
        console.error("Error fetching activity counts:", error);
      } finally {
        setIsLoadingCounts(false);
      }
    };
    
    loadCounts();
  }, []);
  
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setLimit(prev => prev + 10);
      setIsLoadingMore(false);
      // For demo purposes, let's say there are no more than 30 items
      if (limit + 10 >= 30) {
        setHasMore(false);
      }
    }, 800);
  };
  
  const handleDateChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    // Reset pagination when filters change
    setLimit(10);
    setHasMore(true);
  };
  
  const isFiltering = searchTerm || startDate || endDate;
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Activity History" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activity History</h1>
        <p className="text-muted-foreground">
          Track your activity across the platform
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <ActivityDateFilter 
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
          />
          
          <Select
            defaultValue="latest"
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="type">Group by Type</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as ActivityType)} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="relative">
            All Activity
            {isLoadingCounts ? (
              <Loader2 className="ml-2 h-3 w-3 animate-spin" />
            ) : (
              counts.all > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 py-0 px-1.5 text-xs">
                  {counts.all}
                </Badge>
              )
            )}
          </TabsTrigger>
          <TabsTrigger value="innovation" className="relative">
            Innovations
            {isLoadingCounts ? (
              <Loader2 className="ml-2 h-3 w-3 animate-spin" />
            ) : (
              counts.innovation > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 py-0 px-1.5 text-xs">
                  {counts.innovation}
                </Badge>
              )
            )}
          </TabsTrigger>
          <TabsTrigger value="challenge" className="relative">
            Challenges
            {isLoadingCounts ? (
              <Loader2 className="ml-2 h-3 w-3 animate-spin" />
            ) : (
              counts.challenge > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 py-0 px-1.5 text-xs">
                  {counts.challenge}
                </Badge>
              )
            )}
          </TabsTrigger>
          <TabsTrigger value="investment" className="relative">
            Investment
            {isLoadingCounts ? (
              <Loader2 className="ml-2 h-3 w-3 animate-spin" />
            ) : (
              counts.investment > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 py-0 px-1.5 text-xs">
                  {counts.investment}
                </Badge>
              )
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ActivityList 
            type="all"
            limit={limit}
            startDate={startDate}
            endDate={endDate}
            onLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
          />
        </TabsContent>
        
        <TabsContent value="innovation">
          <ActivityList 
            type="innovation"
            limit={limit}
            startDate={startDate}
            endDate={endDate}
            onLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
          />
        </TabsContent>
        
        <TabsContent value="challenge">
          <ActivityList 
            type="challenge"
            limit={limit}
            startDate={startDate}
            endDate={endDate}
            onLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
          />
        </TabsContent>
        
        <TabsContent value="investment">
          <ActivityList 
            type="investment"
            limit={limit}
            startDate={startDate}
            endDate={endDate}
            onLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
