"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Search as SearchIcon } from "lucide-react";
import { cn, formatCurrency, formatTransactionDate } from "@/lib/utils";
import type { TransactionWithType } from "@/types/transaction";

interface AllTransactionsTableProps {
  transactions: TransactionWithType[];
  onEdit: (transaction: TransactionWithType) => void;
  onDelete: (transaction: TransactionWithType) => void;
}

export function AllTransactionsTable({
  transactions,
  onEdit,
  onDelete,
}: AllTransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <SearchIcon className="size-5" />
        </div>
        <p className="text-sm text-muted-foreground">
          No transactions match your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => {
            const isIncome = tx.type === "income";
            return (
              <TableRow key={`${tx.type}-${tx._id}`}>
                <TableCell className="font-medium text-foreground">
                  {tx.description}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-normal",
                      isIncome
                        ? "border-primary/30 text-primary bg-primary/5"
                        : "border-destructive/30 text-destructive bg-destructive/5"
                    )}
                  >
                    {isIncome ? "Income" : "Expense"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {tx.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatTransactionDate(tx.date)}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-semibold",
                    isIncome ? "text-primary" : "text-destructive"
                  )}
                >
                  {isIncome ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Edit"
                      onClick={() => onEdit(tx)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Delete"
                      onClick={() => onDelete(tx)}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}