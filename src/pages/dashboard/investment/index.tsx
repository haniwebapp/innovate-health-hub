
import React from 'react';
import MedicalDashboard from "@/components/layouts/MedicalDashboard";
import { MedicalCard, MedicalCardHeader, MedicalCardTitle, MedicalCardDescription, MedicalCardContent } from "@/components/ui/medical-card";
import { MedicalButton } from "@/components/ui/medical-button";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Users, Calendar, ChevronRight, Zap, LineChart, ArrowUpRight, PieChart } from "lucide-react";

export default function DashboardInvestmentPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <MedicalDashboard>
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-moh-darkGreen">Healthcare Investment</h1>
            <p className="text-muted-foreground mt-1">Manage your investment opportunities and portfolio in healthcare innovation</p>
          </div>
          <MedicalButton variant="gold" className="self-start">
            <Zap className="h-4 w-4" />
            New Investment
          </MedicalButton>
        </motion.div>
        
        {/* Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Total Portfolio Value */}
          <MedicalCard className="border-moh-green/20">
            <MedicalCardHeader className="flex flex-row items-center justify-between pb-2">
              <MedicalCardTitle className="text-lg font-medium">Portfolio Value</MedicalCardTitle>
              <DollarSign className="h-5 w-5 text-moh-green opacity-70" />
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="text-3xl font-bold text-moh-darkGreen">$3.4M</div>
              <p className="text-xs text-muted-foreground mt-1">Across 5 investments</p>
              <div className="flex items-center mt-4">
                <div className="text-xs flex items-center text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5%
                </div>
                <div className="text-xs text-muted-foreground ml-2">
                  from last month
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
          
          {/* Opportunities */}
          <MedicalCard className="border-moh-green/20">
            <MedicalCardHeader className="flex flex-row items-center justify-between pb-2">
              <MedicalCardTitle className="text-lg font-medium">Opportunities</MedicalCardTitle>
              <LineChart className="h-5 w-5 text-moh-gold opacity-70" />
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="text-3xl font-bold text-moh-darkGreen">42</div>
              <p className="text-xs text-muted-foreground mt-1">Active investment opportunities</p>
              <div className="flex items-center mt-4">
                <div className="text-xs flex items-center text-moh-green">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  8 new this week
                </div>
                <div className="text-xs text-muted-foreground ml-2">
                  in your focus areas
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
          
          {/* AI Matches */}
          <MedicalCard className="border-moh-green/20">
            <MedicalCardHeader className="flex flex-row items-center justify-between pb-2">
              <MedicalCardTitle className="text-lg font-medium">AI Matches</MedicalCardTitle>
              <Zap className="h-5 w-5 text-amber-500 opacity-70" />
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="text-3xl font-bold text-moh-darkGreen">16</div>
              <p className="text-xs text-muted-foreground mt-1">High-quality match recommendations</p>
              <div className="flex items-center mt-4">
                <div className="text-xs flex items-center text-moh-gold">
                  <Users className="h-3 w-3 mr-1" />
                  3 perfect matches
                </div>
                <div className="text-xs text-muted-foreground ml-2">
                  above 90% compatibility
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
          
          {/* Upcoming Deadlines */}
          <MedicalCard className="border-moh-green/20">
            <MedicalCardHeader className="flex flex-row items-center justify-between pb-2">
              <MedicalCardTitle className="text-lg font-medium">Deadlines</MedicalCardTitle>
              <Calendar className="h-5 w-5 text-moh-darkGreen opacity-70" />
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="text-3xl font-bold text-moh-darkGreen">5</div>
              <p className="text-xs text-muted-foreground mt-1">Upcoming funding deadlines</p>
              <div className="flex items-center mt-4">
                <div className="text-xs flex items-center text-amber-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  2 this week
                </div>
                <div className="text-xs text-muted-foreground ml-2">
                  requiring immediate action
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </motion.div>
        
        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <MedicalCard className="border-moh-green/20">
              <MedicalCardHeader>
                <div className="flex justify-between items-center">
                  <MedicalCardTitle>Investment Opportunities</MedicalCardTitle>
                  <MedicalButton variant="outline" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </MedicalButton>
                </div>
                <MedicalCardDescription>Recent healthcare investment opportunities matching your profile</MedicalCardDescription>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-5">
                  {[
                    {
                      title: "Remote Patient Monitoring Platform",
                      type: "Digital Health",
                      stage: "Series A",
                      amount: "$2.5M",
                      match: "94%",
                      deadline: "May 30, 2025"
                    },
                    {
                      title: "AI-Driven Medical Diagnostics Solution",
                      type: "MedTech/AI",
                      stage: "Seed",
                      amount: "$500K",
                      match: "89%",
                      deadline: "June 15, 2025"
                    },
                    {
                      title: "Wearable Health Monitoring Device",
                      type: "Medical Devices",
                      stage: "Series B",
                      amount: "$4M",
                      match: "82%",
                      deadline: "June 5, 2025"
                    },
                  ].map((opportunity, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="mb-3 sm:mb-0">
                        <h3 className="font-medium text-moh-darkGreen">{opportunity.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-moh-lightGreen text-moh-darkGreen text-xs px-2 py-1 rounded">
                            {opportunity.type}
                          </span>
                          <span className="bg-moh-lightGold/50 text-moh-darkGold text-xs px-2 py-1 rounded">
                            {opportunity.stage}
                          </span>
                          <span className="text-xs text-gray-500">
                            {opportunity.amount}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="bg-moh-lightGreen p-2 rounded text-center min-w-[70px]">
                          <div className="text-xs text-moh-darkGreen">Match</div>
                          <div className="font-medium text-moh-green flex items-center justify-center">
                            {opportunity.match}
                            <TrendingUp className="h-3 w-3 ml-1" />
                          </div>
                        </div>
                        <MedicalButton size="sm" variant="outline">
                          View
                        </MedicalButton>
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </motion.div>
          
          {/* Investment Breakdown */}
          <motion.div variants={itemVariants}>
            <MedicalCard className="border-moh-green/20">
              <MedicalCardHeader>
                <MedicalCardTitle>Portfolio Breakdown</MedicalCardTitle>
                <MedicalCardDescription>Allocation across healthcare sectors</MedicalCardDescription>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="flex justify-center pb-4">
                  <PieChart className="h-32 w-32 text-moh-green opacity-80" />
                </div>
                
                <div className="space-y-3 mt-4">
                  {[
                    { label: "Digital Health", value: "42%", color: "bg-moh-green" },
                    { label: "Medical Devices", value: "28%", color: "bg-moh-gold" },
                    { label: "Biotech", value: "16%", color: "bg-blue-500" },
                    { label: "Health AI", value: "14%", color: "bg-purple-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full ${item.color} mr-2`}></div>
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                
                <MedicalButton variant="outline" className="w-full mt-6" size="sm">
                  View Portfolio Details
                </MedicalButton>
              </MedicalCardContent>
            </MedicalCard>
          </motion.div>
        </div>
        
        {/* Bottom Section */}
        <motion.div variants={itemVariants}>
          <MedicalCard className="border-moh-green/20" gradient>
            <MedicalCardHeader>
              <div className="flex justify-between items-center">
                <MedicalCardTitle>Market Analysis</MedicalCardTitle>
                <MedicalButton variant="outline" size="sm">
                  Full Report
                  <ChevronRight className="h-4 w-4" />
                </MedicalButton>
              </div>
              <MedicalCardDescription>Healthcare investment trends and opportunities</MedicalCardDescription>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/60 p-4 rounded shadow-sm">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-moh-green mr-2" />
                    <h3 className="font-medium">Growth Areas</h3>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-moh-green"></span>
                      Remote patient monitoring (+24%)
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-moh-green"></span>
                      AI-driven diagnostics (+19%)
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-moh-green"></span>
                      Mental health tech (+16%)
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/60 p-4 rounded shadow-sm">
                  <div className="flex items-center mb-2">
                    <BarChart3 className="h-5 w-5 text-moh-gold mr-2" />
                    <h3 className="font-medium">Investment Stages</h3>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-moh-gold"></span>
                      Seed stage focus in Q3 2025
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-moh-gold"></span>
                      Series A rounds increasing 12%
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-moh-gold"></span>
                      Strategic acquisitions rising
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/60 p-4 rounded shadow-sm">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-moh-darkGreen mr-2" />
                    <h3 className="font-medium">Investor Activity</h3>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-moh-darkGreen"></span>
                      New Saudi healthcare fund launched
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-moh-darkGreen"></span>
                      International partnerships up 8%
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-moh-darkGreen"></span>
                      Strategic corporate investing
                    </li>
                  </ul>
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </motion.div>
      </motion.div>
    </MedicalDashboard>
  );
}
