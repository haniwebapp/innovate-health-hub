
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

// Extend the User type to include the properties we need
interface ExtendedUser extends User {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: ExtendedUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, "Session:", !!session);
      setSession(session);
      setUser(session?.user ? session.user as ExtendedUser : null);
      
      // Only check admin status if we have a session
      if (session?.user) {
        // Use setTimeout to prevent potential recursion
        setTimeout(() => {
          checkIfUserIsAdmin();
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", !!session);
      setSession(session);
      setUser(session?.user ? session.user as ExtendedUser : null);
      
      // Only check admin status if we have a session
      if (session?.user) {
        checkIfUserIsAdmin();
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkIfUserIsAdmin = async () => {
    try {
      if (!session?.user?.id) {
        console.log("No user ID to check admin status");
        setIsAdmin(false);
        return;
      }
      
      console.log("Checking admin status for user ID:", session.user.id);
      
      // Use the RPC function to check admin status
      // This avoids the recursion issues with direct queries
      const { data: isAdminResult, error: rpcError } = await supabase
        .rpc('is_admin_user');
      
      console.log("RPC admin check result:", isAdminResult, "Error:", rpcError);

      if (!rpcError) {
        setIsAdmin(!!isAdminResult); // Convert to boolean in case it's null
      } else {
        console.error("Error calling is_admin_user RPC:", rpcError);
        
        // Fall back to direct profile check if RPC fails
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', session.user.id)
            .single();
            
          if (!profileError && profileData) {
            console.log("Fallback profile check:", profileData);
            setIsAdmin(profileData.user_type === 'admin');
          } else {
            console.error("Error in fallback profile check:", profileError);
            setIsAdmin(false);
          }
        } catch (fallbackError) {
          console.error("Exception in fallback admin check:", fallbackError);
          setIsAdmin(false);
        }
      }
    } catch (error) {
      console.error("Exception checking admin status:", error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Sign in error:", error);
      }
      return { error };
    } catch (error) {
      console.error("Exception during sign in:", error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      console.log("Attempting sign up for:", email);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      if (error) {
        console.error("Sign up error:", error);
      }
      return { error };
    } catch (error) {
      console.error("Exception during sign up:", error);
      return { error };
    }
  };

  const signOut = async () => {
    console.log("Signing out");
    await supabase.auth.signOut();
  };

  // Added logout as an alias for signOut for consistency
  const logout = async () => {
    await signOut();
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user,
    isAdmin,
    isLoading,
    signIn,
    signUp,
    signOut,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
