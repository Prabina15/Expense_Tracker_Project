"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Plus, TrendingDown } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMergedCategoryNames } from "@/lib/categoryMerge";
import { useCategoryList } from "@/hooks/useCategories";
import {
  useAddExpense,
  useDeleteExpense,
  useExpenseList,
  useUpdateExpense,
} from "@/hooks/useExpense";
import { TransactionFormDialog } from "@/components/shared/TransactionFormDialog";
import { DeleteTransactionDialog } from "@/components/shared/DeleteTransactionDialog";
import { TransactionsTable } from "@/components/shared/TransactionTable";
import { TransactionsTableSkeleton } from "@/components/shared/TransactionsTableSkeleton";
import { TransactionsError } from "@/components/shared/TransactionError";
import type { Transaction, TransactionInput } from "@/types/transaction";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message as string;
  }
  return fallback;
}

export default function ExpensesPage() {
  const { data: expenses, isLoading, isError, refetch } = useExpenseList();
  const { data: customCategories } = useCategoryList();
  const expenseCategoryNames = getMergedCategoryNames(
    "expense",
    customCategories ?? []
  );

  const addExpense = useAddExpense();
  const updateExpense = useUpdateExpense();
  const deleteExpense = useDeleteExpense();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [activeTransaction, setActiveTransaction] =
    useState<Transaction | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Transaction | null>(
    null
  );

  function openAddDialog() {
    setFormMode("add");
    setActiveTransaction(null);
    setFormOpen(true);
  }

  function openEditDialog(transaction: Transaction) {
    setFormMode("edit");
    setActiveTransaction(transaction);
    setFormOpen(true);
  }

  function openDeleteDialog(transaction: Transaction) {
    setPendingDelete(transaction);
    setDeleteOpen(true);
  }

  function handleSubmit(data: TransactionInput) {
    if (formMode === "add") {
      addExpense.mutate(data, {
        onSuccess: () => {
          toast.success("Expense added");
          setFormOpen(false);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error, "Failed to add expense"));
        },
      });
    } else if (activeTransaction) {
      updateExpense.mutate(
        { id: activeTransaction._id, data },
        {
          onSuccess: () => {
            toast.success("Expense updated");
            setFormOpen(false);
          },
          onError: (error) => {
            toast.error(getErrorMessage(error, "Failed to update expense"));
          },
        }
      );
    }
  }

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    deleteExpense.mutate(pendingDelete._id, {
      onSuccess: () => {
        toast.success("Expense deleted");
        setDeleteOpen(false);
        setPendingDelete(null);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "Failed to delete expense"));
      },
    });
  }

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
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="w-fit gap-1.5 px-3 py-1 text-xs font-medium border-destructive/30 text-destructive bg-destructive/10"
          >
            <TrendingDown className="size-3.5" />
            Expense Tracking
          </Badge>
          <Button onClick={openAddDialog} size="sm" className="gap-1.5">
            <Plus className="size-4" />
            Add Expense
          </Button>
        </div>
      </div>

      <Card className="w-full border-border/80">
        <CardContent className="p-0 sm:p-2">
          {isLoading && <TransactionsTableSkeleton />}
          {isError && !isLoading && (
            <TransactionsError
              noun="your expenses"
              onRetry={() => refetch()}
            />
          )}
          {!isLoading && !isError && (
            <TransactionsTable
              transactions={expenses ?? []}
              tone="destructive"
              emptyLabel="No expenses recorded yet. Add your first entry to get started."
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />
          )}
        </CardContent>
      </Card>

      <TransactionFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        transactionType="expense"
        categories={expenseCategoryNames}
        initialData={activeTransaction}
        isSubmitting={addExpense.isPending || updateExpense.isPending}
        onSubmit={handleSubmit}
      />

      <DeleteTransactionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        transaction={pendingDelete}
        isDeleting={deleteExpense.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}