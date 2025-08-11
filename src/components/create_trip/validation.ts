import * as z from "zod";

const BudgetSchema = z.object({
  name: z.string().min(1, "Select a budget"),
  value: z.string().min(1),
});

export const TripSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  dates: z
    .array(z.date())
    .length(2, "Please select a start and end date")
    .refine(([start, end]) => start <= end, {
      message: "Start date must be before end date",
    }),
  activities: z.array(z.string()).min(1, "Select at least one activity"),
  budget: BudgetSchema,
  adults: z
    .number()
    .min(1, "At least 1 adult required")
    .max(15, "Maximum 15 adults"),
  children: z.number().min(0).max(15),
});

export type TripFormData = z.infer<typeof TripSchema>;
