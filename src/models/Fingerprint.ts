import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../util/db";

class Fingerprint extends Model<InferAttributes<Fingerprint>, InferCreationAttributes<Fingerprint>> {
  declare id: CreationOptional<number>;
  declare fingerprint: string;
  declare voteId: number;
}
Fingerprint.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fingerprint: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    modelName: "fingerprints",
    timestamps: false
  },
);

export type FingerprintAttributes = InferAttributes<Fingerprint>; 
export type NewFingerprintAttributes = InferCreationAttributes<Fingerprint>;

export default Fingerprint;
