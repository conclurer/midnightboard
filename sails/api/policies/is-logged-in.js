/**
 * is-logged-in
 *
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {

  // 'req.me' gets defined in api/hooks/custom/index.js, before any request gets processed.
  // When a valid auth token was provided, 'req.me' contains the data provided within the send JWT
  if (req.me) {
    return proceed();
  }
  return res.status(401).send();

};
