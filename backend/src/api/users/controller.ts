import type { RequestHandler } from "express";
import type { z } from "zod";
import type { loginSchema } from "./schemas";
import jwt from "jsonwebtoken";
import { utils } from "@xzihnago/express-utils";
import * as model from "./model";

export const findAllUser: RequestHandler = async (_, res) => {
  const users = await model.findAllUser();

  const result = users
    .sort((a, b) =>
      b.permissions === a.permissions
        ? b.nickname.localeCompare(a.nickname)
        : b.permissions - a.permissions
    )
    .map((user) => ({
      id: user.id,
      nickname: user.nickname,
    }));

  res.ok(result);
};

export const login: RequestHandler<
  unknown,
  unknown,
  z.infer<typeof loginSchema>
> = async (req, res) => {
  const user = await model.findUserByUsername(req.body.username);
  if (
    !user ||
    !(await utils.password.bcrypt.verify(req.body.password, user.passwordHash))
  ) {
    res.status(401);
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    { id: user.id, username: req.body.username, permissions: user.permissions },
    env.JWT_SECRET,
    { expiresIn: 48 * 60 * 60 }
  );

  res
    .cookie("token", token, {
      signed: true,
      httpOnly: true,
      secure: true,
    })
    .end();
};

export const logout: RequestHandler = (_, res) => {
  res.clearCookie("token").end();
};
