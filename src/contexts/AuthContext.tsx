import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role: "client" | "admin" | "stylist";
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string, role?: "client" | "stylist") => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isBeautician: boolean;
  loading: boolean;
};

// Create auth context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get user role from metadata or default to client
const getUserRole = (user: SupabaseUser): "client" | "admin" | "stylist" => {
  const role = user.user_metadata?.role || user.app_metadata?.role;
  if (role === "admin" || role === "stylist") {
    return role;
  }
  return "client";
};

// Helper function to get user name from metadata or email
const getUserName = (user: SupabaseUser): string => {
  return user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
};

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = !!user && !!session;

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  // Check if user is beautician
  const isBeautician = user?.role === "stylist";

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const userData: User = {
          id: session.user.id,
          name: getUserName(session.user),
          email: session.user.email || '',
          role: getUserRole(session.user),
        };
        setUser(userData);
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            name: getUserName(session.user),
            email: session.user.email || '',
            role: getUserRole(session.user),
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const userData: User = {
          id: data.user.id,
          name: getUserName(data.user),
          email: data.user.email || '',
          role: getUserRole(data.user),
        };
        setUser(userData);
        setSession(data.session);
      }

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  // Signup function
  const signup = async (
    email: string, 
    password: string, 
    name: string, 
    role: "client" | "stylist" = "client"
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            role: role,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // If email confirmation is disabled, the user will be logged in immediately
        if (data.session) {
          const userData: User = {
            id: data.user.id,
            name: name,
            email: data.user.email || '',
            role: role,
          };
          setUser(userData);
          setSession(data.session);
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  // Logout function
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        session, 
        login, 
        signup, 
        logout, 
        isAuthenticated, 
        isAdmin, 
        isBeautician, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
