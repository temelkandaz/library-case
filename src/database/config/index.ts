import { DataTypes, Sequelize } from 'sequelize';
import User from '../models/User';
import Book from '../models/Book';

const sequelize = new Sequelize('librarycase', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {
  sequelize,
  User,
  Book
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

Book.init(
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
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'book',
  }
);

export default db;
