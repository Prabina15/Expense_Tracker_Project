import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/constants";
import type { Category } from "@/types/category";
import type { TransactionType } from "@/types/transaction";

export function getMergedCategoryNames(
  type: TransactionType,
  customCategories: Category[]
): string[] {
  const builtIn: readonly string[] =
    type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const custom = customCategories
    .filter((c) => c.type === type)
    .map((c) => c.name);
  return Array.from(new Set([...builtIn, ...custom]));
}