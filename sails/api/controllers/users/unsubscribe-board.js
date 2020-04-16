module.exports = {

  friendlyName: 'Unsubscribe a board',

  description: 'Unsubscribe the user to a notice board',

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
    const recipent = 'brad.leffler58@ethereal.email'; // Delete it if recipent -> member.email
    const subject = 'Successfully unsubscribed to board #' + boardId;
    const plainText = 'You will get no longer notifications for this board.';
    const htmlText = '<p>You will get no longer notifications for this board.</p>';
    sails.log.verbose('USER_PUT::: Unsubscribing user #' + userId + ' to board #' + boardId);
    var usr = await Member.findOne({id: userId});
    var brd = await Board.findOne({id: boardId});
    if(!usr || !brd) {
      return exits.nonExistent();
    } else {
      await BoardSubscription.destroy({
        boardId: boardId,
        memberId: userId
      }).fetch()
        .then(async () => {
          // Currently it will just send a confirmation email to this user
          await sails.helpers.sendEmail(recipent, subject, plainText, htmlText) // Later, recipent -> usr.email!
            .then(() => {
              sails.log.verbose('USER_PUT::: Unsubscribed user #' + userId + ' to board #' + boardId + ' successfully');
              return exits.success();
            })
            .catch(() => {
              sails.log.verbose('USER_PUT::: Could not unsubscribe user #' + userId + ' to board #' + boardId);
              return exits.serverError();
            });
        })
        .catch(() => {
          sails.log.verbose('USER_PUT::: Could not unsubscribe user #' + userId + ' to board #' + boardId);
          return exits.serverError('USER_PUT::: Failed to delete subscription entry for user #' + userId);
        });
    }
  }
};
