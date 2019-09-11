/** This file sets default options and objects for nodemailer
 *  @config object sets sender options
 *  @message the body of the mail, passed to transporter.sendMail() method
 * TODO - set sender mail dynamically for dev mode or prod mode
 */

export const config = {
  host: 'mail.vinove.com',
  port: 587,
  secure: false, // true only for port 465
  auth: {
    /* senders email */
    user: 'pankaj.tirkey@mail.vinove.com',
    /* senders password */
    pass: 'pankaj@123'
  },
  tls: {
    rejectUnauthorized: false
  }
};

export const options = {
  from: '<pankaj.tirkey@mail.vinove.com>',
  /* 'to' field needs to be filled before sendMail is called */
  to: null,
  subject: 'Welcome to ShareApp, verify email to continue.',
  /* Add verification token & veriication endpoint as text */
  text: `
  Your registration with __email__ was successful. Please follow the link to verify your email and proceed to using the app.
  `,
  /* Add verification token & veriication endpoint to html */
  html: `
  <p>
  Your registration was successful. Please follow the link to verify your email and proceed to using the app.
  <a href=__link__>Verify</a>
  </p>
  `
};

export const verificationLink = 'http://localhost:3000/verify/';
