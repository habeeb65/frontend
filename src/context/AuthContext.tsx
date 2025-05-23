import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { supabase } from "@/lib/supabase";
import { useTenant } from "@/context/TenantContext";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, tenantId?: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    tenantId: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentTenant } = useTenant();

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        setIsLoading(true);

        // Get session from Supabase
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          // Get user profile from profiles table
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profile) {
            const userData: User = {
              id: profile.id,
              email: profile.email,
              name: profile.name,
              role: profile.role as "admin" | "manager" | "staff",
              tenantId: profile.tenant_id,
              avatar: profile.avatar || undefined,
            };

            setUser(userData);

            // Get tenant data
            const { data: tenant } = await supabase
              .from("tenants")
              .select("*")
              .eq("id", profile.tenant_id)
              .single();

            if (tenant) {
              setCurrentTenant({
                id: tenant.id,
                name: tenant.name,
                logo: tenant.logo || undefined,
                primaryColor: tenant.primary_color || undefined,
                active: tenant.is_active,
              });
            }
          }
        }
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Get user profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          const userData: User = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role as "admin" | "manager" | "staff",
            tenantId: profile.tenant_id,
            avatar: profile.avatar || undefined,
          };

          setUser(userData);

          // Get tenant data
          const { data: tenant } = await supabase
            .from("tenants")
            .select("*")
            .eq("id", profile.tenant_id)
            .single();

          if (tenant) {
            setCurrentTenant({
              id: tenant.id,
              name: tenant.name,
              logo: tenant.logo || undefined,
              primaryColor: tenant.primary_color || undefined,
              active: tenant.is_active,
            });
          }
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setCurrentTenant(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setCurrentTenant]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Auth state listener will handle setting the user
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    tenantId: string,
  ) => {
    try {
      setIsLoading(true);

      // Sign up with Supabase Auth
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      if (!authUser) throw new Error("Failed to create user");

      // Create profile in profiles table
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authUser.id,
        email,
        name,
        role: "admin",
        tenant_id: tenantId,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      });

      if (profileError) throw profileError;

      // Auth state listener will handle setting the user
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setCurrentTenant(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
