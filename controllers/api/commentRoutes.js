const router = require('express').Router();
const { commentFiles } = require('../../utils/multerStorage') 
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Post path to create new comments under a given project
router.post('/', [withAuth, commentFiles.any('file')], async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Put path to update exisiting comments
router.put('/:id', [withAuth, commentFiles.any('file')], async (req, res) => {
    try {
        await Comment.update(req.body, {
            where: {id: req.params.id}
        });

        res.status(200).json('Post Updated');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete path to destroy selected comments
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!postData) {
            res.status(400).json({ message: 'No project found with this ID' });
            return;
        }
        res.status(200).json('Post deleted')
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;

