import type { RequestHandler } from "express";

export const uploadKeys: RequestHandler = async (req, res) => {
  const file = Object.values(req.files ?? {}).flat();
  if (!file[0]) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  await file[0].mv("./public/files/keys.webp");

  res.end();
};

export const uploadVenues: RequestHandler = async (req, res) => {
  const file = Object.values(req.files ?? {}).flat();
  if (!file[0]) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  await file[0].mv("./public/files/venues.pdf");

  res.end();
};
