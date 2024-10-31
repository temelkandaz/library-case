import { Request, Response, NextFunction } from "express";
import db from "../database/config";

export const dbInjection = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.db = db;
  next();
};
