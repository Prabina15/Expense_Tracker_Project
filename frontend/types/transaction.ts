export interface Transaction {
  _id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionInput {
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface GetIncomeResponse {
  income: Transaction[];
}

export interface GetExpenseResponse {
  expense: Transaction[];
}

export interface MutateTransactionResponse {
  success: boolean;
  message: string;
}