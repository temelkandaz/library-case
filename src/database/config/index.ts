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
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    sequelize,
    tableName: 'user',
  }
);

export default db;
