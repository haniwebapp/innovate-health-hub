
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FilePlus, FileText, CheckCircle2, Search, Clock, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Vision2030AlignmentChecker } from '@/components/policy/vision-alignment';

const PolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-moh-lightGreen/40 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-70 rounded-full mb-4">
                <FileText className="h-5 w-5 text-moh-green mr-2" />
                <span className="text-moh-darkGreen font-medium">Healthcare Policy Center</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-moh-darkGreen">
                Saudi Healthcare Policy & Regulatory Framework
              </h1>
              
              <p className="text-lg text-gray-700 mb-8">
                Access the most up-to-date healthcare policies, regulations, and guidelines that
                shape the future of healthcare innovation in the Kingdom of Saudi Arabia.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen">
                  <FilePlus className="mr-2 h-4 w-4" />
                  Get Policy Updates
                </Button>
                <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20">
                  <Search className="mr-2 h-4 w-4" />
                  Search Policies
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Policy Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="vision2030">Vision 2030</TabsTrigger>
                <TabsTrigger value="regulations">Regulations</TabsTrigger>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Healthcare Policy Framework</CardTitle>
                    <CardDescription>Key policies shaping healthcare innovation in Saudi Arabia</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      The Saudi healthcare policy framework is built on several pillars that aim to transform 
                      healthcare delivery, improve access to care, enhance quality, and promote innovation 
                      within the sector. These policies are aligned with Vision 2030 objectives and support 
                      the national transformation program.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <h3 className="font-medium flex items-center text-moh-darkGreen">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-moh-green" />
                          Healthcare Transformation Strategy
                        </h3>
                        <p className="text-sm mt-2 text-gray-600">
                          Comprehensive approach to restructuring healthcare delivery and financing models
                        </p>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <h3 className="font-medium flex items-center text-moh-darkGreen">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-moh-green" />
                          National Digital Health Strategy
                        </h3>
                        <p className="text-sm mt-2 text-gray-600">
                          Roadmap for implementing digital health solutions and health information exchange
                        </p>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <h3 className="font-medium flex items-center text-moh-darkGreen">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-moh-green" />
                          Healthcare Investment Framework
                        </h3>
                        <p className="text-sm mt-2 text-gray-600">
                          Guidelines and incentives for private sector participation in healthcare
                        </p>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <h3 className="font-medium flex items-center text-moh-darkGreen">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-moh-green" />
                          Medical Device Regulation
                        </h3>
                        <p className="text-sm mt-2 text-gray-600">
                          Framework for approval, registration and monitoring of medical devices
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/dashboard/policy">
                        Access Detailed Policy Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Policy Updates</CardTitle>
                    <CardDescription>Latest changes to healthcare regulations and guidelines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-72">
                      <div className="space-y-4">
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-moh-darkGreen">Telemedicine Practice Guidelines</h3>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Updated</span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" /> May 10, 2025
                          </p>
                          <p className="text-sm mt-2">
                            Updated guidelines for telemedicine practice including cross-border consultations and AI-assisted diagnosis requirements.
                          </p>
                        </div>
                        
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-moh-darkGreen">Clinical Trials Framework</h3>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">New</span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" /> April 28, 2025
                          </p>
                          <p className="text-sm mt-2">
                            New comprehensive framework for conducting and approving clinical trials in Saudi Arabia, with streamlined processes for innovative treatments.
                          </p>
                        </div>
                        
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-moh-darkGreen">Healthcare Data Sharing Policy</h3>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Updated</span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" /> April 15, 2025
                          </p>
                          <p className="text-sm mt-2">
                            Revised data sharing policies to facilitate research while maintaining patient privacy and data security in alignment with international standards.
                          </p>
                        </div>
                        
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-moh-darkGreen">AI in Healthcare Governance</h3>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">New</span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" /> March 30, 2025
                          </p>
                          <p className="text-sm mt-2">
                            First comprehensive regulatory framework for artificial intelligence applications in healthcare settings, including ethical guidelines and validation requirements.
                          </p>
                        </div>
                        
                        <div className="pb-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-moh-darkGreen">Healthcare Workforce Development Standards</h3>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Updated</span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" /> March 12, 2025
                          </p>
                          <p className="text-sm mt-2">
                            Updated requirements for healthcare professional development, including new standards for digital health competencies and certification pathways.
                          </p>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="vision2030">
                <Card>
                  <CardHeader>
                    <CardTitle>Vision 2030 Healthcare Alignment</CardTitle>
                    <CardDescription>Policies supporting Saudi Arabia's Vision 2030 healthcare goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Vision2030AlignmentChecker />
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-moh-darkGreen mb-4">Key Vision 2030 Healthcare Objectives</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border border-moh-lightGreen/50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Improving Healthcare Access</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">Expanding healthcare coverage and improving equitable access to services across all regions of Saudi Arabia.</p>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-4">
                              <div className="h-full bg-moh-green rounded-full" style={{ width: '73%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">73% progress toward 2030 goal</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-moh-lightGreen/50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Digital Transformation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">Implementing advanced digital health solutions to enhance efficiency, reduce costs, and improve patient experiences.</p>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-4">
                              <div className="h-full bg-moh-green rounded-full" style={{ width: '68%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">68% progress toward 2030 goal</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link to="/vision-2030">
                        View Complete Vision 2030 Healthcare Strategy
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="regulations">
                <Card>
                  <CardHeader>
                    <CardTitle>Healthcare Regulations Library</CardTitle>
                    <CardDescription>Comprehensive collection of healthcare regulations in Saudi Arabia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 p-4 rounded-lg mb-6">
                      <p className="text-sm">
                        The regulatory framework for healthcare in Saudi Arabia comprises several interconnected 
                        regulations that govern healthcare practices, facilities, professionals, and innovations. 
                        Below you'll find the most important regulations organized by category.
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-moh-darkGreen mb-3">Healthcare Practice Regulations</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg hover:border-moh-green/50 hover:bg-moh-lightGreen/5 transition-colors">
                            <div>
                              <h4 className="font-medium">Healthcare Professionals Practice Law</h4>
                              <p className="text-sm text-gray-500">Requirements for healthcare practitioners</p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg hover:border-moh-green/50 hover:bg-moh-lightGreen/5 transition-colors">
                            <div>
                              <h4 className="font-medium">Private Health Institutions Law</h4>
                              <p className="text-sm text-gray-500">Regulations for private healthcare facilities</p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-moh-darkGreen mb-3">Medical Products Regulations</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg hover:border-moh-green/50 hover:bg-moh-lightGreen/5 transition-colors">
                            <div>
                              <h4 className="font-medium">Medical Devices Regulation</h4>
                              <p className="text-sm text-gray-500">Framework for medical device approval and monitoring</p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg hover:border-moh-green/50 hover:bg-moh-lightGreen/5 transition-colors">
                            <div>
                              <h4 className="font-medium">Pharmaceutical Products Law</h4>
                              <p className="text-sm text-gray-500">Regulations governing medications and pharmaceutical products</p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-moh-darkGreen mb-3">Digital Health Regulations</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg hover:border-moh-green/50 hover:bg-moh-lightGreen/5 transition-colors">
                            <div>
                              <h4 className="font-medium">Telehealth Practice Guidelines</h4>
                              <p className="text-sm text-gray-500">Standards for telemedicine and telehealth services</p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg hover:border-moh-green/50 hover:bg-moh-lightGreen/5 transition-colors">
                            <div>
                              <h4 className="font-medium">Health Data Protection Act</h4>
                              <p className="text-sm text-gray-500">Regulations for health data privacy and security</p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Download Complete Regulatory Library
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="guidelines">
                <Card>
                  <CardHeader>
                    <CardTitle>Clinical & Operational Guidelines</CardTitle>
                    <CardDescription>Best practice guidelines for healthcare delivery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">
                      The Ministry of Health provides comprehensive guidelines to ensure high quality, 
                      consistent healthcare delivery across the Kingdom. These guidelines are regularly 
                      updated to incorporate the latest evidence and international best practices.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="bg-moh-lightGreen/10 pb-2">
                          <CardTitle className="text-lg">Clinical Practice Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium">Diabetes Management</h4>
                                <p className="text-xs text-gray-500">Updated April 2025</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium">Cardiovascular Disease Prevention</h4>
                                <p className="text-xs text-gray-500">Updated March 2025</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium">Mental Health Treatment</h4>
                                <p className="text-xs text-gray-500">Updated February 2025</p>
                              </div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="bg-moh-lightGreen/10 pb-2">
                          <CardTitle className="text-lg">Facility Operation Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium">Infection Control Procedures</h4>
                                <p className="text-xs text-gray-500">Updated May 2025</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium">Emergency Response Protocols</h4>
                                <p className="text-xs text-gray-500">Updated April 2025</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium">Quality Assurance Standards</h4>
                                <p className="text-xs text-gray-500">Updated January 2025</p>
                              </div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analysis">
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Analysis & Impact</CardTitle>
                    <CardDescription>Assessment of healthcare policy effectiveness and future directions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">
                      Ongoing analysis of healthcare policies helps identify areas of success and opportunities for improvement. 
                      These assessments guide future policy development and ensure alignment with national healthcare goals.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-moh-darkGreen mb-3">Impact Analysis</h3>
                        <Card className="border-0 shadow-sm">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="p-4 bg-moh-lightGreen/10 rounded-lg">
                                <h4 className="font-medium text-moh-darkGreen mb-2">Telemedicine Access</h4>
                                <div className="flex items-baseline">
                                  <span className="text-2xl font-bold text-moh-green">+68%</span>
                                  <span className="text-xs text-gray-600 ml-2">since 2023</span>
                                </div>
                                <p className="text-xs mt-2 text-gray-600">
                                  Increase in patients accessing telemedicine services following policy changes
                                </p>
                              </div>
                              
                              <div className="p-4 bg-moh-lightGreen/10 rounded-lg">
                                <h4 className="font-medium text-moh-darkGreen mb-2">Healthcare Innovation</h4>
                                <div className="flex items-baseline">
                                  <span className="text-2xl font-bold text-moh-green">+42%</span>
                                  <span className="text-xs text-gray-600 ml-2">since 2023</span>
                                </div>
                                <p className="text-xs mt-2 text-gray-600">
                                  Growth in healthcare innovation projects following regulatory sandbox implementation
                                </p>
                              </div>
                              
                              <div className="p-4 bg-moh-lightGreen/10 rounded-lg">
                                <h4 className="font-medium text-moh-darkGreen mb-2">Private Investment</h4>
                                <div className="flex items-baseline">
                                  <span className="text-2xl font-bold text-moh-green">+53%</span>
                                  <span className="text-xs text-gray-600 ml-2">since 2023</span>
                                </div>
                                <p className="text-xs mt-2 text-gray-600">
                                  Increase in private sector investment in healthcare following incentive policies
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-moh-darkGreen mb-3">Policy Recommendations</h3>
                        <div className="space-y-3">
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-medium">Expand Digital Health Infrastructure</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Recommendation to increase investment in national digital health infrastructure to support
                              growing ecosystem of digital health solutions and telehealth services.
                            </p>
                          </div>
                          
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-medium">Streamline Innovation Approval Process</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Proposed policy changes to create fast-track approval pathways for healthcare innovations
                              with demonstrated potential for significant impact.
                            </p>
                          </div>
                          
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-medium">Enhance Cross-Sector Collaboration</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Framework for improved collaboration between healthcare, education, and technology sectors
                              to accelerate healthcare workforce development and innovation.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-moh-darkGreen">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-moh-darkGreen mb-2">How often are healthcare policies updated?</h3>
                  <p className="text-gray-700">
                    Healthcare policies are reviewed on a regular basis, typically annually or biennially. 
                    However, specific policies may be updated more frequently in response to emerging needs, 
                    new evidence, or technological advancements.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-moh-darkGreen mb-2">How can I stay informed about policy changes?</h3>
                  <p className="text-gray-700">
                    You can subscribe to policy updates through the Ministry of Health website, join our 
                    newsletter, or access the dashboard on this platform. All significant policy changes 
                    are announced with sufficient notice to allow for implementation planning.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-moh-darkGreen mb-2">How can innovators contribute to policy development?</h3>
                  <p className="text-gray-700">
                    The Ministry of Health welcomes input from healthcare innovators through public 
                    consultations, stakeholder forums, and the regulatory sandbox program. Innovators 
                    can also submit policy recommendations through the dedicated portal on this platform.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-moh-darkGreen mb-2">Which policies apply to digital health solutions?</h3>
                  <p className="text-gray-700">
                    Digital health solutions are subject to several policy frameworks depending on their function. 
                    These may include the Digital Health Strategy, Health Data Protection Act, Telehealth Guidelines, 
                    and, if applicable, Medical Device Regulations for software as a medical device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PolicyPage;
