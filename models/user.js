'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Publication }) {
      // define association here
      this.hasMany(Publication, { foreignKey: 'autorId', as: 'publications' })
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    };
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a firstname'},
        notEmpty: { msg: 'Firstname must not be empty'},
        isAlpha: { msg: 'Firstname must contains only letters'}
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a lastname'},
        notEmpty: { msg: 'Lastname must not be empty'},
        isAlpha: { msg: 'Lastname must contains only letters'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have an e-mail address'},
        notEmpty: { msg: 'E-mail address must not be empty'},
        isEmail: { msg: 'This is not an e-mail address'},
        unique: true
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a password'},
        notEmpty: { msg: 'Password must not be empty'},
        len: [8, 18]
      }
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};