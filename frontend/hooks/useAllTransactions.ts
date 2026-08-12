"use client";

import { useMemo } from "react";
import { useIncomeList } from "@/hooks/useIncome";
import { useExpenseList } from "@/hooks/useExpense";
import type { TransactionWithType } from "@/types/transaction";

export function useAllTransactions() {
  const incomeQuery = useIncomeList();
  const expenseQuery = useExpenseList();

  const transactions = useMemo<TransactionWithType[]>(() => {
    const income = (incomeQuery.data ?? []).map((tx) => ({
      ...tx,
      type: "income" as const,
    }));
    const expense = (expenseQuery.data ?? []).map((tx) => ({
      ...tx,
      type: "expense" as const,
    }));
    return [...income, ...expense].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [incomeQuery.data, expenseQuery.data]);

  return {
    transactions,
    isLoading: incomeQuery.isLoading || expenseQuery.isLoading,
    isError: incomeQuery.isError || expenseQuery.isError,
    refetch: () => {
      incomeQuery.refetch();
      expenseQuery.refetch();
    },
  };
}