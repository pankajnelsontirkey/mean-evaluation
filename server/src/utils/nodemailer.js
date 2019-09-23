import * as nodemailer from 'nodemailer';
import {
  configDefault,
  optionsDefault,
  verificationLink
} from '../config/mailConfig';

class Mailer {
  constructor() {
    this.config = { ...configDefault };
    this.options = { ...optionsDefault };
    this.transporter = nodemailer.createTransport(this.config);
  }

  /* setReceiver(email) {
    this.options.to = email;
  } */

  setOptions(options) {
    const newText = this.options.text
      .replace('__email__', options.email)
      .replace('__link__', `${verificationLink}/${options.emailToken}`);
    const newHtml = this.options.html
      .replace('__email__', options.email)
      .replace('__link__', `${verificationLink}/${options.emailToken}`);

    this.options = {
      ...this.options,
      to: options.email,
      text: newText,
      html: newHtml
    };
  }

  async sendMail() {
    const mailerResponse = await this.transporter.sendMail(this.options);
    return { ...mailerResponse };
  }
}

export default Mailer;
