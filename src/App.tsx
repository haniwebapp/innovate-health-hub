
import React, { useEffect } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import './services/ai/AIServiceRegistry'; // Import the registry to ensure services get registered

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  // Preload critical assets
  useEffect(() => {
    const preloadAssets = async () => {
      const criticalImages = [
        '/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png', // MOH logo
        '/pattern.svg',
        '/dna-pattern.svg',
      ];
      
      criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadAssets();
  }, []);

  return (
    <AppProviders queryClient={queryClient}>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <motion.div
            key="app-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
