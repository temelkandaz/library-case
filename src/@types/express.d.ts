import * as express from "express";
import { Sequelize } from "sequelize";

declare global {
  namespace Express {
    interface Request {
      db: any;
    }
  }
}
