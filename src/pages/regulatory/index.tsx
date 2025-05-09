
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function RegulatoryPage() {
  const { t, language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-moh-green" />
          <h1 className="text-3xl md:text-4xl font-bold text-moh-darkGreen">Regulatory Sandbox</h1>
        </div>
        
        <p className="text-lg text-gray-700 mb-10">
          Navigate healthcare regulatory requirements with ease. Our regulatory sandbox provides a safe environment to test innovations while ensuring compliance with healthcare standards.
        </p>
        
        <Tabs defaultValue="sandbox" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sandbox">Sandbox Program</TabsTrigger>
            <TabsTrigger value="guidance">Regulatory Guidance</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sandbox" className="mt-6">
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-3">About the Regulatory Sandbox</h3>
              <p className="mb-4">
                The Regulatory Sandbox is a controlled environment for healthcare innovators to test their solutions with real users while ensuring compliance with healthcare standards. This program accelerates the path to market while maintaining patient safety and data security.
              </p>
              
              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Benefits</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Accelerated regulatory pathway</li>
                    <li>Expert compliance guidance</li>
                    <li>Supervised testing environment</li>
                    <li>Reduced regulatory uncertainty</li>
                    <li>Access to MoH regulatory experts</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Eligible Innovations</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Digital health applications</li>
                    <li>Medical devices (Class I & II)</li>
                    <li>Telehealth solutions</li>
                    <li>Health data platforms</li>
                    <li>AI/ML healthcare algorithms</li>
                  </ul>
                </div>
              </div>
              
              <Button className="bg-moh-green hover:bg-moh-darkGreen">Apply to Sandbox Program</Button>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <Badge className="mb-3 bg-amber-100 text-amber-800 hover:bg-amber-100">Current Program</Badge>
                <h3 className="text-xl font-semibold mb-2">Spring 2025 Sandbox Cohort</h3>
                <p className="mb-4 text-sm">Applications open until June 1, 2025. Program runs July-October 2025.</p>
                <Button className="bg-moh-green hover:bg-moh-darkGreen w-full">Apply Now</Button>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Success Stories</h3>
                <p className="mb-4 text-sm">Learn from innovators who successfully navigated regulatory requirements through our sandbox.</p>
                <Button variant="outline" className="w-full">View Case Studies</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="guidance" className="mt-6">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Regulatory Frameworks</h3>
                <p className="mb-4">Essential healthcare compliance frameworks and requirements.</p>
                <div className="space-y-4 mb-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Digital Health Applications</h4>
                    <p className="text-sm text-gray-600 mb-2">Guidance for mobile health apps, telehealth platforms, and digital therapeutics.</p>
                    <Button variant="outline" size="sm">View Framework</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Medical Devices</h4>
                    <p className="text-sm text-gray-600 mb-2">Requirements for medical device approval and certification.</p>
                    <Button variant="outline" size="sm">View Framework</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Health Data & Privacy</h4>
                    <p className="text-sm text-gray-600 mb-2">Compliance requirements for health data management and patient privacy.</p>
                    <Button variant="outline" size="sm">View Framework</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Consultation Services</h3>
                <p className="mb-4">Get expert guidance on your specific regulatory compliance needs.</p>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">1:1 Expert Consultation</h4>
                    <p className="text-sm text-gray-600 mb-2">Schedule a meeting with a regulatory expert.</p>
                    <Button variant="outline" size="sm">Book Session</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Document Review</h4>
                    <p className="text-sm text-gray-600 mb-2">Submit your compliance documents for expert review.</p>
                    <Button variant="outline" size="sm">Submit Documents</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-6">
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-3">Compliance Self-Assessment Tools</h3>
              <p className="mb-4">Evaluate your innovation's regulatory readiness with our self-assessment tools.</p>
              <div className="space-y-3 mb-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Digital Health Assessment Tool</h4>
                  <p className="text-sm text-gray-600 mb-2">For mobile health apps, telehealth platforms, and other digital health solutions.</p>
                  <Button className="bg-moh-green hover:bg-moh-darkGreen">Start Assessment</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Medical Device Classification Tool</h4>
                  <p className="text-sm text-gray-600 mb-2">Determine the classification of your medical device and applicable requirements.</p>
                  <Button className="bg-moh-green hover:bg-moh-darkGreen">Start Assessment</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Data Privacy Compliance Checker</h4>
                  <p className="text-sm text-gray-600 mb-2">Evaluate your solution against healthcare data privacy requirements.</p>
                  <Button className="bg-moh-green hover:bg-moh-darkGreen">Start Assessment</Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Document Templates</h3>
              <p className="mb-4">Access standardized templates for regulatory documentation.</p>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-3 mb-4">
                <Button variant="outline" className="text-sm h-auto py-2">Risk Assessment</Button>
                <Button variant="outline" className="text-sm h-auto py-2">Technical File</Button>
                <Button variant="outline" className="text-sm h-auto py-2">Data Privacy</Button>
                <Button variant="outline" className="text-sm h-auto py-2">Clinical Validation</Button>
                <Button variant="outline" className="text-sm h-auto py-2">Quality Management</Button>
                <Button variant="outline" className="text-sm h-auto py-2">User Manuals</Button>
              </div>
              <Button className="w-full">Access All Templates</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
