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
      statusCode: 400
    },
    nonExistent: {
      description: 'User does not exist in database',
      statusCode: 404
    },
    noAuth: {
      description: 'Missing authorization token',
      statusCode: 401
    },
    noSelfDelete: {
      description: 'Admin Users are not allowed to delete themselves',
      statusCode: 403
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.userId) {
      return exits.missingParams();
    }
    if(this.req.me['role'] === 0 && this.req.me['id'] == inputs.userId) {
      return exits.noSelfDelete();
    }
    sails.log.verbose('USER_DELETE::: Trying to delete user ' + inputs.userId);
    var deletedUser = await Member.destroyOne({id: inputs.userId});
    if(!deletedUser) {
      return exits.nonExistent();
    }
    await RefreshToken.destroy({uid: inputs.userId});
    return exits.success();
  }
};

