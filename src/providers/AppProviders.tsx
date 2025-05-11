
import { ReactNode } from 'react';
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

interface AppProvidersProps {
  children: ReactNode;
  queryClient: QueryClient;
}

export function AppProviders({ children, queryClient }: AppProvidersProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="moh-theme-preference">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
