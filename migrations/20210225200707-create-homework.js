'use strict';
module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.createTable('Homework', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          }
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        key: 'id'
      },
      SubjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Subjects'
          }
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        key: 'id',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down:  (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Homework');
  }
};