
import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';
import { FahadChatContainer } from './components/chat/FahadChatContainer';
import './App.css';
import './services/ai/AIServiceRegistry'; // Import the registry to ensure services get registered

const queryClient = new QueryClient();

function App() {
  return (
    <AppProviders queryClient={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        <FahadChatContainer />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
