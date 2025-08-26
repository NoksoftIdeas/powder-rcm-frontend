"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
// import LoadingSpinner from "../LoadingSpinner";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

// Create a logout function that can be used both inside and outside the context
const logout = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export { logout };

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => false,
  signup: async () => false,
  logout,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session on initial load
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("auth_token");
        if (token) {
          // Simulate token validation
          // In a real app, this would be a call to your backend
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Session check failed", error);
        setIsAuthenticated(false);
      } finally {
        // Simulate a minimum loading time to show spinner
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulated login - replace with actual backend authentication
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // Check for admin credentials
      const isAdmin = email === "admin@demo.com" && password === "admin123";

      // Only allow login for admin users
      if (!isAdmin) {
        return false;
      }

      const mockUser = {
        id: Date.now().toString(),
        email: email,
        name: "Admin User",
        role: "admin",
      };

      // Set authentication state
      setIsAuthenticated(true);
      setUser(mockUser);

      // Store in localStorage for persistence
      localStorage.setItem("auth_token", "mock_token_" + Date.now());
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Redirect to dashboard
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    _password: string,
    name: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulated signup - replace with actual backend registration
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      const mockUser = {
        id: Date.now().toString(),
        email: email,
        name: name,
        role: "user",
      };

      // Set authentication state
      setIsAuthenticated(true);
      setUser(mockUser);

      // Store in localStorage for persistence
      localStorage.setItem("auth_token", "mock_token_" + Date.now());
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Redirect to dashboard
      return true;
    } catch (error) {
      console.error("Signup failed", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      setIsLoading(true);
      // Clear authentication state
      setIsAuthenticated(false);
      setUser(null);

      // Remove stored items
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");

      // Redirect to login
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking initial authentication
  // if (isLoading) {
  //   return <LoadingSpinner fullScreen />;
  // }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
