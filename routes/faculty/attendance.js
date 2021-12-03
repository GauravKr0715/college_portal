const router = require('express').Router();
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');
const facultyController = require('../../controllers/faculty');
const attendanceController = require('../../controllers/attendance');

router.use('/', auth.tokenValidate);

router.get('/classes', async (req, res) => {
  try {
    const uni_id = req.token_data.data.user_id;
    const data = await facultyController.getClassesForAttendance(uni_id);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.post('/add', async (req, res) => {
  try {
    const body = Object.assign({}, req.body);
    const data = await attendanceController.addAttendance(body);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

module.exports = router;