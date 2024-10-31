import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";
import { BookStatus } from "./enums/BookStatus";

class Book extends Model {
  public id!: number;
  public name!: string;
  public rating: number | null;
  public status!: BookStatus;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rating: {
      type: DataTypes.DOUBLE,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(BookStatus)),
      allowNull: false,
      defaultValue: BookStatus.AVAILABLE,
    },
  },
  {
    sequelize,
    tableName: "book",
  },
);

export default Book;
