import { Model } from "sequelize";

class Record extends Model {
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public borrowDate!: Date;
    public returnDate!: Date | null;
    public status!: 'BORROWED' | 'RETURNED';
    public rating!: number | null;
  }
  
  export default Record;
