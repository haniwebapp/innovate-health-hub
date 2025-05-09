import { useState } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileSpreadsheet,
  GraduationCap,
  Handshake,
  HelpCircle,
  LineChart,
  ListChecks,
  Lightbulb,
  Presentation,
  Search,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function InvestmentPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("opportunities");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  // Mock data for investment opportunities
  const investmentOpportunities = [
    {
      id: 1,
      title: "AI-Powered Diagnostic Platform",
      category: "Digital Health",
      stage: "Series A",
      fundingGoal: "$5M",
      location: "Riyadh",
      description:
        "An AI platform that analyzes medical images to assist radiologists in early detection of diseases.",
      tags: ["AI", "Radiology", "SaaS"],
      roi: "3.5x",
      timeline: "18-24 months",
      featured: true,
    },
    {
      id: 2,
      title: "Remote Patient Monitoring System",
      category: "Telehealth",
      stage: "Seed",
      fundingGoal: "$1.2M",
      location: "Jeddah",
      description:
        "IoT-enabled devices that monitor patient vitals at home and transmit data to healthcare providers.",
      tags: ["IoT", "Remote Care", "Hardware"],
      roi: "2.8x",
      timeline: "12-18 months",
      featured: false,
    },
    {
      id: 3,
      title: "Healthcare Staffing Marketplace",
      category: "Healthcare Services",
      stage: "Series B",
      fundingGoal: "$12M",
      location: "Dammam",
      description:
        "Platform connecting healthcare facilities with qualified medical professionals for temporary staffing needs.",
      tags: ["Marketplace", "Staffing", "B2B"],
      roi: "4.2x",
      timeline: "24-36 months",
      featured: true,
    },
    {
      id: 4,
      title: "Medical Supply Chain Management",
      category: "Healthcare IT",
      stage: "Pre-seed",
      fundingGoal: "$800K",
      location: "Riyadh",
      description:
        "Blockchain-based solution for tracking medical supplies from manufacturer to patient.",
      tags: ["Blockchain", "Supply Chain", "B2B"],
      roi: "3.0x",
      timeline: "12-18 months",
      featured: false,
    },
  ];

  // Mock data for funding programs
  const fundingPrograms = [
    {
      id: 1,
      title: "Healthcare Innovation Fund",
      type: "Venture Capital",
      focus: "Digital Health Solutions",
      fundSize: "$50M",
      investmentRange: "$1M - $5M",
      applicationDeadline: "Ongoing",
      description:
        "Investing in early to mid-stage healthcare technology companies with proven traction.",
      eligibility: ["Established company", "Minimum viable product", "Revenue generating"],
      featured: true,
    },
    {
      id: 2,
      title: "MedTech Accelerator Program",
      type: "Accelerator",
      focus: "Medical Devices",
      fundSize: "$10M",
      investmentRange: "$100K - $500K",
      applicationDeadline: "March 15, 2024",
      description:
        "6-month accelerator program providing funding, mentorship, and resources for medical device startups.",
      eligibility: ["Early-stage startups", "Prototype ready", "Saudi-based"],
      featured: false,
    },
    {
      id: 3,
      title: "Health Research Grant",
      type: "Government Grant",
      focus: "Clinical Research",
      fundSize: "$30M",
      investmentRange: "$250K - $2M",
      applicationDeadline: "April 30, 2024",
      description:
        "Non-dilutive funding for research projects addressing key healthcare challenges in Saudi Arabia.",
      eligibility: ["Research institutions", "Universities", "Clinical partners"],
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold relative py-12">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-moh-darkGreen">
                {t("investment.title") || "Healthcare Investment Hub"}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                {t("investment.subtitle") ||
                  "Connect with investment opportunities and funding resources for healthcare innovation"}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-moh-green hover:bg-moh-darkGreen text-white flex items-center gap-2">
                  <Building2 size={18} />
                  For Investors
                </Button>

                <Button
                  variant="outline"
                  className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20 flex items-center gap-2"
                >
                  <Lightbulb size={18} />
                  For Innovators
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content with tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs
              defaultValue="opportunities"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
                  <TabsTrigger value="opportunities" className="flex items-center gap-2">
                    <CircleDollarSign size={16} />
                    <span className="hidden sm:inline">Investment</span> Opportunities
                  </TabsTrigger>
                  <TabsTrigger value="programs" className="flex items-center gap-2">
                    <FileSpreadsheet size={16} />
                    <span className="hidden sm:inline">Funding</span> Programs
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="flex items-center gap-2">
                    <GraduationCap size={16} />
                    <span className="hidden sm:inline">Investor</span> Resources
                  </TabsTrigger>
                  <TabsTrigger value="events" className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="hidden sm:inline">Investment</span> Events
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Investment Opportunities Tab */}
              <TabsContent value="opportunities" className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 w-full md:max-w-md">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input placeholder="Search opportunities..." className="pl-10" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Select>
                              <SelectTrigger className="w-[160px] bg-white">
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="digital-health">Digital Health</SelectItem>
                                <SelectItem value="telehealth">Telehealth</SelectItem>
                                <SelectItem value="healthcare-it">Healthcare IT</SelectItem>
                                <SelectItem value="medical-devices">Medical Devices</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Filter by investment category</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Select>
                              <SelectTrigger className="w-[160px] bg-white">
                                <SelectValue placeholder="Funding Stage" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Stages</SelectItem>
                                <SelectItem value="pre-seed">Pre-seed</SelectItem>
                                <SelectItem value="seed">Seed</SelectItem>
                                <SelectItem value="series-a">Series A</SelectItem>
                                <SelectItem value="series-b">Series B+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Filter by funding stage</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Select>
                              <SelectTrigger className="w-[160px] bg-white">
                                <SelectValue placeholder="Sort by" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="funding-goal">Funding Goal</SelectItem>
                                <SelectItem value="roi">Highest ROI</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Sort opportunities by different criteria</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {investmentOpportunities.map((opportunity) => (
                    <motion.div key={opportunity.id} variants={itemVariants}>
                      <Card className="overflow-hidden h-full border-gray-200 hover:border-moh-green transition-colors duration-300 hover:shadow-md">
                        <div className="bg-gradient-to-r from-moh-lightGreen to-moh-lightGold h-2" />
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <Badge
                                variant="outline"
                                className="bg-moh-lightGreen/20 text-moh-darkGreen border-moh-lightGreen mb-2"
                              >
                                {opportunity.category}
                              </Badge>
                              <h3 className="text-xl font-semibold text-moh-darkGreen">
                                {opportunity.title}
                              </h3>
                            </div>
                            {opportunity.featured && (
                              <Badge className="bg-moh-gold text-white">Featured</Badge>
                            )}
                          </div>

                          <p className="text-gray-600 mb-4 line-clamp-3">{opportunity.description}</p>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Funding Goal</p>
                              <p className="font-medium text-moh-darkGreen">{opportunity.fundingGoal}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Stage</p>
                              <p className="font-medium text-moh-darkGreen">{opportunity.stage}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Expected ROI</p>
                              <p className="font-medium text-moh-darkGreen">{opportunity.roi}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Timeline</p>
                              <p className="font-medium text-moh-darkGreen">{opportunity.timeline}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {opportunity.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-gray-50 text-gray-700"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="text-sm text-gray-500">{opportunity.location}</div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                            >
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                  >
                    Load More Opportunities
                  </Button>
                </div>
              </TabsContent>

              {/* Funding Programs Tab */}
              <TabsContent value="programs" className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 w-full md:max-w-md">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input placeholder="Search funding programs..." className="pl-10" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
                    <Select>
                      <SelectTrigger className="w-[160px] bg-white">
                        <SelectValue placeholder="Program Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="venture-capital">Venture Capital</SelectItem>
                        <SelectItem value="accelerator">Accelerator</SelectItem>
                        <SelectItem value="grant">Government Grant</SelectItem>
                        <SelectItem value="angel">Angel Investment</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="w-[160px] bg-white">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deadline">Application Deadline</SelectItem>
                        <SelectItem value="fund-size">Fund Size</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {fundingPrograms.map((program) => (
                    <motion.div key={program.id} variants={itemVariants}>
                      <Card className="overflow-hidden h-full border-gray-200 hover:border-moh-green transition-colors duration-300 hover:shadow-md">
                        <div
                          className={`h-2 ${
                            program.type === "Venture Capital"
                              ? "bg-moh-green"
                              : program.type === "Accelerator"
                              ? "bg-moh-gold"
                              : "bg-blue-500"
                          }`}
                        />
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <Badge
                                variant="outline"
                                className={`mb-2 ${
                                  program.type === "Venture Capital"
                                    ? "bg-moh-lightGreen/20 text-moh-darkGreen border-moh-lightGreen"
                                    : program.type === "Accelerator"
                                    ? "bg-moh-lightGold/20 text-moh-darkGold border-moh-lightGold"
                                    : "bg-blue-100 text-blue-700 border-blue-300"
                                }`}
                              >
                                {program.type}
                              </Badge>
                              <h3 className="text-xl font-semibold text-moh-darkGreen">
                                {program.title}
                              </h3>
                            </div>
                            {program.featured && (
                              <Badge className="bg-moh-gold text-white">Featured</Badge>
                            )}
                          </div>

                          <p className="text-gray-600 mb-4">{program.description}</p>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Focus Area</p>
                              <p className="font-medium text-moh-darkGreen">{program.focus}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Fund Size</p>
                              <p className="font-medium text-moh-darkGreen">{program.fundSize}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Investment Range</p>
                              <p className="font-medium text-moh-darkGreen">
                                {program.investmentRange}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Application Deadline</p>
                              <p className="font-medium text-moh-darkGreen">
                                {program.applicationDeadline}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">Eligibility</p>
                            <ul className="space-y-1">
                              {program.eligibility.map((item, index) => (
                                <li key={index} className="flex items-center text-sm text-gray-700">
                                  <CheckCircle2
                                    size={14}
                                    className="text-moh-green mr-2 flex-shrink-0"
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                            >
                              Apply Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                  >
                    View All Programs
                  </Button>
                </div>
              </TabsContent>

              {/* Investor Resources Tab */}
              <TabsContent value="resources" className="space-y-8">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-moh-lightGreen/20 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-moh-darkGreen mb-4">
                      Investor Resources
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Access valuable resources to help you make informed investment decisions in the
                      Saudi healthcare sector. From market reports to due diligence guides, we
                      provide the tools you need to identify promising opportunities.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="outline" className="bg-white">
                        Market Analysis
                      </Badge>
                      <Badge variant="outline" className="bg-white">
                        Due Diligence
                      </Badge>
                      <Badge variant="outline" className="bg-white">
                        Regulatory Guides
                      </Badge>
                      <Badge variant="outline" className="bg-white">
                        Investment Templates
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-moh-lightGreen/30 p-3 rounded-lg">
                            <BarChart3 className="h-6 w-6 text-moh-green" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-moh-darkGreen mb-2">
                              Healthcare Market Reports
                            </h4>
                            <p className="text-gray-600 mb-4">
                              Comprehensive analysis of the Saudi healthcare market, including growth
                              trends, emerging sectors, and investment opportunities.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="outline" className="bg-gray-50">
                                2024 Market Outlook
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50">
                                Digital Health Trends
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50">
                                Medical Devices Sector
                              </Badge>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                            >
                              Access Reports
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-moh-lightGold/30 p-3 rounded-lg">
                            <ListChecks className="h-6 w-6 text-moh-darkGold" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-moh-darkGreen mb-2">
                              Due Diligence Toolkit
                            </h4>
                            <p className="text-gray-600 mb-4">
                              Comprehensive resources to help investors evaluate healthcare startups
                              and innovations, including checklists, templates, and best practices.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="outline" className="bg-gray-50">
                                Technical Assessment
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50">
                                Market Validation
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50">
                                Regulatory Compliance
                              </Badge>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                            >
                              Download Toolkit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <Presentation className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-moh-darkGreen mb-2">
                              Investor Education Series
                            </h4>
                            <p className="text-gray-600 mb-4">
                              Educational resources designed to help investors understand the unique
                              aspects of healthcare investments in Saudi Arabia.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="outline" className="bg-gray-50">
                                Webinars
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50">
                                Case Studies
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50">
                                Expert Interviews
                              </Badge>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                            >
                              Explore Series
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-gradient-to-r from-moh-lightGreen to-moh-lightGold p-6 rounded-lg">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h3 className="text-xl font-semibold text-moh-darkGreen mb-2">
                          Need personalized investment guidance?
                        </h3>
                        <p className="text-gray-700">
                          Our investment advisors can help you navigate the Saudi healthcare
                          investment landscape.
                        </p>
                      </div>
                      <Button className="bg-white text-moh-darkGreen hover:bg-gray-100 whitespace-nowrap">
                        Schedule Consultation
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Investment Events Tab */}
              <TabsContent value="events" className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 w-full md:max-w-md">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input placeholder="Search events..." className="pl-10" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
                    <Select>
                      <SelectTrigger className="w-[160px] bg-white">
                        <SelectValue placeholder="Event Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="pitch">Pitch Day</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="w-[160px] bg-white">
                        <SelectValue placeholder="Time Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="this-month">This Month</SelectItem>
                        <SelectItem value="next-month">Next Month</SelectItem>
                        <SelectItem value="past">Past Events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Featured Event */}
                  <div className="bg-gradient-to-r from-moh-lightGreen/30 to-moh-lightGold/30 rounded-xl overflow-hidden">
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <div className="bg-white p-4 rounded-lg text-center">
                            <div className="text-moh-darkGreen font-bold text-xl">JUN</div>
                            <div className="text-4xl font-bold text-moh-green">15</div>
                            <div className="text-moh-darkGreen font-medium">2024</div>
                            <Separator className="my-3" />
                            <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                              <Calendar size={14} />
                              <span>09:00 - 17:00</span>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-2/3">
                          <Badge className="bg-moh-gold text-white mb-2">Featured Event</Badge>
                          <h3 className="text-2xl font-bold text-moh-darkGreen mb-2">
                            Healthcare Investment Summit 2024
                          </h3>
                          <p className="text-gray-700 mb-4">
                            Join the largest gathering of healthcare investors and innovators in
                            Saudi Arabia. Connect with potential partners, discover breakthrough
                            innovations, and gain insights from industry leaders.
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-2">
                              <Users size={18} className="text-moh-darkGreen" />
                              <span>500+ Attendees</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 size={18} className="text-moh-darkGreen" />
                              <span>King Abdullah Financial District, Riyadh</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Handshake size={18} className="text-moh-darkGreen" />
                              <span>Networking Opportunities</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Presentation size={18} className="text-moh-darkGreen" />
                              <span>Pitch Competition</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <Button className="bg-moh-green hover:bg-moh-darkGreen text-white">
                              Register Now
                            </Button>
                            <Button
                              variant="outline"
                              className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Events List */}
                  <h3 className="text-xl font-semibold text-moh-darkGreen mt-8 mb-4">
                    Upcoming Events
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event 1 */}
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/4 bg-moh-lightGreen/20 p-4 flex flex-col items-center justify-center text-center">
                            <div className="text-moh-darkGreen font-medium">MAY</div>
                            <div className="text-3xl font-bold text-moh-green">22</div>
                            <div className="text-sm text-gray-600">2024</div>
                          </div>
                          <div className="sm:w-3/4 p-4">
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-700 border-blue-200 mb-2"
                            >
                              Webinar
                            </Badge>
                            <h4 className="font-semibold text-moh-darkGreen mb-2">
                              Digital Health Investment Trends
                            </h4>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              Explore the latest investment trends in digital health and telehealth
                              sectors in Saudi Arabia and the broader MENA region.
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">Online</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-moh-green hover:text-moh-darkGreen hover:bg-moh-lightGreen/20"
                              >
                                Register
                                <ChevronRight size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Event 2 */}
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/4 bg-moh-lightGold/20 p-4 flex flex-col items-center justify-center text-center">
                            <div className="text-moh-darkGold font-medium">JUN</div>
                            <div className="text-3xl font-bold text-moh-gold">08</div>
                            <div className="text-sm text-gray-600">2024</div>
                          </div>
                          <div className="sm:w-3/4 p-4">
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-700 border-green-200 mb-2"
                            >
                              Pitch Day
                            </Badge>
                            <h4 className="font-semibold text-moh-darkGreen mb-2">
                              MedTech Startup Pitch Competition
                            </h4>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              Watch 10 promising medical technology startups pitch their innovations
                              to a panel of investors and industry experts.
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">Riyadh</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-moh-green hover:text-moh-darkGreen hover:bg-moh-lightGreen/20"
                              >
                                Register
                                <ChevronRight size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Event 3 */}
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/4 bg-moh-lightGreen/20 p-4 flex flex-col items-center justify-center text-center">
                            <div className="text-moh-darkGreen font-medium">JUL</div>
                            <div className="text-3xl font-bold text-moh-green">12</div>
                            <div className="text-sm text-gray-600">2024</div>
                          </div>
                          <div className="sm:w-3/4 p-4">
                            <Badge
                              variant="outline"
                              className="bg-purple-100 text-purple-700 border-purple-200 mb-2"
                            >
                              Networking
                            </Badge>
                            <h4 className="font-semibold text-moh-darkGreen mb-2">
                              Healthcare Investors Networking Dinner
                            </h4>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              Exclusive networking event for healthcare investors to connect, share
                              insights, and explore co-investment opportunities.
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">Jeddah</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-moh-green hover:text-moh-darkGreen hover:bg-moh-lightGreen/20"
                              >
                                Register
                                <ChevronRight size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Event 4 */}
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/4 bg-moh-lightGold/20 p-4 flex flex-col items-center justify-center text-center">
                            <div className="text-moh-darkGold font-medium">AUG</div>
                            <div className="text-3xl font-bold text-moh-gold">05</div>
                            <div className="text-sm text-gray-600">2024</div>
                          </div>
                          <div className="sm:w-3/4 p-4">
                            <Badge
                              variant="outline"
                              className="bg-orange-100 text-orange-700 border-orange-200 mb-2"
                            >
                              Conference
                            </Badge>
                            <h4 className="font-semibold text-moh-darkGreen mb-2">
                              Healthcare Innovation & Investment Forum
                            </h4>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              Two-day conference featuring keynote speakers, panel discussions, and
                              workshops on healthcare investment strategies.
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">Dammam</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-moh-green hover:text-moh-darkGreen hover:bg-moh-lightGreen/20"
                              >
                                Register
                                <ChevronRight size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                    >
                      View All Events
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Call to action section */}
        <section className="py-16 bg-gradient-to-r from-moh-lightGreen to-moh-lightGold">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/30 backdrop-blur-sm p-8 rounded-xl border border-white/40 shadow-lg">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
                    Ready to invest in the future of healthcare?
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Join our network of healthcare investors to access exclusive opportunities,
                    connect with innovators, and contribute to transforming healthcare in Saudi
                    Arabia.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-moh-green hover:bg-moh-darkGreen text-white">
                      Join Investor Network
                    </Button>
                    <Button
                      variant="outline"
                      className="border-moh-darkGreen text-moh-darkGreen hover:bg-white/50"
                    >
                      Schedule Consultation
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/60 p-5 rounded-lg text-center">
                    <div className="inline-flex mb-4 p-3 bg-moh-lightGreen/30 rounded-full">
                      <LineChart size={24} className="text-moh-darkGreen" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-moh-darkGreen">
                      Market Intelligence
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Access exclusive market reports and investment insights tailored to healthcare
                      sectors.
                    </p>
                  </div>

                  <div className="bg-white/60 p-5 rounded-lg text-center">
                    <div className="inline-flex mb-4 p-3 bg-moh-lightGold/30 rounded-full">
                      <Handshake size={24} className="text-moh-darkGold" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-moh-darkGreen">
                      Deal Flow Access
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Get early access to vetted healthcare investment opportunities before they go
                      public.
                    </p>
                  </div>

                  <div className="bg-white/60 p-5 rounded-lg text-center">
                    <div className="inline-flex mb-4 p-3 bg-blue-100 rounded-full">
                      <HelpCircle size={24} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-moh-darkGreen">
                      Expert Advisory
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Connect with healthcare and investment experts for personalized guidance and
                      support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
