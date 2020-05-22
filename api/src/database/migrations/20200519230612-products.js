'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      unity_value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_providers: {
        type: Sequelize.INTEGER,
        references: { model: 'providers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
