require("dotenv").config();
import usersRouter from "./router/users";
import booksRouter from "./router/books";
import { errorHandler } from "./middleware/error-handler";
import { dbInjection } from "./middleware/db-injection";
import environment from "./utils/environment";
import { initializeDb } from "./database/initialize-db";

const express = require("express");

const app = express();
const PORT = environment.PORT;

initializeDb();

app.use(express.json());

app.use(dbInjection);

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.use(errorHandler);

app.listen(PORT, function () {
  console.log("Server is successfully running!");
});
