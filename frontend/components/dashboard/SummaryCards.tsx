import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import type { DashboardOverview } from "@/types/dashboard";

interface SummaryCardsProps {
  data: DashboardOverview;
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const { totalBalance, monthlyIncome, monthlyExpense, savings, savingsRate } =
    data;

  const cards = [
    {
      label: "Total Balance",
      value: totalBalance,
      caption: "All-time net position",
      icon: Wallet,
      tone: "primary" as const,
    },
    {
      label: "Monthly Income",
      value: monthlyIncome,
      caption: "This calendar month",
      icon: TrendingUp,
      tone: "primary" as const,
    },
    {
      label: "Monthly Expenses",
      value: monthlyExpense,
      caption: "This calendar month",
      icon: TrendingDown,
      tone: "destructive" as const,
    },
    {
      label: "Savings",
      value: savings,
      caption:
        monthlyIncome === 0
          ? "No income recorded yet"
          : `${savingsRate}% of monthly income`,
      icon: PiggyBank,
      tone: savings >= 0 ? ("primary" as const) : ("destructive" as const),
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
                card.tone === "destructive" && card.label !== "Monthly Expenses"
                  ? "text-destructive"
                  : "text-foreground"
              )}
            >
              {formatCurrency(card.value)}
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