module.exports = {

  friendlyName: 'Get all users',

  description: 'Get data of all existing user.',

  inputs: {
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
    nonExistent: {
      description: 'No users found',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    sails.log.verbose('USER_GET::: Retrieving all users.');

    var selectAttributes = ['id', 'createdAt', 'lastSeen', 'userName', 'firstName', 'lastName', 'email'];

    if(!inputs.skipAvatar) {
      selectAttributes.push('avatar');
    }
    if(this.req.me['privReq']) {
      selectAttributes.push('role');
    }

    var usr = await Member.find({
      select: selectAttributes
    });
    if(!usr || usr.length === 0) {
      return exits.nonExistent();
    }

    return exits.success(usr);
  }
};


