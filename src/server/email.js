var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var EmailTemplate = require('email-templates').EmailTemplate;
var fs = require('fs');

var config = require('./config');

var transporter = nodemailer.createTransport(smtpTransport(config.email));

module.exports = (function(){
  function sendMail(receiver, subject, content) {
    var templateDir = path.join(__dirname, './templates/mail', 'confirm');
    var template = new EmailTemplate(templateDir);
    subject = "Gefeliciteerd met jouw idee!";
    var templateVars = {
      title: "Ideëenvijver",
      site: "https://www.ideeenvijver.nl",
      mail: "info@ideeenvijver.nl",
      code: content
    };
    template.render(templateVars, function (err, results) {
      if (err) {
        console.log('Error rendering message template');
        return console.error(err);
      }
      console.log('Sending messages');
      transporter.sendMail({
        from: config.email.auth.user,
        to: receiver,
        subject: subject,
        html: results.html,
        text: results.text
      }, function (err, responseStatus) {
        if (err) {
          console.log("Error occured during send");
          console.log(err);
          return err;
        } else {
          console.log("mail sent");
          return "mail sent";
        }
      });
    });
  }
  return {
    sendMail: sendMail
  };
})();
