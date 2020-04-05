module.exports = {

  friendlyName: 'Get poll votes',

  description: 'Get all votes for single poll',

  inputs: {
    postId: {
      description: 'ID of matching post',
      type: 'number'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    missingParams: {
      description: 'Missing parameter postId',
      statusCode: 400
    },
    nonExistent: {
      description: 'Poll does not exist',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.postId) {
      return exits.missingParams();
    }
    sails.log.verbose('POLL_GET::: Searching poll with postId ' + inputs.postId);
    var polls = await Poll.find({
      postId: inputs.postId
    }).sort('answerId ASC');
    if(!polls) {
      return exits.nonExistent();
    } else {
      const votes = [];
      const answers = [];
      polls.forEach(poll => {
        votes.push(poll.votes);
        answers.push(poll.answers);
      });
      return exits.success({
        votes: votes,
        answers: answers
      });
    }
  }
};
