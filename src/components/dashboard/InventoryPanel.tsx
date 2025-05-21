import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Alphonso Mangoes",
    description: "Premium quality Alphonso mangoes",
    sku: "MNG-ALP-001",
    price: 24.99,
    cost: 18.5,
    quantity: 120,
    tenantId: "1",
    lotNumber: "LOT-2023-05-A",
    damageCount: 3,
    createdAt: "2023-05-10T10:00:00Z",
    updatedAt: "2023-05-10T10:00:00Z",
  },
  {
    id: "2",
    name: "Kesar Mangoes",
    description: "Sweet Kesar mangoes from Gujarat",
    sku: "MNG-KSR-002",
    price: 19.99,
    cost: 14.75,
    quantity: 85,
    tenantId: "1",
    lotNumber: "LOT-2023-05-B",
    damageCount: 5,
    createdAt: "2023-05-12T10:00:00Z",
    updatedAt: "2023-05-12T10:00:00Z",
  },
  {
    id: "3",
    name: "Banganapalli Mangoes",
    description: "Juicy Banganapalli mangoes",
    sku: "MNG-BNG-003",
    price: 18.5,
    cost: 13.25,
    quantity: 210,
    tenantId: "1",
    lotNumber: "LOT-2023-05-C",
    damageCount: 8,
    createdAt: "2023-05-15T10:00:00Z",
    updatedAt: "2023-05-15T10:00:00Z",
  },
  {
    id: "4",
    name: "Dasheri Mangoes",
    description: "Aromatic Dasheri mangoes",
    sku: "MNG-DSH-004",
    price: 16.99,
    cost: 12.5,
    quantity: 45,
    tenantId: "1",
    lotNumber: "LOT-2023-05-D",
    damageCount: 2,
    createdAt: "2023-05-18T10:00:00Z",
    updatedAt: "2023-05-18T10:00:00Z",
  },
];

const getStockStatus = (quantity: number) => {
  if (quantity > 100) return { label: "In Stock", color: "bg-green-500" };
  if (quantity > 50) return { label: "Good", color: "bg-blue-500" };
  if (quantity > 20) return { label: "Low", color: "bg-yellow-500" };
  return { label: "Critical", color: "bg-red-500" };
};

export default function InventoryPanel() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
          <CardDescription>
            Current stock levels and inventory status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProducts.map((product) => {
              const stockStatus = getStockStatus(product.quantity);
              const stockPercentage = Math.min(product.quantity, 200) / 2; // Max at 100%

              return (
                <div key={product.id} className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        SKU: {product.sku} | Lot: {product.lotNumber}
                      </p>
                    </div>
                    <Badge
                      variant={
                        stockStatus.label === "Critical"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {stockStatus.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={stockPercentage} className="h-2" />
                    <span className="w-12 text-sm">{product.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      Damage:{" "}
                      <span className="text-destructive">
                        {product.damageCount}
                      </span>
                    </span>
                    <span>
                      Value: ${(product.quantity * product.cost).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
