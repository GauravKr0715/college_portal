const router = require('express').Router();
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');
const notesController = require('../../controllers/notes');

router.use('/', auth.tokenValidate);

router.get('/all', async (req, res) => {
  try {
    const roll_no = req.token_data.data.user_id;
    const data = await notesController.getAllForStudent(roll_no);

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
    const data = await notesController.getNotesDetailsForStudent(roll_no, uid);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

module.exports = router;