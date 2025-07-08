import type { Prisma } from "@prisma/client";

export const findAllTask = async (year?: number) =>
  await prisma.task.findMany({
    where: {
      year,
    },
    select: {
      id: true,
      date: true,
      title: true,
      content: true,
      responsibleId: true,
      internalStatus: true,
      externalStatus: true,
    },
  });

export const findTaskById = async (id: string) =>
  await prisma.task.findUnique({
    where: {
      id,
    },
    select: {
      responsibleId: true,
    },
  });

export const createTask = async (data: Prisma.TaskCreateInput) =>
  await prisma.task.create({
    data,
  });

export const updateTask = async (id: string, data: Prisma.TaskUpdateInput) =>
  await prisma.task.update({
    where: {
      id,
    },
    data,
  });

export const deleteTask = async (id: string) =>
  await prisma.task.delete({
    where: {
      id,
    },
  });
