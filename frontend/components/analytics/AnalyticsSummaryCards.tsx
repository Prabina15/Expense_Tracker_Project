import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, PiggyBank, Percent } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import type { AnalyticsOverview } from "@/types/analytics";

interface AnalyticsSummaryCardsProps {
  data: AnalyticsOverview;
}

export function AnalyticsSummaryCards({ data }: AnalyticsSummaryCardsProps) {
  const {
    totalIncome,
    totalExpense,
    totalSavings,
    avgMonthlyIncome,
    avgMonthlyExpense,
    savingsRate,
    months,
  } = data;

  const cards = [
    {
      label: "Total Income",
      value: formatCurrency(totalIncome),
      caption: `Avg ${formatCurrency(avgMonthlyIncome)}/mo`,
      icon: TrendingUp,
      tone: "primary" as const,
    },
    {
      label: "Total Expenses",
      value: formatCurrency(totalExpense),
      caption: `Avg ${formatCurrency(avgMonthlyExpense)}/mo`,
      icon: TrendingDown,
      tone: "destructive" as const,
    },
    {
      label: "Net Savings",
      value: formatCurrency(totalSavings),
      caption: `Over the last ${months} months`,
      icon: PiggyBank,
      tone: totalSavings >= 0 ? ("primary" as const) : ("destructive" as const),
    },
    {
      label: "Savings Rate",
      value: `${savingsRate}%`,
      caption: "Of total income saved",
      icon: Percent,
      tone: savingsRate >= 0 ? ("primary" as const) : ("destructive" as const),
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="shadow-xs border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.label}
            </CardTitle>
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-lg",
                card.tone === "primary"
                  ? "bg-primary/10 text-primary"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              <card.icon className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div
              className={cn(
                "text-2xl font-bold tracking-tight",
                card.tone === "destructive" && card.label !== "Total Expenses"
                  ? "text-destructive"
                  : "text-foreground"
              )}
            >
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {card.caption}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}