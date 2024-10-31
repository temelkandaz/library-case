import { Sequelize } from "sequelize";
import environment from "../../utils/environment";

let sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

if (environment.USE_POSTGRESQL) {
  sequelize = new Sequelize(
    environment.POSTGRESQL_DB_NAME,
    environment.POSTGRESQL_USERNAME,
    environment.POSTGRESQL_PASSWORD,
    {
      host: environment.POSTGRESQL_HOST,
      dialect: "postgres",
    },
  );
}

export default sequelize;
