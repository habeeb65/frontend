import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { authService } from "@/services/api";
import { adaptUser } from "@/utils/djangoAdapter";
import { useTenant } from "@/context/TenantContext";

// Mock user data for development without backend
const mockUser: User = {
  id: "1",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",
  tenantId: "1",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, tenantId?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("erp_user");
        const token = localStorage.getItem("erp_token");

        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth error:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, tenantId?: string) => {
    try {
      setIsLoading(true);

      // Check if we have a backend API URL configured
      const apiUrl = import.meta.env.VITE_API_URL;

      if (apiUrl) {
        // Use real backend
        try {
          const response = await authService.login(email, password, tenantId);
          const { token, user: userData } = response;

          // Store token and user data
          localStorage.setItem("erp_token", token);
          const adaptedUser = adaptUser(userData);
          setUser(adaptedUser);
          localStorage.setItem("erp_user", JSON.stringify(adaptedUser));
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Invalid credentials");
        }
      } else {
        // Use mock data for development
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email === "admin@example.com" && password === "password") {
          // If tenantId is provided, update the mock user
          const mockUserWithTenant = {
            ...mockUser,
            tenantId: tenantId || mockUser.tenantId,
          };

          setUser(mockUserWithTenant);
          localStorage.setItem("erp_user", JSON.stringify(mockUserWithTenant));
          localStorage.setItem("erp_token", "mock-token-for-development");
        } else {
          throw new Error("Invalid credentials");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
