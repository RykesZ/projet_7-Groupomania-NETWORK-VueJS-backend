'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthdate: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "http://localhost:5000/images/PP_default.png"
      },
      publicationsCreated: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      publicationsLiked: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      publicationsMasked: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      commentsCreated: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('users');
  }
};