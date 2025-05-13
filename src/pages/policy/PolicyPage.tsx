
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, FileText } from "lucide-react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Link } from 'react-router-dom';
import { Vision2030AlignmentChecker } from "@/components/policy/vision-alignment";
import { StrategyAnalytics, StrategyGapAnalyzer } from "@/components/policy/strategy";

const PolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen">
              Healthcare Policy Resources
            </h1>
            
            <p className="text-lg text-gray-700 mb-8">
              Access key healthcare policies, regulations, and strategic frameworks that guide innovation 
              in the Saudi healthcare sector. Analyze your initiatives for alignment with national priorities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardHeader className="bg-moh-lightGreen/20">
                  <CardTitle className="text-moh-darkGreen">Key Policies</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">National Healthcare Transformation Strategy</h3>
                        <p className="text-sm text-gray-500">Updated May 2023</p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Digital Health Regulations</h3>
                        <p className="text-sm text-gray-500">Updated March 2024</p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Healthcare Innovation Framework</h3>
                        <p className="text-sm text-gray-500">Updated January 2024</p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-moh-lightGreen/20">
                  <CardTitle className="text-moh-darkGreen">Strategic Priorities</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li>
                      <div className="flex items-center mb-2">
                        <div className="h-3 w-3 bg-moh-green rounded-full mr-2"></div>
                        <h3 className="font-medium">Preventive Healthcare</h3>
                      </div>
                      <p className="text-sm text-gray-600 pl-5">
                        Shifting focus from treatment to prevention through early detection technologies and population health initiatives.
                      </p>
                    </li>
                    <li>
                      <div className="flex items-center mb-2">
                        <div className="h-3 w-3 bg-moh-green rounded-full mr-2"></div>
                        <h3 className="font-medium">Digital Transformation</h3>
                      </div>
                      <p className="text-sm text-gray-600 pl-5">
                        Implementing telemedicine, AI diagnostics, and unified electronic health records across the Kingdom.
                      </p>
                    </li>
                    <li>
                      <div className="flex items-center mb-2">
                        <div className="h-3 w-3 bg-moh-green rounded-full mr-2"></div>
                        <h3 className="font-medium">Healthcare Workforce Development</h3>
                      </div>
                      <p className="text-sm text-gray-600 pl-5">
                        Training and retaining highly skilled healthcare professionals specialized in priority areas.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Vision 2030 Alignment Tools */}
            <Card className="mb-8">
              <CardHeader className="bg-moh-lightGreen/20">
                <CardTitle className="text-moh-darkGreen">Strategy Alignment Tools</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Vision 2030 Alignment Checker</h3>
                    <p className="text-gray-600 mb-4">
                      Evaluate how well your healthcare initiative aligns with Saudi Vision 2030 healthcare goals and priorities.
                    </p>
                    <Vision2030AlignmentChecker />
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-xl font-medium mb-3">Strategy Gap Analysis</h3>
                    <p className="text-gray-600 mb-4">
                      Identify gaps between your proposed solution and national healthcare strategic objectives.
                    </p>
                    <StrategyGapAnalyzer />
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-xl font-medium mb-3">Strategy Analytics</h3>
                    <p className="text-gray-600 mb-4">
                      View key metrics and performance indicators for healthcare strategy implementation.
                    </p>
                    <StrategyAnalytics />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/vision-2030" className="block">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center text-moh-darkGreen mb-2">
                      <FileText className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Vision 2030 Healthcare Goals</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Explore the healthcare objectives of Saudi Vision 2030.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/dashboard/strategy" className="block">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center text-moh-darkGreen mb-2">
                      <FileText className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Strategy Dashboard</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Strategic performance metrics and implementation progress.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              
              <a href="https://www.moh.gov.sa/en/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center text-moh-darkGreen mb-2">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Ministry of Health</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Official website with latest healthcare policies and announcements.
                    </p>
                  </CardContent>
                </Card>
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PolicyPage;
