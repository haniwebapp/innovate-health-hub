
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UIProvider } from './UIProvider';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        {children}
      </UIProvider>
    </QueryClientProvider>
  );
}
