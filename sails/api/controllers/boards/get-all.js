module.exports = {

  friendlyName: 'Get all boards',

  description: 'Get data of all existing boards.',

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    }
  },

  fn: async function(inputs, exits) {
    sails.log.verbose('BOARDS_GET::: Retrieving all boards.');

    var brds = {
      default: {},
      public: [],
      boards: []
    };

    var tmp = await Board.find({boardType: 0}).limit(1);
    brds.default = tmp[0];
    brds.public = await Board.find({boardType: 2});
    if(this.req.me) {
      brds.boards = await Board.find({boardType: 1});
    }
    return exits.success(brds);
  }
};


