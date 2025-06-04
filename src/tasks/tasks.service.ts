import { PrismaClient } from "@prisma/client";
import { CreateTaskDTO, UpdateTaskDTO, ListTasksQueryDTO } from "./tasks.dto";

const prisma = new PrismaClient();

export const createTask = async (userId: number, taskData: CreateTaskDTO) => {
  return prisma.task.create({
    data: {
      ...taskData,
      user: { connect: { id: userId } },
    },
  });
};

export const listTasks = async (userId: number, filters?: ListTasksQueryDTO) => {
  const where = {
    userId,
    ...(filters?.status ? { status: filters.status } : {}),
  };

  const orderBy = {
    [filters?.orderBy || 'createdAt']: filters?.order || 'desc',
  };

  return prisma.task.findMany({
    where,
    orderBy,
  });
};

export const getTaskById = async (userId: number, taskId: number) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new Error('Tarefa não encontrada');
  }

  return task;
};

export const updateTask = async (userId: number, taskId: number, data: UpdateTaskDTO) => {
  // Verifica se a tarefa existe e pertence ao usuário
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    throw new Error('Tarefa não encontrada');
  }

  return prisma.task.update({
    where: { id: taskId },
    data,
  });
};

export const deleteTask = async (userId: number, taskId: number) => {
  // Verifica se a tarefa existe e pertence ao usuário
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    throw new Error('Tarefa não encontrada');
  }

  await prisma.task.delete({
    where: { id: taskId },
  });
};
