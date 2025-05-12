
import React, { useEffect } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';
import { MedicalBackgroundEffect } from './components/layouts/MedicalBackgroundEffect';
import { ScrollProgress } from './components/animations/ScrollProgress';
import { TooltipProvider } from './components/ui/tooltip';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from './components/analytics/Analytics';
import './App.css';
import './services/ai/AIServiceRegistry'; // Import the registry to ensure services get registered

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  // Track page views or initialize analytics
  useEffect(() => {
    console.log("Healthcare Innovation Platform initialized");
  }, []);

  return (
    <AppProviders queryClient={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          {/* Medical-themed background effect with DNA patterns and particles */}
          <MedicalBackgroundEffect />
          
          {/* Animated scroll progress indicator */}
          <ScrollProgress />
          
          {/* Main application routes with enhanced transitions */}
          <AnimatePresence mode="wait">
            <AppRoutes />
          </AnimatePresence>
          
          {/* Analytics tracking */}
          <Analytics />
        </BrowserRouter>
      </TooltipProvider>
    </AppProviders>
  );
}

export default App;
