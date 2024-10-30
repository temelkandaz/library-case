import { Model } from "sequelize";
import Book from "./Book";

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
  
  export default Record;
