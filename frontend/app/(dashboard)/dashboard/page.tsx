import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome to your Cashflow personal finance dashboard.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit gap-1.5 px-3 py-1 text-xs font-medium border-primary/20 text-primary bg-primary/5"
        >
          <LayoutDashboard className="size-3.5" />
          Overview Shell
        </Badge>
      </div>

      {/* Summary Placeholder Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Net Worth Card */}
        <Card className="shadow-xs border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Net Worth
            </CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wallet className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-bold tracking-tight text-foreground">
              $0.00
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Phase 2 Layout Shell Placeholder
            </p>
          </CardContent>
        </Card>

        {/* Income Card (Emerald/Green Accent) */}
        <Card className="shadow-xs border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Income
            </CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-bold tracking-tight text-foreground">
              $0.00
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Phase 2 Layout Shell Placeholder
            </p>
          </CardContent>
        </Card>

        {/* Expenses Card (Red/Destructive Accent) */}
        <Card className="shadow-xs border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <TrendingDown className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-bold tracking-tight text-foreground">
              $0.00
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Phase 2 Layout Shell Placeholder
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics / Widgets Placeholder Container */}
      <Card className="w-full border-dashed border-2 border-border/80 bg-muted/20">
        <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 space-y-3 max-w-xl mx-auto w-full">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-1">
            <Activity className="size-6" />
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            Dashboard Analytics Shell
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Interactive financial charts, cash flow metrics, and category breakdowns will be integrated in subsequent phases.
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}
