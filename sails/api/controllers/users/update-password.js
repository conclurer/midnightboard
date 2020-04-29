module.exports = {

  friendlyName: 'Update password',

  description: 'Update password of existing user',

  inputs: {
    userId: {
      description: 'ID of user to update',
      type: 'number'
    },
    oldPassword: {
      description: 'Old password',
      type: 'string'
    },
    newPassword: {
      description: 'New password',
      type: 'string'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    invalidPassword: {
      description: 'Invalid password',
      statusCode: 403
    },
    invalidParams: {
      description: 'One or more parameters do not match pre-defined regex',
      statusCode: 400
    },
    missingParams: {
      description: 'Missing parameters',
      statusCode: 400
    },
    similarPassword: {
      description: 'Old and new passwords too similar',
      statusCode: 409
    },
    serverError: {
      description: 'Unexpected server error',
      statusCode: 500
    },
    nonExistent: {
      description: 'User does not exist',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    const bcrypt = require('bcrypt');
    let passwordRegex = new RegExp(sails.config.custom.PASSWORD_REGEX);

    if(!inputs.userId || !inputs.oldPassword || !inputs.newPassword) {
      return exits.missingParams();
    }
    if(!passwordRegex.test(inputs.newPassword)) {
      return exits.invalidParams({
        error: {
          code: 103,
          message: 'Password must be at least 8 characters long,'
          + ' and must contain one uppercase letter, one lowercase letter, and 1 number or special character'
        }
      });
    }
    if(inputs.oldPassword.toUpperCase() === inputs.newPassword.toUpperCase()) {
      return exits.similarPassword({
        error: {
          code: 110,
          message: 'Old and new passwords too similar'
        }
      });
    }

    sails.log.verbose('USER::: Trying to update password for user #' + inputs.userId);
    var hashedPassword = '';
    try {
      var usr = await Member.findOne({id: inputs.userId});
      if(!usr) {
        return exits.nonExistent();
      }
      if(!await bcrypt.compare(inputs.oldPassword, usr.password)) {
        return exits.invalidPassword('Old passwort does not match');
      }
      hashedPassword = await bcrypt.hash(inputs.newPassword, 10);
    } catch(err) {
      sails.log.debug('AUTH_REGISTER_ERR::: ' + err);
      return exits.serverError();
    }
    await Member.updateOne({ id: inputs.userId })
      .set({password: hashedPassword});

    return exits.success();
  }

};


