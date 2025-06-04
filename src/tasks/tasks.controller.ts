import { Request, Response } from "express";
import * as taskService from "./tasks.service";
import { listTasksQuerySchema } from "./tasks.dto";

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;
    const newTask = await taskService.createTask(userId, req.body);
    res.status(201).json({ message: "Tarefa criada com sucesso", task: newTask });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).json({ message: "Erro ao criar tarefa" });
  }
};

export const listTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;
    const queryResult = listTasksQuerySchema.safeParse(req.query);
    
    if (!queryResult.success) {
      res.status(400).json({ message: "Parâmetros de consulta inválidos" });
      return;
    }

    const tasks = await taskService.listTasks(userId, queryResult.data);
    res.json(tasks);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    res.status(500).json({ message: "Erro ao listar tarefas" });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      res.status(400).json({ message: "ID da tarefa inválido" });
      return;
    }

    const task = await taskService.getTaskById(userId, taskId);
    res.json(task);
  } catch (error) {
    if (error instanceof Error && error.message === 'Tarefa não encontrada') {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Erro ao buscar tarefa:", error);
      res.status(500).json({ message: "Erro ao buscar tarefa" });
    }
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      res.status(400).json({ message: "ID da tarefa inválido" });
      return;
    }

    const updatedTask = await taskService.updateTask(userId, taskId, req.body);
    res.json({ message: "Tarefa atualizada com sucesso", task: updatedTask });
  } catch (error) {
    if (error instanceof Error && error.message === 'Tarefa não encontrada') {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Erro ao atualizar tarefa:", error);
      res.status(500).json({ message: "Erro ao atualizar tarefa" });
    }
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      res.status(400).json({ message: "ID da tarefa inválido" });
      return;
    }

    await taskService.deleteTask(userId, taskId);
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    if (error instanceof Error && error.message === 'Tarefa não encontrada') {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Erro ao deletar tarefa:", error);
      res.status(500).json({ message: "Erro ao deletar tarefa" });
    }
  }
};

