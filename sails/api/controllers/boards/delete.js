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
    cannotDeleteDefault: {
      description: 'Default board cannot be deleted',
      statusCode: 409
    },
    nonExistent: {
      description: 'Board does not exist in database',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.boardId) {
      return exits.missingParams();
    }
    var isDefaultBoard = await Board.findOne({id: inputs.boardId});
    if(isDefaultBoard.boardType === 0) {
      return exits.cannotDeleteDefault('Default Board may not be deleted');
    }

    sails.log.info('BOARD_DELETE::: Trying to delete board ' + inputs.boardId);
    var deletedBoard = await Board.destroyOne({id: inputs.boardId});
    if(!deletedBoard) {
      return exits.nonExistent();
    }
    return exits.success();
  }
};
