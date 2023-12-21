const router = require('express').Router();
const { Project, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { uploadAnyToStorage } = require('../../utils/storage');
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


// Controller to create a new project
router.post('/', [withAuth, upload.any('file')], async (req, res) => {
    try {
        const newProject = await Project.create({
            title: req.body.title,
            body: req.body.body, 
            user_id: req.session.user_id
        });

        let downloadURL;

        if (req.files) {
            downloadURL = await uploadAnyToStorage(storage, req.files, 'projectfiles');
            await Project.update({filename: downloadURL}, {
              where: {id: newProject.id}
            })
        };
            
        res.status(200).json(newProject);
    } catch (err) { 
        res.status(400).json(err);
    }
});

//Controller to update an existing project
router.put('/:id', [withAuth, upload.any('file')], async (req, res) => {
    try {
        await Project.update(req.body, {
            where: {id: req.params.id}
        });

        let downloadURL;

        if (req.file) {
            downloadURL = await uploadAnyToStorage(storage, req.files, 'projectfiles');
            await Project.update({filename: downloadURL}, {
              where: {id: req.params.id}
            })
        };

        res.status(200).json('Post Updated');
    } catch (err) {
        res.status(500).json(err);
    }
});


// Controller to delete an existing project
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentDelete = Comment.destroy({
            where: {
                project_id: req.params.id
            }
        })
        const projectData = Project.destroy({
            where: {
                id: req.params.id, 
                user_id: req.session.user_id
            },
        });

        if (!projectData) {
            res.status(400).json({message: 'no project found under that ID'})
        }
        res.status(200).json('Post Deleted')
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;