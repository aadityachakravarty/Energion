const bcrypt = require('bcrypt');

const userModel = require(__base + 'models/user.js');
const sendEmail = require(__base + 'modules/comm/email.js');

const config = require(__base + 'system/config.json');

const rand = require(__base + 'modules/misc/rand.js')

exports.verifyEmail = (req, res) => {
  if (!req.body.id) {
    res.json({
      success: false,
      msg: 'Please check the details.'
    });
  }
  else {
    const resetOtp = rand({ limit: 12, special: false });
    let field = [
      { "email": req.body.id },
      { "phone": parseInt(req.body.id) || 0 }
    ];
    userModel.findOneAndUpdate({ $or: field }, { "code.reset": resetOtp }, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: err.message
        })
      }
      else {
        if (!user) {
          res.json({
            success: false,
            msg: 'Verification failed. User not found.'
          });
        }
        else {
          let subject = "Forgot Password Request for Energion."
          let link = `${config.setup.callback}/auth/reset-pass/${user._id}/${resetOtp}`;
          let message = `Please use the following link to change your password. \n ${link}`
          sendEmail(user.email, subject, message);
          res.json({
            success: true,
            msg: 'Please check your email for further procedure.'
          });
        }
      }
    });
  }
}

exports.changePass = (req, res) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, config.setup.salt, (err, hash) => {
      if (err) {
        res.json({
          success: false,
          msg: err.message
        });
      }
      else {
        userModel.findOneAndUpdate({ "_id": req.params.id, "code.reset": req.params.code },
          { $set: { password: hash}, $unset: { "code.reset": true} }, { new: true }, (err, user) => {
            if (err) {
              res.json({
                success: false,
                msg: err.message
              });
            }
            else {
              if (user) {
                res.json({
                  success: true,
                  msg: "Password reset success."
                });
              }
              else {
                res.json({
                  success: false,
                  msg: "Link expired."
                });
              }
            }
          });
      }
    });
  }
  else {
    res.json({
      success: false,
      msg: "Please check details."
    });
  }
}