import type { RequestHandler } from "express";
import type { z } from "zod";
import type { createSchema, updateSchema } from "./schemas";
import { PermissionBits } from "@/middleware";
import * as model from "./model";

export const findAllTask: RequestHandler = async (req, res) => {
  const data = await model.findAllTask(Number(req.query.year) || undefined);

  const result = data.map((task) => ({
    ...task,
    editable:
      task.responsibleId === req.user.id ||
      (req.user.permissions & PermissionBits.MANAGE_TASK) ===
        (PermissionBits.MANAGE_TASK as number),
  }));

  res.ok(result);
};

export const createTask: RequestHandler<
  { year: string },
  unknown,
  z.infer<typeof createSchema>
> = async (req, res) => {
  const data = {
    ...req.body,
    date: req.body.date && new Date(req.body.date),
    year: Number(req.params.year),
  };
  const result = await model.createTask(data);

  res.ok(result);
};

export const updateTask: RequestHandler<
  { id: string },
  unknown,
  z.infer<typeof updateSchema>
> = async (req, res) => {
  // Permission check
  const task = await model.findTaskById(req.params.id);
  if (!task) {
    res.status(403);
    throw new Error("Task not found");
  }

  const isAdmin =
    (req.user.permissions & PermissionBits.MANAGE_TASK) ===
    (PermissionBits.MANAGE_TASK as number);
  const isResponsible = req.user.id === task.responsibleId;
  const changeResponsible =
    req.body.responsibleId !== undefined &&
    req.body.responsibleId !== task.responsibleId;
  if (!isAdmin && (!isResponsible || changeResponsible)) {
    res.status(403);
    throw new Error("Permission denied");
  }

  // Update task
  const data = {
    ...req.body,
    date: req.body.date && new Date(req.body.date),
  };
  const result = await model.updateTask(req.params.id, data);

  res.ok(result);
};

export const deleteTask: RequestHandler<{ id: string }> = async (req, res) => {
  const task = await model.findTaskById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (
    task.responsibleId !== req.user.id &&
    (req.user.permissions & PermissionBits.MANAGE_TASK) !==
      (PermissionBits.MANAGE_TASK as number)
  ) {
    res.status(403);
    throw new Error("Permission denied");
  }

  const result = await model.deleteTask(req.params.id);

  res.ok(result);
};
