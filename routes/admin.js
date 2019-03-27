const express = require('express');
const router = express.Router();

const auth = require(__base + 'modules/auth/protect.js');

// Admin check for the following URLS.
const admin = (req, res, next) => {
    if (req.info.admin) {
        next();
    }
    else {
        res.status(401).json({
            success: false,
            msg: 'Unauthorized Request.'
        });
    }
}

router.get('/getApplications', auth, admin, require(__base + 'modules/admin/applications.js'));

router.post('/approveApplication', auth, admin, require(__base + 'modules/admin/approve.js'));

router.post('/rejectApplication', auth, admin, require(__base + 'modules/admin/reject.js'));

router.get('/getLineman', auth, admin, require(__base + 'modules/admin/lineman.js'));

router.get('/getUsers', auth, admin, require(__base + 'modules/admin/userlist.js'));

router.post('/modifyAccess', auth, admin, require(__base + 'modules/admin/accesslevel.js'));

module.exports = router;
