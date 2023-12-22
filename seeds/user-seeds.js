
const { User } = require('../models');

const userData = [{
    "name": "BigJeff24",
    "email": "test@mail.com",
    "password": "password123",
    "filename": "https://firebasestorage.googleapis.com/v0/b/create-lab-4ba50.appspot.com/o/profiles%2Fpfp1.png?alt=media&token=d928c84a-10bc-46bb-8fa3-efa088d38ecc"
  },
  {
    "name": "HelenaCell01",
    "email": "test2@mail.com",
    "password": "password123",
    "filename": "https://firebasestorage.googleapis.com/v0/b/create-lab-4ba50.appspot.com/o/profiles%2Fpfp2.png?alt=media&token=8935eefb-e3e4-49a6-ae61-21df0b1f99c6"
  },
  {
    "name": "xX_SniperBeast_Xx",
    "email": "test3@mail.com",
    "password": "password123",
    "filename": "https://firebasestorage.googleapis.com/v0/b/create-lab-4ba50.appspot.com/o/profiles%2Fpfp3.png?alt=media&token=e0f68180-40a2-45f4-b33a-531f251d7f9e"
  },
  {
    "name": "AquaticSkates166",
    "email": "test4@mail.com",
    "password": "password123",
    "filename": "https://firebasestorage.googleapis.com/v0/b/create-lab-4ba50.appspot.com/o/profiles%2Fpfp4.png?alt=media&token=6f636c26-f28e-4d7f-972f-bd4866c08697"
  },
  {
    "name": "GlorbTheDestroyer",
    "email": "test5@mail.com",
    "password": "password123",
    "filename": "https://firebasestorage.googleapis.com/v0/b/create-lab-4ba50.appspot.com/o/profiles%2Fpfp5.png?alt=media&token=704cee77-57a9-4090-8cfc-56f126145000"
  }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;



