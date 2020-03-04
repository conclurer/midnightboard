/**
 * JWT data hook
 * This hook is called during sails setup. Mail service etc. will be initiated here
 * It also called before any request gets resolved.
 * When  A valid JWT is provided within the authentication header, its data will be attached to the req
 * and can be called via req.me['attribute'].
 *
 * @description :: Extends the req object with data sent within JWTs via req.me.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineCustomHook(sails) {
  return {
    /**
       * Runs when a Sails app loads/lifts.
       */
    initialize: async function() {
      sails.log.info('Initializing hook... (`api/hooks/custom`)');

      // TODO Mail service etc. will be initiated here
    },


    routes: {

      /**
         * Runs before every matching route.
         *
         * @param {Ref} req
         * @param {Ref} res
         * @param {Function} next
         */

      before: {
        '/api/*': {
          skipAssets: true,
          fn: async function(req, res, next) {
            if(req.me !== undefined) {
              throw new Error('Cannot attach logged-in user as `req.me` because'
              + 'this property already exists!  (Is it being attached somewhere else?)');
            }
            req.me = undefined;

            var loggedInUser = await sails.helpers.authenticateJwt(req.headers);
            if(loggedInUser) {
              req.me = loggedInUser;
            }

            // Prevents caching of pages. Without, users MAY be able to go back to locked sites,
            // even after logging out. Needs further testing before enabeling
            //res.setHeader('Cache-Control', 'no-cache, no-store');

            return next();
          }
        }
      }
    }

  };
};
