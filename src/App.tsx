
import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AppProviders from './providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';
import './App.css';
import './services/ai/AIServiceRegistry'; // Import the registry to ensure services get registered

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
