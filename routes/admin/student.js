const router = require('express').Router();
const logger = require('../../helpers/logger');
const multer = require('multer');
const studentController = require('../../controllers/student');
const { studentRegisterValidation, studentLoginValidation } = require("../../validators/studentValidator");

router.get('/search', async (req, res) => {
  try {
    const query = req.query.id;
    const data = await studentController.getStudentByID(query);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.post('/register', async (req, res) => {
  const body = Object.assign({}, req.body);
  try {
    const { error } = studentRegisterValidation(body);
    if (error) return res.status(406).json({ Valmessage: error.details[0].message });

    const data = await studentController.addDetails(body);

    return res.send(data);

  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }

});

router.post('/bulkRegister', async (req, res) => {

  const storage = multer.diskStorage({
    destination: 'studentUploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  let upload = multer({ storage }).single('file');

  upload(req, res, async function (err) {
    if (err) {
      return res.status(422).send('an Error occured')
    }
    let csv_path = req.file.path;

    try {
      const data = await studentController.saveAllStudents(csv_path);

      return res.send(data);
    } catch (error) {
      res.status(404).send({
        error: JSON.stringify(error)
      });
    }
  })
  try {

  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }

});

module.exports = router;