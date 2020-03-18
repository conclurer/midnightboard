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


    /**************************************************************************
     *                                                                         *
     * Regex Strings                                                           *
     *                                                                         *
     * Used to match data like passwords, mail addresses, usernames etc.       *
     * API Requests for those attributes, not matching these regex             *
     *  will be rejected                                                       *
     **************************************************************************/
    
    // Allows letters and numbers only
    BOARDNAME_REGEX: '^[a-zA-Z0-9äÄöÖüÜß \'\-\.\,\/\&]{2,50}$',
    POSTTITLE_REGEX: '^[a-zA-Z0-9äÄöÖüÜß \_]{2,49}[?]?$',
    USERNAME_REGEX: '^[a-zA-Z0-9]{5,30}$',

    // Disallow all non-letter Ascii Characters, except -.'
    REALNAME_REGEX: '^[\'\-\. a-zA-ZŠŽšžŸÀ-ÖÙ-öù-ÿ]{2,20}$',
    // Min 8 characters. 1+ uppercase, 1+ lowercase , 1+ special character or number
    PASSWORD_REGEX : '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|.*[\-=._#§@$!%*?&])[A-Za-z0-9\-=._#§@$!%*?&]{8,}$',
    // Only accepts characters legal for mail addresses, and address has to follow a valid scheme, e.g. `user.name@domain.ad.dr`
    EMAIL_REGEX : '^(?=[a-zA-Z0-9][a-zA-Z0-9@._%+-]{5,253}$)[a-zA-Z0-9._%+-]{1,64}@(?:(?=[a-zA-Z0-9-]{1,63}\.)[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.){1,8}[a-zA-Z]{2,63}$',

    /**************************************************************************
     *                                                                         *
     * Misc. settings                                                           *
     *                                                                         *                                                    *
     **************************************************************************/

     //Whether or not to allow users to hide their last name
    ALLOW_HIDE_LAST_NAME: false,
    // Default number of posts the api/get/all query returns, when no limit is requested
    DEFAULT_POST_LIMIT: 64,
};