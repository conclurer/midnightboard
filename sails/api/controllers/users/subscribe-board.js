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
    const recipent = 'brad.leffler58@ethereal.email';
    const subject = 'Successfully subscribed to board #' + boardId;
    const plainText = 'You will get now notifications if new posts get created on this board.';
    const htmlText = 'You will get now notifications if new posts get created on this board.';
    sails.log.verbose('USER_PUT::: Subscribing user #' + userId + ' to board #' + boardId);
    var usr = await Member.findOne({id: userId});
    var brd = await Board.findOne({id: boardId});
    if(!usr || !brd) {
      return exits.nonExistent();
    } else {
      // TODO: Create db table & table entry
      // Currently it will just send a confirmation email to this user
      await sails.helpers.sendEmail(recipent, subject, plainText, htmlText)
        .then(() => {
          sails.log.verbose('USER_PUT::: Subscribed user #' + userId + ' to board #' + boardId + ' successfully');
          return exits.success();
        })
        .catch(() => {
          sails.log.verbose('USER_PUT::: Could not subscribe user #' + userId + ' to board #' + boardId);
          return exits.serverError();
        });
    }
  }
};
