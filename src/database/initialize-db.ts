import db from "../database/config";

export const initializeDb = () => {
  db.sequelize
    .authenticate()
    .then(() => console.log("Database connected!"))
    .catch((err) => console.error("Error connecting to the database:", err));

  db.sequelize
    .sync({ force: true })
    .then(() => console.log("Database synced!"))
    .catch((err) => console.error("Error syncing to the database:", err));
};
