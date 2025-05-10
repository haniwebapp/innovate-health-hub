
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, Calendar, BadgeCheck, AlertCircle, FileText, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock investor matches data
const investorMatches = [
  {
    id: "1",
    name: "Healthcare Venture Partners",
    focus: "Digital Health",
    matchScore: 85,
    status: "interested",
  },
  {
    id: "2",
    name: "Medtech Growth Fund",
    focus: "Medical Devices",
    matchScore: 72,
    status: "pending",
  },
  {
    id: "3",
    name: "Pharmaceutical Innovations LLC",
    focus: "Biotech",
    matchScore: 68,
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

  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage={t('investment.title')} 
        items={[
          { label: t('nav.dashboard'), href: "/dashboard" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('investment.title')}</h1>
        <p className="text-muted-foreground">
          {t('investment.subtitle')}
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="matches">Investor Matches</TabsTrigger>
          <TabsTrigger value="funding">Funding Rounds</TabsTrigger>
          <TabsTrigger value="pitches">Pitch Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Investor Matches</CardTitle>
              <CardDescription>AI-matched investors for your innovations</CardDescription>
            </CardHeader>
            <CardContent>
              {investorMatches.length > 0 ? (
                <div className="space-y-4">
                  {investorMatches.map((investor) => (
                    <div key={investor.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{investor.name}</h3>
                          <p className="text-sm text-muted-foreground">Focus: {investor.focus}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge className="bg-moh-green mb-1">Match: {investor.matchScore}%</Badge>
                          {investor.status === "interested" && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
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
                  
                  <div className="flex justify-between items-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      These matches are based on your innovation profile and preferences.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard/profile/investment-preferences">
                        Update Preferences
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <DollarSign className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Complete your investment profile to see investor matches.</p>
                  <Button className="mt-4">Complete Your Profile</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="funding">
          <Card>
            <CardHeader>
              <CardTitle>Available Funding Rounds</CardTitle>
              <CardDescription>Open funding opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              {fundingRounds.length > 0 ? (
                <div className="space-y-4">
                  {fundingRounds.map((funding) => (
                    <div key={funding.id} className="border rounded-md p-4">
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
                            <>Deadline: {funding.deadline} ({funding.daysLeft} days left)</>
                          ) : (
                            <>Opens on: {funding.deadline}</>
                          )}
                        </span>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        {funding.status === "open" ? (
                          <Button 
                            size="sm"
                            onClick={() => handleApplyFunding(funding.id)}
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No funding rounds currently available.</p>
                </div>
              )}
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
              {pitchEvents.length > 0 ? (
                <div className="space-y-4">
                  {pitchEvents.map((event) => (
                    <div key={event.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{event.name}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm">
                            <Calendar className="h-4 w-4" /> 
                            <span>{event.date}</span>
                            <span className="text-muted-foreground">• {event.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        {event.registered ? (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <BadgeCheck className="w-3 h-3 mr-1" />
                              Registered
                            </Badge>
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
                          >
                            Register
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No pitch events currently scheduled.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
