
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
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ? session.user as ExtendedUser : null);
      
      if (session?.user) {
        checkIfUserIsAdmin(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    // Then get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ? session.user as ExtendedUser : null);
      
      if (session?.user) {
        checkIfUserIsAdmin(session.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Removed the fetchUserProfile method that was causing recursion issues
  // We'll rely on the admin status from the RPC function instead

  const checkIfUserIsAdmin = async (userId: string) => {
    try {
      console.log("Checking admin status for user ID:", userId);
      
      // Use ONLY the RPC function, which avoids recursion issues
      const { data: isAdminResult, error: rpcError } = await supabase
        .rpc('is_admin_user');

      console.log("RPC result:", isAdminResult, "Error:", rpcError);

      if (!rpcError) {
        console.log("Setting admin status from RPC:", isAdminResult);
        setIsAdmin(!!isAdminResult); // Convert to boolean in case it's null
        return;
      } else {
        console.error("Error calling is_admin_user RPC:", rpcError);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Exception checking admin status:", error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
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
