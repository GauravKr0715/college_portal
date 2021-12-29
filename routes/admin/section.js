const router = require('express').Router();
const logger = require('../../helpers/logger');
const auth = require('../../middlewares/auth');
const sectionController = require('../../controllers/section');
const uuidv4 = require('uuid').v4;

router.use('/', auth.tokenValidate);

router.get('/details', async (req, res) => {
  try {
    const uid = req.query.id;
    const data = await sectionController.getSectionDetails(uid);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/facandsubslist', async (req, res) => {
  try {
    const uid = req.query.id;
    const data = await sectionController.getFacultiesAndSubjectsList(uid);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/all', async (req, res) => {
  try {
    const dept_id = req.query.id;
    const data = await sectionController.getAllForAdmin(dept_id);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/getStudentsList', async (req, res) => {
  try {
    const batch = req.query.batch;
    const data = await sectionController.getEligibleStudentsForSection(batch);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.post('/addBasicDetails', async (req, res) => {
  try {
    let body = Object.assign({}, req.body);
    body.uid = uuidv4();
    const data = await sectionController.addDetails(body);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.post('/addClasses', async (req, res) => {
  try {
    let classes = Object.assign([], req.body);
    const uid = req.query.id;
    classes = classes.map(c => {
      return {
        class_id: uuidv4(),
        ...c
      };
    })
    const data = await sectionController.addClasses(classes, uid);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.put('/saveTimeTable', async (req, res) => {
  const time_table = Object.assign([], req.body.time_table);
  const section = req.query.id || null;
  if (section) {
    const data = await sectionController.updateTimeTable(time_table, section);

    return res.send(data);
  } else {
    return res.status(400).send({
      success: false,
      message: 'Some error occured.'
    });
  }
});

router.put('/saveStudents', async (req, res) => {
  const details = Object.assign({}, req.body);
  const section = req.query.id || null;
  if (section) {
    const data = await sectionController.saveStudentsForSection(details, section);

    return res.send(data);
  } else {
    return res.status(400).send({
      success: false,
      message: 'Some error occured.'
    });
  }
});

module.exports = router;