
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollProgress } from '@/components/animations/ScrollProgress';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Calendar, Lightbulb, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { InnovationGuideResult } from '@/services/ai/policy/types';

export default function GuidePage() {
  const { id } = useParams<{ id: string }>();
  const [guide, setGuide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setLoading(true);
        
        if (!id) {
          throw new Error("Guide ID is missing");
        }
        
        const { data, error } = await supabase
          .from('innovation_guides')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        setGuide(data);
      } catch (error: any) {
        console.error("Failed to fetch guide:", error);
        toast({
          title: "Error",
          description: "Failed to load the guide. It may not exist or you don't have permission to view it.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchGuide();
  }, [id, toast]);
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (error) {
      return 'Unknown date';
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-moh-green"></div>
      </div>
    );
  }
  
  if (!guide) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto py-10 px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Guide Not Found</h2>
            <p className="text-gray-500 mb-6">The requested guide could not be found or you don't have permission to view it.</p>
            <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
              <Link to="/innovations/saved-guides">Return to Saved Guides</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Parse the content from the guide
  const guideContent = guide.content as InnovationGuideResult;
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ScrollProgress />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/innovations/saved-guides" className="flex items-center text-moh-green">
                <ArrowLeft size={16} className="mr-1" />
                Back to Guides
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-moh-lightGreen/20 text-moh-green px-3 py-1 rounded-full text-xs font-medium mr-3">
                    {guide.innovation_stage}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(guide.created_at)}
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-moh-darkGreen">{guide.title}</h1>
                <p className="text-gray-600 mt-2">{guide.description}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="bg-moh-lightGold/10 text-moh-darkGold px-3 py-1 rounded text-sm inline-flex">
                  {guide.innovation_type}
                </div>
              </div>
            </div>
          </div>
          
          {/* Guide Content */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Stage-specific guidance */}
              {guideContent.stageSpecificGuidance && (
                <Card className="p-6 border-moh-green/20">
                  <h3 className="text-xl font-bold text-moh-darkGreen mb-4">{guideContent.stageSpecificGuidance.title}</h3>
                  <p className="mb-4 text-gray-700">{guideContent.stageSpecificGuidance.description}</p>
                  
                  {guideContent.stageSpecificGuidance.steps && (
                    <div className="space-y-1">
                      <h4 className="font-medium text-moh-green mb-2">Key Steps:</h4>
                      <ul className="space-y-2">
                        {guideContent.stageSpecificGuidance.steps.map((step, index) => (
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
              {guideContent.recommendations && guideContent.recommendations.length > 0 && (
                <Card className="p-6 border-moh-green/20">
                  <h3 className="text-xl font-bold text-moh-darkGreen mb-4">Recommendations</h3>
                  <ul className="space-y-3">
                    {guideContent.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex">
                        <CheckCircle2 className="text-moh-green mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Resources */}
              {guideContent.resources && guideContent.resources.length > 0 && (
                <Card className="p-6 border-moh-green/20">
                  <h3 className="text-xl font-bold text-moh-darkGreen mb-4">Helpful Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guideContent.resources.map((resource, index) => (
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
              {guideContent.marketInsights && guideContent.marketInsights.length > 0 && (
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
                    {guideContent.marketInsights.map((insight, index) => (
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
              {guideContent.nextSteps && guideContent.nextSteps.length > 0 && (
                <Card className="p-6 border-moh-green/20">
                  <h3 className="text-xl font-bold text-moh-darkGreen mb-4">Recommended Next Steps</h3>
                  <ul className="space-y-3">
                    {guideContent.nextSteps.map((step, index) => (
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
            
            <div className="mt-8 flex justify-center">
              <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
                <Link to="/innovations/guide">Generate New Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
