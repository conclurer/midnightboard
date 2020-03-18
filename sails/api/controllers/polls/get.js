module.exports = {

  friendlyName: 'Get poll',

  description: 'Get data of single poll',

  inputs: {
    postId: {
      description: 'ID of matching post',
      type: 'number'
    },
    answerId: {
      description: 'ID of matching answer',
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
    if(!inputs.postId || !inputs.answerId) {
      return exits.missingParams();
    }
    sails.log.verbose('POLL_GET::: Searching poll with postId ' + inputs.postId
      + ' and answerId ' + inputs.answerId);
    var poll = await Poll.findOne({
      postId: inputs.postId,
      answerId: inputs.answerId
    });
    if(!poll) {
      return exits.nonExistent();
    } else {
      return exits.success(poll);
    }
  }
};
