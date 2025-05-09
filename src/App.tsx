
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerificationPage from "./pages/auth/VerificationPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import ChallengesPage from "./pages/challenges";
import ChallengeDetailPage from "./pages/challenges/[id]";
import AboutPage from "./pages/about";
import InnovationsPage from "./pages/innovations";
import InnovationDetailPage from "./pages/innovations/[id]";
import KnowledgeHubPage from "./pages/knowledge-hub";
import SubmissionsPage from "./pages/dashboard/submissions";
import SubmitChallengePage from "./pages/dashboard/submit/[challengeId]";
import AdminAnalyticsPage from "./pages/dashboard/AdminAnalyticsPage";
import CreateChallengePage from "./pages/dashboard/CreateChallengePage";
import AdminUsersPage from "./pages/dashboard/AdminUsersPage";
import AdminSettingsPage from "./pages/dashboard/AdminSettingsPage";

// Components and Context
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/verification" element={<VerificationPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
              <Route path="/innovations" element={<InnovationsPage />} />
              <Route path="/innovations/:id" element={<InnovationDetailPage />} />
              
              {/* Protected Routes - Dashboard */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="submissions" element={<SubmissionsPage />} />
                <Route path="create-challenge" element={<CreateChallengePage />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="submit/:challengeId" element={<SubmitChallengePage />} />
                
                {/* New Admin Routes */}
                <Route path="admin/users" element={<AdminUsersPage />} />
                <Route path="admin/settings" element={<AdminSettingsPage />} />
              </Route>
              
              {/* Static Routes */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/innovations" element={<InnovationsPage />} />
              <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
              
              {/* 404 - Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
