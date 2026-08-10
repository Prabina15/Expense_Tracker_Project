import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, Receipt } from "lucide-react";
import { cn, formatCurrency, formatTransactionDate } from "@/lib/utils";
import type { RecentTransaction } from "@/types/dashboard";

interface RecentTransactionsProps {
  transactions: RecentTransaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="shadow-xs border-border/80">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-base">Recent Transactions</CardTitle>
        <CardDescription>Your latest income and expenses</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-2">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Receipt className="size-5" />
            </div>
            <p className="text-sm text-muted-foreground">
              No transactions yet. Add an income or expense to get started.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border/80">
            {transactions.map((tx) => {
              const isIncome = tx.type === "income";
              return (
                <li
                  key={tx._id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full",
                        isIncome
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {isIncome ? (
                        <ArrowUpRight className="size-4" />
                      ) : (
                        <ArrowDownLeft className="size-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {tx.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tx.category} · {formatTransactionDate(tx.date)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold shrink-0",
                      isIncome ? "text-primary" : "text-destructive"
                    )}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}