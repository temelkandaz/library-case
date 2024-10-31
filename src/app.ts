require("dotenv").config();
import db from "./database/config";
import { NextFunction, Request } from "express";
import usersRouter from "./router/users";
import booksRouter from "./router/books";
import { errorHandler } from "./middleware/error-handler";

const express = require("express");

const app = express();
const PORT = 3000;

db.sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database:", err));

app.use(express.json());

const dbMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.db = db;
  next();
};

app.use(dbMiddleware);

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.use(errorHandler);

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("Server is successfully running!");
  });
});
