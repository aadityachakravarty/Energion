const bcrypt = require('bcrypt');

const userModel = require(__base + 'models/user.js');
const config = require(__base + 'system/config.json')

const sendEmail = require(__base + 'modules/comm/email.js');
// const sendSMS = require(__base + 'modules/comm/twilio.js');

const rand = require(__base + 'modules/misc/rand.js');

const otp = {
  phone: rand({ type: 'numeric', limit: 7 }),
  email: rand({ limit: 11, special: false })
}

const cblink = config.setup.callback;

const register = (req, res) => {
  /* Check if passwords match */
  if (req.body.password == req.body.passwordConfirm) {
    userModel.findOne({ $or: [{ "email": req.body.email }, { "phone": parseInt(req.body.phone) }] }, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: err.message
        });
      }
      else {
        if (!user) {
          bcrypt.hash(req.body.password, config.setup.salt, (err, pass) => {
            if (err) {
              res.json({
                success: false,
                msg: err.message
              });
            }
            else {
              /* Store user in database */
              let newUser = new userModel({
                fullname: req.body.fullname,
                email: req.body.email,
                phone: req.body.phone,
                level: req.body.level || 1,
                password: pass,
                code: {
                  email: otp.email,
                  phone: otp.phone
                }
              });
              newUser.save((err, user) => {
                if (err) {
                  res.json({
                    success: false,
                    msg: err.message
                  });
                }
                else {
                  if (config.settings.verification.email) {
                    // If emails are enabled in the configuration then send confirmation email.
                    let subject = "Account activation for Energion";
                    let link = `${cblink}/auth/verify/${user._id}/${otp.email}`;
                    let message = "Thank you for registering on energion. \n Please click on the following link or copy it to the address bar to activate your account. \n " + link;
                    sendEmail(req.body.email, subject, message);
                  }
                  res.json({
                    success: true,
                    msg: 'Registration Successful.'
                  });
                }
              });
            }
          });
        }
        else {
          res.json({
            success: false,
            msg: 'Account already exists.'
          })
        }
      }
    })
  }
  else {
    /* Passwords do not match */
    res.json({
      success: false,
      msg: 'Passwords do not match.'
    });
  }
}

module.exports = register
