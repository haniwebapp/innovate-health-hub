import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ui/theme-provider'
import { Toaster } from './components/ui/toaster'
import { AIProvider } from './context/AIContext'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import { initializeAIServices } from './services/ai/initializeAI'
import ReportsPage from './pages/admin/reports/ReportsPage'
import Admin from './pages/admin/Admin'
import Challenges from './pages/challenges/Challenges'
import ChallengeDetails from './pages/challenges/ChallengeDetails'
import Innovations from './pages/innovations/Innovations'
import InnovationDetails from './pages/innovations/InnovationDetails'
import Regulatory from './pages/regulatory/Regulatory'
import Investment from './pages/investment/Investment'
import Knowledge from './pages/knowledge/Knowledge'
import Events from './pages/events/Events'
import Support from './pages/support/Support'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import Story from './pages/story/Story'
import AIDashboard from './pages/ai/AIDashboard'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  // Initialize AI services
  useEffect(() => {
    initializeAIServices();
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <AIProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/challenges/:id" element={<ChallengeDetails />} />
            <Route path="/innovations" element={<Innovations />} />
            <Route path="/innovations/:id" element={<InnovationDetails />} />
            <Route path="/regulatory" element={<Regulatory />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/events" element={<Events />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/story" element={<Story />} />
            <Route path="/ai" element={<AIDashboard />} />
          </Routes>
        </Router>
        <Toaster />
      </AIProvider>
    </ThemeProvider>
  )
}

export default App
