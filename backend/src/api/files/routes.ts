import { Router } from "express";
import { PermissionBits, user } from "@/middleware";
import * as controller from "./controller";

const router = Router();

router.post(
  "/keys",
  user.authentication,
  user.permission(PermissionBits.MANAGE_FILE),
  controller.uploadKeys
);

router.post(
  "/venues",
  user.authentication,
  user.permission(PermissionBits.MANAGE_FILE),
  controller.uploadVenues
);

router.post(
  "/activity-center",
  user.authentication,
  user.permission(PermissionBits.MANAGE_FILE),
  controller.uploadActivityCenter
);

router.post(
  "/entrance",
  user.authentication,
  user.permission(PermissionBits.MANAGE_FILE),
  controller.uploadEntrance
);

export default router;
