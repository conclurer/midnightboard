module.exports = {

  friendlyName: 'Update board',

  description: 'Update data of existing board.',

  inputs: {
    boardId: {
      description: 'board ID of board to update',
      type: 'number'
    },
    boardName: {
      description: 'New board name',
      type: 'string'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    invalidParams: {
      description: 'One or more parameters do not match pre-defined regex',
      statusCode: 400
    },
    nonExistent: {
      description: 'Missing parameters',
      statusCode: 400
    }
  },

  fn: async function(inputs, exits) {
    let boardNameRegex = new  RegExp(sails.config.custom.BOARDNAME_REGEX);

    var valuesToChange = {};
    if(inputs.boardName) {
      if(boardNameRegex.test(inputs.boardName)) {
        valuesToChange.boardName = inputs.boardName;
      } else {
        return exits.invalidParams('Username is too long/short or contains illegal characters');
      }
    }
    var updatedBoard = await Board.updateOne({ id: inputs.boardId })
      .set(valuesToChange);
    if(!updatedBoard) {
      return exits.nonExistent();
    }
    return exits.success();
  }
};


