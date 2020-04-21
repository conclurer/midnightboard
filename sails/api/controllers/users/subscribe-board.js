module.exports = {

  friendlyName: 'Subscribe to a board',

  description: 'Subscribe the user to a notice board',

  inputs: {
    userId: {
      description: 'User ID of user to retrieve',
      type: 'number'
    },
    boardId: {
      description: 'User ID of user to retrieve',
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
      description: 'User or board does not exist',
      statusCode: 404
    },
    serverError: {
      description: 'Unexpected server error',
      statusCode: 500
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.userId || !inputs.boardId) {
      return exits.missingParams();
    }
    const userId = inputs.userId;
    const boardId = inputs.boardId;
    sails.log.verbose('USER_PUT::: Subscribing user #' + userId + ' to board #' + boardId);
    var usr = await Member.findOne({id: userId});
    var brd = await Board.findOne({id: boardId});
    if(!usr || !brd) {
      return exits.nonExistent();
    } else {
      const subject = sails.__('email.subscribe.subject') + brd.boardName;
      const plainText = sails.__('email.subscribe.plainText');
      const htmlText = sails.__('email.subscribe.htmlText');
      await BoardSubscription.create({
        boardId: boardId,
        memberId: userId
      }).fetch()
        .then(async() => {
          // It will also send a confirmation email
          await sails.helpers.sendEmail(usr.email, subject, plainText, htmlText)
            .then(() => {
              sails.log.verbose('USER_PUT::: Subscribed user #' + userId + ' to board #' + boardId + ' successfully');
              return exits.success();
            })
            .catch(() => {
              sails.log.verbose('USER_PUT::: Could not subscribe user #' + userId + ' to board #' + boardId);
              return exits.serverError();
            });
        })
        .catch(() => {
          sails.log.verbose('USER_PUT::: Could not subscribe user #' + userId + ' to board #' + boardId);
          return exits.serverError('USER_PUT::: Failed to create subscription entry for user #' + userId);
        });
    }
  }
};
