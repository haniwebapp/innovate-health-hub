
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Lightbulb, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  innovationType: string;
  innovationDescription: string;
  setInnovationType: (value: string) => void;
  setInnovationDescription: (value: string) => void;
  isLoadingAI: boolean;
  isAnalyzingCompliance: boolean;
  generateRecommendations: () => void;
  analyzeCompliance: () => void;
}

export function HeroSection({
  innovationType,
  innovationDescription,
  setInnovationType,
  setInnovationDescription,
  isLoadingAI,
  isAnalyzingCompliance,
  generateRecommendations,
  analyzeCompliance
}: HeroSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-gradient-to-b from-moh-lightGreen/30 to-transparent pt-24 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-moh-darkGreen mb-4 leading-tight">
                Regulatory <span className="text-gradient">Sandbox</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                Navigate the complex healthcare regulatory landscape with confidence. Our AI-powered Regulatory 
                Sandbox provides a controlled environment to test your innovations against regulatory requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="bg-moh-green hover:bg-moh-darkGreen text-white"
                  size="lg"
                  asChild
                >
                  <Link to="/dashboard/regulatory/applications/new">
                    Apply for Sandbox
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  onClick={generateRecommendations} 
                  className="bg-white border border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen"
                  size="lg"
                  disabled={isLoadingAI}
                >
                  {isLoadingAI ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Get AI Guidance
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 min-w-[300px] border border-gray-100">
              <h2 className="font-semibold text-lg mb-4 text-moh-darkGreen">Quick Compliance Check</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Innovation Type
                  </label>
                  <Select value={innovationType} onValueChange={setInnovationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical device">Medical Device</SelectItem>
                      <SelectItem value="digital health application">Digital Health Application</SelectItem>
                      <SelectItem value="diagnostic tool">Diagnostic Tool</SelectItem>
                      <SelectItem value="therapeutic solution">Therapeutic Solution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Brief Description
                  </label>
                  <Textarea 
                    value={innovationDescription}
                    onChange={(e) => setInnovationDescription(e.target.value)}
                    placeholder="Describe your innovation briefly..."
                    className="resize-none"
                    rows={3}
                  />
                </div>
                <Button 
                  className="w-full bg-moh-green hover:bg-moh-darkGreen" 
                  onClick={analyzeCompliance}
                  disabled={isAnalyzingCompliance}
                >
                  {isAnalyzingCompliance ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analyze Compliance
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
