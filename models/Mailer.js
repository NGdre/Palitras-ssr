const nodemailer = require("nodemailer");
require("../config/base");

class Mailer {
  constructor(from) {
    this.transporter = this._setup();
    this.from = '"productivity" <info@productivity.com>';
  }

  sendConfirmation(user, token) {
    const email = {
      from: this.from,
      to: user.email,
      subject: "Welcome to Productivity",
      html: `<p>Welcome to Productivity, please confirm your email</p>
      <a href=${user.generateConfirmationUrl(token.token)}>Confirm</a>
      `
    };

    return this.transporter.sendMail(email);
  }

  sendResetPassword(user) {
    const email = {
      from: this.from,
      to: user.email,
      subject: "Reset password",
      text: `to reset password follow this link
        ${user.generateResetPasswordUrl()}  //TODO
      `
    };

    this.transporter.sendMail(email);
  }

  _setup() {
    return nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });
  }
}

module.exports = new Mailer();
