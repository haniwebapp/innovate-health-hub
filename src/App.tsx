
import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './components/ui/theme-provider'
import { Toaster } from './components/ui/toaster'
import { AIProvider } from './context/AIContext'
import { initializeAIServices } from './services/ai/initializeAI'
import { AppRoutes } from './routes/AppRoutes'

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
          <AppRoutes />
        </Router>
        <Toaster />
      </AIProvider>
    </ThemeProvider>
  )
}

export default App
