
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Lightbulb, LineChart, BarChart3, Users, FileText, Target } from "lucide-react";
import { Link } from "react-router-dom";

interface InvestmentTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function InvestmentTabs({ activeTab, setActiveTab }: InvestmentTabsProps) {
  // Define the fadeIn animation variant properly
  const fadeIn = {
    initial: { 
      opacity: 0, 
      y: 10 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4 
      } 
    }
  };
  
  return (
    <Tabs defaultValue={activeTab} id="investment-opportunities" className="mb-12" onValueChange={setActiveTab}>
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-purple-100">
          <TabsTrigger 
            value="startups"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            For Startups
          </TabsTrigger>
          <TabsTrigger 
            value="investors"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            For Investors
          </TabsTrigger>
          <TabsTrigger 
            value="resources"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Resources
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="startups" className="mt-6">
        <motion.div 
          className="grid gap-6 md:grid-cols-2"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={fadeIn}>
            <Card className="p-6 border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <LineChart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Funding Opportunities</h3>
                  <p className="text-gray-600 mb-4">Access targeted funding opportunities aligned with your healthcare innovation stage and domain.</p>
                </div>
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 w-full"
                asChild
              >
                <Link to="/dashboard/investment" className="flex items-center justify-center">
                  Find Opportunities
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Card className="p-6 border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Investor Matching</h3>
                  <p className="text-gray-600 mb-4">Get matched with investors who specialize in your area of healthcare innovation.</p>
                </div>
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 w-full"
                asChild
              >
                <Link to="/dashboard/investment" className="flex items-center justify-center">
                  Connect with Investors
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Card className="p-6 border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pitch Resources</h3>
                  <p className="text-gray-600 mb-4">Access tools and templates to create compelling investment pitches.</p>
                </div>
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 w-full"
                asChild
              >
                <Link to="/dashboard/investment" className="flex items-center justify-center">
                  View Resources
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Card className="p-6 border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Growth Guidance</h3>
                  <p className="text-gray-600 mb-4">Receive tailored guidance on scaling your healthcare startup.</p>
                </div>
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 w-full"
                asChild
              >
                <Link to="/dashboard/investment" className="flex items-center justify-center">
                  Get Guidance
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </TabsContent>
      
      <TabsContent value="investors" className="mt-6">
        <motion.div 
          className="grid gap-6 md:grid-cols-2"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={fadeIn}>
            <Card className="p-6 border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <BarChart3 className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Deal Flow</h3>
                  <p className="text-gray-600 mb-4">Access a curated pipeline of vetted healthcare innovations ready for investment.</p>
                </div>
              </div>
              <Button 
                className="bg-indigo-500 hover:bg-indigo-600 w-full"
                asChild
              >
                <Link to="/dashboard/investment" className="flex items-center justify-center">
                  View Opportunities
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Card className="p-6 border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Due Diligence Support</h3>
                  <p className="text-gray-600 mb-4">Get comprehensive due diligence resources for healthcare innovation investments.</p>
                </div>
              </div>
              <Button 
                className="bg-indigo-500 hover:bg-indigo-600 w-full"
                asChild
              >
                <Link to="/dashboard/investment" className="flex items-center justify-center">
                  Access Tools
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Card className="p-6 border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <LineChart className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Market Intelligence</h3>
                  <p className="text-gray-600 mb-4">Stay informed with the latest trends and opportunities in healthcare innovation.</p>
                </div>
              </div>
              <Button 
                className="bg-indigo-500 hover:bg-indigo-600 w-full"
                asChild
              >
                <Link to="/dashboard/investment" className="flex items-center justify-center">
                  View Reports
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Card className="p-6 border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Co-Investment Network</h3>
                  <p className="text-gray-600 mb-4">Connect with other investors for healthcare innovation co-investment opportunities.</p>
                </div>
              </div>
              <Button 
                className="bg-indigo-500 hover:bg-indigo-600 w-full"
                asChild
              >
                <Link to="/dashboard/investment" className="flex items-center justify-center">
                  Join Network
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </TabsContent>
      
      <TabsContent value="resources" className="mt-6">
        <motion.div 
          className="space-y-6"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={fadeIn}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold flex items-center mb-3">
                <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                Investment Guides
              </h3>
              <p className="mb-4 text-gray-600">Comprehensive guides for healthcare innovation investment strategies.</p>
              <div className="grid gap-2 md:grid-cols-2 mb-6">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <h4 className="font-medium">Early-stage Investment Guide</h4>
                  <p className="text-sm text-gray-500">For seed to Series A investments</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <h4 className="font-medium">Digital Health Investment Framework</h4>
                  <p className="text-sm text-gray-500">Evaluating digital health solutions</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <h4 className="font-medium">Medical Device Investment Strategy</h4>
                  <p className="text-sm text-gray-500">For innovative medical devices</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <h4 className="font-medium">Biotech Investment Risk Assessment</h4>
                  <p className="text-sm text-gray-500">Managing biotech investment risks</p>
                </div>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                Access Guides
              </Button>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold flex items-center mb-3">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Funding Events
              </h3>
              <p className="mb-4 text-gray-600">Upcoming pitch events, investor meetings and funding workshops.</p>
              <div className="space-y-4 mb-6">
                <div className="border-b pb-3">
                  <div className="flex justify-between">
                    <p className="font-medium">Healthcare Investment Summit</p>
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded">Upcoming</span>
                  </div>
                  <p className="text-sm text-gray-500">June 15-16, 2025 • Riyadh</p>
                </div>
                <div className="border-b pb-3">
                  <div className="flex justify-between">
                    <p className="font-medium">Digital Health Investor Showcase</p>
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Virtual</span>
                  </div>
                  <p className="text-sm text-gray-500">July 23, 2025 • Online</p>
                </div>
                <div className="border-b pb-3">
                  <div className="flex justify-between">
                    <p className="font-medium">Medical Innovation Funding Workshop</p>
                    <span className="text-sm bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Registration Open</span>
                  </div>
                  <p className="text-sm text-gray-500">August 10, 2025 • Jeddah</p>
                </div>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                View All Events
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}
