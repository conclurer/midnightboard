module.exports = {

  friendlyName: 'Logout user',

  description: 'Invalidates all active JWT Refresh Tokens. '
    + 'Can be accessed either with an active Refresh Token, or an Access Token',

  inputs: {
    token: {
      description: 'Active JWT Refresh Token. An Access Token can be used instead inside the auth header',
      type: 'string'
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
    invalidToken: {
      description: 'Invalid refresh token',
      statusCode: 403
    }
  },

  fn: async function(inputs, exits) {
    var usr = null;
    // Logout user with existing refresh token
    if(inputs.token) {
      usr = await sails.helpers.authenticateRefreshToken(inputs.token);
      if(!usr) {
        return exits.invalidToken();
      }
      await RefreshToken.destroy({uid: usr.id});
      return exits.success();
    }

    // Logout user with valid access token
    if(this.req.headers['authorization'] && this.req.headers['authorization'].split(' ')[1]) {
      usr = await sails.helpers.authenticateJwt(this.req.headers);
      if(!usr) {
        return exits.invalidToken();
      }
      await RefreshToken.destroy({uid: usr.id});
      return exits.success();
    }

    return exits.missingParams();
  }
};
