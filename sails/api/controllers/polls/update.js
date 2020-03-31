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
    missingParams: {
      description: 'Missing parameters',
      statusCode: 400
    },
    forbidden: {
      description: 'This user have already voted!',
      statusCode: 403
    },
    nonExistent: {
      description: 'Poll does not exist in database',
      statusCode: 404
    },
    serverError: {
      description: 'Unexpected server error',
      statusCode: 500
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.postId || !inputs.answerId && inputs.answerId !== 0) {
      return exits.missingParams();
    }
    const postId = inputs.postId;
    const answerId = inputs.answerId;
    sails.log.verbose('POLL_UPDATE::: Updating poll with postId ' + postId
      + ' and answerId ' + answerId);
    const poll = await Poll.findOne({
      postId: postId,
      answerId: answerId
    });
    if(poll) {
      // Check if participant has already voted
      const existingParticipant = await PollSurveyParticipant.findOne({
        postId: postId,
        memberId: this.req.me['id']
      });
      if(!existingParticipant) {
        const savedAsParticipant = await PollSurveyParticipant.create({
          postId: postId,
          memberId: this.req.me['id']
        }).fetch();
        const updatedPoll = await Poll.updateOne({
          postId: postId,
          answerId: answerId
        }).set({
          votes: poll.votes + 1
        });
        if(savedAsParticipant && updatedPoll) {
          return exits.success(updatedPoll);
        } else {
          return exits.serverError('POLL_UPDATE::: Failed to update poll with postId ' + postId
            + ' and answerId ' + answerId + '!');
        }
      } else {
        return exits.forbidden();
      }
    } else {
      return exits.nonExistent();
    }
  }
};
