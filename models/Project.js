const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Project extends Model { }

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        }, 
        filename: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
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
        modelName: 'project'
    }
);

module.exports = Project;


