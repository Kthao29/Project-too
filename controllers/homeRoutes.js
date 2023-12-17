const router = require('express').Router();
const { User, Project, Comment } = require('../models');


// controller to load homepage
router.get('/', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  
  try {
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        }
      ]
    });

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// controller to load project page by the project ID
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User, 
          attributes: { exclude: ['password'] }
        }
      ]
    });
    const commentData = await Comment.findAll({
      where: {
        project_id: req.params.id, 
      },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        }
      ]
    });

    const projects = projectData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('project', {
      ...projects,
      comments, 
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// controller to load the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//controller to load the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

//controller to load the new post page
router.get('/post', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('homepage', {
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
