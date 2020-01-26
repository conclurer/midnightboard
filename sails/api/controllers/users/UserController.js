/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getUser: async function(req, res) {
    sails.log('Searching user ' + req.param('userId'));
    var usr = await User.findOne({userId: req.param('userId')});
    return res.json(JSON.stringify(usr));
  },

  registerUser: async function(req, res) {
    sails.log('Trying to create user ' + req.param('userName'));
    await User.create({userName: req.param('userName')});
    return res.ok();
  },

  deleteUser: async function(req, res) {
    sails.log('Trying to delete user ' + req.param('userId'));
    await User.destroy({userName: req.param('userId')});
    return res.ok();
  },

  updateUser: async function(req, res){

    return res.ok();
  },
};
