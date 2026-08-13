"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import type { Category } from "@/types/category";
import type { Transaction, TransactionType } from "@/types/transaction";

interface CategorySectionProps {
  type: TransactionType;
  title: string;
  description: string;
  builtInNames: readonly string[];
  customCategories: Category[];
  transactions: Transaction[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onAdd: () => void;
}

export function CategorySection({
  type,
  title,
  description,
  builtInNames,
  customCategories,
  transactions,
  onEdit,
  onDelete,
  onAdd,
}: CategorySectionProps) {
  const tone = type === "income" ? "primary" : "destructive";

  const usageByCategory = useMemo(() => {
    const map = new Map<string, { count: number; total: number }>();
    for (const tx of transactions) {
      const existing = map.get(tx.category) ?? { count: 0, total: 0 };
      existing.count += 1;
      existing.total += tx.amount;
      map.set(tx.category, existing);
    }
    return map;
  }, [transactions]);

  return (
    <Card className="border-border/80">
      <CardHeader className="p-6 pb-3 flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={onAdd}>
          <Plus className="size-3.5" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-5">
        {/* Built-in categories */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Built-in
          </p>
          <div className="flex flex-wrap gap-2">
            {builtInNames.map((name) => {
              const usage = usageByCategory.get(name);
              return (
                <Badge
                  key={name}
                  variant="secondary"
                  className="font-normal gap-1.5"
                >
                  {name}
                  {usage && (
                    <span className="text-muted-foreground">
                      · {usage.count}
                    </span>
                  )}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Custom categories */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Custom
          </p>
          {customCategories.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No custom categories yet. Add one to get started.
            </p>
          ) : (
            <ul className="divide-y divide-border/80">
              {customCategories.map((cat) => {
                const usage = usageByCategory.get(cat.name);
                return (
                  <li
                    key={cat._id}
                    className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-sm font-medium text-foreground truncate">
                        {cat.name}
                      </span>
                      {usage && (
                        <span
                          className={cn(
                            "text-xs shrink-0",
                            tone === "primary"
                              ? "text-primary"
                              : "text-destructive"
                          )}
                        >
                          {usage.count} · {formatCurrency(usage.total)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Edit category"
                        onClick={() => onEdit(cat)}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Delete category"
                        onClick={() => onDelete(cat)}
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}