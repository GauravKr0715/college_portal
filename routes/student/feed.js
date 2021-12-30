const router = require('express').Router();
const feed_controller = require('../../controllers/feed');
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');

router.use('/', auth.tokenValidate);

router.get('/', async (req, res) => {
  try {
    const page_no = req.query.page_no;
    const roll_no = req.token_data.data.user_id;

    const data = await feed_controller.getFeedForStudent(roll_no, page_no);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

module.exports = router;