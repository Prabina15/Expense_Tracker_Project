"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/services/categoryService";
import type { CategoryInput } from "@/types/category";

const CATEGORY_KEY = ["categories", "list"];

export function useCategoryList() {
  return useQuery({
    queryKey: CATEGORY_KEY,
    queryFn: async () => {
      const response = await getAllCategories();
      return response.categories;
    },
  });
}

function useInvalidateCategories() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: CATEGORY_KEY });
  };
}

export function useAddCategory() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (data: CategoryInput) => addCategory(data),
    onSuccess: invalidate,
  });
}

export function useUpdateCategory() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Pick<CategoryInput, "name" | "color">;
    }) => updateCategory(id, data),
    onSuccess: invalidate,
  });
}

export function useDeleteCategory() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: invalidate,
  });
}