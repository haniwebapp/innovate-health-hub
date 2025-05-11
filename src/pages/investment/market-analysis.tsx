
import React from 'react';
import { MarketAnalysisHeader } from '@/components/market-analysis/MarketAnalysisHeader';
import { MarketAnalysisTabs } from '@/components/market-analysis/MarketAnalysisTabs';

// Mock data
const marketTrendsData = [
  { month: 'Jan', healthtech: 1200, biotech: 1800, pharma: 900 },
  { month: 'Feb', healthtech: 1900, biotech: 1398, pharma: 1200 },
  { month: 'Mar', healthtech: 2400, biotech: 1908, pharma: 1400 },
  { month: 'Apr', healthtech: 1800, biotech: 2300, pharma: 1800 },
  { month: 'May', healthtech: 2600, biotech: 2100, pharma: 2000 },
  { month: 'Jun', healthtech: 2900, biotech: 2800, pharma: 2300 },
];

const sectorAllocationData = [
  { name: 'Telehealth', value: 35 },
  { name: 'Medical Devices', value: 25 },
  { name: 'AI Diagnostics', value: 20 },
  { name: 'Genomics', value: 15 },
  { name: 'Other', value: 5 },
];

const investmentStageData = [
  { stage: 'Seed', percentage: 20 },
  { stage: 'Series A', percentage: 35 },
  { stage: 'Series B', percentage: 25 },
  { stage: 'Series C+', percentage: 15 },
  { stage: 'IPO/M&A', percentage: 5 },
];

const COLORS = ['#00814A', '#C3A86B', '#006B3E', '#A38A56', '#E8F5F0'];

export default function MarketAnalysisPage() {
  return (
    <div className="space-y-6">
      <MarketAnalysisHeader 
        title="Market Analysis"
        description="Detailed insights and trends in healthcare investment markets"
      />

      <MarketAnalysisTabs 
        marketTrendsData={marketTrendsData}
        sectorAllocationData={sectorAllocationData}
        investmentStageData={investmentStageData}
        colors={COLORS}
      />
    </div>
  );
}
