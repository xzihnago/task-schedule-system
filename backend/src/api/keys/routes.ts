import { Router } from "express";
import { user } from "@/middleware";
import * as controller from "./controller";

const router = Router();

router.post("/", user.authentication, controller.upload);

export default router;
