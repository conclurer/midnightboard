/**
 * BoardController
 *
 * @description :: Server-side logic for managing Boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getBoard: async function(req, res) {
    sails.log.verbose('BOARD_GET::: Fetching Board ' + req.param('boardId'));
    var board = await Board.findOne({id: req.param('boardId')});
    if(!board) return res.notFound();
    return res.json(JSON.stringify(board));
  },

  createBoard: async function(req, res) {
    sails.log.verbose('BOARD_CREATE::: Trying to create board with name ' + req.param('boardName'));
    var board = await Board.create({boardName: req.param('boardName')}).fetch();
    if(!board) return res.notFound();
    return res.json(JSON.stringify(board));
  },

  deleteBoard: async function(req, res) {
    sails.log.verbose('BOARD_DELETE::: Trying to delete board ' + req.param('boardId'));
    await Board.destroy({id: req.param('boardId')});
    return res.ok();
  },

  updateBoard: async function(req, res) {
    // TODO Update logic
    sails.log.verbose('BOARD_UPDATE::: Trying to update board ' + req.param('boardId'));
    return res.ok();
  }
};
