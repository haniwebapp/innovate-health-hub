
import { Route } from 'react-router-dom';
import HomePage from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import AboutPage from '@/pages/about';
import ChallengesPage from '@/pages/challenges';
import ChallengeDetails from '@/pages/challenges/[id]';
import InnovationsPage from '@/pages/innovations';
import InnovationDetails from '@/pages/innovations/[id]';
import InvestmentPage from '@/pages/investment';
import RegulatoryPage from '@/pages/regulatory';
import KnowledgeHubPage from '@/pages/knowledge-hub';
import PolicyPage from '@/pages/policy/index';
import FeaturesPage from '@/pages/features';
import DynamicPage from '@/pages/[slug]';

export const PublicRoutes = (
  <>
    {/* Public Routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/challenges" element={<ChallengesPage />} />
    <Route path="/challenges/:id" element={<ChallengeDetails />} />
    <Route path="/innovations" element={<InnovationsPage />} />
    <Route path="/innovations/:id" element={<InnovationDetails />} />
    <Route path="/investment" element={<InvestmentPage />} />
    <Route path="/regulatory" element={<RegulatoryPage />} />
    <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
    <Route path="/policy" element={<PolicyPage />} />
    <Route path="/features" element={<FeaturesPage />} />
    
    {/* Dynamic page route - must be after all specific routes to avoid conflicts */}
    <Route path="/:slug" element={<DynamicPage />} />
  </>
);
