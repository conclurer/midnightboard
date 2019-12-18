/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getUser: async function(req, res) {
        sails.log('Searching user ' + req.param('userID'));
        var usr = await User.findOne({username: req.param('userID')});
        return res.json(JSON.stringify(usr));
    },

    registerUser: async function(req, res) {
        sails.log('Trying to create user ' + req.param('username'));
        await User.create({username: req.param('username')});
        return res.ok(); 
    },

    deleteUser: async function(req, res) {
        sails.log('Trying to delete user ' + req.param('userID'));
        await User.destroy({username: req.param('userID')})
        return res.ok(); 
    },

    updateUser: async function(req, res){

        return res.ok();
    },
};