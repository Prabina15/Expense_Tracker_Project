import api from "@/lib/api";
import type {
  CategoryInput,
  GetCategoriesResponse,
  MutateCategoryResponse,
} from "@/types/category";

export async function getAllCategories(): Promise<GetCategoriesResponse> {
  const response = await api.get<GetCategoriesResponse>("/categories/get");
  return response.data;
}

export async function addCategory(
  data: CategoryInput
): Promise<MutateCategoryResponse> {
  const response = await api.post<MutateCategoryResponse>(
    "/categories/add",
    data
  );
  return response.data;
}

export async function updateCategory(
  id: string,
  data: Pick<CategoryInput, "name" | "color">
): Promise<MutateCategoryResponse> {
  const response = await api.put<MutateCategoryResponse>(
    `/categories/update/${id}`,
    data
  );
  return response.data;
}

export async function deleteCategory(
  id: string
): Promise<MutateCategoryResponse> {
  const response = await api.delete<MutateCategoryResponse>(
    `/categories/delete/${id}`
  );
  return response.data;
}