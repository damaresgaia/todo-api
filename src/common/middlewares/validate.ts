import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.errors[0].message;
    res.status(400).json({ message });
    return;  // retorna só para interromper o fluxo, sem retornar valor
  }
  req.body = result.data;
  next();
};
