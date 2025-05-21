import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useTenant } from "@/context/TenantContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tenant } from "@/types";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const createTenantFormSchema = z.object({
  name: z.string().min(2, "Tenant name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  primaryColor: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;
type CreateTenantFormValues = z.infer<typeof createTenantFormSchema>;

export default function LoginForm() {
  const { login } = useAuth();
  const { tenants, createTenant, isLoading: tenantsLoading } = useTenant();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"login" | "create">("login");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [openTenantSelector, setOpenTenantSelector] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const createTenantForm = useForm<CreateTenantFormValues>({
    resolver: zodResolver(createTenantFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      primaryColor: "#10b981",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    if (!selectedTenant && tenants.length > 0) {
      setError("Please select a tenant");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await login(data.email, data.password, selectedTenant?.id);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateTenantSubmit = async (data: CreateTenantFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      // Create the tenant first
      const newTenant = await createTenant({
        name: data.name,
        primaryColor: data.primaryColor,
      });

      // Then login with the new tenant
      await login(data.email, data.password, newTenant.id);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create tenant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 bg-white p-6 shadow-lg rounded-lg">
      <Tabs
        defaultValue="login"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "login" | "create")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Sign In</TabsTrigger>
          <TabsTrigger value="create">Create Tenant</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-4 mt-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your tenant account
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {tenants.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Tenant</label>
                <Popover
                  open={openTenantSelector}
                  onOpenChange={setOpenTenantSelector}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openTenantSelector}
                      aria-label="Select a tenant"
                      className="w-full justify-between"
                      disabled={isLoading || tenantsLoading}
                    >
                      {selectedTenant ? (
                        <>
                          <Avatar
                            className="mr-2 h-5 w-5"
                            src={selectedTenant.logo}
                          />
                          {selectedTenant.name}
                        </>
                      ) : (
                        "Select tenant"
                      )}
                      <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandList>
                        <CommandInput placeholder="Search tenant..." />
                        <CommandEmpty>No tenant found.</CommandEmpty>
                        <CommandGroup heading="Tenants">
                          {tenants.map((tenant) => (
                            <CommandItem
                              key={tenant.id}
                              onSelect={() => {
                                setSelectedTenant(tenant);
                                setOpenTenantSelector(false);
                              }}
                              className="text-sm"
                            >
                              <Avatar
                                className="mr-2 h-5 w-5"
                                src={tenant.logo}
                              />
                              {tenant.name}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedTenant?.id === tenant.id
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin@example.com"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          autoComplete="current-password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Demo credentials: admin@example.com / password
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4 mt-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create Tenant</h1>
            <p className="text-muted-foreground">
              Set up a new tenant for your wholesale business
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <Form {...createTenantForm}>
            <form
              onSubmit={createTenantForm.handleSubmit(onCreateTenantSubmit)}
              className="space-y-4"
            >
              <FormField
                control={createTenantForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenant Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Acme Fruits Inc."
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createTenantForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@example.com"
                        type="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createTenantForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createTenantForm.control}
                name="primaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Color</FormLabel>
                    <FormControl>
                      <Input
                        type="color"
                        className="h-10 w-full"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Tenant & Sign In"}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
