import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(2, "Service name must be at least 2 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  price: z.number().positive("Price must be greater than 0"),

  duration: z
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0"),

  categoryId: z.string().uuid("Please select a valid category"),
});

export type CreateServiceFormValues = z.infer<typeof createServiceSchema>;
