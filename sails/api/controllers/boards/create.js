module.exports = {

  friendlyName: 'Create board',

  description: 'Get data of existing board. Posts have to be retrieved separately'
          + 'using /api/posts/all/:boardId',

  inputs: {
    boardName: {
      description: 'Displayed name of created board',
      type: 'string'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 201
    },
    missingParams: {
      description: 'Missing parameters',
      statusCode: 400
    },
    noAuth: {
      description: 'No req.me was attached, meaning there was no valid Access Token. Required to set creatorId',
      statusCode: 401
    }
  },

  fn: async function(inputs, exits) {
    let boardNameRegex = new RegExp(sails.config.custom.BOARDNAME_REGEX);
    if(!boardNameRegex.test(inputs.boardName)) {
      return exits.invalidParams('Boardname is too long/short or contains illegal characters');
    }
    if(!this.req.me) {
      return exits.noAuth('Authentication required');
    }

    sails.log.verbose('BOARD_CREATE::: Trying to create board ' + inputs.boardName);
    var createdBoard = await Board.create(
      {
        boardName: inputs.boardName,
        creatorId: this.req.me['id']
      }).fetch();
    delete createdBoard['createdAt'];

    return exits.success(createdBoard);
  }
};


