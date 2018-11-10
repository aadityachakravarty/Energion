const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const config = require(__base + 'system/config.json')

/* Page Routes */

router.post('/register', require(__base + 'modules/auth/register.js'));

router.post('/login', require(__base + 'modules/auth/login.js'));

// router.post('/forgotpassword', require(__base + 'modules/auth/forgotPassword.js'))

// router.post('/passchangeotp', require(__base + 'modules/auth/passChangeOtp.js'))

/* Verification Routes */

router.get('/verify/:id/:code', require(__base + 'modules/auth/verify.js'));

/* ----------------------- Restricted Routes ----------------------*/

const auth = require(__base + 'modules/auth/protect.js');

/*-- Protected Routes --*/

router.get('/status', auth, (req, res) => {
    res.json({ success: true, "msg": 'You are logged in.', "data": req.info });
});

// router.post('/change-password', auth, require(__base + 'modules/auth/passChange.js'))

router.get('/logout', auth, require(__base + 'modules/auth/logout.js'));

module.exports = router
