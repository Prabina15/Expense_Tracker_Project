"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Plus, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMergedCategoryNames } from "@/lib/categoryMerge";
import { useCategoryList } from "@/hooks/useCategories";
import {
  useAddIncome,
  useDeleteIncome,
  useIncomeList,
  useUpdateIncome,
} from "@/hooks/useIncome";
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

export default function IncomePage() {
  const { data: income, isLoading, isError, refetch } = useIncomeList();
  const { data: customCategories } = useCategoryList();
  const incomeCategoryNames = getMergedCategoryNames(
    "income",
    customCategories ?? []
  );

  const addIncome = useAddIncome();
  const updateIncome = useUpdateIncome();
  const deleteIncome = useDeleteIncome();

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
      addIncome.mutate(data, {
        onSuccess: () => {
          toast.success("Income added");
          setFormOpen(false);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error, "Failed to add income"));
        },
      });
    } else if (activeTransaction) {
      updateIncome.mutate(
        { id: activeTransaction._id, data },
        {
          onSuccess: () => {
            toast.success("Income updated");
            setFormOpen(false);
          },
          onError: (error) => {
            toast.error(getErrorMessage(error, "Failed to update income"));
          },
        }
      );
    }
  }

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    deleteIncome.mutate(pendingDelete._id, {
      onSuccess: () => {
        toast.success("Income deleted");
        setDeleteOpen(false);
        setPendingDelete(null);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "Failed to delete income"));
      },
    });
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Income
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track and manage your income streams.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="w-fit gap-1.5 px-3 py-1 text-xs font-medium border-primary/30 text-primary bg-primary/10"
          >
            <TrendingUp className="size-3.5" />
            Income Streams
          </Badge>
          <Button onClick={openAddDialog} size="sm" className="gap-1.5">
            <Plus className="size-4" />
            Add Income
          </Button>
        </div>
      </div>

      <Card className="w-full border-border/80">
        <CardContent className="p-0 sm:p-2">
          {isLoading && <TransactionsTableSkeleton />}
          {isError && !isLoading && (
            <TransactionsError noun="your income" onRetry={() => refetch()} />
          )}
          {!isLoading && !isError && (
            <TransactionsTable
              transactions={income ?? []}
              tone="primary"
              emptyLabel="No income recorded yet. Add your first entry to get started."
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
        transactionType="income"
        categories={incomeCategoryNames}
        initialData={activeTransaction}
        isSubmitting={addIncome.isPending || updateIncome.isPending}
        onSubmit={handleSubmit}
      />

      <DeleteTransactionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        transaction={pendingDelete}
        isDeleting={deleteIncome.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}