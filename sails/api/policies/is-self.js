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
  if(!req.me) {
    return res.status(401).send();
  }
  if(req.me['role'] === 0) {
    req.me['privReq'] = true;
    return proceed();
  }
  if(req.param('userId') && (req.me['id'] == req.param('userId'))) {
    req.me['privReq'] = true;
    return proceed();
  }
  return res.status(401).send();
};

