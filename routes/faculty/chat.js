const router = require('express').Router();
const chat_controller = require('../../controllers/chat');
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');

router.use('/', auth.tokenValidate);

router.post('/newConversation', async (req, res) => {
  try {
    const details = Object.assign({}, req.body);

    const data = await chat_controller.addNewConversation(details);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/conversations', async (req, res) => {
  try {
    const uni_id = req.token_data.data.user_id;

    const data = await chat_controller.getConversationsForFaculty(uni_id);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/studentsList', async (req, res) => {
  try {
    const uni_id = req.token_data.data.user_id;

    const data = await chat_controller.getStudentsForFaculty(uni_id);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.post('/newMessage', async (req, res) => {
  try {
    const details = Object.assign({}, req.body);

    const data = await chat_controller.addNewMessage(details);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const conversation_id = req.query.conv_id;

    const data = await chat_controller.getMessagesForConversation(conversation_id);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

module.exports = router;