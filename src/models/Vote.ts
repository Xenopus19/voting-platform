import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";
import { sequelize } from "../util/db";
import Option from "./Option";

class Vote extends Model<InferAttributes<Vote>, InferCreationAttributes<Vote>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare expirationDate: Date;
  declare options?: NonAttribute<Option[]>;
  declare userId: number;
}
Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "votes",
  },
);

export type VoteAttributes = InferAttributes<Vote>;
export type NewVoteAttributes = InferCreationAttributes<Vote>;

export default Vote;
