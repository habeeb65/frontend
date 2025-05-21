import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sale } from "@/types";
import { FileText, Plus } from "lucide-react";

// Mock data
const mockSales: Sale[] = [
  {
    id: "1",
    customerId: "101",
    products: [
      {
        productId: "1",
        quantity: 50,
        unitPrice: 24.99,
        lotNumber: "LOT-2023-05-A",
      },
      {
        productId: "2",
        quantity: 30,
        unitPrice: 19.99,
        lotNumber: "LOT-2023-05-B",
      },
    ],
    totalAmount: 1849.2,
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    notes: "Regular customer order",
    tenantId: "1",
    createdAt: "2023-05-20T14:30:00Z",
  },
  {
    id: "2",
    customerId: "102",
    products: [
      {
        productId: "3",
        quantity: 40,
        unitPrice: 18.5,
        lotNumber: "LOT-2023-05-C",
      },
    ],
    totalAmount: 740.0,
    paymentStatus: "partial",
    paymentMethod: "credit",
    notes: "Partial payment received",
    tenantId: "1",
    createdAt: "2023-05-21T10:15:00Z",
  },
  {
    id: "3",
    customerId: "103",
    products: [
      {
        productId: "1",
        quantity: 25,
        unitPrice: 24.99,
        lotNumber: "LOT-2023-05-A",
      },
      {
        productId: "4",
        quantity: 15,
        unitPrice: 16.99,
        lotNumber: "LOT-2023-05-D",
      },
    ],
    totalAmount: 879.6,
    paymentStatus: "unpaid",
    notes: "New customer order",
    tenantId: "1",
    createdAt: "2023-05-22T16:45:00Z",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-green-500">Paid</Badge>;
    case "partial":
      return <Badge className="bg-yellow-500">Partial</Badge>;
    case "unpaid":
      return <Badge className="bg-red-500">Unpaid</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function SalesPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Recent Sales</h3>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>
            Recent sales invoices and payment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">Invoice #{sale.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Customer ID: {sale.customerId} |{" "}
                    {formatDate(sale.createdAt)}
                  </p>
                  <p className="text-sm">
                    {sale.products.length}{" "}
                    {sale.products.length === 1 ? "item" : "items"} |
                    {sale.paymentMethod &&
                      ` ${sale.paymentMethod.replace("_", " ")}`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-medium">${sale.totalAmount.toFixed(2)}</p>
                  {getStatusBadge(sale.paymentStatus)}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
