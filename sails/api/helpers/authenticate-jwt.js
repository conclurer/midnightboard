const jwt = require('jsonwebtoken');
module.exports = {

  friendlyName: 'Authenticate JsonWebToken',


  description: 'Returns true if the given req.headers contains a valid JWT',


  inputs: {
    headers: {
      type: 'json',
      description: 'Complete req.headers, including Authorization token',
      required: true
    }
  },


  fn: async function (inputs, exits) {
    var token = inputs.headers['authorization'] && inputs.headers['authorization'].split(' ')[1];
    jwt.verify(token, sails.config.jwts.ACCESS_TOKEN_SECRET, (err) => {
      if(err){return exits.success(false);}
      else{return exits.success(true);}
    });
  }
};
