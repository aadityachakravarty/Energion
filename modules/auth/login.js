const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userModel = require(__base + 'models/user.js');
const config = require(__base + 'system/config.json');

const checkUser = (req, res) => {
  if ((!req.body.id) || (!req.body.password)) {
    res.json({
      success: false,
      msg: 'Please check the details.'
    });
  }
  else {
    // Check if the user exists.
    let field = [
      { "email": req.body.id },
      { "phone": parseInt(req.body.id) || 0 }
    ];
    userModel.findOne({ $or: field }, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: err.message
        });
      }
      else {
        if (!user) {
          res.json({
            success: false,
            msg: 'Authentication failed. User not found.'
          })
        }
        else {
          // Check if the user is banned
          if (user.status !== -1) {
            // Check if the password is correct
            bcrypt.compare(req.body.password, user.password, (err, result) => {
              if (err) {
                res.json({
                  success: false,
                  msg: err.message
                });
              }
              else {
                if (result) {
                  // Check if the user is verified
                  if (user.verified.phone || user.verified.email) {
                    let data = {
                      "id": user._id,
                      "name": user.fullname,
                      "email": user.email,
                      "level": user.level,
                      "phone": user.phone
                    }
                    let token = jwt.sign(data, cfg.sign, {
                      expiresIn: 60 * 60 * 24 * 7 // expires in 1 week
                    });

                    // Modify Login timestamp.
                    userModel.findOneAndUpdate({ "_id": user._id },
                      { $push: { "logs.login": moment() } }, (err, doc) => {
                        if (err) {
                          res.json({
                            success: false,
                            msg: err.message
                          });
                        }
                        else {
                          res.json({
                            success: true,
                            msg: 'Authenticated',
                            token: token
                          });
                        }
                      });
                  }
                  else {
                    res.json({
                      success: false,
                      msg: 'Account not verified.'
                    });
                  }
                }
                else {
                  res.json({
                    success: false,
                    msg: 'Authentication failed. Wrong Password.'
                  });
                }
              }
            });
          }
          else {
            res.json({
              success: false,
              msg: 'Authentication failed. Account has been banned.'
            });
          }
        }
      }
    });
  }
}

module.exports = checkUser;