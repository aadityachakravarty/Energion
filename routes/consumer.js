const express = require('express');
const router = express.Router();
const auth = require(__base + 'modules/auth/protect.js');

//Saving New Application Data In mongoosegoDb
router.post('/new', auth, require(__base + 'modules/forms/newCon.js'));

//My connections
router.get('/my', auth, require(__base + 'modules/forms/myCon'));

//Update Connection
router.post('/update', auth, require('../modules/forms/updateCon'));

//Track Connection
router.post('/track', auth, require('../modules/forms/track'));

//testing part
router.put('/transfer', auth, require(__base + 'modules/forms/transferCon.js'));

//for closure of connection
router.post('/closure', auth, require(__base + 'modules/forms/closeCon.js'));

//for deleting connection
router.post('/delete', auth, require(__base + 'modules/forms/deleteCon.js'));

module.exports = router;
