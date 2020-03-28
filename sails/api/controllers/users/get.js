module.exports = {

  friendlyName: 'Get user',

  description: 'Get data of existing user. Depending on user settings, lastName may not be sent',

  inputs: {
    userId: {
      description: 'User ID of user to retrieve',
      type: 'number'
    },
    skipAvatar: {
      description: 'Optional: If set to true, no user avatar is sent.',
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
      statusCode: 400
    },
    nonExistent: {
      description: 'User does not exist',
      statusCode: 404
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
    if(!this.req.me['privReq']) {
      if(sails.config.custom.ALLOW_HIDE_LAST_NAME && usr['hideLastName'] === true) {
        delete usr['lastName'];
      }
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

