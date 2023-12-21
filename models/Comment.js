const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Comment extends Model { }

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,   
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        onDelete: 'Cascade',
        onUpdate: 'Cascade'
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'project',
        key: 'id', 
        onDelete: 'Cascade',
        onUpdate: 'Cascade'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;


