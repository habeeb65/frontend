import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useTenant } from "@/context/TenantContext";
import { Tenant } from "@/types";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TenantSwitcherProps extends PopoverTriggerProps {}

export default function TenantSwitcher({ className }: TenantSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const { tenants, currentTenant, setCurrentTenant } = useTenant();

  const handleSelect = (tenant: Tenant) => {
    setCurrentTenant(tenant);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a tenant"
          className={cn("w-[220px] justify-between", className)}
        >
          {currentTenant ? (
            <>
              <Avatar className="mr-2 h-5 w-5" src={currentTenant.logo} />
              {currentTenant.name}
            </>
          ) : (
            "Select tenant"
          )}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search tenant..." />
            <CommandEmpty>No tenant found.</CommandEmpty>
            <CommandGroup heading="Tenants">
              {tenants.map((tenant) => (
                <CommandItem
                  key={tenant.id}
                  onSelect={() => handleSelect(tenant)}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5" src={tenant.logo} />
                  {tenant.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentTenant?.id === tenant.id
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
  );
}
