/**
 * Local environment settings
 */

module.exports = {

  // Your mailbox data for Nodemailer
  // Check out https://nodemailer.com/about/
  mailbox: {
    smpt: 'smpt.provider.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-adress@provider.com',
      pass: 'your-secret-password'
    }
  }

};
