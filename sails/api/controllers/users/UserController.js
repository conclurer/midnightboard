/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getUser: async function(req, res) {
    sails.log.verbose('USER_GET::: Searching user ' + req.param('userId'));
    var usr = await Member.findOne({id: req.param('userId')});

    ['updatedAt',
      'createdAt',
      'password',
      'languagePreference',
      'hideLastName'
    ].forEach(attribute => delete usr[attribute]);

    return res.json(usr);
  },

  deleteUser: async function(req, res) {
    sails.log.verbose('USER_DELETE::: Trying to delete user ' + req.param('userId'));
    await Member.destroy({id: req.param('userId')});
    return res.ok();
  },

  updateUser: async function(req, res) {
    // TODO Update logic
    sails.log.verbose('USER_UPDATE::: Trying to update user ' + req.param('userId'));
    return res.ok();
  }
};
