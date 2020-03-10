module.exports = {

  friendlyName: 'Update user',

  description: 'Update data of existing user.',

  inputs: {
    userId: {
      description: 'ID of user to update',
      type: 'number'
    },
    firstName: {
      description: 'New first name',
      type: 'string'
    },
    lastName: {
      description: 'New last name',
      type: 'string'
    },
    userName: {
      description: 'New username',
      type: 'string'
    },
    languagePreference: {
      description: 'Preferred language. Available languages: `en`, `de`',
      type: 'string'
    },
    hideLastName: {
      description: 'Select weather the last name is visible to other users',
      type: 'boolean'
    },
    avatar: {
      description: 'New Avatar. Must be base64 encoded',
      type: 'ref'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    missingParams: {
      description: 'Missing parameters',
      statusCode: 400
    },
    invalidParams: {
      description: 'Invalid parameters',
      statusCode: 400
    },
    nameTaken: {
      description: 'Username already in use',
      statusCode: 400
    },
    nonExistent: {
      description: 'User does not exist',
      statusCode: 400
    }
  },

  fn: async function(inputs, exits) {
    let realnameRegex = new RegExp(sails.config.custom.REALNAME_REGEX);
    let usernameRegex = new RegExp(sails.config.custom.USERNAME_REGEX);

    var valuesToChange = {};
    if(inputs.hideLastName !== null && inputs.hideLastName !==  undefined) {
      valuesToChange.hideLastName == inputs.hideLastName;
    }
    if(inputs.languagePreference) {
      if(['en', 'de'].includes(inputs.languagePreference)) {
        valuesToChange.languagePreference = inputs.languagePreference;
      } else {
        return exits.invalidParams('Invalid langaugePreference');
      }
    }
    if(inputs.firstName) {
      if(realnameRegex.test(inputs.firstName)) {
        valuesToChange.firstName = inputs.firstName;
      } else {
        return exits.invalidParams('Invalid first name');
      }
    }
    if(inputs.lastName) {
      if(realnameRegex.test(inputs.lastName)) {
        valuesToChange.lastName = inputs.lastName;
      } else {
        return exits.invalidParams('Invalid last name');
      }
    }
    if(inputs.userName) {
      if(usernameRegex.test(inputs.userName)) {
        valuesToChange.userName = inputs.userName;
      } else {
        return exits.invalidParams('Invalid username');
      }
    }
    if(inputs.avatar) {
      // TODO Validate avatar
      valuesToChange.avatar = inputs.avatar;
    }

    try {
      var updatedUser = await Member.updateOne({ id: inputs.userId })
        .set(valuesToChange);
      if(!updatedUser) {
        return exits.nonExistent();
      }
    } catch(err) {
      if(err.code === 'E_UNIQUE') {
        return exits.nameTaken('Username already taken');
      }
    }
    return exits.success();
  }
};

