import type { TransactionType } from "@/types/transaction";

export interface Category {
  _id: string;
  name: string;
  type: TransactionType;
  color: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInput {
  name: string;
  type: TransactionType;
  color: string;
}

export interface GetCategoriesResponse {
  success: boolean;
  categories: Category[];
}

export interface MutateCategoryResponse {
  success: boolean;
  message: string;
  category?: Category;
}