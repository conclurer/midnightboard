module.exports = {

  friendlyName: 'Get board',

  description: 'Get data of existing board. Posts have to be retrieved separately'
        + 'using /api/posts/all/:boardId',

  inputs: {
    boardId: {
      description: 'Board ID of board to retrieve',
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
      description: 'Board does not exist',
      statusCode: 204
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.boardId) {
      return exits.missingParams();
    }
    sails.log.verbose('BOARD_GET::: Searching board ' + inputs.boardId);
    var brd = await Board.findOne({id: inputs.boardId});
    if(!brd) {
      return exits.nonExistent();
    }
    delete brd['updatedAt'];
    return exits.success(brd);
  }
};

