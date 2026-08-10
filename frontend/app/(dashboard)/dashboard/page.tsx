"use client";

import { Badge } from "@/components/ui/badge";
import { LayoutDashboard } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { CategoryBreakdownChart } from "@/components/charts/CategoryBreakdownChart";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { DashboardError } from "@/components/dashboard/DashboardError";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch, isFetching } = useDashboard();

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
          {isFetching && !isLoading ? "Syncing..." : "Live Overview"}
        </Badge>
      </div>

      {isLoading && <DashboardSkeleton />}

      {isError && !isLoading && (
        <DashboardError onRetry={() => refetch()} />
      )}

      {!isLoading && !isError && data && (
        <>
          <SummaryCards data={data} />

          <div className="grid gap-4 lg:grid-cols-2">
            <RecentTransactions transactions={data.recentTransactions} />
            <CategoryBreakdownChart data={data.expenseDistribution} />
          </div>
        </>
      )}
    </div>
  );
}