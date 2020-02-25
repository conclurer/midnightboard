const jwt = require('jsonwebtoken');
module.exports = {

  friendlyName: 'Authenticate JWT Refresh Token',


  description: 'Returns JWT body data if the given JWT token string is a valid and aktive JWT Refresh Token',


  inputs: {
    token: {
      type: 'string',
      description: 'JWT Refresh Token string',
      required: true
    }
  },


  fn: async function (inputs, exits) {
    var usr; 
    jwt.verify(inputs.token, sails.config.jwts.REFRESH_TOKEN_SECRET, (err, user) => {
      usr = user;
      if(err){return exits.success(null);}
    });
    var findTokenInDb = await RefreshToken.findOne( {refreshToken: inputs.token} );
    if( !findTokenInDb ){ return exits.success(null) }
    return exits.success(usr);
  }

};
