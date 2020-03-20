module.exports = {

  friendlyName: 'Update poll',

  description: 'Update data of existing poll.',

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
    invalidParams: {
      description: 'One or more parameters do not match',
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
    sails.log.debug('POLL_GET::: Updating poll with postId ' + inputs.postId
      + ' and answerId ' + inputs.answerId);
    const poll = await Poll.findOne({
      postId: inputs.postId,
      answerId: inputs.answerId
    });
    if(poll) {
      const updatedPoll = await Poll.updateOne({
        postId: inputs.postId,
        answerId: inputs.answerId
      }).set({
        votes: poll.votes + 1
      });
      return exits.success(updatedPoll);
    } else {
      return exits.nonExistent();
    }
  }
};
