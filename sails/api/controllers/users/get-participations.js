module.exports = {

  friendlyName: 'Get postIds of content from a participant',

  description: 'Get postIds of content a user has participated',

  inputs: { },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    missingParams: {
      description: 'Missing the ID of the user',
      statusCode: 400
    }
  },

  fn: async function(inputs, exits) {
    if(!this.req.me['id']) {
      return exits.missingParams();
    }
    const userId = this.req.me['id'];
    sails.log.verbose('User id: ' + userId);
    sails.log.verbose('USER_GET::: Searching participated posts for ID ' + userId + '...');
    var participants = await PollSurveyParticipant.find({
      memberId: userId
    });
    if(!participants) {
      return exits.success({
        postIds: []
      });
    } else {
      var postIds = [];
      participants.forEach(participant => {
        postIds.push(participant.postId);
      });
      return exits.success({
        postIds: postIds
      });
    }
  }
};
