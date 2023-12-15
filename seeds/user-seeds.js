
const { User } = require('../models');

const userData = [{
    "name": "Test User",
    "email": "test@mail.com",
    "password": "password123"
  },
  {
    "name": "Test User 2",
    "email": "test2@mail.com",
    "password": "password123"
  },
  {
    "name": "Test User 3",
    "email": "test3@mail.com",
    "password": "password123"
  }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;
