import api from "@/lib/api";
import type {
  GetExpenseResponse,
  MutateTransactionResponse,
  TransactionInput,
} from "@/types/transaction";

export async function getAllExpense(): Promise<GetExpenseResponse> {
  const response = await api.get<GetExpenseResponse>("/expense/get");
  return response.data;
}

export async function addExpense(
  data: TransactionInput
): Promise<MutateTransactionResponse> {
  const response = await api.post<MutateTransactionResponse>(
    "/expense/add",
    data
  );
  return response.data;
}

export async function updateExpense(
  id: string,
  data: TransactionInput
): Promise<MutateTransactionResponse> {
  const response = await api.put<MutateTransactionResponse>(
    `/expense/update/${id}`,
    data
  );
  return response.data;
}

export async function deleteExpense(
  id: string
): Promise<MutateTransactionResponse> {
  const response = await api.delete<MutateTransactionResponse>(
    `/expense/delete/${id}`
  );
  return response.data;
}