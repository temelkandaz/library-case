import { DataTypes, Model } from "sequelize";
import sequelize from '../config/config';
import Book from "./Book";
import User from "./User";

class Record extends Model {
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public borrowDate!: Date;
    public returnDate!: Date | null;
    public status!: 'BORROWED' | 'RETURNED';
    public rating!: number | null;

    public Book?: Book;
}

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

export default Record;
