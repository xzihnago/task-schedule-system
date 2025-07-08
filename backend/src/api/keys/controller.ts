import type { RequestHandler } from "express";

export const upload: RequestHandler = async (req, res) => {
  const file = Object.values(req.files ?? {}).flat();
  if (!file[0]) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  await file[0].mv("../frontend/public/images/keys.webp");

  res.end();
};
