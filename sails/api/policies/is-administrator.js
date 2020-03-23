/**
 * isAdministrator
 *
 * Checks if the request was sent from an admin account.
 *
 * For more information about policies, see here:
 * https://sailsjs.com/config/policies
 * https://sailsjs.com/docs/concepts/policies
 * https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function(req, res, proceed) {
  // 'req.me' gets defined in api/hooks/custom/index.js, before any request gets processed.
  if(!req.me || req.me['role'] !== 'admin') {
    return res.status(401).send();
  }
  req.me['privReq'] = true;
  return proceed();
};

