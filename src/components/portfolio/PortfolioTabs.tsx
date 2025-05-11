
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioList } from "./PortfolioList";

interface Investment {
  id: number;
  name: string;
  logo: string;
  sector: string;
  stage: string;
  investmentAmount: string;
  roi: string;
  date: string;
  trend: string;
  status: string;
}

interface PortfolioTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredPortfolio: Investment[];
}

export function PortfolioTabs({ activeTab, setActiveTab, filteredPortfolio }: PortfolioTabsProps) {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-moh-lightGreen/50 border-moh-green/10 p-1">
        <TabsTrigger 
          value="all" 
          className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen"
        >
          All Investments
        </TabsTrigger>
        <TabsTrigger 
          value="active"
          className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen"
        >
          Active
        </TabsTrigger>
        <TabsTrigger 
          value="watching"
          className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen"
        >
          Watching
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="pt-2">
        <PortfolioList filteredPortfolio={filteredPortfolio} />
      </TabsContent>
      
      <TabsContent value="active" className="pt-2">
        <PortfolioList filteredPortfolio={filteredPortfolio} />
      </TabsContent>
      
      <TabsContent value="watching" className="pt-2">
        <PortfolioList filteredPortfolio={filteredPortfolio} />
      </TabsContent>
    </Tabs>
  );
}
