
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Clock, Target, DollarSign, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data - would come from an API in a real application
const fundingRounds = [
  {
    id: "1",
    name: "Healthcare Seed Fund 2025",
    type: "Equity",
    amount: "$250,000 - $500,000",
    deadline: "July 30, 2025",
    daysLeft: 35,
    status: "open",
    categories: ["Digital Health", "Telemedicine"],
    description: "Early-stage funding for innovative digital health solutions addressing primary care accessibility.",
    organization: "Saudi Health Ventures",
    logo: "https://placehold.co/100x100?text=SHV"
  },
  {
    id: "2",
    name: "Digital Health Innovation Grant",
    type: "Grant",
    amount: "$50,000 - $150,000",
    deadline: "June 15, 2025",
    daysLeft: 12,
    status: "open",
    categories: ["AI in Healthcare", "Patient Monitoring"],
    description: "Non-dilutive funding for AI-powered healthcare solutions with demonstrable impact.",
    organization: "Ministry of Health Innovation Fund",
    logo: "https://placehold.co/100x100?text=MoH"
  },
  {
    id: "3",
    name: "MedTech Accelerator Program",
    type: "Accelerator",
    amount: "$75,000 + mentorship",
    deadline: "August 20, 2025",
    daysLeft: 62,
    status: "upcoming",
    categories: ["Medical Devices", "Diagnostics"],
    description: "Intensive 12-week accelerator program for innovative medical device startups.",
    organization: "Saudi Med Innovation Hub",
    logo: "https://placehold.co/100x100?text=SMIH"
  }
];

const investors = [
  {
    id: "1",
    name: "Vision Health Ventures",
    focus: ["Digital Health", "Telemedicine", "Health Data"],
    stage: ["Seed", "Series A"],
    totalInvested: "$45M",
    description: "Early-stage venture fund focused on healthcare technology across MENA region.",
    logo: "https://placehold.co/100x100?text=VHV",
    deals: 18
  },
  {
    id: "2",
    name: "MedTech Capital Partners",
    focus: ["Medical Devices", "Diagnostics", "Healthcare IoT"],
    stage: ["Series A", "Series B"],
    totalInvested: "$120M",
    description: "Growth-stage investor specializing in medical technology and devices.",
    logo: "https://placehold.co/100x100?text=MCP",
    deals: 24
  },
  {
    id: "3",
    name: "Saudi Health Innovation Fund",
    focus: ["Biotech", "Pharma", "Healthcare Services"],
    stage: ["Seed", "Series A", "Series B"],
    totalInvested: "$80M",
    description: "Government-backed fund supporting healthcare initiatives aligned with Vision 2030.",
    logo: "https://placehold.co/100x100?text=SHIF",
    deals: 32
  }
];

export function InvestmentFeaturedOpportunities() {
  const [activeTab, setActiveTab] = useState("funding");
  
  return (
    <section className="py-16 bg-moh-lightGreen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge className="bg-moh-lightGreen text-moh-darkGreen mb-3">OPPORTUNITIES</Badge>
          <h2 className="text-3xl font-bold text-moh-darkGreen mb-3">Featured Investment Opportunities</h2>
          <p className="text-moh-green max-w-2xl mx-auto">
            Explore curated funding rounds and connect with leading healthcare investors actively seeking innovations.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger 
                value="funding" 
                className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
              >
                Funding Rounds
              </TabsTrigger>
              <TabsTrigger 
                value="investors" 
                className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
              >
                Active Investors
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="funding">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fundingRounds.map((round, index) => (
                <motion.div 
                  key={round.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          {round.status === "open" ? (
                            <Badge className="bg-moh-green mb-3">Open</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-moh-lightGreen text-moh-darkGreen mb-3">Upcoming</Badge>
                          )}
                          <h3 className="font-semibold text-lg text-moh-darkGreen">{round.name}</h3>
                        </div>
                        <div className="flex-shrink-0 h-12 w-12 bg-moh-lightGreen rounded-full flex items-center justify-center overflow-hidden">
                          <img src={round.logo} alt={round.organization} className="h-full w-full object-cover" />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{round.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2 text-moh-green" />
                          <span className="font-medium text-moh-darkGreen">{round.amount}</span>
                          <span className="mx-2">•</span>
                          <span>{round.type}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-moh-green" />
                          <span>Deadline: {round.deadline}</span>
                          <span className="ml-2 text-xs bg-moh-lightGreen text-moh-darkGreen px-2 py-0.5 rounded-full">
                            {round.daysLeft} days left
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Target className="h-4 w-4 mr-2 text-moh-green" />
                          {round.categories.join(", ")}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {round.categories.map((category, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-moh-lightGreen text-moh-darkGreen px-2 py-1 rounded"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto p-4 bg-moh-lightGreen border-t">
                      {round.status === "open" ? (
                        <Button 
                          className="w-full bg-moh-green hover:bg-moh-darkGreen"
                          asChild
                        >
                          <Link to={`/dashboard/investment?program=${round.id}`} className="flex items-center justify-center">
                            Apply Now
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      ) : (
                        <Button 
                          className="w-full border-moh-green/30 text-moh-green bg-white hover:bg-moh-lightGreen"
                          variant="outline"
                          asChild
                        >
                          <Link to={`/dashboard/investment?program=${round.id}`}>
                            Set Reminder
                          </Link>
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button 
                className="bg-moh-green hover:bg-moh-darkGreen"
                size="lg"
                asChild
              >
                <Link to="/dashboard/investment">
                  View All Funding Opportunities
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="investors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investors.map((investor, index) => (
                <motion.div 
                  key={investor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="h-16 w-16 bg-moh-lightGreen rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img src={investor.logo} alt={investor.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-moh-darkGreen">{investor.name}</h3>
                          <p className="text-sm text-gray-500">Active Healthcare Investor</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{investor.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Target className="h-4 w-4 mr-2 text-moh-green" />
                          <span className="font-medium">Focus:</span> 
                          <span className="ml-1">{investor.focus.join(", ")}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2 text-moh-green" />
                          <span className="font-medium">Total Invested:</span>
                          <span className="ml-1">{investor.totalInvested}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-moh-green" />
                          <span className="font-medium">Stage:</span>
                          <span className="ml-1">{investor.stage.join(", ")}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-moh-green" />
                          <span className="font-medium">Deals:</span>
                          <span className="ml-1">{investor.deals} completed</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {investor.focus.map((area, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-moh-lightGreen text-moh-darkGreen px-2 py-1 rounded"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto p-4 bg-moh-lightGreen border-t">
                      <Button 
                        className="w-full bg-moh-green hover:bg-moh-darkGreen"
                        asChild
                      >
                        <Link to={`/dashboard/investment?investor=${investor.id}`} className="flex items-center justify-center">
                          View Investor Profile
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button 
                className="bg-moh-green hover:bg-moh-darkGreen"
                size="lg"
                asChild
              >
                <Link to="/dashboard/investment">
                  Browse All Investors
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
