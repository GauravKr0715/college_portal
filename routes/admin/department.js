const router = require('express').Router();
const auth = require('../../middlewares/auth');
const logger = require('../../helpers/logger');
const department_controller = require('../../controllers/department');
const uuidv4 = require('uuid').v4;

router.use('/', auth.tokenValidate);

router.post('/add', async (req, res) => {
  try {
    let details = Object.assign({}, req.body);
    details.uid = uuidv4();
    const data = await department_controller.addDetails(details);
    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

router.get('/all', async (req, res) => {
  try {
    const data = await department_controller.getAllForAdmin();

    return res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ error });
  }
});

// router.put('/updateHOD', async (req, res) => {
//   try {
//     const data = await department_controller.updateDetails({
//       head_id: '101'
//     }, {
//       code: '031'
//     });
//     return res.send(data);
//   } catch (error) {
//     logger.error(error);
//     res.status(400).send({ error });
//   }
// });

// router.put('/updatesubjects', async (req, res) => {
//   try {
//     let newSubject = ["IT1025", "IT1026", "IT1027"];
//     const data = await department_controller.addSubjects({
//       subjects: newSubject
//     }, {
//       code: '031'
//     });
//     return res.send(data);
//   } catch (error) {
//     logger.error(error);
//     res.status(400).send({ error });
//   }
// });

module.exports = router;