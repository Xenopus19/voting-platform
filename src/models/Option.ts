import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../util/db";

class Option extends Model<InferAttributes<Option>, InferCreationAttributes<Option>> {
  declare id: CreationOptional<number>;
  declare text: string;
  declare votersAmount: CreationOptional<number>;
  declare voteId: number;
}
Option.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    votersAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    voteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'votes', 
        key: 'id'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: "options",
  },
);

export type OptionAttributes = InferAttributes<Option>; 
export type NewOptionAttributes = InferCreationAttributes<Option>;

export default Option;
