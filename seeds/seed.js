const sequelize = require('../config/connection');

const seedComments = require('./comment-seeds');
const seedProjects = require('./project-seed');
const seedUsers = require('./user-seeds');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await seedComments();
  await seedProjects();
  await seedUsers();
  
  process.exit(0);
};

seedDatabase();
