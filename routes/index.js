const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/student', require('./student'));
router.use('/faculty', require('./faculty'));
router.use('/admin', require('./admin'));


module.exports = router;
