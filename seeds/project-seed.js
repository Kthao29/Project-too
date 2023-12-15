const { Project } = require('../models');

const projectData = [{
        title: 'project 1',
        body: 'This is a really cool project you are working on! Keep it up!',
        user_id: 1
    },
    {
        title: 'project 2',
        body: 'This project is okay, you could use some help!',
        user_id: 2
    },
    {
        title: 'project 3',
        body: 'Delete this project! Not good at all...',
        user_id: 3
    }
];

const seedProjects = () => Project.bulkCreate(projectData);

module.exports = seedProjects;