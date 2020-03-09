module.exports = {

  friendlyName: 'Delete board',

  description: 'Delete existing board',

  inputs: {
    boardId: {
      description: 'Board ID of board to delete',
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
      description: 'Board does not exist in database',
      statusCode: 400
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.boardId) {
      return exits.missingParams();
    }
    sails.log.info('BOARD_DELETE::: Trying to delete board ' + inputs.boardId);
    var deletedBoard = await Board.destroyOne({id: inputs.boardId});
    if(!deletedBoard) {
      return exits.nonExistent();
    }
    return exits.success();
  }
};

