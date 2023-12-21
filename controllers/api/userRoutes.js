const router = require('express').Router();
const { User } = require('../../models');
const { uploadFileToStorage } = require('../../utils/storage')
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


// Path to create new user
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    let downloadURL;

    if (req.file) {
        downloadURL = await uploadFileToStorage(storage, req.file, 'profiles');
        await User.update({filename: downloadURL}, {
          where: {id: dbUserData.id}
        })
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id  
      req.session.logged_in = true;

      res.status(200).send([dbUserData, downloadURL])
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


