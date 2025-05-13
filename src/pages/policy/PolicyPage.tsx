
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Vision2030AlignmentChecker } from '@/components/policy/vision-alignment/Vision2030AlignmentChecker';
import { StrategyAnalytics, StrategyGapAnalyzer } from '@/components/policy/strategy';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";

export default function PolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen">
                Healthcare Policy Framework
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Explore Saudi Arabia's healthcare policy framework, analyze alignment with Vision 2030, 
                and understand key strategic directions for healthcare innovation.
              </p>
            </div>
            
            {/* Vision 2030 Alignment Section */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-transparent">
                <CardTitle>Vision 2030 Alignment</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-muted-foreground mb-4">
                    Determine how your healthcare innovation aligns with Saudi Vision 2030 strategic objectives.
                  </p>
                  <AspectRatio ratio={16/9} className="bg-muted rounded-md overflow-hidden mb-6">
                    <div className="w-full h-full flex items-center justify-center">
                      <Vision2030AlignmentChecker />
                    </div>
                  </AspectRatio>
                </div>
              </CardContent>
            </Card>
            
            {/* Strategy Analytics Section */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-transparent">
                <CardTitle>Strategy Analytics</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-muted-foreground mb-4">
                    Analyze key healthcare strategy metrics and performance indicators.
                  </p>
                  <AspectRatio ratio={16/9} className="bg-muted rounded-md overflow-hidden mb-6">
                    <div className="w-full h-full p-4">
                      <StrategyAnalytics />
                    </div>
                  </AspectRatio>
                </div>
              </CardContent>
            </Card>
            
            {/* Gap Analysis Section */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-transparent">
                <CardTitle>Strategy Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-muted-foreground mb-4">
                    Identify gaps between current healthcare capabilities and Vision 2030 objectives.
                  </p>
                  <AspectRatio ratio={16/9} className="bg-muted rounded-md overflow-hidden mb-6">
                    <div className="w-full h-full p-4">
                      <StrategyGapAnalyzer />
                    </div>
                  </AspectRatio>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
