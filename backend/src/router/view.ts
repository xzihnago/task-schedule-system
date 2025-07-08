import { Router } from "express";
import { middleware } from "@xzihnago/express-utils";
import { user } from "@/middleware";

const router = Router();

router.get("/", (_, res) => {
  res.render("login");
});

router.get("/:year/task", user.authentication, (req, res) => {
  res.render("common", {
    permission: req.user.permissions,
    components: ["card-task", "modal-task"],
  });
});

router.get("/:year/keys", user.authentication, (req, res) => {
  res.render("common", {
    permission: req.user.permissions,
    components: ["card-keys"],
  });
});

router.get("/:year/venue", user.authentication, (req, res) => {
  res.render("common", {
    permission: req.user.permissions,
    components: ["card-venue"],
  });
});

router.get(/^(?!\/api(?:\/|$)).*/, (_, res) => {
  res.redirect(`/`);
});

router.use(
  middleware.errorHandler.www(
    { 401: "/" },
    { 401: "登入逾時，請重新登入", 403: "權限不足" }
  )
);

export default router;
