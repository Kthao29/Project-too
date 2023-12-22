
const { Comment } = require('../models');

const commentData = [{
        comment_text: "Love this!!!",
        user_id: 2,
        project_id: 1,
        filename: ""
    },
    {
        comment_text: "I like it better on mute!!! 🔇🔇🔇",
        user_id: 5,
        project_id: 1,
        filename: ""
    },
    {
        comment_text: "I think you could try adding something more interesting to the frame. See attached!",
        user_id: 3,
        project_id: 2,
        filename: "https://firebasestorage.googleapis.com/v0/b/create-lab-4ba50.appspot.com/o/commentfiles%2Fscooter2.jpg?alt=media&token=4eef16e9-210f-4160-9af6-521afd669d69"
    },
    {
        comment_text: "I am Glorb. 🗿",
        user_id: 5,
        project_id: 2,
        filename: ""
    },
    {
        comment_text: "Shrek 2 for Playstation was alright... I'm pretty ogre it at this point.",
        user_id: 1,
        project_id: 3,
        filename: ""
    },
    {
        comment_text: "I'm not a game dev but I want to see this happen... Come on devs!",
        user_id: 4,
        project_id: 3,
        filename: ""
    },
    {
        comment_text: "This is unreal! Looks amazing!",
        user_id: 2,
        project_id: 4,
        filename: ""
    },
    {
        comment_text: "Wow, seriously impressive. Reminds me of a painting from the National Historical Museum of Sweden... totally won't find this over there!",
        user_id: 3,
        project_id: 4,
        filename: ""
    },
    {
        comment_text: "Very good, Glorb.",
        user_id: 5,
        project_id: 5,
        filename: ""
    },
    {
        comment_text: "No thank you.",
        user_id: 2,
        project_id: 5,
        filename: ""
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;


