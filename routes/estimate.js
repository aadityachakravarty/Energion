const express = require('express');
const router = express.Router();

router.post('/getAddressInfo', require(__base + 'modules/estimate/getAddress.js'));

router.post('/evaluate', require(__base + 'modules/estimate/evaluation.js'));

module.exports = router;