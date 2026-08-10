import api from "@/lib/api";
import type {
  GetIncomeResponse,
  MutateTransactionResponse,
  TransactionInput,
} from "@/types/transaction";

export async function getAllIncome(): Promise<GetIncomeResponse> {
  const response = await api.get<GetIncomeResponse>("/income/get");
  return response.data;
}

export async function addIncome(
  data: TransactionInput
): Promise<MutateTransactionResponse> {
  const response = await api.post<MutateTransactionResponse>(
    "/income/add",
    data
  );
  return response.data;
}

export async function updateIncome(
  id: string,
  data: TransactionInput
): Promise<MutateTransactionResponse> {
  const response = await api.put<MutateTransactionResponse>(
    `/income/update/${id}`,
    data
  );
  return response.data;
}

export async function deleteIncome(
  id: string
): Promise<MutateTransactionResponse> {
  const response = await api.delete<MutateTransactionResponse>(
    `/income/delete/${id}`
  );
  return response.data;
}