import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown } from "lucide-react";

export default function ExpensesPage() {
  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Expenses
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monitor and categorize your spending.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit gap-1.5 px-3 py-1 text-xs font-medium border-destructive/30 text-destructive bg-destructive/10"
        >
          <TrendingDown className="size-3.5" />
          Expense Tracking
        </Badge>
      </div>

      {/* Main Content Placeholder Container */}
      <Card className="w-full border-dashed border-2 border-border/80 bg-muted/20">
        <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 space-y-3 max-w-xl mx-auto w-full">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-1">
            <TrendingDown className="size-6" />
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            Expenses Management Module
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Expense tracking, bill management, category tagging, and budget threshold tools will be added here.
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}
