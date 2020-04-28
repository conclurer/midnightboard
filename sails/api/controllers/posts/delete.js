module.exports = {

  friendlyName: 'Delete post',

  description: 'Delete existing post',

  inputs: {
    postId: {
      description: 'Post ID of post to delete',
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
      description: 'Post does not exist in database',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.postId) {
      return exits.missingParams();
    }
    sails.log.verbose('POST_DELETE::: Trying to delete post ' + inputs.postId);
    var deletedPost = await Post.destroyOne({id: inputs.postId});
    if(!deletedPost) {
      return exits.nonExistent();
    }
    return exits.success();
  }
};


