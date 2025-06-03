import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["pending", "completed"]).optional().default("pending"),
  dueDate: z.string().transform((val) => new Date(val)).optional(),
  userId: z.number().int().positive(),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = createTaskSchema.partial();
export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;


