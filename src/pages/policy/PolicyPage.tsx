
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Vision2030AlignmentChecker } from "@/components/policy/vision-alignment";
import { StrategyAnalytics, StrategyGapAnalyzer } from "@/components/policy/strategy";

const policySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type PolicyFormValues = z.infer<typeof policySchema>;

const PolicyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("vision-alignment");

  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Healthcare Policy Center</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Policy Analysis Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex border-b mb-4">
                  <button 
                    className={`px-4 py-2 ${activeTab === 'vision-alignment' ? 'border-b-2 border-moh-green font-medium' : ''}`}
                    onClick={() => setActiveTab('vision-alignment')}
                  >
                    Vision 2030 Alignment
                  </button>
                  <button 
                    className={`px-4 py-2 ${activeTab === 'strategy-gap' ? 'border-b-2 border-moh-green font-medium' : ''}`}
                    onClick={() => setActiveTab('strategy-gap')}
                  >
                    Strategy Gap Analysis
                  </button>
                  <button 
                    className={`px-4 py-2 ${activeTab === 'analytics' ? 'border-b-2 border-moh-green font-medium' : ''}`}
                    onClick={() => setActiveTab('analytics')}
                  >
                    Analytics
                  </button>
                </div>
                
                {/* Each tab component is properly wrapped with Form provider */}
                {activeTab === 'vision-alignment' && (
                  <Form {...form}>
                    <form>
                      <Vision2030AlignmentChecker />
                    </form>
                  </Form>
                )}
                
                {activeTab === 'strategy-gap' && (
                  <Form {...form}>
                    <form>
                      <StrategyGapAnalyzer />
                    </form>
                  </Form>
                )}
                
                {activeTab === 'analytics' && (
                  <Form {...form}>
                    <form>
                      <StrategyAnalytics />
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Latest Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="border-b pb-2">
                    <h3 className="font-medium">Digital Health Framework Update</h3>
                    <p className="text-sm text-gray-600">Updated on 10 May 2025</p>
                  </li>
                  <li className="border-b pb-2">
                    <h3 className="font-medium">Telemedicine Guidelines Released</h3>
                    <p className="text-sm text-gray-600">Released on 5 May 2025</p>
                  </li>
                  <li>
                    <h3 className="font-medium">AI in Healthcare Regulation</h3>
                    <p className="text-sm text-gray-600">Draft available for review</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PolicyPage;
