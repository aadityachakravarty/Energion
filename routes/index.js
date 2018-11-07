const express = require('express');
const router = express.Router();

/* Active Page Routes */
router.use('/', require('./basic.js'));
router.use('/auth', require('./auth.js'));
router.use('/matrix', require('./assessment.js'));
router.use('/connection', require('./consumer.js'));
router.use('/employee', require('./employee.js'));
router.use('/load', require('./loadBalancer.js'));

/* Data Entry */
router.use('/entry', require('./dummy.js'))

module.exports = router;