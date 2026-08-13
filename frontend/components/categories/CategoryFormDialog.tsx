"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_COLORS } from "@/lib/categoryColors";
import { cn } from "@/lib/utils";
import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/lib/validation/categorySchema";
import type { Category, CategoryInput } from "@/types/category";
import type { TransactionType } from "@/types/transaction";

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialData?: Category | null;
  defaultType?: TransactionType;
  isSubmitting: boolean;
  onSubmit: (data: CategoryInput) => void;
}

export function CategoryFormDialog({
  open,
  onOpenChange,
  mode,
  initialData,
  defaultType = "expense",
  isSubmitting,
  onSubmit,
}: CategoryFormDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      type: defaultType,
      color: CATEGORY_COLORS[0],
    },
  });

  useEffect(() => {
    if (!open) return;
    reset({
      name: initialData?.name ?? "",
      type: initialData?.type ?? defaultType,
      color: initialData?.color ?? CATEGORY_COLORS[0],
    });
  }, [open, initialData, defaultType, reset]);

  function handleFormSubmit(values: CategoryFormValues) {
    onSubmit(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Category" : "Edit Category"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Create a custom category for your income or expenses."
              : "Update this category's name or color."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="e.g. Subscriptions"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="type">Type</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v as TransactionType)}
                  disabled={mode === "edit"}
                >
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {mode === "edit" && (
              <p className="text-xs text-muted-foreground">
                Type can&apos;t be changed after a category is created.
              </p>
            )}
            {errors.type && (
              <p className="text-xs text-destructive">
                {errors.type.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Color</Label>
            <Controller
              control={control}
              name="color"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => field.onChange(color)}
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full ring-offset-2 ring-offset-background transition-shadow",
                        field.value === color && "ring-2 ring-foreground"
                      )}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    >
                      {field.value === color && (
                        <Check className="size-3.5 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.color && (
              <p className="text-xs text-destructive">
                {errors.color.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {mode === "add" ? "Add Category" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}