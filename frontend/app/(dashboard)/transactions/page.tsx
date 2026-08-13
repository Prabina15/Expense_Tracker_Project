"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { ArrowLeftRight, ChevronDown, Plus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getMergedCategoryNames } from "@/lib/categoryMerge";
import { useCategoryList } from "@/hooks/useCategories";
import { useAllTransactions } from "@/hooks/useAllTransactions";
import { useAddIncome, useDeleteIncome, useUpdateIncome } from "@/hooks/useIncome";
import {
  useAddExpense,
  useDeleteExpense,
  useUpdateExpense,
} from "@/hooks/useExpense";
import { TransactionFormDialog } from "@/components/shared/TransactionFormDialog";
import { DeleteTransactionDialog } from "@/components/shared/DeleteTransactionDialog";
import { TransactionsTableSkeleton } from "@/components/shared/TransactionsTableSkeleton";
import { TransactionsError } from "@/components/shared/TransactionError";
import {
  TransactionFilters,
  type SortOption,
  type TypeFilter,
} from "@/components/transactions/TransactionFilters";
import { AllTransactionsTable } from "@/components/transactions/AllTransactionTable";
import { PaginationControls } from "@/components/ui/pagination-controls";
import type {
  TransactionInput,
  TransactionType,
  TransactionWithType,
} from "@/types/transaction";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message as string;
  }
  return fallback;
}

const PAGE_SIZE = 8;

export default function TransactionsPage() {
  const { transactions, isLoading, isError, refetch } = useAllTransactions();
  const { data: customCategories } = useCategoryList();

  const allCategoryNames = useMemo(() => {
    const income = getMergedCategoryNames("income", customCategories ?? []);
    const expense = getMergedCategoryNames("expense", customCategories ?? []);
    return Array.from(new Set([...income, ...expense])).sort();
  }, [customCategories]);

  const addIncome = useAddIncome();
  const updateIncome = useUpdateIncome();
  const deleteIncome = useDeleteIncome();
  const addExpense = useAddExpense();
  const updateExpense = useUpdateExpense();
  const deleteExpense = useDeleteExpense();

  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState<SortOption>("date-desc");
  const [page, setPage] = useState(1);

  // Add/Edit dialog
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [formType, setFormType] = useState<TransactionType>("expense");
  const [activeTransaction, setActiveTransaction] =
    useState<TransactionWithType | null>(null);

  // Delete dialog
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pendingDelete, setPendingDelete] =
    useState<TransactionWithType | null>(null);

  const hasActiveFilters =
    search.trim() !== "" || typeFilter !== "all" || categoryFilter !== "all";

  const filtered = useMemo(() => {
    let result = transactions;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((tx) =>
        tx.description.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((tx) => tx.type === typeFilter);
    }

    if (categoryFilter !== "all") {
      result = result.filter((tx) => tx.category === categoryFilter);
    }

    const sorted = [...result].sort((a, b) => {
      switch (sort) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        case "date-desc":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return sorted;
  }, [transactions, search, typeFilter, categoryFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function updateFilters(fn: () => void) {
    fn();
    setPage(1); // any filter change resets pagination back to page 1
  }

  function openAddDialog(type: TransactionType) {
    setFormMode("add");
    setFormType(type);
    setActiveTransaction(null);
    setFormOpen(true);
  }

  function openEditDialog(transaction: TransactionWithType) {
    setFormMode("edit");
    setFormType(transaction.type);
    setActiveTransaction(transaction);
    setFormOpen(true);
  }

  function openDeleteDialog(transaction: TransactionWithType) {
    setPendingDelete(transaction);
    setDeleteOpen(true);
  }

  function handleSubmit(data: TransactionInput) {
    const addMutation = formType === "income" ? addIncome : addExpense;
    const updateMutation = formType === "income" ? updateIncome : updateExpense;
    const noun = formType === "income" ? "Income" : "Expense";

    if (formMode === "add") {
      addMutation.mutate(data, {
        onSuccess: () => {
          toast.success(`${noun} added`);
          setFormOpen(false);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error, `Failed to add ${formType}`));
        },
      });
    } else if (activeTransaction) {
      updateMutation.mutate(
        { id: activeTransaction._id, data },
        {
          onSuccess: () => {
            toast.success(`${noun} updated`);
            setFormOpen(false);
          },
          onError: (error) => {
            toast.error(
              getErrorMessage(error, `Failed to update ${formType}`)
            );
          },
        }
      );
    }
  }

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    const deleteMutation =
      pendingDelete.type === "income" ? deleteIncome : deleteExpense;
    const noun = pendingDelete.type === "income" ? "Income" : "Expense";

    deleteMutation.mutate(pendingDelete._id, {
      onSuccess: () => {
        toast.success(`${noun} deleted`);
        setDeleteOpen(false);
        setPendingDelete(null);
      },
      onError: (error) => {
        toast.error(
          getErrorMessage(error, `Failed to delete ${pendingDelete.type}`)
        );
      },
    });
  }

  const isSubmitting =
    addIncome.isPending ||
    updateIncome.isPending ||
    addExpense.isPending ||
    updateExpense.isPending;

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
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="w-fit gap-1.5 px-3 py-1 text-xs font-medium border-border text-muted-foreground bg-muted/40"
          >
            <ArrowLeftRight className="size-3.5" />
            Transaction History
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button size="sm" className="gap-1.5">
                  <Plus className="size-4" />
                  Add Transaction
                  <ChevronDown className="size-3.5" />
                </Button>
              }
              />  
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openAddDialog("income")}>
                Add Income
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openAddDialog("expense")}>
                Add Expense
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="w-full border-border/80">
        <CardContent className="p-4 sm:p-6 pb-2 sm:pb-2">
          <TransactionFilters
            search={search}
            onSearchChange={(v) => updateFilters(() => setSearch(v))}
            typeFilter={typeFilter}
            onTypeFilterChange={(v) => updateFilters(() => setTypeFilter(v))}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={(v) =>
              updateFilters(() => setCategoryFilter(v))
            }
            categories={allCategoryNames}
            sort={sort}
            onSortChange={setSort}
            onClear={() =>
              updateFilters(() => {
                setSearch("");
                setTypeFilter("all");
                setCategoryFilter("all");
              })
            }
            hasActiveFilters={hasActiveFilters}
          />
        </CardContent>
        <CardContent className="p-0 sm:px-2 sm:pb-0">
          {isLoading && <TransactionsTableSkeleton />}
          {isError && !isLoading && (
            <TransactionsError
              noun="your transactions"
              onRetry={() => refetch()}
            />
          )}
          {!isLoading && !isError && (
            <>
              <AllTransactionsTable
                transactions={paginated}
                onEdit={openEditDialog}
                onDelete={openDeleteDialog}
              />
              <PaginationControls
                page={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </CardContent>
      </Card>

      <TransactionFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        transactionType={formType}
        categories={getMergedCategoryNames(formType, customCategories ?? [])}
        initialData={activeTransaction}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <DeleteTransactionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        transaction={pendingDelete}
        isDeleting={deleteIncome.isPending || deleteExpense.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}