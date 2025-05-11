
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

import HomePage from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import AboutPage from '@/pages/about';
import RegisterPage from '@/pages/auth/RegisterPage';
import LoginPage from '@/pages/auth/LoginPage';
import VerificationPage from '@/pages/auth/VerificationPage';
import NotificationsPage from '@/pages/dashboard/notifications';

import DashboardLayout from '@/components/layouts/DashboardLayout';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProfilePage from '@/pages/dashboard/ProfilePage';
import SubmissionsList from '@/pages/dashboard/submissions/index';
import SubmitChallengePage from '@/pages/dashboard/submit/[challengeId]';
import CreateChallengePage from '@/pages/dashboard/CreateChallengePage';

import AdminUsersPage from '@/pages/dashboard/AdminUsersPage';
import AdminAnalyticsPage from '@/pages/dashboard/AdminAnalyticsPage';
import AdminSettingsPage from '@/pages/dashboard/AdminSettingsPage';
import AdminIntegrationsPage from '@/pages/dashboard/AdminIntegrationsPage';

import ChallengesPage from '@/pages/challenges';
import ChallengeDetails from '@/pages/challenges/[id]';

import InnovationsPage from '@/pages/innovations';
import InnovationDetails from '@/pages/innovations/[id]';
import InnovationSubmitPage from '@/pages/innovations/submit/index';
import BasicInfoPage from '@/pages/innovations/submit/basic-info';
import DetailsPage from '@/pages/innovations/submit/details';
import MediaPage from '@/pages/innovations/submit/media';
import TechnicalPage from '@/pages/innovations/submit/technical';
import RegulatoryPage from '@/pages/innovations/submit/regulatory';
import ContactInformationPage from '@/pages/innovations/submit/contact';
import ReviewPage from '@/pages/innovations/submit/review';

import InvestmentPage from '@/pages/investment';
import PortfolioPage from '@/pages/investment/portfolio';
import MarketAnalysisPage from '@/pages/investment/market-analysis';
import InvestmentTrendsPage from '@/pages/investment/investment-trends';
import RegulatoryPage2 from '@/pages/regulatory';

import KnowledgeHubPage from '@/pages/knowledge-hub';

// User portal
import DashboardInnovationsPage from '@/pages/dashboard/innovations/index';
import DashboardInnovationDetailsPage from '@/pages/dashboard/innovations/[id]';
import DashboardSettingsPage from '@/pages/dashboard/settings/index';
import DashboardActivityPage from '@/pages/dashboard/activity/index';
import DashboardKnowledgePage from '@/pages/dashboard/knowledge/index';
import DashboardInvestmentPage from '@/pages/dashboard/investment/index';
import DashboardRegulatoryPage from '@/pages/dashboard/regulatory/index';
import DashboardCollaborationPage from '@/pages/dashboard/collaboration/index';

// Regulatory Applications
import NewRegulatoryApplicationPage from '@/pages/dashboard/regulatory/applications/new';
import ApplicationDetailsPage from '@/pages/dashboard/regulatory/applications/[id]';
import SandboxTestingPage from '@/pages/dashboard/regulatory/testing/[id]';
import DocumentUploadPage from '@/pages/dashboard/regulatory/documents/upload';

// Admin portal
import AdminDashboardPage from '@/pages/admin/index';
import AdminCmsPage from '@/pages/admin/cms/index';
import AdminReportsPage from '@/pages/admin/reports/index';
import AdminUserManagementPage from '@/pages/admin/users/index';
import AdminChallengeManagementPage from '@/pages/admin/challenges/index';
import AdminInnovationRegistryPage from '@/pages/admin/innovations/index';
import AdminInvestmentToolsPage from '@/pages/admin/investment/index';
import AdminSandboxPage from '@/pages/admin/sandbox/index';
import AdminKnowledgePage from '@/pages/admin/knowledge/index';
import AdminNotificationsPage from '@/pages/admin/notifications/index';
import AdminIntegrationsPage2 from '@/pages/admin/integrations/index';

