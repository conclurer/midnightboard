module.exports = {

  friendlyName: 'Get board',

  description: 'Get data of existing board. Posts have to be retrieved separately'
        + 'using /api/posts/all/:boardId',

  inputs: {
    boardId: {
      description: 'ID of board to retrieve',
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
    unauthorized: {
      description: 'Authentication required',
      statusCode: 401
    },
    nonExistent: {
      description: 'Board does not exist',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    if(inputs.boardId < 0) {
      return exits.missingParams();
    }
    sails.log.verbose('BOARD_GET::: Searching board ' + inputs.boardId);

    var brd;
    if(inputs.boardId === 0) {
      brd = await Board.findOne({ boardType: 0 });
    } else {
      brd = await Board.findOne({id: inputs.boardId});
    }
    if(!brd) {
      return exits.nonExistent();
    }

    if(!this.req.me && brd.boardType == 1) {
      return exits.unauthorized();
    }

    delete brd['updatedAt'];
    return exits.success(brd);
  }
};

