/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getUser: async function(req, res) {
    sails.log('Searching user ' + req.param('userId'));
    var usr = await Member.findOne({userId: req.param('userId')});
    return res.json(JSON.stringify(usr));
  },

  deleteUser: async function(req, res) {
    sails.log('Trying to delete user ' + req.param('userId'));
    await Member.destroy({userName: req.param('userId')});
    return res.ok();
  },

  updateUser: async function(req, res){
    // TODO. For now it is used as temporary helper that returns the contents of a valid JWT
    var out = await sails.helpers.authenticateJwt(req.headers);
    //sails.log(req.me['id'] + " || " + req.me['name']);
    return res.ok(out);
  },
};
