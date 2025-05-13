
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AnimationProvider } from "@/components/animations/AnimationProvider";
import { SidebarProvider } from "@/components/sidebar/SidebarProvider";

export function AppProviders({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="moh-theme">
        <AnimationProvider>
          <AuthProvider>
            <SidebarProvider>
              {children}
              <Toaster />
            </SidebarProvider>
          </AuthProvider>
        </AnimationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
