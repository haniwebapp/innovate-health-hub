
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fundingRounds, investors } from "./investmentData";
import { FundingRoundsTab } from "./FundingRoundsTab";
import { InvestorsTab } from "./InvestorsTab";

export function InvestmentFeaturedOpportunities() {
  const [activeTab, setActiveTab] = useState("funding");
  
  return (
    <section className="py-16 bg-moh-lightGreen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge className="bg-moh-lightGreen text-moh-darkGreen mb-3">OPPORTUNITIES</Badge>
          <h2 className="text-3xl font-bold text-moh-darkGreen mb-3">Featured Investment Opportunities</h2>
          <p className="text-moh-green max-w-2xl mx-auto">
            Explore curated funding rounds and connect with leading healthcare investors actively seeking innovations.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger 
                value="funding" 
                className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
              >
                Funding Rounds
              </TabsTrigger>
              <TabsTrigger 
                value="investors" 
                className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
              >
                Active Investors
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="funding">
            <FundingRoundsTab fundingRounds={fundingRounds} />
          </TabsContent>
          
          <TabsContent value="investors">
            <InvestorsTab investors={investors} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
