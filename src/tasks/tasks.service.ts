import { PrismaClient } from "@prisma/client";
import { CreateTaskDTO } from "./tasks.dto";

const prisma = new PrismaClient();

export const createTask = async (taskData: CreateTaskDTO) => {
  const newTask = await prisma.task.create({
    data: {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
      user: { connect: { id: taskData.userId } },
    },
  });
  return newTask;
};
