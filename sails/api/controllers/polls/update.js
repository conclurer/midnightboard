module.exports = {

  friendlyName: 'Update poll',

  description: 'Update data of existing poll.',

  inputs: {
    postId: {
      description: 'ID of matching post',
      type: 'number'
    },
    answerIds: {
      description: 'IDs of matching answers',
      type: 'json',
      columnType: 'array'
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
    if(!inputs.postId || !inputs.answerIds || inputs.answerIds.length <= 0) {
      return exits.missingParams();
    }
    const postId = inputs.postId;
    const answerIds = inputs.answerIds;
    sails.log.verbose('POLL_UPDATE::: Updating poll with postId ' + postId
      + ' and answerIds ' + answerIds);
    const poll = await Poll.findOne({
      postId: postId,
      answerId: answerIds[0]
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
        var updatedPolls = [];
        for(const answerId of answerIds) {
          updatedPolls.push(await Poll.updateOne({
            postId: postId,
            answerId: answerId
          }).set({
            votes: poll.votes + 1
          }));
        }
        if(savedAsParticipant && updatedPolls && updatedPolls.length === answerIds.length) {
          return exits.success(updatedPolls);
        } else {
          return exits.serverError('POLL_UPDATE::: Failed to update poll with postId ' + postId
            + ' and answerIds ' + answerIds + '!');
        }
      } else {
        return exits.forbidden();
      }
    } else {
      return exits.nonExistent();
    }
  }
};
