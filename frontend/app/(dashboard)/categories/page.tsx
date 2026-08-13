"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Plus, Tags } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/constants";
import { useIncomeList } from "@/hooks/useIncome";
import { useExpenseList } from "@/hooks/useExpense";
import {
  useAddCategory,
  useCategoryList,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/useCategories";
import { CategoryFormDialog } from "@/components/categories/CategoryFormDialog";
import { DeleteCategoryDialog } from "@/components/categories/DeleteCategoryDialog";
import { CategorySection } from "@/components/categories/CategorySection";
import { TransactionsTableSkeleton } from "@/components/shared/TransactionsTableSkeleton";
import { TransactionsError } from "@/components/shared/TransactionError";
import type { Category, CategoryInput } from "@/types/category";
import type { TransactionType } from "@/types/transaction";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message as string;
  }
  return fallback;
}

export default function CategoriesPage() {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    refetch: refetchCategories,
  } = useCategoryList();
  const { data: income } = useIncomeList();
  const { data: expenses } = useExpenseList();

  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [formDefaultType, setFormDefaultType] =
    useState<TransactionType>("expense");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Category | null>(null);

  function openAddDialog(type: TransactionType) {
    setFormMode("add");
    setFormDefaultType(type);
    setActiveCategory(null);
    setFormOpen(true);
  }

  function openEditDialog(category: Category) {
    setFormMode("edit");
    setActiveCategory(category);
    setFormOpen(true);
  }

  function openDeleteDialog(category: Category) {
    setPendingDelete(category);
    setDeleteOpen(true);
  }

  function handleSubmit(data: CategoryInput) {
    if (formMode === "add") {
      addCategory.mutate(data, {
        onSuccess: () => {
          toast.success("Category added");
          setFormOpen(false);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error, "Failed to add category"));
        },
      });
    } else if (activeCategory) {
      updateCategory.mutate(
        { id: activeCategory._id, data: { name: data.name, color: data.color } },
        {
          onSuccess: () => {
            toast.success("Category updated");
            setFormOpen(false);
          },
          onError: (error) => {
            toast.error(getErrorMessage(error, "Failed to update category"));
          },
        }
      );
    }
  }

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    deleteCategory.mutate(pendingDelete._id, {
      onSuccess: () => {
        toast.success("Category deleted");
        setDeleteOpen(false);
        setPendingDelete(null);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "Failed to delete category"));
      },
    });
  }

  const incomeCategories = (categories ?? []).filter(
    (c) => c.type === "income"
  );
  const expenseCategories = (categories ?? []).filter(
    (c) => c.type === "expense"
  );

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Categories
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Organize how your income and expenses are labeled.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="w-fit gap-1.5 px-3 py-1 text-xs font-medium border-border text-muted-foreground bg-muted/40"
          >
            <Tags className="size-3.5" />
            Category Manager
          </Badge>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => openAddDialog("expense")}
          >
            <Plus className="size-4" />
            Add Category
          </Button>
        </div>
      </div>

      {categoriesLoading && <TransactionsTableSkeleton />}

      {categoriesError && !categoriesLoading && (
        <TransactionsError
          noun="your categories"
          onRetry={() => refetchCategories()}
        />
      )}

      {!categoriesLoading && !categoriesError && (
        <div className="grid gap-4 lg:grid-cols-2">
          <CategorySection
            type="income"
            title="Income Categories"
            description="Used when logging income entries"
            builtInNames={INCOME_CATEGORIES}
            customCategories={incomeCategories}
            transactions={income ?? []}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
            onAdd={() => openAddDialog("income")}
          />
          <CategorySection
            type="expense"
            title="Expense Categories"
            description="Used when logging expense entries"
            builtInNames={EXPENSE_CATEGORIES}
            customCategories={expenseCategories}
            transactions={expenses ?? []}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
            onAdd={() => openAddDialog("expense")}
          />
        </div>
      )}

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        initialData={activeCategory}
        defaultType={formDefaultType}
        isSubmitting={addCategory.isPending || updateCategory.isPending}
        onSubmit={handleSubmit}
      />

      <DeleteCategoryDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        category={pendingDelete}
        isDeleting={deleteCategory.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}