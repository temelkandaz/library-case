class Environment {
  PORT: number;
  USE_POSTGRESQL: Boolean;
  POSTGRESQL_HOST: string;
  POSTGRESQL_USERNAME: string;
  POSTGRESQL_PASSWORD: string;
  POSTGRESQL_DB_NAME: string;
}

const environment = new Environment();

environment.PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
environment.USE_POSTGRESQL = process.env.USE_POSTGRESQL
  ? process.env.USE_POSTGRESQL === "true"
  : false;
environment.POSTGRESQL_HOST = process.env.POSTGRESQL_HOST ?? "";
environment.POSTGRESQL_USERNAME = process.env.POSTGRESQL_USERNAME ?? "";
environment.POSTGRESQL_PASSWORD = process.env.POSTGRESQL_PASSWORD ?? "";
environment.POSTGRESQL_DB_NAME = process.env.POSTGRESQL_DB_NAME ?? "";

export default environment;
