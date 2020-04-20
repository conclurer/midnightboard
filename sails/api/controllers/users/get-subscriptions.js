module.exports = {

  friendlyName: 'Get IDs of boards user have subscribed',

  description: 'Get IDs of boards user have currently subscribed',

  inputs: { },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    unauthorized: {
      description: 'Unauthorized request',
      statusCode: 401
    }
  },

  fn: async function(inputs, exits) {
    if(!this.req.me['id']) {
      return exits.unauthorized();
    }
    const userId = this.req.me['id'];
    var boardIds = [];
    sails.log.verbose('USER_GET::: Searching subscribed boards for ID ' + userId + '...');
    var subscribedBoards = await BoardSubscription.find({
      where: { memberId: userId },
      select: ['boardId']
    });
    if(subscribedBoards) {
      for(const subscribedBoard of subscribedBoards) {
        boardIds.push(subscribedBoard.boardId);
      }
    }
    return exits.success(boardIds);
  }
};
