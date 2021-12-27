const router = require('express').Router();
const logger = require('../../helpers/logger');
const multer = require('multer');
const facultyController = require('../../controllers/faculty');
const { facultyRegisterValidation, facultyLoginValidation } = require("../../validators/facultyValidator");

router.get('/search', async (req, res) => {
  try {
    const query = req.query.id;
    const data = await facultyController.getFacultyByID(query);

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.post('/register', async (req, res) => {
  const body = Object.assign({}, req.body);
  try {
    const { error } = facultyRegisterValidation(body);
    if (error) return res.status(406).json({ Valmessage: error.details[0].message });

    const data = await facultyController.addDetails(body);

    return res.send(data);

  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }

});

module.exports = router;