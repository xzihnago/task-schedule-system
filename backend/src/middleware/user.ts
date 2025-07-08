import jwt from "jsonwebtoken";

export const authentication: Middleware = (req, res, next) => {
  // Validate
  const tokenAccess = (req.signedCookies as { token?: string }).token;
  if (!tokenAccess) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  try {
    req.user = jwt.verify(tokenAccess, env.JWT_SECRET) as never;
  } catch (error) {
    res.status(401);
    throw error;
  }

  // Rolling
  const tokenRefresh = jwt.sign(
    {
      id: req.user.id,
      username: req.user.username,
      permissions: req.user.permissions,
    },
    env.JWT_SECRET,
    { expiresIn: 100 * 60 }
  );

  res.cookie("token", tokenRefresh, {
    signed: true,
    httpOnly: true,
    secure: true,
  });

  next();
};

export const permission: Middleware<[flag: PermissionBits]> =
  (flag) => (req, res, next) => {
    if ((req.user.permissions & flag) !== (flag as number)) {
      res.status(403);
      throw new Error("Permission denied");
    }

    next();
  };

export enum PermissionBits {
  MANAGE_TASK = 1,
  MANAGE_KEY = 2,
  MANAGE_VENUE = 4,
}

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
      username: string;
      permissions: PermissionBits;
    };
  }
}
