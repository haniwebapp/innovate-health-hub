
import React, { useEffect } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';
import { MedicalBackgroundEffect } from './components/layouts/MedicalBackgroundEffect';
import './App.css';
import './services/ai/AIServiceRegistry'; // Import the registry to ensure services get registered

const queryClient = new QueryClient();

function App() {
  // Track page views or initialize analytics
  useEffect(() => {
    console.log("Healthcare Innovation Platform initialized");
  }, []);

  return (
    <AppProviders queryClient={queryClient}>
      <BrowserRouter>
        {/* Medical-themed background effect with DNA patterns */}
        <MedicalBackgroundEffect />
        
        {/* Main application routes with enhanced transitions */}
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
