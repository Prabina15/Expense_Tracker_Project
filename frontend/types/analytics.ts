export interface MonthlyTrendPoint {
  month: string;
  label: string;
  income: number;
  expense: number;
  savings: number;
}

export interface CategoryDistributionItem {
  category: string;
  amount: number;
  percent: number;
}

export interface AnalyticsOverview {
  months: number;
  trend: MonthlyTrendPoint[];
  totalIncome: number;
  totalExpense: number;
  totalSavings: number;
  avgMonthlyIncome: number;
  avgMonthlyExpense: number;
  savingsRate: number;
  expenseDistribution: CategoryDistributionItem[];
  incomeDistribution: CategoryDistributionItem[];
}

export interface AnalyticsOverviewResponse {
  success: boolean;
  data: AnalyticsOverview;
}