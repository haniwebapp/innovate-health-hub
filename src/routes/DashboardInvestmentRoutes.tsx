
import { Route } from 'react-router-dom';
import DashboardInvestmentPage from '@/pages/dashboard/investment/index';
import DashboardPortfolioPage from '@/pages/dashboard/investment/portfolio';
import DashboardMarketAnalysisPage from '@/pages/dashboard/investment/market-analysis';
import DashboardInvestmentTrendsPage from '@/pages/dashboard/investment/trends';

export const DashboardInvestmentRoutes = (
  <>
    {/* User Portal Routes - Investment Section */}
    <Route path="investment" element={<DashboardInvestmentPage />} />
    <Route path="investment/portfolio" element={<DashboardPortfolioPage />} />
    <Route path="investment/market-analysis" element={<DashboardMarketAnalysisPage />} />
    <Route path="investment/trends" element={<DashboardInvestmentTrendsPage />} />
  </>
);
