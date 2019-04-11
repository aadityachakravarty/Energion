const bcrypt = require('bcrypt')

const users = require(__base + 'models/user.js')
const config = require(__base + 'system/config.json')

const change = (req, res) => {
  users.findOne({ "_id": req.info.id }, (err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        msg: err.message
      });
    }
    else {
      bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            msg: err.message
          })
        }
        else {
          if (result) {
            bcrypt.hash(req.body.newPassword, config.setup.salt, (err, hash) => {
              if (err) {
                res.status(500).json({
                  success: false,
                  msg: err.message
                })
              }
              else {
                users.findOneAndUpdate({ "_id": req.info.id }, { $set: { password: hash } }, { new: true }, (err, doc) => {
                  if (err) {
                    res.status(500).json({
                      success: false,
                      msg: err.message
                    })
                  }
                  else {
                    res.json({
                      success: true,
                      msg: "Password changed successfully."
                    })
                  }
                })
              }
            });
          }
          else {
            res.json({
              success: false,
              msg: 'Current password is incorrect.'
            });
          }
        }
      });
    }
  });
}

module.exports = change
