module.exports = {

  friendlyName: 'Create board',

  description: 'Get data of existing board. Posts have to be retrieved separately'
          + 'using /api/posts/all/:boardId',

  inputs: {
    boardName: {
      description: 'Displayed name of created board',
      type: 'string'
    },
    boardType: {
      description: 'Type of the created board. 0: Default Board (public), 1: Locked Board, 2: Public Board',
      type: 'number'
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
    invalidParams: {
      description: 'Invalid parameters',
      statusCode: 400
    },
    noAuth: {
      description: 'No req.me was attached, meaning there was no valid Access Token. Required to set creatorId',
      statusCode: 401
    },
    insufficientAuth: {
      description: 'Insufficient permission',
      statusCode: 403
    }
  },

  fn: async function(inputs, exits) {
    if(!this.req.me) {
      return exits.noAuth('Authentication required');
    }
    if(!inputs.boardName) {
      return exits.missingParams('boardName is required');
    }

    var boardData = {};
    if(inputs.boardType || inputs.boardType === 0) {
      if(!this.req.me['privReq']) {
        return exits.insufficientAuth('Setting board type is restricted to admins');
      }
      if(![0, 1, 2].includes(inputs.boardType)) {
        return exits.invalidParams('Invalid boardType. Must be either 0 (Default), 1 (Locked) or 2 (Public');
      }
      if(inputs.boardType === 0) {
        await Board.update({ boardType: 0 })
          .set({ boardType: 2 });
      }
      boardData.boardType = inputs.boardType;
    }

    let boardNameRegex = new RegExp(sails.config.custom.BOARDNAME_REGEX);
    if(!boardNameRegex.test(inputs.boardName)) {
      return exits.invalidParams('Boardname is too long/short or contains illegal characters');
    }
    boardData.boardName = inputs.boardName;

    sails.log.verbose('BOARD_CREATE::: Trying to create board ' + inputs.boardName);

    var oldDefaultBoard = await Board.findOne({boardType: 0});
    if(!oldDefaultBoard) {
      boardData.boardType = 0;
    }

    var createdBoard = await Board.create(boardData).fetch();
    delete createdBoard['createdAt'];
    if(boardData.boardType === 0) {
      sails.log.info('NOTICE::: Default baord has been set to be #' + inputs.boardId);
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


