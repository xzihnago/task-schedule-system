import express from "express";
import { middleware } from "@xzihnago/express-utils";
import routeUsers from "@/api/users/routes";
import routeTasks from "@/api/tasks/routes";
import routeFiles from "@/api/files/routes";

const router = express.Router();

router.use("/users", routeUsers);
router.use("/tasks", routeTasks);
router.use("/files", routeFiles);

router.use(middleware.errorHandler.api);

export default router;
