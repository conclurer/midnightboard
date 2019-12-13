/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

    /**************************************************************************
     *                                                                         *
     * The base URL to use during development.                                 *
     *                                                                         *
     * • No trailing slash at the end                                          *
     * • `http://` or `https://` at the beginning.                             *
     *                                                                         *
     * > This is for use in custom logic that builds URLs.                     *
     * > It is particularly handy for building dynamic links in emails,        *
     * > but it can also be used for user-uploaded images, webhooks, etc.      *
     *                                                                         *
     **************************************************************************/
    baseUrl: 'http://localhost:1337'
};