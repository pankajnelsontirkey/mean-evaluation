import * as nodemailer from 'nodemailer';

class Mailer {
  constructor(config, message) {
    this.mailConfig = config;
    this.mailOptions = message;
    this.transporter = nodemailer.createTransport(this.mailConfig);
  }

  setReceiver(email) {
    this.mailOptions.to = email;
  }

  setMessage(messageObject) {
    this.mailOptions.to = messageObject.email;
    this.mailOptions.text.replace('__email__', messageObject.email);
    this.mailOptions.html.replace('__link__', messageObject.link);

    console.log(this.mailOptions);
  }

  async sendMail() {
    this.transporter.sendMail(this.message, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log(`Message sent: ${info}`);
    });

    /*   (error, info) => {
     */
  }
}

export default Mailer;
