const router = require('express').Router();
const faculty_controller = require('../../controllers/faculty');
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');

router.use('/', auth.tokenValidate);

router.get('/getSimplified', async (req, res) => {
  try {
    const id = req.query.id;

    const data = await faculty_controller.getSimplifiedUser(id);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

module.exports = router;