"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addExpense,
  deleteExpense,
  getAllExpense,
  updateExpense,
} from "@/services/expenseService";
import type { TransactionInput } from "@/types/transaction";

const EXPENSE_KEY = ["expense", "list"];

export function useExpenseList() {
  return useQuery({
    queryKey: EXPENSE_KEY,
    queryFn: async () => {
      const response = await getAllExpense();
      return response.expense;
    },
  });
}

function useInvalidateExpense() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: EXPENSE_KEY });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };
}

export function useAddExpense() {
  const invalidate = useInvalidateExpense();
  return useMutation({
    mutationFn: (data: TransactionInput) => addExpense(data),
    onSuccess: invalidate,
  });
}

export function useUpdateExpense() {
  const invalidate = useInvalidateExpense();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionInput }) =>
      updateExpense(id, data),
    onSuccess: invalidate,
  });
}

export function useDeleteExpense() {
  const invalidate = useInvalidateExpense();
  return useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    onSuccess: invalidate,
  });
}