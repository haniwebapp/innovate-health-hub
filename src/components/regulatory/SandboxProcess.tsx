
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ClipboardCheck, Clock } from "lucide-react";

export function SandboxProcess() {
  return (
    <Card className="bg-white border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold text-moh-darkGreen">
          How the Regulatory Sandbox Works
        </CardTitle>
        <CardDescription>
          A step-by-step guide to testing your innovation in a controlled regulatory environment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-8 mb-6 relative">
          {/* Connecting line in background */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-moh-green/20"></div>
          
          <div className="flex flex-col items-center text-center relative">
            <div className="z-10 w-12 h-12 rounded-full bg-moh-green flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-lg mb-2">1. Registration</h3>
            <p className="text-sm text-gray-600">Submit your innovation details and select the applicable regulatory framework.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="z-10 w-12 h-12 rounded-full bg-moh-green/80 flex items-center justify-center mb-4">
              <ClipboardCheck className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-lg mb-2">2. Assessment</h3>
            <p className="text-sm text-gray-600">Our experts analyze your innovation and provide a customized compliance pathway.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="z-10 w-12 h-12 rounded-full bg-moh-green/60 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-lg mb-2">3. Sandbox Testing</h3>
            <p className="text-sm text-gray-600">Test your innovation in a controlled environment with regulatory guidance and support.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-6 flex justify-center">
        <Button className="bg-moh-green hover:bg-moh-darkGreen" size="lg" asChild>
          <Link to="/dashboard/regulatory/applications/new">
            Apply to the Sandbox Program
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
