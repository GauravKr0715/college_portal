const router = require('express').Router();
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');
const subject_controller = require('../../controllers/subject');
const uuidv4 = require('uuid').v4;

router.use('/', auth.tokenValidate);

router.post('/add', async (req, res) => {
  try {
    let details = Object.assign({}, req.body);
    details.uid = uuidv4();
    const data = await subject_controller.addDetails(details);
    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/all', async (req, res) => {
  try {
    const dept_id = req.query.id;
    const data = await subject_controller.getAllForAdmin(dept_id);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

module.exports = router;