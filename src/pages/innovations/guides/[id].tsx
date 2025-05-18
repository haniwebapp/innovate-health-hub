import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { InnovationGuideService } from '@/services/ai/innovation/InnovationGuideService';
import { InnovationGuideResult } from '@/services/ai/policy/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Bookmark, Calendar, CheckCircle2, Clock, Download, Lightbulb, Share2, Tag } from 'lucide-react';
import { format } from 'date-fns';

// Updated SavedGuide interface to handle content as possibly Json type
interface SavedGuide {
  id: string;
  title: string;
  description: string;
  created_at: string;
  user_id?: string;
  innovation_type: string;
  innovation_stage: string;
  updated_at?: string;
  content?: any; // Use any here since the content can be of various formats
}

export default function GuidePage() {
  const { id } = useParams();
  const [guide, setGuide] = useState<SavedGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGuide = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // In a real application, we would fetch the specific guide by ID
        // For now, we'll get all guides and find the matching one
        const guides = await InnovationGuideService.listGuides();
        const foundGuide = guides.find(g => g.id === id);
        
        if (foundGuide) {
          // Parse content if it's a string
          if (foundGuide.content && typeof foundGuide.content === 'string') {
            try {
              foundGuide.content = JSON.parse(foundGuide.content);
            } catch (e) {
              console.error("Failed to parse guide content:", e);
            }
          }
          
          setGuide(foundGuide as SavedGuide);
        } else {
          toast({
            title: "Guide Not Found",
            description: "The requested innovation guide could not be found.",
            variant: "destructive"
          });
        }
      } catch (error: any) {
        console.error("Failed to fetch guide details:", error);
        toast({
          title: "Error",
          description: "Failed to load guide details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id, toast]);

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Type guard to check if content is InnovationGuideResult
  const isInnovationGuideResult = (content: any): content is InnovationGuideResult => {
    return content && 
      (content.stageSpecificGuidance !== undefined || 
       content.recommendations !== undefined ||
       content.resources !== undefined ||
       content.marketInsights !== undefined ||
       content.nextSteps !== undefined);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-moh-green"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500">
              <Lightbulb size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Guide Not Found</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              The innovation guide you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
              <Link to="/innovations/saved-guides">View All Guides</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const guideContent = guide.content && isInnovationGuideResult(guide.content) ? guide.content : undefined;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="text-moh-green">
              <Link to="/innovations/saved-guides" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                Back to Saved Guides
              </Link>
            </Button>
          </div>

          {/* Guide header */}
          <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-moh-lightGreen/20 text-moh-green px-3 py-1 rounded-full text-xs font-medium">
                    {guide.innovation_stage}
                  </span>
                  <span className="bg-moh-lightGold/10 text-moh-darkGold px-3 py-1 rounded-full text-xs font-medium">
                    {guide.innovation_type}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{guide.title}</h1>
              </div>

              <div className="flex items-center mt-4 md:mt-0 space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{guide.description}</p>

            <div className="flex items-center text-sm text-gray-500">
              <Clock size={16} className="mr-1" />
              <span>Generated on {formatDate(guide.created_at)}</span>
            </div>
          </div>

          {/* Guide content */}
          {guideContent ? (
            <div className="space-y-8">
              {/* Stage-specific guidance */}
              {guideContent.stageSpecificGuidance && (
                <Card className="border-moh-green/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-moh-darkGreen">
                      {guideContent.stageSpecificGuidance.title}
                    </CardTitle>
                    <CardDescription>
                      {guideContent.stageSpecificGuidance.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {guideContent.stageSpecificGuidance.steps && (
                      <div className="space-y-1">
                        <h4 className="font-medium text-moh-green mb-3">Key Steps:</h4>
                        <ul className="space-y-3">
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
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              {guideContent.recommendations && guideContent.recommendations.length > 0 && (
                <Card className="border-moh-green/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-moh-darkGreen">
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {guideContent.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex">
                          <CheckCircle2 className="text-moh-green mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Resources */}
              {guideContent.resources && guideContent.resources.length > 0 && (
                <Card className="border-moh-green/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-moh-darkGreen">
                      Helpful Resources
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
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
                              View Resource <ArrowLeft className="rotate-180 ml-1 h-3 w-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Market Insights */}
              {guideContent.marketInsights && guideContent.marketInsights.length > 0 && (
                <Card className="border-moh-green/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-moh-darkGreen">
                      Market Insights
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {guideContent.marketInsights.map((insight, index) => (
                        <li key={index} className="flex">
                          <div className="bg-moh-lightGold/20 text-moh-darkGold rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Next Steps */}
              {guideContent.nextSteps && guideContent.nextSteps.length > 0 && (
                <Card className="border-moh-green/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-moh-darkGreen">
                      Recommended Next Steps
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
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
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-8 text-center">
              <Lightbulb className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Guide Content Unavailable</h3>
              <p className="text-gray-500">
                The content for this guide could not be displayed. It may be in an unsupported format.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
