
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Shield, CheckCircle2, AlertTriangle, FileCheck } from "lucide-react";

const PolicyPage: React.FC = () => {
  const [activeFramework, setActiveFramework] = useState("digital-health");
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Policy Framework</h1>
        <p className="text-muted-foreground mt-1">
          Understand the healthcare innovation policy landscape and requirements
        </p>
      </div>
      
      <Tabs defaultValue="frameworks" className="space-y-8">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="frameworks">Policy Frameworks</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="vision2030">Vision 2030 Alignment</TabsTrigger>
          <TabsTrigger value="analysis">Gap Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="frameworks">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card 
                className={`cursor-pointer ${activeFramework === 'digital-health' ? 'border-primary' : ''}`}
                onClick={() => setActiveFramework('digital-health')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <FileCheck className="h-5 w-5 mr-2 text-blue-500" />
                    Digital Health Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Policies governing digital health applications and telehealth services
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer ${activeFramework === 'medical-devices' ? 'border-primary' : ''}`}
                onClick={() => setActiveFramework('medical-devices')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Shield className="h-5 w-5 mr-2 text-green-500" />
                    Medical Devices Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Regulations for medical devices and equipment in Saudi Arabia
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer ${activeFramework === 'data-privacy' ? 'border-primary' : ''}`}
                onClick={() => setActiveFramework('data-privacy')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="h-5 w-5 mr-2 text-purple-500" />
                    Health Data Privacy Framework
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Standards for protecting patient data and health information
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>
                    {activeFramework === 'digital-health' && 'Digital Health Policy Framework'}
                    {activeFramework === 'medical-devices' && 'Medical Devices Policy Framework'}
                    {activeFramework === 'data-privacy' && 'Health Data Privacy Framework'}
                  </CardTitle>
                  <CardDescription>
                    {activeFramework === 'digital-health' && 'Last updated: March 2025'}
                    {activeFramework === 'medical-devices' && 'Last updated: January 2025'}
                    {activeFramework === 'data-privacy' && 'Last updated: April 2025'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeFramework === 'digital-health' && (
                    <>
                      <p>The Digital Health Policy Framework establishes guidelines for the development, implementation, and use of digital health technologies in Saudi Arabia's healthcare system.</p>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Key Provisions</AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-6 space-y-2">
                              <li>Requirements for telehealth service providers</li>
                              <li>Standards for electronic health records</li>
                              <li>Digital health application certification process</li>
                              <li>Remote monitoring device integration guidelines</li>
                              <li>Interoperability standards for health information systems</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Compliance Requirements</AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-6 space-y-2">
                              <li>Security certification for all digital health platforms</li>
                              <li>Regular privacy impact assessments</li>
                              <li>User authentication and access control measures</li>
                              <li>Data storage and transmission encryption</li>
                              <li>Service availability and disaster recovery planning</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Approval Process</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <p>The Digital Health solution approval process includes these steps:</p>
                              <ol className="list-decimal pl-6 space-y-2">
                                <li>Pre-application consultation</li>
                                <li>Documentation submission</li>
                                <li>Technical review</li>
                                <li>Security assessment</li>
                                <li>Clinical validation (if applicable)</li>
                                <li>Final approval decision</li>
                              </ol>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="flex justify-end pt-4">
                        <Button variant="outline" className="mr-2">Download Framework</Button>
                        <Button>Apply for Approval</Button>
                      </div>
                    </>
                  )}
                  
                  {activeFramework === 'medical-devices' && (
                    <>
                      <p>The Medical Devices Policy Framework outlines the regulatory requirements for medical devices to ensure their safety, effectiveness, and quality in the Saudi healthcare system.</p>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Device Classification</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p>Medical devices are classified into four risk categories:</p>
                              <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Class I</strong>: Low risk devices (e.g., bandages, examination gloves)</li>
                                <li><strong>Class II</strong>: Medium risk devices (e.g., infusion pumps, surgical drapes)</li>
                                <li><strong>Class III</strong>: Medium-high risk devices (e.g., ventilators, implantable devices)</li>
                                <li><strong>Class IV</strong>: High risk devices (e.g., cardiac pacemakers, implantable defibrillators)</li>
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Registration Requirements</AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-6 space-y-2">
                              <li>Medical Device Marketing Authorization (MDMA) application</li>
                              <li>Quality Management System documentation</li>
                              <li>Technical documentation including risk analysis</li>
                              <li>Clinical evaluation reports</li>
                              <li>Post-market surveillance plan</li>
                              <li>Labeling and instructions for use</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Innovative Device Pathway</AccordionTrigger>
                          <AccordionContent>
                            <p>The Innovative Device Pathway provides a streamlined approval process for novel medical devices that address unmet clinical needs:</p>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                <p>Early consultation with regulatory experts</p>
                              </div>
                              <div className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                <p>Expedited review process</p>
                              </div>
                              <div className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                <p>Conditional approval with post-market data collection</p>
                              </div>
                              <div className="flex items-start">
                                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                                <p>Requires robust safety monitoring plan</p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="flex justify-end pt-4">
                        <Button variant="outline" className="mr-2">Download Framework</Button>
                        <Button>Register a Device</Button>
                      </div>
                    </>
                  )}
                  
                  {activeFramework === 'data-privacy' && (
                    <>
                      <p>The Health Data Privacy Framework establishes standards for protecting patient data and health information, ensuring secure and ethical handling of sensitive healthcare data.</p>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Core Principles</AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-6 space-y-2">
                              <li><strong>Consent:</strong> Clear patient consent for data collection and use</li>
                              <li><strong>Minimization:</strong> Collecting only necessary data</li>
                              <li><strong>Purpose limitation:</strong> Using data only for specified purposes</li>
                              <li><strong>Security:</strong> Implementing technical and organizational safeguards</li>
                              <li><strong>Rights:</strong> Honoring patient rights to access and control their data</li>
                              <li><strong>Accountability:</strong> Demonstrating compliance with privacy principles</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Data Protection Requirements</AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-6 space-y-2">
                              <li>Comprehensive data security program</li>
                              <li>Regular security risk assessments</li>
                              <li>Data encryption in transit and at rest</li>
                              <li>Strict access controls and authentication</li>
                              <li>Breach detection and notification procedures</li>
                              <li>Staff training on data protection</li>
                              <li>Data retention and deletion policies</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Data Processing for Research</AccordionTrigger>
                          <AccordionContent>
                            <p>The framework allows for processing health data for research purposes under specific conditions:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                              <li>Ethics committee approval</li>
                              <li>Data minimization and anonymization where possible</li>
                              <li>Specific consent for research use or applicable exemptions</li>
                              <li>Enhanced security measures for sensitive data</li>
                              <li>Transparency about research objectives</li>
                              <li>Publication of research findings without identifiable data</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="flex justify-end pt-4">
                        <Button variant="outline" className="mr-2">Download Framework</Button>
                        <Button>Schedule a Consultation</Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="guidelines">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Guidelines</CardTitle>
              <CardDescription>
                Practical guidance for implementing healthcare innovations in alignment with policy frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p>These implementation guidelines provide practical steps and best practices for healthcare innovators to ensure their solutions comply with regulations while maximizing impact.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Digital Health Implementation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>User-centered design principles</li>
                        <li>Integration with existing health systems</li>
                        <li>Data governance frameworks</li>
                        <li>Interoperability standards</li>
                        <li>Implementation checklist for digital health solutions</li>
                      </ul>
                      <Button className="mt-4 w-full">View Guidelines</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Medical Device Deployment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Clinical validation protocols</li>
                        <li>Post-market surveillance planning</li>
                        <li>Healthcare facility integration</li>
                        <li>Staff training requirements</li>
                        <li>Documentation and record-keeping</li>
                      </ul>
                      <Button className="mt-4 w-full">View Guidelines</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vision2030">
          <Card>
            <CardHeader>
              <CardTitle>Vision 2030 Alignment</CardTitle>
              <CardDescription>
                Ensure your healthcare innovation aligns with Saudi Arabia's Vision 2030 objectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="mb-4">Vision 2030 sets ambitious goals for transforming healthcare in Saudi Arabia. Innovations that align with these objectives receive priority consideration and support.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Access to Care</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Expanding healthcare access throughout the Kingdom, especially in underserved areas.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Extends healthcare services to remote regions</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Reduces barriers to essential healthcare</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Improves healthcare infrastructure</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Quality of Care</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Enhancing the quality and safety of healthcare services across the Kingdom.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Improves clinical outcomes</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Reduces medical errors</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Enhances patient experience</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Value-Based Care</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Optimizing healthcare resource utilization and improving cost-effectiveness.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Reduces healthcare costs</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Increases operational efficiency</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Optimizes resource allocation</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full sm:w-auto">Check Your Vision 2030 Alignment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Policy Gap Analysis</CardTitle>
              <CardDescription>
                Identify potential policy gaps affecting your healthcare innovation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p>Our policy gap analysis tool helps innovators identify areas where current regulations may not fully address novel healthcare technologies and approaches.</p>
                
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Innovation Area</th>
                        <th className="px-4 py-3 text-left">Current Policy Coverage</th>
                        <th className="px-4 py-3 text-left">Identified Gaps</th>
                        <th className="px-4 py-3 text-left">Policy Development Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-3">AI Diagnostic Tools</td>
                        <td className="px-4 py-3">Partial</td>
                        <td className="px-4 py-3">Liability frameworks, Explainability requirements</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-amber-500">In Development</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3">Wearable Medical Devices</td>
                        <td className="px-4 py-3">Substantial</td>
                        <td className="px-4 py-3">Continuous monitoring protocols</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-500">Addressed</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3">Genomic Medicine</td>
                        <td className="px-4 py-3">Limited</td>
                        <td className="px-4 py-3">Ethical frameworks, Data ownership</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-red-500 border-red-300">Significant Gaps</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3">Virtual Reality Therapy</td>
                        <td className="px-4 py-3">Minimal</td>
                        <td className="px-4 py-3">Efficacy standards, Safety protocols</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-blue-500">Under Review</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Remote Patient Monitoring</td>
                        <td className="px-4 py-3">Substantial</td>
                        <td className="px-4 py-3">Rural infrastructure considerations</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-amber-500">In Development</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="sm:flex-1">Request Gap Analysis</Button>
                  <Button className="sm:flex-1">Contribute to Policy Development</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PolicyPage;
