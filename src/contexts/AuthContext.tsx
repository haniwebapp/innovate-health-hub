
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

// Mock authentication for development
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

  useEffect(() => {
    // Simulate checking for an existing session
    const checkAuth = async () => {
      try {
        // In a real app, this would check localStorage, cookies, or call an API
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in a real app, this would call an API
      const mockUser: User = {
        id: "user-1",
        email: email,
        name: email.split("@")[0],
        role: email.includes("admin") ? "admin" : "user",
        user_metadata: {
          firstName: email.split("@")[0],
          lastName: "User",
          organization: "Health Organization",
        },
        app_metadata: {},
        aud: "authenticated",
        created_at: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = async (email: string, password: string, userData: any) => {
    setIsLoading(true);
    try {
      // Mock registration - in a real app, this would call an API
      const mockUser: User = {
        id: "user-" + Math.floor(Math.random() * 1000),
        email: email,
        name: userData.firstName,
        role: "user",
        user_metadata: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          organization: userData.organization,
        },
        app_metadata: {},
        aud: "authenticated",
        created_at: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
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
  
  const isAdmin = user?.role === "admin";

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
