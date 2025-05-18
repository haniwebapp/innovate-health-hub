
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { InnovationGuideService } from '@/services/ai/innovation/InnovationGuideService';
import { InnovationGuideResult } from '@/services/ai/policy/types';
import { Loader2, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Innovation types and stages
const innovationTypes = [
  "Digital Health Solution",
  "Medical Device",
  "Pharmaceutical Product",
  "Healthcare Service",
  "Diagnostic Tool",
  "Telemedicine Platform",
  "AI-based Health Application",
  "Wellness Product",
];

const innovationStages = [
  "concept",
  "prototype",
  "regulatory",
  "market-ready",
  "scaling",
];

// Stage display names
const stageDisplayNames: Record<string, string> = {
  "concept": "Concept Development",
  "prototype": "Prototype & Testing",
  "regulatory": "Regulatory Approval",
  "market-ready": "Market Ready",
  "scaling": "Scaling & Growth"
};

export function InnovationGuideGenerator() {
  // State
  const [formData, setFormData] = useState({
    innovationType: "",
    innovationStage: "",
    challenges: "",
    goals: "",
  });
  const [loading, setLoading] = useState(false);
  const [guideResult, setGuideResult] = useState<InnovationGuideResult | null>(null);
  const [guideSaved, setGuideSaved] = useState(false);
  const { toast } = useToast();

  // Handle form input changes
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle guide generation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setGuideResult(null);
      setGuideSaved(false);
      
      if (!formData.innovationType || !formData.innovationStage) {
        toast({
          title: "Missing Information",
          description: "Please select both an innovation type and stage.",
          variant: "destructive"
        });
        return;
      }

      const result = await InnovationGuideService.generateGuide(formData);
      setGuideResult(result);
      setGuideSaved(true);
      
      toast({
        title: "Guide Generated",
        description: "Your innovation guide has been created and saved.",
        variant: "default"
      });
    } catch (error: any) {
      console.error("Failed to generate guide:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "There was a problem generating your innovation guide.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="p-6 mb-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="innovationType">Innovation Type</Label>
                <Select 
                  value={formData.innovationType}
                  onValueChange={(value) => handleChange("innovationType", value)}
                >
                  <SelectTrigger id="innovationType">
                    <SelectValue placeholder="Select your innovation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {innovationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="innovationStage">Current Stage</Label>
                <Select 
                  value={formData.innovationStage}
                  onValueChange={(value) => handleChange("innovationStage", value)}
                >
                  <SelectTrigger id="innovationStage">
                    <SelectValue placeholder="Select your current stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {innovationStages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stageDisplayNames[stage] || stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="challenges">Key Challenges (Optional)</Label>
              <Textarea 
                id="challenges"
                placeholder="Describe any specific challenges you're facing..."
                value={formData.challenges}
                onChange={(e) => handleChange("challenges", e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="goals">Goals & Objectives (Optional)</Label>
              <Textarea 
                id="goals"
                placeholder="Outline your innovation's key goals and objectives..."
                value={formData.goals}
                onChange={(e) => handleChange("goals", e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={loading || !formData.innovationType || !formData.innovationStage}
                className="bg-gradient-to-r from-moh-green to-moh-darkGreen text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Guide...
                  </>
                ) : (
                  <>
                    Generate Innovation Guide
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </form>
      
      {/* Guide Result Display */}
      <AnimatePresence>
        {guideSaved && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-start"
          >
            <CheckCircle2 className="text-green-500 mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div className="flex-grow">
              <h4 className="font-medium text-green-800">Guide Successfully Saved</h4>
              <p className="text-green-700 text-sm mt-1">
                Your innovation guide has been generated and saved to your account. You can access this and all your saved guides at any time.
              </p>
              <div className="mt-3">
                <Button asChild variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                  <Link to="/innovations/saved-guides" className="flex items-center">
                    View All Saved Guides
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Display guide results */}
      {guideResult && (
        <div className="space-y-8">
          {/* Stage-specific guidance */}
          {guideResult.stageSpecificGuidance && (
            <Card className="p-6 border-moh-green/20">
              <h3 className="text-xl font-bold text-moh-darkGreen mb-4">{guideResult.stageSpecificGuidance.title}</h3>
              <p className="mb-4 text-gray-700">{guideResult.stageSpecificGuidance.description}</p>
              
              {guideResult.stageSpecificGuidance.steps && (
                <div className="space-y-1">
                  <h4 className="font-medium text-moh-green mb-2">Key Steps:</h4>
                  <ul className="space-y-2">
                    {guideResult.stageSpecificGuidance.steps.map((step, index) => (
                      <li key={index} className="flex items-baseline">
                        <span className="bg-moh-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          )}

          {/* Recommendations */}
          {guideResult.recommendations && guideResult.recommendations.length > 0 && (
            <Card className="p-6 border-moh-green/20">
              <h3 className="text-xl font-bold text-moh-darkGreen mb-4">Recommendations</h3>
              <ul className="space-y-3">
                {guideResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex">
                    <CheckCircle2 className="text-moh-green mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Resources */}
          {guideResult.resources && guideResult.resources.length > 0 && (
            <Card className="p-6 border-moh-green/20">
              <h3 className="text-xl font-bold text-moh-darkGreen mb-4">Helpful Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guideResult.resources.map((resource, index) => (
                  <div key={index} className="border border-moh-lightGreen/30 rounded-md p-4 bg-moh-lightGreen/5">
                    <h4 className="font-medium text-moh-green">{resource.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                    {resource.url && (
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-moh-green hover:underline mt-2 inline-flex items-center"
                      >
                        View Resource <ArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Market Insights */}
          {guideResult.marketInsights && guideResult.marketInsights.length > 0 && (
            <Card className="p-6 border-moh-green/20">
              <h3 className="text-xl font-bold text-moh-darkGreen mb-4">Market Insights</h3>
              <div className="bg-moh-lightGreen/10 p-4 rounded-md mb-4">
                <div className="flex">
                  <Info className="text-moh-green mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm italic text-gray-600">
                    Current market trends and intelligence relevant to your innovation
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {guideResult.marketInsights.map((insight, index) => (
                  <li key={index} className="flex">
                    <div className="bg-moh-lightGold/20 text-moh-darkGold rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Next Steps */}
          {guideResult.nextSteps && guideResult.nextSteps.length > 0 && (
            <Card className="p-6 border-moh-green/20">
              <h3 className="text-xl font-bold text-moh-darkGreen mb-4">Recommended Next Steps</h3>
              <ul className="space-y-3">
                {guideResult.nextSteps.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="bg-moh-darkGreen text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
