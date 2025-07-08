import { Router } from "express";
import { middleware } from "@xzihnago/express-utils";
import { user } from "@/middleware";
import { loginSchema } from "./schemas";
import * as controller from "./controller";

const router = Router();

router.get("/", user.authentication, controller.findAllUser);

router.post("/login", middleware.schemas.zod(loginSchema), controller.login);

router.get("/logout", controller.logout);

export default router;
