import { Sequelize } from "sequelize";

const sequelize = new Sequelize("librarycase", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
