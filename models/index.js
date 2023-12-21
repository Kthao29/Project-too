const User = require('./User');
const Comment = require('./Comment');
const Project = require('./Project');
const Category = require('./Category');

User.hasMany(Project, {
    foreignKey: 'user_id',
    onDelete: 'Cascade'
});

Project.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Project, {
    foreignKey: 'project_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Project.hasMany(Comment, {
    foreignKey: 'project_id',
});

Category.belongsTo(Project, {
    foreignKey: 'project_id',
  });
  
  Project.hasMany(Category, {
    foreignKey: 'project_id',
  });

module.exports = { User, Comment, Project, Category };