import PolicyPage from '@/pages/policy/index';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/challenges/:id" element={<ChallengeDetails />} />
      <Route path="/innovations" element={<InnovationsPage />} />
      <Route path="/innovations/:id" element={<InnovationDetails />} />
      
      {/* Innovation Submission Flow */}
      <Route path="/innovations/submit" element={<InnovationSubmitPage />}>
        <Route index element={<div className="flex justify-center items-center p-8">
          <p className="text-gray-600">
            Select an option from the right to begin your innovation submission.
          </p>
        </div>} />
        <Route path="basic-info" element={<BasicInfoPage />} />
        <Route path="details" element={<DetailsPage />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="technical" element={<TechnicalPage />} />
        <Route path="regulatory" element={<RegulatoryPage />} />
        <Route path="contact" element={<ContactInformationPage />} />
        <Route path="review" element={<ReviewPage />} />
      </Route>
      
      <Route path="/investment" element={<InvestmentPage />} />
      <Route path="/regulatory" element={<RegulatoryPage2 />} />
      <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
      
      {/* Auth Routes */}
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/verify" element={<VerificationPage />} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<DashboardSettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        
        {/* User Portal Routes - Phase 1 */}
        <Route path="submissions" element={<SubmissionsList />} />
        <Route path="innovations" element={<DashboardInnovationsPage />} />
        <Route path="innovations/:id" element={<DashboardInnovationDetailsPage />} />
        <Route path="activity" element={<DashboardActivityPage />} />
        
        {/* User Portal Routes - Phase 2 */}
        <Route path="investment" element={<DashboardInvestmentPage />} />
        <Route path="investment/portfolio" element={<PortfolioPage />} />
        <Route path="investment/market-analysis" element={<MarketAnalysisPage />} />
        <Route path="investment/trends" element={<InvestmentTrendsPage />} />
        <Route path="regulatory" element={<DashboardRegulatoryPage />} />
        <Route path="regulatory/applications/new" element={<NewRegulatoryApplicationPage />} />
        <Route path="regulatory/applications/:id" element={<ApplicationDetailsPage />} />
        <Route path="regulatory/testing/:id" element={<SandboxTestingPage />} />
        <Route path="regulatory/documents/upload" element={<DocumentUploadPage />} />
        <Route path="knowledge" element={<DashboardKnowledgePage />} />
        <Route path="collaboration" element={<DashboardCollaborationPage />} />
        
        <Route path="submit/:challengeId" element={<SubmitChallengePage />} />
        <Route path="create-challenge" element={<CreateChallengePage />} />
        
        {/* Policy Routes */}
        <Route path="policy" element={<PolicyPage />} />
        
        {/* Admin Routes */}
        <Route path="admin/users" element={<AdminUsersPage />} />
        <Route path="admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="admin/settings" element={<AdminSettingsPage />} />
        <Route path="admin/integrations" element={<AdminIntegrationsPage />} />
      </Route>
      
      {/* Admin Portal Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/cms" element={
        <ProtectedRoute>
          <AdminCmsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute>
          <AdminReportsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute>
          <AdminUserManagementPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/challenges" element={
        <ProtectedRoute>
          <AdminChallengeManagementPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/innovations" element={
        <ProtectedRoute>
          <AdminInnovationRegistryPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/investment" element={
        <ProtectedRoute>
          <AdminInvestmentToolsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/sandbox" element={
        <ProtectedRoute>
          <AdminSandboxPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/knowledge" element={
        <ProtectedRoute>
          <AdminKnowledgePage />
        </ProtectedRoute>
      } />
      <Route path="/admin/notifications" element={
        <ProtectedRoute>
          <AdminNotificationsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/integrations" element={
        <ProtectedRoute>
          <AdminIntegrationsPage2 />
        </ProtectedRoute>
      } />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
