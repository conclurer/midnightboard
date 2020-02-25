/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getUser: async function(req, res) {
    sails.log('Searching user ' + req.param('userId'));
    var usr = await Member.findOne({id: req.param('userId')});
    return res.json(JSON.stringify(usr));
  },

  registerUser: async function(req, res) {
    sails.log('Trying to create user ' + req.param('userName'));
    var usr = await Member.create({
      createdAt: req.param('createdAt'),
      updateAt: req.param('updateAt'),
      userName: req.param('userName'),
      firstName: req.param('firstName'),
      lastName: req.param('lastName'),
      email: req.param('email'),
      password: req.param('password'),
      languagePreference: req.param('languagePreference'),
    }).fetch();
    return res.json(JSON.stringify(usr));
  },

  deleteUser: async function(req, res) {
    sails.log('Trying to delete user ' + req.param('userId'));
    await Member.destroy({userName: req.param('userId')});
    return res.ok();
  },

  updateUser: async function(req, res){
    req = req;
    return res.ok();
  }
};
