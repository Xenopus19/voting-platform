import { sequelize } from "../util/db";
import { QueryInterface, DataTypes } from 'sequelize';

export interface MigrationContext {
  context: QueryInterface;
}

module.exports = {
  up: async ({ context: queryInterface }: MigrationContext) => {
    await queryInterface.createTable("users", {
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
    });
  },
  down: async ({ context: queryInterface }: MigrationContext) => {
    await queryInterface.dropTable("users");
  },
};
