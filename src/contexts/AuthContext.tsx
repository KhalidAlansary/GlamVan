
import { createContext, useContext, useState, ReactNode } from "react";

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin' | 'stylist';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isBeautician: boolean;
};

// Create auth context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user exists in local storage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Check if user is authenticated
  const isAuthenticated = !!user;
  
  // Check if user is admin
  const isAdmin = user?.role === 'admin';
  
  // Check if user is beautician
  const isBeautician = user?.role === 'stylist';

  // Mock login function (would connect to backend in real app)
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // This is a mock implementation. In a real app, this would make an API call
      if (email && password) {
        // Mock users for testing
        if (email === 'admin@example.com' && password === 'admin123') {
          const adminUser = {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin' as const,
          };
          setUser(adminUser);
          localStorage.setItem('user', JSON.stringify(adminUser));
          return true;
        } else if (email === 'beautician@example.com' && password === 'beauty123') {
          const beauticianUser = {
            id: '3',
            name: 'Layla Mohammed',
            email: 'beautician@example.com',
            role: 'stylist' as const,
          };
          setUser(beauticianUser);
          localStorage.setItem('user', JSON.stringify(beauticianUser));
          return true;
        } else if (email && password.length >= 6) {
          const clientUser = {
            id: '2',
            name: 'Client User',
            email: email,
            role: 'client' as const,
          };
          setUser(clientUser);
          localStorage.setItem('user', JSON.stringify(clientUser));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin, isBeautician }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
