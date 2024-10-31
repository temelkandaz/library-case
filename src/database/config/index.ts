import User from '../models/User';
import Book from '../models/Book';
import Record from '../models/Record';
import sequelize from './config';

const db = {
  sequelize,
  User,
  Book,
  Record
};

export default db;
