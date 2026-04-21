import { DataTypes } from 'sequelize';
import { MigrationContext } from './20261404_01_users_table';

export const up = async ({ context: queryInterface } : MigrationContext) => {
  await queryInterface.createTable('fingerprints', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fingerprint: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    vote_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'votes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });

  await queryInterface.addIndex('fingerprints', ['fingerprint', 'vote_id'], {
    unique: true,
    name: 'fingerprints_unique_vote'
  });
};

export const down = async ({ context: queryInterface }: MigrationContext) => {
  await queryInterface.dropTable('fingerprints');
};