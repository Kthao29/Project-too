
const { Comment } = require('../models');

const commentData = [{
        comment_text: "This is DOPE!!!",
        user_id: 1,
        project_id: 1
    },
    {
        comment_text: "Extremely interesting",
        user_id: 2,
        project_id: 2
    },
    {
        comment_text: "This is so-so...",
        user_id: 3,
        _id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;