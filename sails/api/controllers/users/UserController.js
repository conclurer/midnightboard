/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getUser: async function(req, res) {
    sails.log.verbose('USER_GET::: Searching user ' + req.param('userId'));
    var usr = await Member.findOne({userId: req.param('userId')});
    return res.json(JSON.stringify(usr));
  },

  deleteUser: async function(req, res) {
    sails.log.verbose('USER_DELETE::: Trying to delete user ' + req.param('userId'));
    await Member.destroy({userName: req.param('userId')});
    return res.ok();
  },

  updateUser: async function(req, res){
    return res.ok();
  },
};
