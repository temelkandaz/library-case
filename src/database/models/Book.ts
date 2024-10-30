import { Model } from "sequelize";

class Book extends Model {
  public id!: number;
  public name!: string;
  public rating!: number; 
}

export default Book;
