/**
 * isAdministrator
 *
 * Checks if the page was requested by its owner (i.e. Board Owner, Post Creator, or the User itself).
 *
 * For more information about policies, see here:
 * https://sailsjs.com/config/policies
 * https://sailsjs.com/docs/concepts/policies
 * https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function(req, res, proceed) {
  if(!req.param('boardId')) {
    return res.status(400).send();
  }
  if(!req.me) {
    return res.status(401).send();
  }

  if(req.me['role'] === 0) {
    return proceed();
  }

  var brd = await Board.find({
    where: {id: req.param('boardId')},
    select: ['id', 'creatorId']
  }).limit(1);
  if(!brd[0] || brd[0].creatorId !== req.me['id']) {
    return res.status(401).send();
  }
  return proceed();
};

