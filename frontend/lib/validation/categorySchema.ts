import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(40, "Name is too long"),
  type: z.enum(["income", "expense"], {
    message: "Please select a type",
  }),
  color: z.string().min(1, "Please pick a color"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;