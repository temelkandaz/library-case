import { DataTypes, Model } from "sequelize";
import sequelize from '../config/config';

class Book extends Model {
  public id!: number;
  public name!: string;
  public rating: number | null; 
  public status!: 'AVAILABLE' | 'BORROWED';
}

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

export default Book;
