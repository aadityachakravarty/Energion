const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const app = require(__base + 'app.js');

const mailAccountUser = cfg.email.user
const mailAccountPassword = cfg.email.pass

// main work is done by this smtpTransport so at new signup the value of to toEmailAddress should be
// equal to the Users[0].email  you the know the best.

const transport = nodemailer.createTransport(smtpTransport({
    service: cfg.email.host,
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    }
}))

const sendEMail = (address, subject, message) => {
  let mail = {
    from: mailAccountUser,
    to: address,
    subject: subject,
    text: message
  }
  transport.sendMail(mail, (error, response) => {
    if(error){
        console.log(error);
    }
    else{
        console.log(`Email sent to ${address}.`);
    }
    transport.close();
  });
}

module.exports = sendEMail
