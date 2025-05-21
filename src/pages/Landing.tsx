import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Package,
  Users,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">FruitERP</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              to="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              to="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              to="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Wholesale Management <br />
            <span className="text-primary">Made Simple</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A comprehensive SaaS platform for fruit wholesalers to manage
            inventory, sales, and finances in one place.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link to="/login">
            <Button size="lg" className="gap-1.5">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="#features">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-24 sm:py-32">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features for Wholesalers
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Everything you need to manage your wholesale business efficiently.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Inventory Management</h3>
            <p className="text-muted-foreground">
              Track stock levels, lot numbers, and damage reports in real-time.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Multi-tenant System</h3>
            <p className="text-muted-foreground">
              Manage multiple businesses with complete data isolation and
              security.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Financial Analytics</h3>
            <p className="text-muted-foreground">
              Get insights into sales, profits, and outstanding payments.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container py-24 sm:py-32 bg-muted/50">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Choose the plan that's right for your business.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          {/* Starter Plan */}
          <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Starter</h3>
              <p className="text-muted-foreground">
                Perfect for small businesses
              </p>
            </div>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">$49</span>
              <span className="ml-1 text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "1 Tenant",
                "Up to 500 Products",
                "Basic Analytics",
                "Email Support",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8">Get Started</Button>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm ring-2 ring-primary">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Professional</h3>
              <p className="text-muted-foreground">For growing businesses</p>
            </div>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">$99</span>
              <span className="ml-1 text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "3 Tenants",
                "Unlimited Products",
                "Advanced Analytics",
                "Priority Support",
                "API Access",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8">Get Started</Button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-muted-foreground">For large organizations</p>
            </div>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">$249</span>
              <span className="ml-1 text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Unlimited Tenants",
                "Unlimited Products",
                "Custom Analytics",
                "24/7 Support",
                "API Access",
                "Custom Integrations",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8">Contact Sales</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container py-24 sm:py-32">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Wholesalers
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            See what our customers have to say about us.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
          <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-muted-foreground">
              "This platform has transformed how we manage our wholesale
              business. The inventory tracking is precise and the multi-tenant
              feature allows us to manage all our locations efficiently."
            </p>
            <div className="mt-6 flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-sm text-muted-foreground">
                  CEO, Fresh Fruits Co.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-muted-foreground">
              "The financial analytics have given us insights we never had
              before. We've increased our profit margins by 15% since
              implementing this system."
            </p>
            <div className="mt-6 flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">
                  Operations Manager, Global Produce
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24 sm:py-32 bg-primary/5">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Streamline Your Wholesale Operations?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Join thousands of wholesalers who have transformed their business
            with our platform.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link to="/login">
              <Button size="lg" className="gap-1.5">
                Get Started Today
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="#pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-8 py-12 md:flex-row md:gap-16">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">FruitERP</h3>
            <p className="text-sm text-muted-foreground">
              Wholesale management made simple.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold">Product</h4>
              <Link
                to="#features"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </Link>
              <Link
                to="#pricing"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold">Company</h4>
              <Link
                to="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold">Legal</h4>
              <Link
                to="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
        <div className="container flex flex-col items-center justify-between gap-4 border-t py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FruitERP. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
