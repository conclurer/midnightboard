/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
    '*': 'is-logged-in',

    'boards/delete': 'is-board-owner',
    'boards/update': 'is-board-owner',

    'posts/delete': 'is-post-owner',
    'posts/update': 'is-post-owner',

    'users/delete': 'is-self',
    'users/update': 'is-self',
    'users/update-email': 'is-self',
    'users/update-password': 'is-self',

    'authentication/*': true
};
