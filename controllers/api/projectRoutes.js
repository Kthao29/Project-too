const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');
const { projectFiles } = require('../../utils/multerStorage');



// Controller to create a new project
router.post('/', [withAuth, projectFiles.any('file')], async (req, res) => {
    try {
        const newProject = await Project.create({
            ...req.body, 
            user_id: req.session.user_id
        });

        res.status(200).json(newProject);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Controller to update an existing project
router.put('/:id', [withAuth, projectFiles.any('file')], async (req, res) => {
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