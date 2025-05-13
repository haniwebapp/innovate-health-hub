
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

// Extend the User type to include the properties we need
interface ExtendedUser extends User {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  userType?: string;  // Added userType property
  user_type?: string; // Also add user_type for database consistency
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

// Create the context with default values
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
        // Defer Supabase calls to prevent potential auth deadlocks
        setTimeout(() => {
          checkIfUserIsAdmin(session.user.id);
          fetchUserProfile(session.user.id);
        }, 0);
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
        fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Use direct query instead of joining with user_type to avoid recursion
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url, user_type')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error("Error fetching user profile:", error);
        return;
      }
      
      if (data && user) {
        // Update the user object with profile data
        setUser(currentUser => {
          if (!currentUser) return null;
          return {
            ...currentUser,
            first_name: data.first_name,
            last_name: data.last_name,
            avatar_url: data.avatar_url,
            userType: data.user_type, // Set the userType property from user_type in DB
            user_type: data.user_type
          };
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const checkIfUserIsAdmin = async (userId: string) => {
    try {
      // First try to use the RPC function if it exists
      const { data: isAdminResult, error: rpcError } = await supabase
        .rpc('is_admin_user');

      if (!rpcError && isAdminResult !== null) {
        setIsAdmin(isAdminResult);
        return;
      }
      
      // Fallback to direct query if RPC fails
      const { data, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(data?.user_type === 'admin');
      
    } catch (error) {
      console.error("Error checking admin status:", error);
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
