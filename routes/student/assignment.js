const router = require('express').Router();
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');
const assignmentController = require('../../controllers/assignment');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `assignment_submissions/`);
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
    const roll_no = req.token_data.data.user_id;
    const data = await assignmentController.getAllForStudent(roll_no);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/details', async (req, res) => {
  try {
    const roll_no = req.token_data.data.user_id;
    const uid = req.query.id;
    const data = await assignmentController.getAssignmentDetailsForStudent(roll_no, uid);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.post('/submitWithAttach', upload.array('attachments', 6), async (req, res) => {
  try {
    let details = Object.assign({}, req.body);
    details.uid = req.query.uid;
    details.files = req.files.map(file => file.filename);
    details.createdAt = Math.floor(Date.now() / 1000);
    if (details.due_date) {
      details.due_date = Math.floor(new Date(details.due_date).getTime() / 1000);
    }
    console.log(details);
    const roll_no = req.token_data.data.user_id;
    details.student_id = roll_no;
    details.createdAt = Math.floor(Date.now() / 1000);
    details.last_edit_date = Math.floor(Date.now() / 1000);

    const data = await assignmentController.addAssignmentSubmission(details, roll_no);

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

router.post('/submitWithoutAttach', async (req, res) => {
  try {
    const roll_no = req.token_data.data.user_id;
    let details = Object.assign({}, req.body);
    details.uid = req.query.uid;
    details.student_id = roll_no;
    details.createdAt = Math.floor(Date.now() / 1000);
    details.last_edit_date = Math.floor(Date.now() / 1000);

    const data = await assignmentController.addAssignmentSubmission(details, roll_no);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      error,
      success: false
    });
  }
});

module.exports = router;