const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const auth = require(__base + 'modules/auth/protect.js');

//Fetch all applications
router.post('/apps', auth, require('../modules/employee/applications'))
router.post('/andro-apps', require('../modules/employee/andro'))

//Update Status
router.post('/updatestatus', auth, require('../modules/employee/updateStatus'))

router.post('/verified', auth, require('../modules/employee/verified'))

router.post('/notverified', auth, require('../modules/employee/notverified'))

module.exports = router;
