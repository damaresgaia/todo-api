import { z } from "zod";

// Schema para criação de tarefa
export const createTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  status: z.enum(["pending", "completed"]).optional().default("pending"),
  dueDate: z.string().transform((val) => new Date(val)).optional(),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

// Schema para atualização de tarefa
export const updateTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "completed"]).optional(),
  dueDate: z.string().transform((val) => new Date(val)).optional(),
});

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;

// Schema para filtros de listagem
export const listTasksQuerySchema = z.object({
  status: z.enum(["pending", "completed"]).optional(),
  orderBy: z.enum(["dueDate", "createdAt"]).optional().default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type ListTasksQueryDTO = z.infer<typeof listTasksQuerySchema>;


