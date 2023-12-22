const { Project } = require('../models');

const projectData = [{
        title: 'Need Drum Help for My New Indie Record',
        body: "I think I'm going to call it: Maximum Beef. Any advice on the drum parts? I'm a big fan of Travis Barker but I don't think it quite fits the vibe. If you're a drummer and want to contribute, lmk!",
        user_id: 1,
        filename: "https://soundcloud.com/day-wave/something-here"
    },
    {
        title: 'Photo Critique: Advice On Making This Shot Better?',
        body: "I've been into photography for a while now, but not sure how to improve my composition skills. Any tips on how I can make this shot more visually interesting?",
        user_id: 2,
        filename: "https://firebasestorage.googleapis.com/v0/b/create-lab-4ba50.appspot.com/o/projectfiles%2Fnicolas-i-o8koK0E-oRg-unsplash%20(1).jpg?alt=media&token=f0a6ead3-c514-485d-be65-130817c84e9c"
    },
    {
        title: 'Any Game Devs Looking For Work?',
        body: "I am the ultimate gamer, and I'm looking for someone to develop a game that will truly test my skills. I'm thinking something along the lines of Shrek 2 for Playstation... See attached pic for inspo!",
        user_id: 3,
        filename: "https://firebasestorage.googleapis.com/v0/b/create-lab-4ba50.appspot.com/o/projectfiles%2Fst%2Csmall%2C507x507-pad%2C600x600%2Cf8f8f8.u9.jpg?alt=media&token=d16c0d2b-167c-4d63-841b-dc0d7ddfbeff"
    },
    {
        title: '"Some Fruit, I Guess" Oil on Canvas, by Me.',
        body: "Getting back to my roots and doing some oil painting again. Wanted to do a quick showcase on the latest.",
        user_id: 4,
        filename: "https://firebasestorage.googleapis.com/v0/b/create-lab-4ba50.appspot.com/o/projectfiles%2Fnational-historical-museum-of-sweden-nhm-EG5Dsy_oOMg-unsplash%20(1).jpg?alt=media&token=24fc6353-2711-4862-bb71-e81ce6d42dbe"
    },
    {
        title: 'I, Glorb, Have Created the Best Project Known To Mankind',
        body: "It's me, Glorb. I've finally done it. I've created the ultimate masterpiece.",
        user_id: 5,
        filename: "https://firebasestorage.googleapis.com/v0/b/create-lab-4ba50.appspot.com/o/projectfiles%2Ftumblr_a44ca5a62420ae6a2eec9206c9d1004f_628a5d74_1280.png?alt=media&token=c084621f-1266-4be9-bbe0-59d2a337dc75"
    },
];

const seedProjects = () => Project.bulkCreate(projectData);

module.exports = seedProjects;

