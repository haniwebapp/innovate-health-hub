
import { Route } from 'react-router-dom';
import DashboardInvestmentPage from '@/pages/dashboard/investment/index';
import DashboardPortfolioPage from '@/pages/dashboard/investment/portfolio';
import DashboardMarketAnalysisPage from '@/pages/dashboard/investment/market-analysis';
import DashboardInvestmentTrendsPage from '@/pages/dashboard/investment/trends';
import DashboardInvestorMatchingPage from '@/pages/dashboard/investment/investor-matching';
import DashboardPitchPreparationPage from '@/pages/dashboard/investment/pitch-preparation';
import DashboardVision2030AlignmentPage from '@/pages/dashboard/investment/vision-2030-alignment';

export const DashboardInvestmentRoutes = (
  <>
    {/* User Portal Routes - Investment Section */}
    <Route path="investment" element={<DashboardInvestmentPage />} />
    <Route path="investment/portfolio" element={<DashboardPortfolioPage />} />
    <Route path="investment/market-analysis" element={<DashboardMarketAnalysisPage />} />
    <Route path="investment/trends" element={<DashboardInvestmentTrendsPage />} />
    <Route path="investment/investor-matching" element={<DashboardInvestorMatchingPage />} />
    <Route path="investment/pitch-preparation" element={<DashboardPitchPreparationPage />} />
    <Route path="investment/vision-2030-alignment" element={<DashboardVision2030AlignmentPage />} />
  </>
);
