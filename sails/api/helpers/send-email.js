const nodemailer = require('nodemailer');
module.exports = {

  friendlyName: 'Send an email to someone',

  description: 'Tries to send an email to specified recipient',

  inputs: {
    recipient: {
      type: 'string',
      description: 'Email of the recipient',
      required: true
    },
    subject: {
      type: 'string',
      description: 'Email subject',
      required: true
    },
    plainText: {
      type: 'string',
      description: 'Email text as plain text version',
      required: true
    },
    htmlText: {
      type: 'string',
      description: 'Email text as HTML version',
      required: false
    }
  },

  exits: {
    success: {
      description: 'Email was send',
      statusCode: 200
    },
    serverError: {
      description: 'Mailbox server error',
      statusCode: 500
    }
  },

  fn: async function(inputs, exits) {
    const senderMail = sails.config.mailbox.auth.user;
    // 1. Setup transportation
    const transporter = nodemailer.createTransport({
      host: sails.config.mailbox.smpt,
      port: sails.config.mailbox.port,
      secure: sails.config.mailbox.secure,
      auth: sails.config.mailbox.auth,
      logger: true, // Enable logging
      debug: false // Include SMTP traffic in the logs
    },
    {
      // Default message fields
      from: senderMail + ' <' + senderMail + '>'
    }
    );

    // Check for optional HTML version
    const htmlText = inputs.htmlText ? inputs.htmlText : inputs.plainText;
    // 2. Create message object
    const message = {
      to: inputs.recipient,
      subject: inputs.subject,
      text: inputs.plainText,
      html: htmlText
    };

    // 3. Send mail to user
    transporter.sendMail(message, (error) => {
      if(error) {
        sails.log.verbose(error.message);
        return exits.serverError();
      } else {
        return exits.success();
      }
    });
  }
};
