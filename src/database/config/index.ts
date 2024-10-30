import { DataTypes, Sequelize } from 'sequelize';
import User from '../models/User';
import Book from '../models/Book';
import Record from '../models/Record';

const sequelize = new Sequelize('librarycase', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {
  sequelize,
  User,
  Book,
  Record
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
    },
    status: {
      type: DataTypes.ENUM('AVAILABLE', 'BORROWED'),
      allowNull: false,
      defaultValue: 'AVAILABLE'
    }
  },
  {
    sequelize,
    tableName: 'book',
  }
);
  
Record.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    borrowDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('BORROWED', 'RETURNED'),
      defaultValue: 'BORROWED',
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 1, max: 10 },
    },
  },
  {
    sequelize,
    tableName: 'record',
  }
);

Record.belongsTo(User, { foreignKey: 'userId' });
Record.belongsTo(Book, { foreignKey: 'bookId' });

export default db;
