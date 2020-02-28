/**
 * BoardController
 *
 * @description :: Server-side logic for managing Boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getBoard: async function(req, res) {
    sails.log('Searching board ' + req.param('boardId'));
    var brd = await Board.findOne({id: req.param('boardId')});
    return res.json(JSON.stringify(brd));
  },

  createBoard: async function(req, res) {
    sails.log('Trying to create board ' + req.param('boardName'));
    await Board.create({boardName: req.param('boardName')});
    return res.ok();
  },

  deleteBoard: async function(req, res) {
    sails.log('Trying to delete board ' + req.param('boardId'));
    await Board.destroy({boardName: req.param('boardId')});
    return res.ok();
  },

  updateBoard: async function(req, res){
    return res.ok();
  },
};
