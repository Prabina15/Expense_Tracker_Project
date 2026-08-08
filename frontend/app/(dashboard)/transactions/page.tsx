import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Transactions
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            View and filter all financial transactions.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit gap-1.5 px-3 py-1 text-xs font-medium border-border text-muted-foreground bg-muted/40"
        >
          <ArrowLeftRight className="size-3.5" />
          Transaction History
        </Badge>
      </div>

      {/* Main Content Placeholder Container */}
      <Card className="w-full border-dashed border-2 border-border/80 bg-muted/20">
        <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 space-y-3 max-w-xl mx-auto w-full">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-1">
            <ArrowLeftRight className="size-6" />
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            Transactions Log & Filters
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Searchable financial transaction tables, pagination, category sorting, and CSV export utilities will be integrated here.
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}
