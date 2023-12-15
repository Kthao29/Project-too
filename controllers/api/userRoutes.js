const router = require('express').Router();
const { User, Project } = require('../../models');
const withAuth = require('../../utils/auth');

// controller to load the profile page of a user and pull in their projects
router.get('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Project, 
          attributes: [ 'model', 'body' ]
        }
      ]
    });

    const user = userData.map((users) => users.get({ plain: true }));

    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in
    });
    res.status(200).json('Request Successful')
  } catch (err) {
    res.status(500).json(err)
  }
});

// controller to load the logged in user's profile page
router.get('/my_profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.sesssion.user_id, {
      include: [
        {
          model: Project, 
          attributes: [ 'model', 'body' ]
        }
      ]
    });

    const user = userData.map((users) => users.get({ plain: true }));

    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in
    });
    res.status(200).json('Request Successful')
  } catch (err) {
    res.status(500).json(err)
  }
});

// Path to create new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id  
      req.session.logged_in = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Path to login existing users
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Path to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
