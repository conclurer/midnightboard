module.exports = {

  friendlyName: 'Get user',

  description: 'Get data of existing user. Depending on user settings, lastName may not be sent',

  inputs: {
    userId: {
      description: 'User ID of user to retrieve',
      type: 'number'
    },
    skipAvatar: {
      description: 'If set to true, no user avatar is sent. Has to be sent within the url via `?skipAvatar=true`',
      type: 'boolean'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    missingParams: {
      description: 'Missing parameters',
      statusCode: 401
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.userId) {
      return exits.missingParams();
    }
    sails.log.verbose('USER_GET::: Searching user #' + inputs.userId);
    var usr = await Member.findOne({id: inputs.userId});
    if(!usr) {
      return exits.missingParams();
    }
    if(sails.config.custom.ALLOW_HIDE_LAST_NAME && usr['hideLastName'] === true) {
      delete usr['lastName'];
    }
    if(inputs.skipAvatar === true) {
      delete usr['avatar'];
    }
    ['updatedAt',
      'password',
      'languagePreference',
      'hideLastName'
    ].forEach(attribute => delete usr[attribute]);

    return exits.success(usr);
  }
};

