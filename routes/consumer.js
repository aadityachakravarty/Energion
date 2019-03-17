const express = require('express');
const router = express.Router();
const auth = require(__base + 'modules/auth/protect.js');

//Saving New Application Data
router.post('/new', auth, require(__base + 'modules/consumer/newCon.js'));

//My connections
router.get('/my', auth, require(__base + 'modules/consumer/myCon'));

//Update Connection
router.post('/update', auth, require('../modules/consumer/updateCon'));

//testing part
router.put('/transfer', auth, require(__base + 'modules/consumer/transferCon.js'));

//for closure of connection
router.post('/closure', auth, require(__base + 'modules/consumer/closeCon.js'));

//for deleting connection
router.post('/delete', auth, require(__base + 'modules/consumer/deleteCon.js'));

module.exports = router;
