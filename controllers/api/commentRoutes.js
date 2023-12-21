const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { uploadFileToStorage } = require('../../utils/storage');
const { getStorage } = require('firebase/storage');
const { initializeApp } = require('firebase/app');
const { firebaseConfig } = require('../../config/connection');
const multer  = require('multer');

initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // limit to 5MB
  }
});

// Post path to create new comments under a given project
router.post('/', [withAuth, upload.single('file')], async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        let downloadURL;

        if (req.file) {
            downloadURL = await uploadFileToStorage(storage, req.file, 'commentfiles');
            await Comment.update({filename: downloadURL}, {
              where: {id: newComment.id}
            })
        };

        res.status(200).json([newComment, downloadURL]);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Put path to update exisiting comments
router.put('/:id', [withAuth, upload.single('file')], async (req, res) => {
    try {
        await Comment.update(req.body, {
            where: {id: req.params.id}
        });

        let downloadURL;

        if (req.file) {
            downloadURL = await uploadFileToStorage(storage, req.file, 'commentfiles');
            await Comment.update({filename: downloadURL}, {
              where: {id: req.params.id}
            })
        };

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

