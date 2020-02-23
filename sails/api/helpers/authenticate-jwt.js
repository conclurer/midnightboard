const jwt = require('jsonwebtoken');
module.exports = {

    friendlyName: 'Authenticate JsonWebToken',
  
  
    description: 'Returns true if the given JWT is valid and has not been tampered with',
  
  
    inputs: {
  
      token: {
        type: 'string',
        description: 'JWT to validate',
        required: true
      }
  
    },
  
  
    fn: async function (inputs, exits) {
      jwt.verify(inputs.token, sails.config.jwts.ACCESS_TOKEN_SECRET, (err) => {
          if(err){return exits.success(false);}
      });
      return exits.success(true);
    }
  
  };