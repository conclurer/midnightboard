/**
 * custom hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineCustomHook(sails) {
  return {
    /**
       * Runs when a Sails app loads/lifts.
       */
    initialize: async function () {

      sails.log.info('Initializing hook... (`api/hooks/custom`)');

      // TODO Mail service etc. will be innitiated here

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
          fn: async function(req, res, next){

            if (req.me !== undefined) {
              throw new Error('Cannot attach logged-in user as `req.me` because this property already exists!  (Is it being attached somewhere else?)');
            }
            req.me = undefined;

            var loggedInUser = await sails.helpers.authenticateJwt(req.headers);
            if(loggedInUser){
              req.me = loggedInUser;
            }

            //res.setHeader('Cache-Control', 'no-cache, no-store');
            return next();
          }
        }
      }
    }

  };

};
