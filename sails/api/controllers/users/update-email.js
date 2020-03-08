module.exports = {

  friendlyName: 'Update Email Address',

  description: 'Update email address of existing user',

  inputs: {
    userId: {
      description: 'ID of user to update',
      type: 'number'
    },
    email: {
      description: 'New email address',
      type: 'string'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    mailTaken: {
      description: 'Email address already in use',
      statusCode: 400
    },
    invalidParams: {
      description: 'One or more parameters do not match pre-defined regex',
      statusCode: 400
    },
    missingParams: {
      description: 'Missing parameters',
      statusCode: 400
    }
  },

  fn: async function(inputs, exits) {
    let emailRegex = new RegExp(sails.config.custom.EMAIL_REGEX);

    if(!inputs.userId || !inputs.email) {
      return exits.missingParams();
    }
    if(!emailRegex.test(inputs.email)) {
      return exits.invalidParams('Invalid email address');
    }

    sails.log.verbose('USER::: Trying to update email for user #' + inputs.userId);
    try {
      var updatedUser = await Member.updateOne({ id: inputs.userId })
        .set({email: inputs.email.toLowerCase()});
      if(!updatedUser) {
        return exits.nonExistent();
      }
    } catch(err) {
      if(err.code === 'E_UNIQUE') {
        return exits.mailTaken('Email already taken');
      }
    }

    return exits.success();
  }

};


