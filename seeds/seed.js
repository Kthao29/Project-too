const sequelize = require('../config/connection');

const seedComments = require('./comment-seeds');
const seedProjects = require('./project-seed');
const seedUsers = require('./user-seeds');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedProjects();
  await seedComments();
    
  process.exit(0);
};

seedDatabase();
