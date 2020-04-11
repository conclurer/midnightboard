/**
 * isLoggedIn
 *
 * Checks if the request had a valid JWT attached.
 * The 'req.me' attribute is attached within sails/api/hooks/custom/index.js
 *
 * For more information about policies, see here:
 * https://sailsjs.com/config/policies
 * https://sailsjs.com/docs/concepts/policies
 * https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function(req, res, proceed) {
  // 'req.me' gets defined in api/hooks/custom/index.js, before any request gets processed.
  // When a valid auth token was provided, 'req.me' contains the data provided within the sent JWT
  if(req.me) {
    if(req.me['role'] === 0) {
      req.me['privReq'] = true;
    }
    return proceed();
  }
  return res.status(401).send();
};
