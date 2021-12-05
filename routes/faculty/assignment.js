const router = require('express').Router();
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');
const facultyController = require('../../controllers/faculty');
const assignmentController = require('../../controllers/assignment');
const multer = require('multer');
const uuidv4 = require('uuid').v4;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `assignments/`);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, req.query.uid + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true)
    // if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //   cb(null, true);
    // } else {
    //   cb(null, false);
    //   return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    // }
  }
});
router.use('/', auth.tokenValidate);

router.get('/all', async (req, res) => {
  try {
    const uni_id = req.token_data.data.user_id;
    const data = await assignmentController.getAllByFaculty(uni_id);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

// router.post('/add', (req, res, next) => {
//   categoryImageUpload(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: err });
//     }
//     next();
//   })
// });

router.post('/addWithAttach', upload.array('attachments', 6), async (req, res) => {
  try {
    let details = Object.assign({}, req.body);
    details.uid = req.query.uid;
    details.files = req.files.map(file => file.filename);
    details.createdAt = Math.floor(Date.now() / 1000);
    if (details.due_date) {
      details.due_date = Math.floor(new Date(details.due_date).getTime() / 1000);
    }
    console.log(details);
    const uni_id = req.token_data.data.user_id;
    const data = await assignmentController.addAssignment(details, uni_id);

    return res.send(data);
    // return res.send(data);

    // console.log(req.body);
    // console.log(req.files);
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      error,
      success: false
    });
  }
});

router.post('/addWithoutAttach', async (req, res) => {
  try {
    const uni_id = req.token_data.data.user_id;
    let details = Object.assign({}, req.body);
    details.uid = req.query.uid;
    details.createdAt = Math.floor(Date.now() / 1000);
    if (details.due_date) {
      details.due_date = Math.floor(new Date(details.due_date).getTime() / 1000);
    }

    await assignmentController.addAssignment(details, uni_id);
    // console.log(details);
    return res.send({
      success: true,
      message: 'Assignment added successfully'
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      error,
      success: false
    });
  }
});

module.exports = router;