'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // userId
      this.belongsTo(User, { foreignKey: 'autorId', as: 'user' })
    }
    toJSON() {
      return { ...this.get(), id: undefined,autorId: undefined };
    };
  };
  Publication.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Publication must have a text'},
      }
    },
    autorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Publication must have an autor'},
        notEmpty: { msg: 'Publication must have a valid autor'}
      }
    }
  }, {
    sequelize,
    tableName: 'publications',
    modelName: 'Publication',
  });
  return Publication;
};