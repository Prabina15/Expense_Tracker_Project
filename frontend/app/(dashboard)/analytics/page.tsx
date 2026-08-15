"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { PieChart } from "lucide-react";

import { useAnalyticsOverview } from "@/hooks/useAnalytics";
import { MonthRangeSelector } from "@/components/analytics/MonthRangeSelector";
import { AnalyticsSummaryCards } from "@/components/analytics/AnalyticsSummaryCards";
import { IncomeExpenseTrendChart } from "@/components/analytics/IncomeExpenseTrendChart";
import { SavingsTrendChart } from "@/components/analytics/SavingsTrendChart";
import { CategoryDistributionChart } from "@/components/analytics/CategoryDistributionChart";
import { AnalyticsSkeleton } from "@/components/analytics/AnalyticsSkeleton";
import { TransactionsError } from "@/components/shared/TransactionError";

export default function AnalyticsPage() {
  const [months, setMonths] = useState(6);
  const { data, isLoading, isError, refetch, isFetching } =
    useAnalyticsOverview(months);

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Financial insights, trends, and reporting.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="w-fit gap-1.5 px-3 py-1 text-xs font-medium border-primary/30 text-primary bg-primary/10"
          >
            <PieChart className="size-3.5" />
            {isFetching && !isLoading ? "Syncing..." : "Financial Insights"}
          </Badge>
          <MonthRangeSelector value={months} onChange={setMonths} />
        </div>
      </div>

      {isLoading && <AnalyticsSkeleton />}

      {isError && !isLoading && (
        <TransactionsError noun="your analytics" onRetry={() => refetch()} />
      )}

      {!isLoading && !isError && data && (
        <>
          <AnalyticsSummaryCards data={data} />

          <div className="grid gap-4 lg:grid-cols-2">
            <IncomeExpenseTrendChart data={data.trend} />
            <SavingsTrendChart data={data.trend} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <CategoryDistributionChart
              title="Expense Distribution"
              description="Where your money went, by category"
              data={data.expenseDistribution}
              emptyLabel="No expenses recorded in this range yet."
            />
            <CategoryDistributionChart
              title="Income Distribution"
              description="Where your money came from, by category"
              data={data.incomeDistribution}
              emptyLabel="No income recorded in this range yet."
            />
          </div>
        </>
      )}
    </div>
  );
}