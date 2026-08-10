"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addIncome,
  deleteIncome,
  getAllIncome,
  updateIncome,
} from "@/services/incomeService";
import type { TransactionInput } from "@/types/transaction";

const INCOME_KEY = ["income", "list"];

export function useIncomeList() {
  return useQuery({
    queryKey: INCOME_KEY,
    queryFn: async () => {
      const response = await getAllIncome();
      return response.income;
    },
  });
}

function useInvalidateIncome() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: INCOME_KEY });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };
}

export function useAddIncome() {
  const invalidate = useInvalidateIncome();
  return useMutation({
    mutationFn: (data: TransactionInput) => addIncome(data),
    onSuccess: invalidate,
  });
}

export function useUpdateIncome() {
  const invalidate = useInvalidateIncome();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionInput }) =>
      updateIncome(id, data),
    onSuccess: invalidate,
  });
}

export function useDeleteIncome() {
  const invalidate = useInvalidateIncome();
  return useMutation({
    mutationFn: (id: string) => deleteIncome(id),
    onSuccess: invalidate,
  });
}