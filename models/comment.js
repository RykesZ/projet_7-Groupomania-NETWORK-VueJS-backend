'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'autorId', as: 'user' })
    }
    toJSON() {
      return { ...this.get(), id: undefined,autorId: undefined };
    };
  };
  Comment.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Comment must have a text'},
      }
    },
    autorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Comment must have an autor'},
        notEmpty: { msg: 'Comment must have a valid autor'}
      }
    }
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return Comment;
};