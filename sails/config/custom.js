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
    baseUrl: 'http://localhost:1337',

    // Disallow all non-letter Ascii Characters, except -.'
    REALNAME_REGEX: '^[\'\-\. a-zA-ZŠŽšžŸÀ-ÖÙ-öù-ÿ]{2,20}$',
    USERNAME_REGEX: '^[a-zA-Z0-9]{5,30}$',
    PASSWORD_REGEX : '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|.*[\-=._#§@$!%*?&])[A-Za-z0-9\-=._#§@$!%*?&]{8,}$',
    EMAIL_REGEX : '^(?=[a-zA-Z0-9][a-zA-Z0-9@._%+-]{5,253}$)[a-zA-Z0-9._%+-]{1,64}@(?:(?=[a-zA-Z0-9-]{1,63}\.)[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.){1,8}[a-zA-Z]{2,63}$',

};