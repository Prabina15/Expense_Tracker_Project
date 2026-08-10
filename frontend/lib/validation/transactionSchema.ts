import { z } from "zod";

export function createTransactionSchema(categories: readonly string[]) {
  return z.object({
    description: z
      .string()
      .min(2, "Description must be at least 2 characters")
      .max(120, "Description is too long"),
    amount: z.coerce
      .number({ message: "Amount must be a number" })
      .positive("Amount must be greater than 0"),
    category: z.enum(categories as [string, ...string[]], {
      message: "Please select a category",
    }),
    date: z.string().min(1, "Please select a date"),
  });
}

export type TransactionFormInput = z.input<
  ReturnType<typeof createTransactionSchema>
>;
export type TransactionFormValues = z.output<
  ReturnType<typeof createTransactionSchema>
>;