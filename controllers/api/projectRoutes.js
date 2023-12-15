const router = require('express').Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const { Project } = require('../../models');
const withAuth = require('../../utils/auth');



// Controller to create a new project
router.post('/', withAuth, async (req, res) => {
    try {
        const newProject = await Project.create({
            ...req.body, 
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Controller to update an existing project
router.put('/:id', withAuth, async (req, res) => {
    try {
        await Project.update(req.body, {
            where: {id: req.params.id}
        });

        res.status(200).json('Post Updated');
    } catch (err) {
        res.status(500).json(err);
    }
});


// Controller to delete an existing project
router.delete('/:id', withAuth, async (req, res) => {
    try {
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