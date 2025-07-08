import express from "express";
import { middleware } from "@xzihnago/express-utils";
import routeUsers from "@/api/users/routes";
import routeTasks from "@/api/tasks/routes";
import routeKeys from "@/api/keys/routes";
import routeVenues from "@/api/venues/routes";

const router = express.Router();

router.use("/users", routeUsers);
router.use("/tasks", routeTasks);
router.use("/keys", routeKeys);
router.use("/venues", routeVenues);

router.use(middleware.errorHandler.api);

export default router;
