import { DataTypes, Sequelize } from 'sequelize';
import User from '../models/user';

const sequelize = new Sequelize('librarycase', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {
  sequelize,
  User,
};

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user',
  }
);

export default db;
