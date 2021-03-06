const router = require('express').Router();
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');
const StudentController = require('../../controllers/student');
const Cookies = require('cookies');

router.use('/faculty', require('./faculty'));
router.use('/attendance', require('./attendance'));
router.use('/assignment', require('./assignment'));
router.use('/test', require('./test'));
router.use('/notes', require('./notes'));
router.use('/chat', require('./chat'));
router.use('/feed', require('./feed'));

router.post('/login', async (req, res) => {
  const data = Object.assign({}, req.body);

  try {
    const response = await StudentController.validateUser(data);

    if (response && response.success) {
      new Cookies(req, res).set('token', response.token, {
        httpOnly: true
      });
    }

    return res.send(response);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.use('/', auth.tokenValidate);

router.get('/validateSession', (req, res) => {
  res.send({
    verified: true
  });
});

router.put('/logout', (req, res) => {
  res.clearCookie('token');
  res.send({ success: true });
});

router.get('/basicDetails', async (req, res) => {
  try {
    const roll_no = req.token_data.data.user_id;
    const data = await StudentController.getBasicDetails(roll_no);

    // console.log(data);
    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
  console.log(req.token_data);
})

router.get('/profileDetails', async (req, res) => {
  try {
    const roll_no = req.token_data.data.user_id;
    const data = await StudentController.getProfileDetails(roll_no);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/timetable', async (req, res) => {
  try {
    const roll_no = req.token_data.data.user_id;
    const data = await StudentController.getTimeTable(roll_no);

    // console.log(data);
    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
  console.log(req.token_data);
})

module.exports = router;
