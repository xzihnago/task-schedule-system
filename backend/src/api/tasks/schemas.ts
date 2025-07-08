import { z } from "zod";

export const findSchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/)
    .optional(),
});

export const createSchema = z.object({
  date: z.string().date().nullable(),
  title: z.string().max(100),
  content: z.string().max(5000),
  responsibleId: z.string().uuid().nullable(),
  internalStatus: z.string().max(5000),
  externalStatus: z.string().max(5000),
});

export const updateSchema = z.object({
  date: z.string().date().nullish(),
  title: z.string().max(100).optional(),
  content: z.string().max(5000).optional(),
  responsibleId: z.string().uuid().nullish(),
  internalStatus: z.string().max(5000).optional(),
  externalStatus: z.string().max(5000).optional(),
});
