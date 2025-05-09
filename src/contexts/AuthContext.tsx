
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Authentication types
interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  user_metadata: {
    firstName?: string;
    lastName?: string;
    organization?: string;
  };
  app_metadata: Record<string, any>;
  aud: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData?.session?.user) {
          // Get user profile including roles
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', sessionData.session.user.id)
            .single();

          // Set user data
          setUser({
            ...sessionData.session.user,
            role: profileData?.roles?.includes('admin') ? 'admin' : 'user',
            user_metadata: {
              firstName: profileData?.first_name || '',
              lastName: profileData?.last_name || '',
              organization: profileData?.organization || '',
            }
          });
          
          // Set admin status based on roles
          setIsAdmin(profileData?.roles?.includes('admin') || false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // Get user profile with roles when signed in
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          // Set user data
          setUser({
            ...session.user,
            role: profileData?.roles?.includes('admin') ? 'admin' : 'user',
            user_metadata: {
              firstName: profileData?.first_name || '',
              lastName: profileData?.last_name || '',
              organization: profileData?.organization || '',
            }
          });
          
          // Set admin status based on roles
          setIsAdmin(profileData?.roles?.includes('admin') || false);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const register = async (email: string, password: string, userData: any) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            userType: userData.userType,
            organization: userData.organization,
          }
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Add alias methods to match what's being used in components
  const signIn = login;
  const signUp = register;
  const signOut = logout;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAdmin, 
      login, 
      logout, 
      register,
      signIn,
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
