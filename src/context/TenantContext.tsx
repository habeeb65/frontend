import React, { createContext, useContext, useState, useEffect } from "react";
import { Tenant } from "@/types";
import { tenantService } from "@/services/api";
import { adaptTenant } from "@/utils/djangoAdapter";
import { useAuth } from "./AuthContext";

// Mock data for tenants when no backend is available
const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "Mango Express",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=ME",
    primaryColor: "#f59e0b",
    active: true,
  },
  {
    id: "2",
    name: "Fruit Wholesalers Inc.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=FW",
    primaryColor: "#10b981",
    active: true,
  },
  {
    id: "3",
    name: "Global Produce",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GP",
    primaryColor: "#3b82f6",
    active: true,
  },
];

interface TenantContextType {
  currentTenant: Tenant | null;
  tenants: Tenant[];
  setCurrentTenant: (tenant: Tenant) => void;
  isLoading: boolean;
  createTenant: (tenantData: Partial<Tenant>) => Promise<Tenant>;
  updateTenant: (id: string, tenantData: Partial<Tenant>) => Promise<Tenant>;
}

const TenantContext = createContext<TenantContextType>({
  currentTenant: null,
  tenants: [],
  setCurrentTenant: () => {},
  isLoading: true,
  createTenant: async () => ({ id: "", name: "", active: false }),
  updateTenant: async () => ({ id: "", name: "", active: false }),
});

export const useTenant = () => useContext(TenantContext);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tenants when user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setTenants([]);
      setCurrentTenant(null);
      setIsLoading(false);
      return;
    }

    const fetchTenants = async () => {
      try {
        setIsLoading(true);

        // Check if we have a backend API URL configured
        const apiUrl = import.meta.env.VITE_API_URL;

        if (apiUrl) {
          // Use real backend
          const tenantsData = await tenantService.getTenants();
          const adaptedTenants = tenantsData.map(adaptTenant);
          setTenants(adaptedTenants);

          // Set user's tenant as current if available
          if (user?.tenantId && !currentTenant) {
            const userTenant = adaptedTenants.find(
              (t) => t.id === user.tenantId,
            );
            if (userTenant) {
              setCurrentTenant(userTenant);
            } else if (adaptedTenants.length > 0) {
              setCurrentTenant(adaptedTenants[0]);
            }
          }
        } else {
          // Use mock data for development
          setTimeout(() => {
            setTenants(mockTenants);
            // Set the first tenant as default if none is selected
            if (!currentTenant && mockTenants.length > 0) {
              setCurrentTenant(mockTenants[0]);
            }
          }, 800);
        }
      } catch (error) {
        console.error("Error fetching tenants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenants();
  }, [isAuthenticated, user]);

  // Save current tenant selection to localStorage
  useEffect(() => {
    if (currentTenant) {
      localStorage.setItem("erp_current_tenant", JSON.stringify(currentTenant));
    }
  }, [currentTenant]);

  // Create a new tenant
  const createTenant = async (tenantData: Partial<Tenant>): Promise<Tenant> => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      if (apiUrl) {
        // Use real backend
        const response = await tenantService.createTenant(tenantData);
        const newTenant = adaptTenant(response);
        setTenants((prev) => [...prev, newTenant]);
        return newTenant;
      } else {
        // Mock implementation
        const newTenant: Tenant = {
          id: `${tenants.length + 1}`,
          name: tenantData.name || "New Tenant",
          logo:
            tenantData.logo ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${tenantData.name?.substring(0, 2)}`,
          primaryColor: tenantData.primaryColor || "#3b82f6",
          active: true,
        };
        setTenants((prev) => [...prev, newTenant]);
        return newTenant;
      }
    } catch (error) {
      console.error("Error creating tenant:", error);
      throw error;
    }
  };

  // Update an existing tenant
  const updateTenant = async (
    id: string,
    tenantData: Partial<Tenant>,
  ): Promise<Tenant> => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      if (apiUrl) {
        // Use real backend
        const response = await tenantService.updateTenant(id, tenantData);
        const updatedTenant = adaptTenant(response);
        setTenants((prev) =>
          prev.map((t) => (t.id === id ? updatedTenant : t)),
        );

        // Update current tenant if it's the one being updated
        if (currentTenant?.id === id) {
          setCurrentTenant(updatedTenant);
        }

        return updatedTenant;
      } else {
        // Mock implementation
        const updatedTenant: Tenant = {
          ...tenants.find((t) => t.id === id)!,
          ...tenantData,
        };
        setTenants((prev) =>
          prev.map((t) => (t.id === id ? updatedTenant : t)),
        );

        // Update current tenant if it's the one being updated
        if (currentTenant?.id === id) {
          setCurrentTenant(updatedTenant);
        }

        return updatedTenant;
      }
    } catch (error) {
      console.error("Error updating tenant:", error);
      throw error;
    }
  };

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        tenants,
        setCurrentTenant,
        isLoading,
        createTenant,
        updateTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};
