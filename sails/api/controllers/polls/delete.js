module.exports = {

  friendlyName: 'Delete poll',

  description: 'Delete all answers to existing poll',

  inputs: {
    postId: {
      description: 'Post ID of poll',
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
      description: 'Poll does not exist in database',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.postId) {
      return exits.missingParams();
    }
    sails.log.debug('POLL_DELETE::: Trying to delete all answers for poll with postId ' + inputs.postId);
    var deletedPolls = await Poll.destroy({postId: inputs.postId}).fetch();
    if(!deletedPolls) {
      return exits.nonExistent();
    }
    return exits.success();
  }
};
