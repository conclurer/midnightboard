module.exports = {

  friendlyName: 'Get post',

  description: 'Get data of single post',

  inputs: {
    postId: {
      description: 'ID of post to retrieve',
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
      description: 'Post does not exist',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.postId) {
      return exits.missingParams();
    }
    sails.log.verbose('POST_GET::: Searching post ' + inputs.postId);
    var pst = await Post.findOne({id: inputs.postId});
    if(!pst) {
      return exits.nonExistent();
    }
    delete pst['updatedAt'];
    return exits.success(pst);
  }
};


