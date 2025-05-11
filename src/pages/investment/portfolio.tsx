
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, Search, Star, ArrowUpRight, TrendingUp, ChevronRight, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

// Mock portfolio data
const portfolioItems = [
  {
    id: 1,
    name: "MediTech Solutions",
    logo: "/lovable-uploads/8740809b-3739-46bc-927a-4787dc7ca177.png",
    sector: "Digital Health",
    stage: "Series A",
    investmentAmount: "$1.5M",
    roi: "+32%",
    date: "Jan 2023",
    trend: "up",
    status: "active"
  },
  {
    id: 2,
    name: "GenomicAI",
    logo: "/lovable-uploads/d5f3d02d-fd0b-43f5-ba20-ca6d566850df.png",
    sector: "AI/ML",
    stage: "Seed",
    investmentAmount: "$750K",
    roi: "+18%",
    date: "Mar 2023",
    trend: "up",
    status: "active"
  },
  {
    id: 3,
    name: "SmartDiagnosis",
    logo: "/lovable-uploads/f997b965-bd17-4e6d-ba9c-af09c86b0eb0.png",
    sector: "Telehealth",
    stage: "Series B",
    investmentAmount: "$3.2M",
    roi: "+45%",
    date: "Nov 2022",
    trend: "up",
    status: "active"
  },
  {
    id: 4,
    name: "BioDevices",
    logo: "/lovable-uploads/fc6609f7-b2c9-4eb5-8a3a-6baa876025c7.png", 
    sector: "Medical Devices",
    stage: "Series A",
    investmentAmount: "$2.1M",
    roi: "-5%",
    date: "Jun 2023",
    trend: "down",
    status: "watching"
  },
  {
    id: 5,
    name: "PharmaGen",
    logo: "/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png",
    sector: "Biotech",
    stage: "Series C",
    investmentAmount: "$5M",
    roi: "+8%",
    date: "Feb 2023",
    trend: "stable",
    status: "active"
  }
];

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter portfolio based on search and active tab
  const filteredPortfolio = portfolioItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.sector.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && item.status === "active";
    if (activeTab === "watching") return matchesSearch && item.status === "watching";
    
    return false;
  });
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Add the missing itemVariants variable
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
        <p className="text-muted-foreground">
          Manage and track your healthcare investment portfolio
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search portfolio..." 
            className="pl-8 border-moh-green/20 focus-visible:ring-moh-green/30" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="border-moh-green/30 text-moh-green hover:bg-moh-lightGreen">
            <BarChart3 className="h-4 w-4 mr-2" />
            Performance Report
          </Button>
          <Button className="bg-moh-green hover:bg-moh-darkGreen">
            <Briefcase className="h-4 w-4 mr-2" />
            Add Investment
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-moh-lightGreen/50 border-moh-green/10 p-1">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen"
          >
            All Investments
          </TabsTrigger>
          <TabsTrigger 
            value="active"
            className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen"
          >
            Active
          </TabsTrigger>
          <TabsTrigger 
            value="watching"
            className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen"
          >
            Watching
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPortfolio.map((investment) => (
              <PortfolioCard key={investment.id} investment={investment} />
            ))}
            
            {filteredPortfolio.length === 0 && (
              <motion.div 
                className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground"
                variants={itemVariants}
              >
                <Briefcase className="h-12 w-12 mb-2 text-moh-green/30" />
                <p className="text-lg font-medium">No investments found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </motion.div>
            )}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="active" className="pt-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPortfolio.map((investment) => (
              <PortfolioCard key={investment.id} investment={investment} />
            ))}
            
            {filteredPortfolio.length === 0 && (
              <motion.div 
                className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground"
                variants={itemVariants}
              >
                <Briefcase className="h-12 w-12 mb-2 text-moh-green/30" />
                <p className="text-lg font-medium">No active investments found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </motion.div>
            )}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="watching" className="pt-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPortfolio.map((investment) => (
              <PortfolioCard key={investment.id} investment={investment} />
            ))}
            
            {filteredPortfolio.length === 0 && (
              <motion.div 
                className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground"
                variants={itemVariants}
              >
                <Briefcase className="h-12 w-12 mb-2 text-moh-green/30" />
                <p className="text-lg font-medium">No watching investments found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </motion.div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-moh-green/10 overflow-hidden shadow-md">
          <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
            <CardTitle className="text-xl font-playfair text-moh-darkGreen">Portfolio Summary</CardTitle>
            <CardDescription>Total investments: {portfolioItems.length}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-moh-lightGreen/20 p-4 rounded-lg border border-moh-green/10">
                <div className="text-sm text-muted-foreground">Total Invested</div>
                <div className="text-2xl font-bold text-moh-darkGreen mt-1">$12.55M</div>
              </div>
              
              <div className="bg-moh-lightGold/20 p-4 rounded-lg border border-moh-gold/10">
                <div className="text-sm text-muted-foreground">Average ROI</div>
                <div className="text-2xl font-bold text-moh-darkGreen mt-1">+21.3%</div>
              </div>
              
              <div className="bg-moh-lightGreen/20 p-4 rounded-lg border border-moh-green/10">
                <div className="text-sm text-muted-foreground">Leading Sector</div>
                <div className="text-2xl font-bold text-moh-darkGreen mt-1">Digital Health</div>
              </div>
              
              <div className="bg-moh-lightGold/20 p-4 rounded-lg border border-moh-gold/10">
                <div className="text-sm text-muted-foreground">Top Performing</div>
                <div className="text-2xl font-bold text-moh-darkGreen mt-1">SmartDiagnosis</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-4">
            <Button variant="outline" className="w-full border-moh-green/20 text-moh-darkGreen">
              <BarChart3 className="h-4 w-4 mr-2 text-moh-green" />
              View Detailed Analytics
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

// Portfolio Card Component
function PortfolioCard({ investment }: { investment: typeof portfolioItems[0] }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="border-moh-green/10 overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-moh-green/10">
                <AvatarImage src={investment.logo} alt={investment.name} />
                <AvatarFallback className="bg-moh-lightGreen text-moh-darkGreen">
                  {investment.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{investment.name}</CardTitle>
                <div className="flex gap-2 mt-1">
                  <Badge 
                    variant="outline" 
                    className="text-xs border-moh-green/20 bg-moh-lightGreen/10"
                  >
                    {investment.sector}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="text-xs border-moh-gold/20 bg-moh-lightGold/10"
                  >
                    {investment.stage}
                  </Badge>
                </div>
              </div>
            </div>
            {investment.status === "active" && (
              <Star size={16} className="text-moh-gold fill-moh-gold" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Investment</div>
              <div className="font-medium">{investment.investmentAmount}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Date</div>
              <div className="font-medium">{investment.date}</div>
            </div>
            <div>
              <div className="text-muted-foreground">ROI</div>
              <div className={`font-medium flex items-center ${
                investment.roi.startsWith("+") ? "text-green-600" : 
                investment.roi.startsWith("-") ? "text-red-500" : ""
              }`}>
                {investment.roi}
                {investment.trend === "up" && <TrendingUp size={14} className="ml-1 text-green-600" />}
                {investment.trend === "down" && <TrendingUp size={14} className="ml-1 text-red-500 rotate-180" />}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Status</div>
              <div className="font-medium capitalize">{investment.status}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="ghost" className="w-full hover:bg-moh-lightGreen/30 hover:text-moh-darkGreen">
            View Details
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
