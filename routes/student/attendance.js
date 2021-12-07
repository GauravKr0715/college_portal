const router = require('express').Router();
const attendanceController = require('../../controllers/attendance');
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');

router.use('/', auth.tokenValidate);

router.get('/report', async (req, res) => {
  try {
    const roll_no = req.token_data.data.user_id;
    const data = await attendanceController.getReportForStudent(roll_no);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

module.exports = router;