const jwt = require('jsonwebtoken');
module.exports = {

  friendlyName: 'Authenticate JWT Access Token',


  description: 'Returns JWT body data if the given req.headers contains a valid JWT Access Token',


  inputs: {
    headers: {
      type: 'json',
      description: 'Complete req.headers, including Authorization token',
      required: true
    }
  },


  fn: async function (inputs, exits) {

    var token = inputs.headers['authorization'] && inputs.headers['authorization'].split(' ')[1];
    jwt.verify(token, sails.config.jwts.ACCESS_TOKEN_SECRET, (err, usr) => {
      if(err){return exits.success(null);}
      else{
        Member.updateOne({id: usr.id})
          .set({ lastSeen: Date.now() })
          .exec((err)=>{
            if (err) {
              sails.log.error('Background task failed: Could not update user (`'+usr.id+'`) with a new `lastSeen` timestamp.  Error details: '+err.stack);
            }
          });
        return exits.success(usr);
      }
    });


  }

};
