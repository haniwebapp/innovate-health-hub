
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import HomePage from './pages/Index';
import NotFound from './pages/NotFound';
import AboutPage from './pages/about';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import VerificationPage from './pages/auth/VerificationPage';

import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import SubmissionsList from './pages/dashboard/submissions/index';
import SubmitChallengePage from './pages/dashboard/submit/[challengeId]';
import CreateChallengePage from './pages/dashboard/CreateChallengePage';

import AdminUsersPage from './pages/dashboard/AdminUsersPage';
import AdminAnalyticsPage from './pages/dashboard/AdminAnalyticsPage';
import AdminSettingsPage from './pages/dashboard/AdminSettingsPage';
import AdminIntegrationsPage from './pages/dashboard/AdminIntegrationsPage';

import ChallengesPage from './pages/challenges';
import ChallengeDetails from './pages/challenges/[id]';

import InnovationsPage from './pages/innovations';
import InnovationDetails from './pages/innovations/[id]';

import InvestmentPage from './pages/investment';
import RegulatoryPage from './pages/regulatory';

import KnowledgeHubPage from './pages/knowledge-hub';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="moh-theme-preference">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Routes>
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
                  <Route path="submissions" element={<SubmissionsList />} />
                  <Route path="submit/:challengeId" element={<SubmitChallengePage />} />
                  <Route path="create-challenge" element={<CreateChallengePage />} />
                  
                  {/* Admin Routes */}
                  <Route path="admin/users" element={<AdminUsersPage />} />
                  <Route path="admin/analytics" element={<AdminAnalyticsPage />} />
                  <Route path="admin/settings" element={<AdminSettingsPage />} />
                  <Route path="admin/integrations" element={<AdminIntegrationsPage />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </TooltipProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
