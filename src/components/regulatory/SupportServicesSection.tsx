
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ClipboardCheck, CheckSquare, Scale } from "lucide-react";

export function SupportServicesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-moh-darkGreen">Regulatory Support Services</CardTitle>
        <CardDescription>
          Expert assistance to help navigate complex healthcare regulations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-white to-moh-lightGreen/30 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-moh-green" />
                Compliance Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-6">
                Get personalized guidance on your regulatory journey from our experts. 
                One-on-one sessions focused on your specific innovation challenges.
              </p>
              <Button variant="outline" className="w-full text-moh-darkGreen border-moh-green hover:bg-moh-lightGreen/50">
                Schedule Consultation
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-moh-lightGreen/30 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-moh-green" />
                Documentation Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-6">
                Have your regulatory documents reviewed by our compliance specialists.
                Get detailed feedback and improvement recommendations.
              </p>
              <Button variant="outline" className="w-full text-moh-darkGreen border-moh-green hover:bg-moh-lightGreen/50">
                Request Review
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-white to-moh-lightGreen/30 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-moh-green" />
                Compliance Workshops
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-6">
                Participate in interactive workshops covering key regulatory topics.
                Learn from peers and regulatory experts in collaborative sessions.
              </p>
              <Button variant="outline" className="w-full text-moh-darkGreen border-moh-green hover:bg-moh-lightGreen/50">
                View Workshop Calendar
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-moh-lightGreen/30 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-moh-green" />
                Regulatory Pipeline Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-6">
                Get a comprehensive assessment of your regulatory journey.
                Includes timeline estimates, cost projections, and risk analysis.
              </p>
              <Button variant="outline" className="w-full text-moh-darkGreen border-moh-green hover:bg-moh-lightGreen/50">
                Request Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
