
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, PieChart, BarChart3 } from "lucide-react";
import { MarketTrendsChart } from './MarketTrendsChart';
import { SectorAllocationChart } from './SectorAllocationChart';
import { InvestmentStagesChart } from './InvestmentStagesChart';

interface MarketAnalysisTabsProps {
  marketTrendsData: any[];
  sectorAllocationData: any[];
  investmentStageData: any[];
  colors: string[];
}

export function MarketAnalysisTabs({ 
  marketTrendsData, 
  sectorAllocationData, 
  investmentStageData, 
  colors 
}: MarketAnalysisTabsProps) {
  return (
    <Tabs defaultValue="trends" className="space-y-6">
      <TabsList className="bg-moh-lightGreen/50 border-moh-green/10">
        <TabsTrigger value="trends" className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen">
          <TrendingUp className="h-4 w-4 mr-2" />
          Market Trends
        </TabsTrigger>
        <TabsTrigger value="sectors" className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen">
          <PieChart className="h-4 w-4 mr-2" />
          Sector Analysis
        </TabsTrigger>
        <TabsTrigger value="stages" className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen">
          <BarChart3 className="h-4 w-4 mr-2" />
          Investment Stages
        </TabsTrigger>
      </TabsList>

      <TabsContent value="trends">
        <MarketTrendsChart marketTrendsData={marketTrendsData} />
      </TabsContent>

      <TabsContent value="sectors">
        <SectorAllocationChart 
          sectorAllocationData={sectorAllocationData} 
          colors={colors} 
        />
      </TabsContent>

      <TabsContent value="stages">
        <InvestmentStagesChart 
          investmentStageData={investmentStageData} 
          colors={colors} 
        />
      </TabsContent>
    </Tabs>
  );
}
