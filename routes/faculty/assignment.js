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
    details.last_edit_date = Math.floor(Date.now() / 1000);
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
    details.last_edit_date = Math.floor(Date.now() / 1000);
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

router.put('/editWithAttach', upload.array('new_attachments', 6), async (req, res) => {
  try {
    let details = Object.assign({}, req.body);
    const uid = req.query.uid;
    details.files = req.files.map(file => file.filename);
    details.last_edit_date = Math.floor(Date.now() / 1000);
    if (details.due_date) {
      details.due_date = Math.floor(new Date(details.due_date).getTime() / 1000);
    } else {
      details.due_date = null;
    }
    if (!details.total_marks) {
      details.total_marks = null;
    }
    console.log(details);
    const data = await assignmentController.editAssignment(details, uid);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      error,
      success: false
    });
  }
});

router.put('/editWithoutAttach', async (req, res) => {
  try {
    const uni_id = req.token_data.data.user_id;
    const uid = req.query.uid;
    let details = Object.assign({}, req.body);
    details.last_edit_date = Math.floor(Date.now() / 1000);
    if (details.due_date) {
      details.due_date = Math.floor(new Date(details.due_date).getTime() / 1000);
    } else {
      details.due_date = null;
    }
    if (!details.total_marks) {
      details.total_marks = null;
    }
    console.log(details);
    const data = await assignmentController.editAssignment(details, uid);
    // console.log(details);
    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      error,
      success: false
    });
  }
});

router.get('/details', async (req, res) => {
  try {
    const uid = req.query.id;
    const data = await assignmentController.getAssignmentDetailsForFaculty(uid);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/submissionDetails', async (req, res) => {
  try {
    const assignment_id = req.query.assignment_id;
    const submission_id = req.query.submission_id;
    const data = await assignmentController.getAssignmentSubmissionDetailsForFaculty(assignment_id, submission_id);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.put('/scoreSubmission', async (req, res) => {
  try {
    const details = Object.assign({}, req.body);
    const submission_id = req.query.id;
    const data = await assignmentController.scoreAssignmentSubmission(submission_id, details);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.delete('/', async (req, res) => {
  try {
    const uid = req.query.id;
    const data = await assignmentController.deleteOneByUID(uid);
    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

module.exports = router;