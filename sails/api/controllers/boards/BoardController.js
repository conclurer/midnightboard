/**
 * BoardController
 *
 * @description :: Server-side logic for managing Boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getBoard: async function(req, res) {
        sails.log('Searching board ' + req.param('boardID'));
        var brd = await Board.findOne({id: req.param('boardID')});
        return res.json(JSON.stringify(brd));
    },

    createBoard: async function(req, res) {
        sails.log('Trying to create board ' + req.param('boardname'));
        await Board.create({boardName: req.param('boardname')});
        return res.ok(); 
    },

    deleteBoard: async function(req, res) {
        sails.log('Trying to delete board ' + req.param('boardID'));
        await Board.destroy({boardName: req.param('boardID')})
        return res.ok(); 
    },

    updateBoard: async function(req, res){
        
        return res.ok();
    },
};