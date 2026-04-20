import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from "sequelize";
import { sequelize } from "../util/db";
import Vote from "./Vote";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare passwordHash: string;
  declare votes?: NonAttribute<Vote[]>;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "users",
  },
);

export type UserAttributes = InferAttributes<User>; 
export type NewUserAttributes = InferCreationAttributes<User>;

export default User;
