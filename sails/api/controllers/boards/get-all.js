module.exports = {

  friendlyName: 'Get all boards',

  description: 'Get data of all existing boards.',

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    nonExistent: {
      description: 'No boards found',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    sails.log.verbose('BOARDS_GET::: Retrieving all boards.');

    var brd = await Board.find();
    if(!brd || brd.length === 0) {
      return exits.nonExistent();
    }

    return exits.success(brd);
  }
};


