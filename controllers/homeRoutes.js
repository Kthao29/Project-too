const router = require('express').Router();
const { User, Project, Comment, Category } = require('../models');
const withAuth = require('../utils/auth');


// controller to load homepage
router.get('/', withAuth, async (req, res) => {
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
        }, 
        {
          model: Comment,
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

// controller to load project page by ID into the editor
router.get('/edit/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User, 
          attributes: { exclude: ['password'] }
        }, {
          model: Comment,
        }
      ]
    });

    const projects = projectData.get({ plain: true });

    res.render('edit', {
      ...projects,
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
router.get('/post', withAuth, (req, res) => {
  res.render('post', {
    logged_in: req.session.logged_in,
  });
});

// controller to load the logged in user's profile page
router.get('/mylab', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Project, 
          attributes: [ 'id', 'title', 'body', 'user_id' ],
        }
      ]
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




router.get('/categories', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: ['id', 'name'], // Adjust attributes based on your Category model
      include: [
        {
          model: Project,
          attributes: ['id', 'title', 'body', 'user_id'],
        },
      ],
    });

    const categories = categoryData.map((category) => category.get({ plain: true }));

    res.render('category', {
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// controller to load the profile page of a user and pull in their projects
router.get('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Project, 
          attributes: [ 'title', 'body' ]
        }
      ]
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;


