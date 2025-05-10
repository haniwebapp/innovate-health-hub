
import { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { AIAnalysisSection } from "@/components/investment/AIAnalysisSection";
import { AIInsightsCard } from "@/components/investment/AIInsightsCard";
import { motion } from "framer-motion";
import { 
  DollarSign, Calendar, Users, BadgeCheck, BarChart3, 
  Lightbulb, ChevronRight, Search, Brain, TrendingUp, 
  FileText, Building, Filter, Download, PieChart 
} from "lucide-react";

// Sample insights data
const aiInsights = [
  "Digital health solutions with remote monitoring features have a 34% higher chance of securing investment.",
  "Investors are prioritizing solutions that integrate with existing healthcare systems in Saudi Arabia.",
  "Healthcare startups with clear regulatory pathways receive funding decisions 40% faster.",
  "Solutions addressing chronic disease management have seen a 28% increase in funding in the past quarter."
];

// Sample AI match scores for investment opportunities
const aiMatchScores = [
  {
    name: "Healthcare Seed Fund",
    score: 92,
    reason: "Excellent match for your digital health solution's stage and focus.",
    additionalInfo: [
      { label: "Fund Size", value: "$50M" },
      { label: "Focus", value: "Digital Health" },
      { label: "Stage", value: "Seed to Series A" }
    ]
  },
  {
    name: "Saudi MedTech Ventures",
    score: 85,
    reason: "Strong alignment with your medical device innovation and target market.",
    additionalInfo: [
      { label: "Fund Size", value: "$120M" },
      { label: "Focus", value: "Medical Devices" },
      { label: "Stage", value: "Early Stage" }
    ]
  },
  {
    name: "Vision Health Capital",
    score: 79,
    reason: "Good fit for your healthcare solution's growth objectives.",
    additionalInfo: [
      { label: "Fund Size", value: "$80M" },
      { label: "Focus", value: "Healthcare Tech" },
      { label: "Stage", value: "Series A" }
    ]
  }
];

// Sample market trends data
const aiMarketTrends = [
  {
    category: "Digital Health",
    title: "Telehealth Expansion",
    description: "Telehealth solutions continue to see strong investment growth with 45% YoY increase in funding.",
    trend: "increasing",
    data: [20, 25, 35, 42, 55, 62]
  },
  {
    category: "Medical Devices",
    title: "Remote Monitoring Devices",
    description: "IoT-enabled monitoring devices are attracting significant investor attention, particularly those with AI integration.",
    trend: "increasing",
    data: [15, 22, 28, 35, 42, 48]
  },
  {
    category: "AI in Healthcare",
    title: "Diagnostic AI Solutions",
    description: "AI-powered diagnostic tools are the fastest growing segment with 52% funding increase in the past year.",
    trend: "rapidly-increasing",
    data: [10, 18, 25, 40, 60, 85]
  },
];

// Mock investor matches data
const investorMatches = [
  {
    id: "1",
    name: "Healthcare Venture Partners",
    focus: "Digital Health",
    matchScore: 92,
    status: "interested",
  },
  {
    id: "2",
    name: "Medtech Growth Fund",
    focus: "Medical Devices",
    matchScore: 85,
    status: "pending",
  },
  {
    id: "3",
    name: "Pharmaceutical Innovations LLC",
    focus: "Biotech",
    matchScore: 78,
    status: "pending",
  },
];

// Mock funding rounds data
const fundingRounds = [
  {
    id: "1",
    name: "Healthcare Seed Fund 2025",
    type: "Equity",
    amount: "$250,000 - $500,000",
    deadline: "2025-07-30",
    status: "open",
    daysLeft: 35,
  },
  {
    id: "2",
    name: "Digital Health Innovation Grant",
    type: "Grant",
    amount: "$50,000 - $150,000",
    deadline: "2025-06-15",
    status: "open",
    daysLeft: 12,
  },
  {
    id: "3",
    name: "MedTech Accelerator Program",
    type: "Accelerator",
    amount: "$75,000 + mentorship",
    deadline: "2025-08-20",
    status: "upcoming",
    daysLeft: 62,
  },
];

// Mock pitch events data
const pitchEvents = [
  {
    id: "1",
    name: "Healthcare Innovations Showcase",
    date: "2025-05-25",
    location: "Riyadh",
    status: "upcoming",
    registered: true,
  },
  {
    id: "2",
    name: "MedTech Investor Day",
    date: "2025-06-10",
    location: "Jeddah",
    status: "upcoming",
    registered: false,
  },
  {
    id: "3",
    name: "Digital Health Summit",
    date: "2025-07-15",
    location: "Virtual",
    status: "registration-open",
    registered: false,
  },
];

export default function DashboardInvestmentPage() {
  const [activeTab, setActiveTab] = useState("matches");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSector, setSelectedSector] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const handleConnectionRequest = (investorId: string) => {
    toast({
      title: "Connection request sent",
      description: "The investor will be notified of your interest",
    });
  };

  const handleRegisterEvent = (eventId: string) => {
    toast({
      title: "Registration successful",
      description: "You've been registered for this pitch event",
    });
  };

  const handleApplyFunding = (fundingId: string) => {
    toast({
      title: "Application initiated",
      description: "You've started an application for this funding opportunity",
    });
  };
  
  const handleAnalyzeClick = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: "AI has analyzed the latest investment data and market trends"
      });
    }, 2000);
  };
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage={t('investment.title')} 
        items={[
          { label: t('nav.dashboard'), href: "/dashboard" },
        ]}
      />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Investment Hub</h1>
          <p className="text-muted-foreground">
            Connect with investors and explore funding opportunities tailored to your healthcare innovations
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" asChild>
            <Link to="/dashboard/profile/investment-preferences" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Complete Profile
            </Link>
          </Button>
        </div>
      </div>
      
      <AIInsightsCard 
        insights={aiInsights} 
        title="Investment Intelligence" 
        icon={<Brain className="h-5 w-5 text-purple-500" />}
        bgColor="bg-purple-50"
        borderColor="border-purple-300" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-500" />
              Investor Matches
            </CardTitle>
            <CardDescription>AI-matched investors for your healthcare innovations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search matches..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {investorMatches.map((investor) => (
                <div key={investor.id} className="border rounded-md p-4 hover:border-purple-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{investor.name}</h3>
                      <p className="text-sm text-muted-foreground">{investor.focus}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge className="bg-purple-600 mb-1">Match: {investor.matchScore}%</Badge>
                      {investor.status === "interested" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <BadgeCheck className="w-3 h-3 mr-1" />
                          Interested
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Progress
                    value={investor.matchScore}
                    className="h-2 mt-2"
                  />
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      size="sm"
                      variant={investor.status === "interested" ? "outline" : "default"}
                      onClick={() => handleConnectionRequest(investor.id)}
                      disabled={investor.status === "interested"}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {investor.status === "interested" ? (
                        <>
                          <BadgeCheck className="w-4 h-4 mr-1" />
                          Connected
                        </>
                      ) : (
                        "Request Connection"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm">View All Matches</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-purple-500" />
              Match Statistics
            </CardTitle>
            <CardDescription>Your investor matching summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Match Quality</h4>
                  <span className="text-sm text-purple-700">Excellent</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Total Matches</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">High Quality (>80%)</span>
                  <span className="font-medium">9</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Medium Quality (60-80%)</span>
                  <span className="font-medium">11</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connections Made</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Top Matching Categories</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Digital Health</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">92%</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Telemedicine</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">88%</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Health Monitoring</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">76%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted grid w-full grid-cols-3 h-11 items-stretch">
          <TabsTrigger value="funding" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Funding Rounds
          </TabsTrigger>
          <TabsTrigger value="pitches" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Pitch Events
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            AI Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="funding">
          <Card>
            <CardHeader>
              <CardTitle>Available Funding Rounds</CardTitle>
              <CardDescription>Open funding opportunities aligned with your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search funding rounds..."
                      className="pl-9 max-w-sm"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="equity">Equity</SelectItem>
                      <SelectItem value="grant">Grant</SelectItem>
                      <SelectItem value="accelerator">Accelerator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="sm" variant="outline" className="gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  Filters
                </Button>
              </div>
              
              {fundingRounds.map((funding) => (
                <motion.div 
                  key={funding.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="border rounded-md p-4 mb-4 last:mb-0 hover:border-purple-200 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{funding.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm">{funding.type}</span>
                        <span className="text-sm font-medium">{funding.amount}</span>
                      </div>
                    </div>
                    <div>
                      {funding.status === "open" ? (
                        <Badge className="bg-green-500">Open</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Upcoming
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-3 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" /> 
                    <span>
                      {funding.status === "open" ? (
                        <>Deadline: {new Date(funding.deadline).toLocaleDateString()} ({funding.daysLeft} days left)</>
                      ) : (
                        <>Opens on: {new Date(funding.deadline).toLocaleDateString()}</>
                      )}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    {funding.status === "open" ? (
                      <Button 
                        size="sm"
                        onClick={() => handleApplyFunding(funding.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Apply Now
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        variant="outline"
                      >
                        Set Reminder
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" asChild>
                  <Link to="/investment" className="flex items-center gap-1">
                    View All Funding Rounds
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pitches">
          <Card>
            <CardHeader>
              <CardTitle>Pitch Events</CardTitle>
              <CardDescription>Schedule and prepare for investor pitches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search events..."
                    className="pl-9"
                  />
                </div>
                <Select defaultValue="upcoming">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="registered">Registered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {pitchEvents.map((event) => (
                <motion.div 
                  key={event.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="border rounded-md p-4 mb-4 last:mb-0 hover:border-purple-200 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{event.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <Calendar className="h-4 w-4" /> 
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span className="text-muted-foreground">• {event.location}</span>
                      </div>
                    </div>
                    {event.registered && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <BadgeCheck className="w-3 h-3 mr-1" />
                        Registered
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    {event.registered ? (
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <Link to="/dashboard/pitches/prepare">
                            Prepare Pitch
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => handleRegisterEvent(event.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Register
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">
                  View All Events
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <AIAnalysisSection 
            aiMatchScores={aiMatchScores}
            aiMarketTrends={aiMarketTrends}
            isAnalyzing={isAnalyzing}
            selectedSector={selectedSector}
            onSectorChange={setSelectedSector}
            onAnalyzeClick={handleAnalyzeClick}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-purple-500" />
            Investment Resources
          </CardTitle>
          <CardDescription>Tools and guidance to support your investment journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="border rounded-md p-4 hover:border-purple-200 transition-colors"
            >
              <div className="bg-purple-100 w-10 h-10 rounded flex items-center justify-center mb-3">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-medium mb-1">Pitch Deck Templates</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Download professionally designed pitch deck templates tailored for healthcare innovations.
              </p>
              <Button size="sm" variant="outline">
                Access Templates
              </Button>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="border rounded-md p-4 hover:border-purple-200 transition-colors"
            >
              <div className="bg-purple-100 w-10 h-10 rounded flex items-center justify-center mb-3">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-medium mb-1">Investor Database</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Browse our comprehensive database of healthcare investors with detailed profiles.
              </p>
              <Button size="sm" variant="outline">
                Explore Database
              </Button>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="border rounded-md p-4 hover:border-purple-200 transition-colors"
            >
              <div className="bg-purple-100 w-10 h-10 rounded flex items-center justify-center mb-3">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-medium mb-1">Market Reports</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Access expert analysis and reports on healthcare investment trends in Saudi Arabia.
              </p>
              <Button size="sm" variant="outline">
                View Reports
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
