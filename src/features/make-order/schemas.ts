import { z } from "zod";

export const makeOrderSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  comment: z.string().optional(),
});

export type MakeOrder = z.infer<typeof makeOrderSchema>;
