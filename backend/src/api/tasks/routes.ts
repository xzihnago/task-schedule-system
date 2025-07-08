import { Router } from "express";
import { middleware } from "@xzihnago/express-utils";
import { PermissionBits, user } from "@/middleware";
import { findSchema, createSchema, updateSchema } from "./schemas";
import * as controller from "./controller";

const router = Router();

router.get(
  "/",
  user.authentication,
  middleware.schemas.zod(findSchema, "query"),
  controller.findAllTask
);

router.post(
  "/:year",
  user.authentication,
  user.permission(PermissionBits.MANAGE_TASK),
  middleware.schemas.zod(createSchema),
  controller.createTask
);

router.put(
  "/:id",
  user.authentication,
  middleware.schemas.zod(updateSchema),
  controller.updateTask
);

router.delete(
  "/:id",
  user.authentication,
  user.permission(PermissionBits.MANAGE_TASK),
  controller.deleteTask
);

export default router;
