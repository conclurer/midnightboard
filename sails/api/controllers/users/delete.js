module.exports = {

  friendlyName: 'Delete user',

  description: 'Delete existing user.',

  inputs: {
    userId: {
      description: 'User ID of user to delete',
      type: 'number'
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
    },
    nonExistent: {
      description: 'User does not exist in database',
      statusCode: 401
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.userId) {
      return exits.missingParams();
    }
    sails.log.verbose('USER_DELETE::: Trying to delete user ' + inputs.userId);
    var deletedUser = await Member.destroyOne({id: inputs.userId});
    if(!deletedUser) {
      return exits.nonExistent();
    }
    return exits.success();
  }
};

