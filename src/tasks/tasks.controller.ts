import { Request, Response } from "express";
import * as taskService from "./tasks.service";

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const newTask = await taskService.createTask(req.body);
  res.status(201).json({ message: "Tarefa criada", task: newTask });
};

