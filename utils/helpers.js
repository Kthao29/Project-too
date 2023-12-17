const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const multerParse = (req, res, next) => {
  if (req.file) {
    upload.single('file');
    next();
  } else if (!req.file) {
    upload.none();
    next();
  } else {
    next();
  }
}

module.exports = multerParse
