import { Model } from "sequelize";

class User extends Model {
  public id!: number;
  public name!: string;
}

export default User;
