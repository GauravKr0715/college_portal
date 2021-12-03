const router = require('express').Router();
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');
const StudentController = require('../../controllers/student');
const Cookies = require('cookies');

//router.use('/attendance', require('./attendance'));

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

module.exports = router;
