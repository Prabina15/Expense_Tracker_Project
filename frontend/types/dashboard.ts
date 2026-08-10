export type TransactionType = "income" | "expense";

export interface RecentTransaction {
  _id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseDistributionItem {
  category: string;
  amount: number;
  percent: number;
}

export interface DashboardOverview {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  savings: number;
  savingsRate: number;
  recentTransactions: RecentTransaction[];
  spendByCategory: Record<string, number>;
  expenseDistribution: ExpenseDistributionItem[];
}

export interface DashboardOverviewResponse {
  success: boolean;
  data: DashboardOverview;
}